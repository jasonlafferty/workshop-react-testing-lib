import { useDelay } from './delay.hook';
import { useCounter } from './counter.hook'

const Counter = () => {
    const { count, increment } = useCounter()
    const value = useDelay(count)

    return (
        <div>
            <h2 role="heading">Counter</h2>
            <button role="button" onClick={increment}>{count}</button>
            {value > 0 && <div role="tooltip">{value}</div>}
        </div>
    );
}

export default Counter;
