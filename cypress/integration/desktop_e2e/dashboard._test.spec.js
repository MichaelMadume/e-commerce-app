/// <reference types="cypress" />

describe('Dashboard Tests', () => {
  
  context('Profit Chart [Front Chart]', () => {
    before(() => {
      cy.visit('http://localhost:4300')
    })

    it('Should be visible', () => {
      cy.get('ngx-profit-card').find('nb-card-front')
        .contains('profit', { matchCase: false })
        .should('be.visible')
    })

    it('Should show more details bar is clicked', () => {
      cy.get('ngx-profit-card').find('nb-card-front')
        .within(() => {
          cy.get('canvas').click('right')
          cy.get('div').contains('₦').should('exist')
        })
    })

    it('Should flip chart when clicked', () => {
      cy.get('ngx-profit-card').find('nb-card-front')
        .within(() => {
          cy.get('nb-icon[icon="chevron-right-outline"]').click()
        })
      cy.get('ngx-profit-card').find('nb-flip-card').should('have.class', 'flipped')
    })
  })

  context('Profit Chart [Back Chart]', () => {
    before(() => {
      cy.visit('http://localhost:4300')
      cy.get('ngx-profit-card').find('nb-card-front')
        .within(() => {
          cy.get('nb-icon[icon="chevron-right-outline"]').click()
        })
    })

    it('Should be visible', () => {
      cy.get('ngx-profit-card').find('nb-card-back')
        .contains('profit', { matchCase: false })
        .should('be.visible')
    })

    it('Should show currency labels', () => {
      cy.get('ngx-profit-card').find('nb-card-back').find('div.label')
        .within(x => {
          expect(x).to.contain('₦')
        }).and('have.length', 2)
    })

    it('Should flip back to first card when chevron is clicked', () => {
      cy.get('ngx-profit-card').find('nb-card-back')
        .within(() => {
          cy.get('nb-icon[icon="chevron-right-outline"]').click()
        })
      cy.get('ngx-profit-card').find('nb-flip-card').should('not.have.class', 'flipped')
    })
  })


  context('Earning Chart [Front Chart]', () => {
    before(() => {
      cy.visit('http://localhost:4300')
    })

    it('Should be visible', () => {
      cy.get('ngx-earning-card').find('nb-flip-card')
        .should('be.visible')
      cy.get('ngx-earning-card').find('.select-button')
        .should('be.visible')
      cy.get('ngx-earning-card').find('nb-flip-card').find('div.delta')
        .should('be.visible')
      cy.get('ngx-earning-card').find('nb-flip-card').contains('daily income', { matchCase: false })
        .should('be.visible')
    })

    it('Should currency options when select button is clicked', () => {
      cy.get('ngx-earning-card').find('button.select-button').click()
      cy.get('nb-option-list').should('exist').should('be.visible')
    })
    
    it('Should flip chart when clicked', () => {
      cy.get('nb-option-list').contains('Bitcoin', {matchCase: false}).click()
      cy.get('ngx-earning-card').find('nb-card-front')
        .within(() => {
          cy.get('nb-icon[icon="chevron-right-outline"]').click()
        })
      cy.get('ngx-earning-card').find('nb-flip-card').should('have.class', 'flipped')
    })
    
    it('Should flip chart when clicked', () => {
      cy.get('nb-option-list').contains('Bitcoin', {matchCase: false}).click()
      cy.get('ngx-earning-card').find('nb-card-front')
        .within(() => {
          cy.get('nb-icon[icon="chevron-right-outline"]').click()
        })
      cy.get('ngx-earning-card').find('nb-flip-card').should('have.class', 'flipped')
    })
  })

})
