import React from 'react'
import { render, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter  from '../../Components/Counter'

// `render`

/*
function render(
  ui,
  {
    container,
    baseElement = container,
    queries,
    hydrate = false,
    wrapper: WrapperComponent,
  } = {},
) {
    return {
    container,
    baseElement,
    debug,
    unmount,
    rerender, // Similar to setProps from Enzyme
    asFragment,
    ...getQueriesForElement(baseElement, queries),
  }
*/
// see: https://github.com/testing-library/react-testing-library/blob/main/src/pure.js

afterEach(cleanup)

test.skip('click the button', () => {
    const { debug } = render(<Counter />)

    const button = document.querySelector('button')

    expect(button.textContent).toBe('0')

    userEvent.click(button)
    
    expect(button.textContent).toBe('1')
})

// How do we see what is happening in the browser?
// `debug` which uses the same pretty print as Jest snapshots

test.skip('click the button', () => {
    const { debug } = render(<Counter />)

    const button = document.querySelector('button')

    console.log(debug(button))
})
