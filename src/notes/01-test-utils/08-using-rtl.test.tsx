import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import Counter  from '../../Components/Counter'

// For what we have done above see the link below for the react docs.
// See: https://reactjs.org/docs/test-utils.html

// 08. Why use RTL (Whats wrong with Enzyme)? why don't we do what we did everywhere.
// ------------------------------------------------

// We have tended to focus on testing logic, service but tend to avoid testing UI.
// With Enzyme we test UI but the patterns tend to encouraging testing implementation details,
// pushing us towards mocking, shallow rendering and not interacting with our UI the same way as a real user would.

// Because users can't directly interact with your app's component instances,
// assert on their internal state or what components they render, or call their
// internal methods, doing those things in your tests reduce the confidence they're able to give you.

// You can build your own Enzyme wrappers, using [`react-test-renderer`](https://reactjs.org/docs/test-renderer.html)

// That's not to say that there's never a use case for doing those things, so they should 
// be possible to accomplish, just not the default and natural way to test react components.

// RTL provided queries (accessibility queries) that replicated how a user would interact with a page. It provides a
// way to lower our investment and increase our return.

// - https://testing-library.com/docs/react-testing-library/intro/#this-solution
// - https://testing-library.com/docs/guiding-principles/
// - see: https://testing-library.com/docs/react-testing-library/faq/

// Component Author
// Who are you writing component for?
// Developer user
    // onChange it will get called
// End user
    // Interact


// For a long time now cleanup happens automatically (supported for most major testing frameworks) and we don't need to add it. 
// afterEach(cleanup)

// Why do we use rolls
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles
// https://testing-library.com/docs/queries/about/#priority

// More learning materials
// https://testing-library.com/docs/learning/

test('08 - use rtl instead of our custom testing suite', async () => {
    render(<Counter />)

    const header = screen.queryByRole('heading')

    expect(header.textContent).toBe('Counter')

    const button = screen.getByRole('button')

    expect(button.textContent).toBe('0')

    fireEvent.click(button)

    expect(button.textContent).toBe('1')

    const tooltip = await screen.findByRole('tooltip')

    expect(tooltip.textContent).toBe('1')
})
