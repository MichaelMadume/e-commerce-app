/// <reference types="cypress" />

describe('Build', () => {

  beforeEach(() => {
    // set viewport to kiosk viewport
  })

  it('should build successfully', () => {
    cy.exec('npm run build')
      .its('code').should('eq', 0)
  })


})
