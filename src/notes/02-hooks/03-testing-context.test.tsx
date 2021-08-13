import { renderHook, act } from '@testing-library/react-hooks'
import React from 'react'
import { CounterStepProvider, useCounter }  from '../../Components/Counter/counter-with-context.hook'

// 03. What happens when we use a hook that uses context?
// ------------------------------------------------

// We can use a wrapper to provide a provider.
// - https://github.com/testing-library/react-hooks-testing-library

test('01 - testing hooks', () => {
    const wrapper: React.FC<{}> = ({ children }) => <CounterStepProvider step={2}>{children}</CounterStepProvider>
    const { result } = renderHook(() => useCounter(), { wrapper })
  
    act(() => {
      result.current.increment()
    })
  
    expect(result.current.count).toBe(2)
})

test('01 - testing hooks providing state', () => {
    const wrapper: React.FC<{ step: number; }> = ({ children, step }) => <CounterStepProvider step={step}>{children}</CounterStepProvider>
    const { result, rerender } = renderHook(() => useCounter(), {
        wrapper,
        initialProps: {
          step: 2
        }
    })
  
    act(() => {
      result.current.increment()
    })
  
    expect(result.current.count).toBe(2)

    rerender({ step: 8 })

    act(() => {
      result.current.increment()
    })
  
    expect(result.current.count).toBe(10)
})
