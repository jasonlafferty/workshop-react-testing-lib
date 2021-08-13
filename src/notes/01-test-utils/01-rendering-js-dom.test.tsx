import ReactDOM from 'react-dom'
import Counter  from '../../Components/Counter'

// "Arrange" "Act" "Assert"
// ------------------------------------------------
// We are going to have as many "Arrange", "Act" and "Asserts" as
// necessary for the workflow you're trying to get confidence about.

// see: https://kentcdodds.com/blog/write-fewer-longer-tests
// https://github.com/kentcdodds/write-fewer-longer-tests-demo/tree/main/src/__tests__

// Arrange: create props and other fixtures for the test case
// Act: simulate changes to the elements such as text inputs or button clicks
// Assert: assert that the desired functions were invoked the right number of times, and with the correct arguments

// Good Resources:
// - https://blog.kentcdodds.com/introducing-the-react-testing-library-e3a274307e65
// - http://blog.codepipes.com/testing/software-testing-antipatterns.html

// ------------------------------------------------

// 01. How do we render a component in the browser?
// ------------------------------------------------

// We use the `React.render` method to a React element into the DOM
// in the supplied container and return a reference to the component
// https://reactjs.org/docs/react-dom.html#render

test.skip('01 - rendering component', () => {
    const div = document.getElementById('root')

    ReactDOM.render(<Counter />, div)
})

// 02. Where does document come from?
// ------------------------------------------------

// Jest runs in a Node.js environment, and loads JSDOM which simulates
// the DOM. It good at simulation with the exception of drag and drop
// some other complicated functionality.
// https://github.com/jsdom/jsdom#readme

test('02 - rendering component in Jest', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    ReactDOM.render(<Counter />, div)

    console.log(document.body.innerHTML)
})
