import React from 'react'

export const useCounter = (initialState = 0) => {
    const [count, setCount] = React.useState(initialState)
    const increment = () => setCount(prevCount => prevCount + 1)
    const decrement = () => setCount(prevCount => prevCount - 1)

    return { count, increment, decrement }
}
