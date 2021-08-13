import React from 'react'

const CounterStepContext = React.createContext(1)

export const CounterStepProvider = ({ step, children }: { step: number, children: React.ReactNode}) => (
  <CounterStepContext.Provider value={step}>{children}</CounterStepContext.Provider>
)

export const useCounter = (initialValue = 0) => {
  const [count, setCount] = React.useState(initialValue)
  const step = React.useContext(CounterStepContext)

  const increment = () => setCount(() => count + step)
  const decrement = () => setCount(() => count - step)
  const reset = () => setCount(initialValue)

  return { count, increment, decrement, reset }
}
