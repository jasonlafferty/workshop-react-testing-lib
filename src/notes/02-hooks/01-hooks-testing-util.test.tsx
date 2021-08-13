import React from 'react'
import { render, act } from '@testing-library/react'
import { useCounter }  from '../../Components/Counter/counter.hook'

// 01. We have a components rendered in a DOM container. How do we find an element?
// ------------------------------------------------

// We used to use jQuery to do selection with the DOM, but we have DOM selectors as well
// - https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
// - https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll

// Will fail cause Hooks can only be called inside of the body of a function component.
test.skip('01 - calling direct', () => {
    const current = useCounter()

    expect(current.count).toBe(0)

    act(() => current.increment())

    expect(current.count).toBe(1)
})

test('01 - testing hooks', () => {
    const result: { current: ReturnType<typeof useCounter> } = { current: null }

    const Component = (): null => {
        result.current = useCounter()

        return null
    }

    render(<Component />)

    expect(result.current.count).toBe(0)

    act(() => result.current.increment())

    expect(result.current.count).toBe(1)
})

// refactor into a testing helper

const renderHook = (fn: Function) => {
    const result: { current: ReturnType<typeof useCounter> } = { current: null }

    const Component = (): null => {
        result.current = fn()

        return null
    }

    render(<Component />)

    return { result }
}

test('01 - testing hooks with abstraction', () => {
    const { result } = renderHook(() => useCounter())

    expect(result.current.count).toBe(0)

    act(() => result.current.increment())

    expect(result.current.count).toBe(1)
})
