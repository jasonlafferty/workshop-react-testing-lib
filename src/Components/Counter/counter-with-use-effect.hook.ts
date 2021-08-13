import React from 'react'

export const useCounter = (initialState = 0) => {
    const [count, setCount] = React.useState(initialState)
    const increment = () => setCount(prevCount => prevCount + 1)
    const decrement = () => setCount(prevCount => prevCount - 1)
    const reset = () => setCount(initialState)

    React.useEffect(() => {
        console.log('useCounter hook', count)
    }, [count])

    return { count, increment, decrement, reset }
}
