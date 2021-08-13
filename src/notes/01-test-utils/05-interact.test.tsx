import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils';
import Counter  from '../../Components/Counter'

let container = document.createElement('div');

const render = (component: JSX.Element) => {
    container = document.createElement('div');
    document.body.appendChild(container)

    act(() => {
        ReactDOM.render(component, container)
    })
}

const cleanup = () => {
    document.body.removeChild(container);
    container = null;  
}

afterEach(cleanup);

// 04. We have a DOM element. How do we interact with it?
// ------------------------------------------------

// We have a DOM element
// - https://developer.mozilla.org/en-US/docs/Web/API/Element
// - https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event
// - https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
// - https://developer.mozilla.org/en-US/docs/Web/API/Event
// - https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent

test('05 - click the button', () => {
    render(<Counter />)

    const button = document.querySelector('button')

    expect(button.textContent).toBe('0')

    button.click()

    expect(button.textContent).toBe('1')
})

// We got luck that button has a click event, but if we want mouse over
// and other events we need to use the DOM events API.

test('05 - clean-up and then click the button', () => {
    render(<Counter />)

    const button = document.querySelector('button')

    expect(button.textContent).toBe('0')

    // Why do we need true? Its cause react adds global event listeners
    // and so doesn't listen to events on the DOM element. So for the
    // event make it to the `document.body` it has to bubble.
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(button.textContent).toBe('1')
})

// So lets abstract that into a function

const fireEvent = {
    click: (element: Element) => element.dispatchEvent(new MouseEvent('click', { bubbles: true }))
}

test('05 - clean-up and then click the button', () => {
    render(<Counter />)

    const button = document.querySelector('button')

    expect(button.textContent).toBe('0')

    fireEvent.click(button)

    expect(button.textContent).toBe('1')
})
