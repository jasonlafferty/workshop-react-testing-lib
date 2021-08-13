import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils';
import Counter  from '../../Components/Counter'

let container = document.createElement('div');

const render = (component: JSX.Element) => {
    container = document.createElement('div');
    document.body.appendChild(container)

    ReactDOM.render(component, container)
}

const cleanup = () => {
    document.body.removeChild(container);
    container = null;  
}

const fireEvent = {
    click: (element: Element) => {
        // Add act here
        act(() => {
            element.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })
    }
}

afterEach(cleanup)

const screen = {
    getByRole: (role: string) => {
        const elements = document.querySelectorAll(`[role="${role}"`)
        const element = elements[0]

        if(!element) { throw Error('Not found') }

        if(elements.length > 1) { throw Error('Too many elements') }

        return element
    },
    queryByRole: (role: string) => {
        const elements = document.querySelectorAll(`[role="${role}"`)
        const element = elements[0]

        if(!element) return null

        if(elements.length > 1) { throw Error('Too many elements') }

        return element
    },
    getAllByRole : (role: string) => {
        const elements = document.querySelectorAll(`[role="${role}"`)

        if(elements.length === 0) { throw Error('Too many elements') }

        return Array.from(elements)

    },
    queryAllByRole: (role: string) => {
        const elements = document.querySelectorAll(`[role="${role}"`)

        if(elements.length === 0) return []

        return Array.from(elements)
    },
    findByRole: async (role: string): Promise<any> => {},
    findAllByRole: async (role: string): Promise<any> => {}
}

// 07. WaitFor
// ------------------------------------------------

// New Selector

// wait until the `get` request promise resolves and
// the component calls setState and re-renders.
// `waitFor` waits until the callback doesn't throw an error

// `act`
// To prepare a component for assertions, wrap the code rendering
// it and performing updates inside an act() call. This makes your
// test run closer to how React works in the browser.

// https://reactjs.org/docs/test-utils.html#act

const waitFor = async (callback: () => void) => act(async () => {
    return new Promise<void>((resolve, reject) => {
        let lastError: Error
        let timeout: NodeJS.Timeout;

        const handleTimeout = () => {
            clearTimeout(timeout)
            const error = lastError || new Error('Timed out in waitFor.')
            reject(error)
        }

        const overallTimeoutTimer = setTimeout(handleTimeout, 1000)
    
        const runTimeout = () => timeout = setTimeout(() => {
            try {
                callback()
                resolve()
                clearTimeout(overallTimeoutTimer)
            } catch(e) {
                lastError = e
                runTimeout()
            }
        }, 50)

        runTimeout()
    })
})

test('07 - use waitFor', async () => {
    render(<Counter />)

    const header = screen.queryByRole('heading')

    expect(header).toBeDefined()

    const button = screen.getByRole('button')

    expect(button.textContent).toBe('0')

    fireEvent.click(button)

    expect(button.textContent).toBe('1')

    await waitFor(() => {
        const tooltip = screen.getByRole('tooltip')
        expect(tooltip.textContent).toBe('1')
    })
})

// We can use `find` and `findAll` to find elements

screen.findByRole = async (role: string) => {
    let element: Element;
    await waitFor(() => {
        element = screen.getByRole(role)
    })
    return element
}

screen.findAllByRole = async (role: string) => {
    let elements: Element[];
    await waitFor(() => {
        elements = screen.getAllByRole(role)
    })
    return elements
}

test('07 - use findBy', async () => {
    render(<Counter />)

    const header = screen.queryByRole('heading')

    expect(header).toBeDefined()

    const button = screen.getByRole('button')

    expect(button.textContent).toBe('0')

    fireEvent.click(button)

    expect(button.textContent).toBe('1')

    const tooltip = await screen.findByRole('tooltip')

    expect(tooltip.textContent).toBe('1')
})
