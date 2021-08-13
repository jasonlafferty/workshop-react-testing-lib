import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import Pokemon  from '../../Components/Pokemon'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  // Describe the requests to mock.
  rest.get('https://pokeapi.co/api/v2/pokemon', (req, res, ctx) => {
    const query = req.url.searchParams
    const limit = query.get("limit")

    return res(
      ctx.json({
        "count": 0,
        "next": "https://pokeapi.co/api/v2/pokemon?offset=25&limit=25",
        "previous": null,
        "results": [
          {
            "name":"dog",
            "url":"https://pokeapi.co/api/v2/pokemon/24/"
          },
          {
            "name":"cat",
            "url":"https://pokeapi.co/api/v2/pokemon/25/"
          }
        ]
      }),
    )
  }),
)

beforeAll(() => {
  // Establish requests interception layer before all tests.
  server.listen()
})

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  // If you need logging of the requests, uncomment the following line.
  server.printHandlers()
  server.resetHandlers()
})

afterAll(() => {
  // Clean up after all tests are done, preventing this
  // interception layer from affecting irrelevant tests.
  server.close()
})

afterEach(cleanup)

test('click the button', async () => {
    const { debug } = render(<Pokemon />)

    debug()

    const select = await screen.findByRole('combobox')

    debug()

    const button = document.querySelector('button')

    expect(button.textContent).toBe('clear selected')
})