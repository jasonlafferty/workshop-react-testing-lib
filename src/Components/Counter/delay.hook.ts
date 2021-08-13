import React from 'react'

export const useDelay = (value: number) => {
    const [delayedValue, setDelayValue] = React.useState(value)

    React.useEffect(() => {
        if (!value) return 
        const timeout = setTimeout(() => {
            setDelayValue(value)
          }, 100);
    
        return () => {
          clearTimeout(timeout);
        };
    }, [value]);

    return delayedValue
}    