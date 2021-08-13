import React from 'react'

export const useCounter = (initialValue = 0) => {
  const [count, setCount] = React.useState(initialValue)

  const increment = () => setTimeout(() => setCount(() => count + 1), 100)
  const decrement = () => setTimeout(() => setCount(() => count - 1), 100)

  return { count, increment, decrement }
}
