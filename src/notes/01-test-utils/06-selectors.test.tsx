import ReactDOM from 'react-dom'
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
    click: (element: Element) => element.dispatchEvent(new MouseEvent('click', { bubbles: true }))
}

afterEach(cleanup)

// 06. Selectors
// ------------------------------------------------

// One of the guiding principles of the Testing Library APIs is that they
// should enable you to test your app the way your users use it, including
// through accessibility interfaces like screen readers.

// https://github.com/testing-library/dom-testing-library
// https://testing-library.com/docs/queries/about#types-of-queries
// https://testing-library.com/docs/react-testing-library/cheatsheet/#queries

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

test('06 - use query selector and click the button', () => {
    render(<Counter />)

    // If we use query we don't throw an error
    const header = screen.queryByRole('heading')

    expect(header).toBeDefined()

    const button = screen.getByRole('button')

    expect(button.textContent).toBe('0')

    fireEvent.click(button)

    expect(button.textContent).toBe('1')

    // can we get the tooltips?
    // const tooltip = screen.getByRole('tooltip')
})
