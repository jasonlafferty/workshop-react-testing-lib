import { renderHook, act } from '@testing-library/react-hooks'
import { useCounter }  from '../../Components/Counter/counter-with-use-effect.hook'

// 02. use react-hooks?
// ------------------------------------------------

// You don't really want to write a component solely for testing
// this hook and have to work out how you were going to trigger
// all the various ways the hook can be updated, especially given
// the complexities of how you've wired the whole thing together.

// - https://github.com/testing-library/react-hooks-testing-library

test('01 - testing hooks', () => {
    const { result } = renderHook(() => useCounter())

    expect(result.current.count).toBe(0)

    act(() => result.current.increment())

    expect(result.current.count).toBe(1)
})


test('01 - testing hooks with initial state via closure', () => {
    let initialValue = 0
    const { result, rerender } = renderHook(() => useCounter(initialValue))

    initialValue = 10

    rerender()

    act(() => result.current.reset())

    expect(result.current.count).toBe(10)

    act(() => result.current.increment())

    expect(result.current.count).toBe(11)
})


test('01 - testing hooks with initial state via api', () => {
    const { result, rerender } = renderHook(({ initialValue }) => useCounter(initialValue), {
        initialProps: { initialValue: 0 }
    })

    rerender({ initialValue: 10 })

    act(() => result.current.reset())

    expect(result.current.count).toBe(10)

    act(() => result.current.increment())

    expect(result.current.count).toBe(11)
})

test('01 - testing hooks with effect', () => {
    const logSpy = jest.spyOn(console, 'log');

    const { result, rerender } = renderHook(({ initialValue }) => useCounter(initialValue), {
        initialProps: { initialValue: 0 }
    })

    expect(result.current.count).toBe(0)
    expect(logSpy).toHaveBeenNthCalledWith(1, 'useCounter hook', 0)

    rerender({ initialValue: 10 })

    act(() => result.current.reset())

    expect(result.current.count).toBe(10)
    expect(logSpy).toHaveBeenNthCalledWith(2, 'useCounter hook', 10)

    act(() => result.current.increment())

    expect(result.current.count).toBe(11)
    expect(logSpy).toHaveBeenNthCalledWith(3, 'useCounter hook', 11)
})

