/// <reference types="cypress" />

describe('Dashboard Tests', () => {

  beforeEach(() => {
    cy.visit('https://tumia-e-commerce.web.app/')
  })

  it('should route to login pages', () => {
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/login')
    })
  })

  it('should type username and password', () => {
    cy.get('#username').type('kmbano', { delay: 100 }).should('have.value', 'kmbano')
    cy.get('#password').type('password', { delay: 100 }).should('have.value', 'password')
  })

  it('should route to admin page', () => {
    cy.contains('NEXT').click()
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/admin/setup-i')
    })
  })

  it('should have empty print station id input', () => {
    cy.get('#printFormId')
      .should('be.visible')
      .should('have.value', '')
  })

  it('should input print station id and pair successfully', () => {
    cy.get('#printFormId')
      .should('be.visible')
      .should('have.value', '')

    cy.get('#printFormId').type('p0001', { delay: 100 }).should('have.value', 'p0001')
    cy.get('a').contains('PAIR').should('exist')
    cy.get('a').contains('UN-PAIR').should('exist')
    cy.get('a').contains('PRINT QR CODE').should('not.exist')
    cy.get('a').contains('PAIR').click()
    cy.get('.alert-message').should('contain.text', 'Pairing Successful')
    cy.wait(400)
    cy.get('.alert-button').contains('ok', { matchCase: false }).click()
  })

  it('should show and hide qr code', () => {
    cy.contains('PRINT QR CODE').should('exist')
    cy.contains('PRINT QR CODE').click()
    cy.get('ion-modal').should('exist')
    cy.get('ion-modal').within(() => {
      cy.get('app-qrcode-modal').should('exist')
      cy.get('img').should('exist')
      cy.get('img').invoke('attr', 'src').should('have.length.greaterThan', 0)
    })
    cy.wait(400)
    cy.get('ion-backdrop').click('top')
    cy.get('ion-modal').should('not.exist')
  })

  it('should unpair successfully', () => {
    cy.get('a').contains('UN-PAIR').should('exist')
    cy.get('a').contains('UN-PAIR').click()
    cy.get('.alert-message').should('contain.text', 'Unpairing Successful')
    cy.wait(400)
    cy.get('.alert-button').contains('ok', { matchCase: false }).click()
    cy.contains('PRINT QR CODE').should('not.exist')
  })

  it('should allow home page navigation after pairing successfully', () => {
    cy.get('a').contains('PAIR').click()
    cy.get('.alert-message').should('contain.text', 'Pairing Successful')
    cy.wait(400)
    cy.get('.alert-button').contains('ok', { matchCase: false }).click()
    cy.visit('http://localhost:8081')
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/home')
    })
  })

})
