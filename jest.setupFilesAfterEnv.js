const { cache } = require('swr')

// // This clears the cache of swr after each test
afterAll(() => cache.clear())
