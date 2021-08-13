import ReactDOM from 'react-dom'
import Counter  from '../../Components/Counter'

// 03. We have a components rendered in a DOM container. How do we find an element?
// ------------------------------------------------

// We used to use jQuery to do selection with the DOM, but we have DOM selectors as well
// - https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
// - https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll

test('03 - select the button', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    ReactDOM.render(<Counter />, div)

    const button = document.querySelector('button')

    expect(button.textContent).toBe('0')
})
