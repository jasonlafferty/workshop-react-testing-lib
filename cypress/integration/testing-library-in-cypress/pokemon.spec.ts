// using cypress with MSW
// https://mswjs.io/docs/api/setup-worker/use

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('/pokemon')
  })

  it('find button and click it', () => {
    cy.findByRole('button')
  })
})
