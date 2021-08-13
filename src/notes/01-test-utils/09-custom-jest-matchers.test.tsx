import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import Counter  from '../../Components/Counter'

// 09. Jest extend.
// ------------------------------------------------

// You want to use jest to write tests that assert various things about
// the state of a DOM. As part of that goal, you want to avoid all the
// repetitive patterns that arise in doing so. Checking for an element's
// attributes, its text content, its css classes, you name it.

// The @testing-library/jest-dom library provides a set of custom jest
// matchers that you can use to extend jest. These will make your tests
// more declarative, clear to read and to maintain.

// - https://github.com/testing-library/jest-dom

// We want to write some customer matchers for our use-case so we have
// a good mental modal of what is happening under the hood.
expect.extend({
    toBeInTheDocument(element) {
      const isElement = element !== null && element instanceof window.HTMLElement
      const pass = isElement

      return {
        message: () => this.isNot ? `expected document not to contain element`: `expected document to contain element`,
        pass,
      };
    },
    toContainHTML(element, html) {
        const isElement = element !== null && element instanceof window.HTMLElement
        const hasHTML = element?.innerHTML?.includes(html) || false
        const pass = isElement && hasHTML

        return {
            message: () => this.isNot ? `expected ${html} to be in the element` : `expected ${html} to not be in the element`,
            pass,
        }
    },
});

// change to the custom extend
// import '@testing-library/jest-dom'

afterEach(cleanup)

test('09 - custom jest matchers', async () => {
    render(<Counter />)

    const header = screen.queryByRole('heading')

    expect(header).toBeInTheDocument()

    const button = screen.getByRole('button')

    expect(button).toContainHTML('0')

    fireEvent.click(button)

    expect(button).toContainHTML('1')

    const tooltip = await screen.findByRole('tooltip')

    expect(tooltip).toContainHTML('1')
})
