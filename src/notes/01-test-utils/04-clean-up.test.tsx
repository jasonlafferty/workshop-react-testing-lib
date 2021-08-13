import ReactDOM from 'react-dom'
import Counter  from '../../Components/Counter'

// 05. Clean-up between tests
// ------------------------------------------------

// We have a DOM element that we mount into, so if we want to clean-up
// we have to remove the DOM element.
// - https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
// - https://testing-library.com/docs/react-testing-library/api/#cleanup

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

describe('multiple tests', () => {
    // Will break if commented count
    afterEach(cleanup);
    
    test('05 - click the button', () => {
        render(<Counter />)
    
        const button = document.querySelector('button')
    
        expect(button.textContent).toBe('0')

        button.click()
    
        expect(button.textContent).toBe('1')
    })

    test('05 - click the button', () => {
        render(<Counter />)
    
        const button = document.querySelector('button')
    
        expect(button.textContent).toBe('0')

        button.click()
    
        expect(button.textContent).toBe('1')
    })
})

