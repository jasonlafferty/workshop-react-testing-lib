import { renderHook } from '@testing-library/react-hooks'
import { useCounter } from '../../Components/Counter/async-counter.hook'

// 03. What happens when we have a async action?
// ------------------------------------------------

// We can use waitForNextUpdate.
// - https://react-hooks-testing-library.com/usage/advanced-hooks#async

test('should increment counter after delay', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCounter())

  result.current.increment()

  await waitForNextUpdate()

  expect(result.current.count).toBe(1)
})
