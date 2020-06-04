/// <reference types="cypress" />

describe('Dashboard Tests', () => {

  context('Profit Chart [Front Chart]', () => {
    before(() => {
      cy.visit('')
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
      cy.visit('')
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
      cy.visit('')
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
      cy.get('nb-option-list').contains('Bitcoin', { matchCase: false }).click()
      cy.get('ngx-earning-card').find('nb-card-front')
        .within(() => {
          cy.get('nb-icon[icon="chevron-right-outline"]').click()
        })
      cy.get('ngx-earning-card').find('nb-flip-card').should('have.class', 'flipped')
    })

    it('Should flip chart when clicked', () => {
      cy.get('ngx-earning-card').find('nb-card-back')
        .within(() => {
          cy.get('nb-icon[icon="chevron-right-outline"]').click()
        })
      cy.get('ngx-earning-card').find('nb-flip-card').should('not.have.class', 'flipped')
    })
  })

  context('Earning Chart [Back Chart]', () => {
    before(() => {
      cy.visit('')
      cy.get('ngx-earning-card').find('nb-card-front')
        .within(() => {
          cy.get('nb-icon[icon="chevron-right-outline"]').click()
        })
    })

    it('Should be visible', () => {
      cy.get('ngx-earning-card').find('nb-card-back').find('nb-card')
        .should('be.visible')
      cy.get('ngx-earning-card').find('nb-card-back').find('canvas')
        .should('be.visible')
      cy.get('ngx-earning-card').find('nb-card-back').find('.chart-info')
        .should('be.visible')
      cy.get('ngx-earning-card').find('nb-card-back').find('.chart-info')
        .should('have.length', 1)
      cy.get('ngx-earning-card').find('nb-card-back').find('.chart-info').find('.caption')
        .should('have.length', 1)
        .should('have.text', 'Last week:')
        .should('be.visible')

    })

    it('Should flip chart when clicked', () => {
      cy.get('ngx-earning-card').find('nb-card-back')
        .within(() => {
          cy.get('nb-icon[icon="chevron-right-outline"]').click()
        })
      cy.get('ngx-earning-card').find('nb-flip-card').should('not.have.class', 'flipped')
    })
  })

  context('E-Commerce Charts Group', () => {
    before(() => {
      cy.visit('')
    })

    it('Should Exist', () => {
      cy.get('ngx-ecommerce-charts').find('nb-card').as('chart')
        .should('be.visible')
        .should('have.length', 1)

      cy.get('@chart').find('ul.tabset').as('header-option')
        .should('be.visible')
        .should('have.length', 1)

      cy.get('@header-option').find('li')
        .should('have.length', 2)

      cy.get('@header-option').find('li')
        .contains('ORDERS', { matchCase: false })

      cy.get('@header-option').find('li')
        .contains('PROFIT', { matchCase: false })

      cy.get('@chart').find('nb-tab')
        .should('have.length', 2)

      cy.get('@chart').find('nb-tab.content-active').as('chart-content')
        .should('be.visible')
        .should('have.length', 1)

      cy.get('@chart-content').find('.summary-container').as('summary')
        .should('be.visible')
        .should('have.length', 1)

      cy.get('@summary').contains('marketplace', { matchCase: false })
      cy.get('@summary').contains('Last Month', { matchCase: false })
      cy.get('@summary').contains('Last Week', { matchCase: false })
      cy.get('@summary').contains('Today', { matchCase: false })

      cy.get('@header-option').contains('orders', { matchCase: false })
        .parent('li').should('have.class', 'active')

      cy.get('@header-option').contains('profit', { matchCase: false })
        .parent('li').should('not.have.class', 'active')

      cy.get('nb-select').should('be.visible')

    })

    it('Should be interactive', () => {
      cy.get('ngx-ecommerce-charts').find('nb-card').as('chart')
      cy.get('@chart').find('ul.tabset').as('header-option')

      cy.get('@header-option').contains('profit', { matchCase: false }).as('profit-button')
        .click()

      cy.get('@profit-button').parent('li')
        .should('have.class', 'active')

      cy.get('@header-option').contains('orders', { matchCase: false })
        .parent('li').should('not.have.class', 'active')

      cy.get('@chart')
        .find('nb-tab.content-active')
        .find('ngx-chart-panel-header')
        .find('nb-select').as('time-button')
        .click()

      cy.get('.cdk-overlay-container').find('nb-option-list').as('chart-options')
        .should('be.visible')

      cy.get('@chart-options').find('nb-option')
        .should('have.length', 3)

      cy.get('@chart-options').contains('month').click()
      cy.wait(600)

      cy.get('@time-button').click()
      cy.get('@chart-options').contains('year').click()

      cy.wait(500)
      cy.get('ngx-profit-chart').find('.echart').find('div').eq(1)
        .should('not.be.visible')

      cy.get('ngx-profit-chart').trigger('mousemove', 100, 100)
      cy.wait(500)
      cy.get('ngx-profit-chart').find('.echart').find('div').eq(1).find('span')
        .should('be.visible')

      cy.get('ngx-profit-chart').trigger('mousemove', 250, 100)
      cy.wait(500)
      cy.get('ngx-profit-chart').trigger('mousemove', 370, 100)
      cy.wait(500)
      cy.get('ngx-profit-chart').trigger('mousemove', 510, 100)
      cy.wait(500)

      cy.get('@header-option').contains('orders', { matchCase: false }).click()
      cy.wait(500)

      cy.get('@chart')
        .find('nb-tab.content-active')
        .find('ngx-chart-panel-header')
        .find('nb-select').as('time-button2')
        .click()
      cy.get('@chart-options').contains('month').click()

      cy.wait(500)
      cy.get('@time-button2').click()
      cy.get('@chart-options').contains('week').click()

    })
  })

  context('Country Order Statistics', () => {
    before(() => {
      cy.visit('')
      cy.get('ngx-country-orders').scrollIntoView({ duration: 500, offset: { top: -100 } })
    })

    it('Should be Visible', () => {
      cy.get('ngx-country-orders').find('nb-card').as('card')
        .should('be.visible')

      cy.get('@card').find('ngx-country-orders-map').as('map')
        .should('be.visible')

      cy.get('@card').find('ngx-country-orders-chart').as('map-data')
        .should('be.visible')
    })

    it('Should be interactive', () => {
      // get all aliases required
      cy.get('ngx-country-orders').find('nb-card').as('card')
        .should('be.visible')
      cy.get('@card').find('ngx-country-orders-map').as('map')
        .should('be.visible')
      cy.get('@card').find('ngx-country-orders-chart').as('map-data')
        .should('be.visible')

      //click different areas in the map
      cy.get('@map').click().type('++---', { delay: 500 })
      cy.get('@map').click(45, 30)
      cy.wait(300)
      cy.get('@map').click(65, 320)
      cy.wait(300)

      cy.get('@map').find('.leaflet-container')
        .trigger('mousedown', 200, 200)
        .trigger('mouseover', 490, 200)
        .trigger('mouseup')
    })
  })

  context('Visitor Analytics', () => {

    before(() => {
      cy.visit('')
      cy.get('ngx-ecommerce-visitors-analytics').scrollIntoView({ duration: 500, offset: { top: -100 } })
    })

    it('should be visible', () => {
      cy.get('ngx-ecommerce-visitors-analytics').as('card')
        .should('be.visible')

      cy.get('@card').contains('visitors analytics', { matchCase: false })
      cy.get('@card').contains('New Visitors', { matchCase: false })

      cy.get('@card').find('.chart-container')
        .should('be.visible')

      cy.get('@card').find('nb-icon').click()
      cy.wait(300)
      cy.get('@card').find('ngx-visitors-statistics')
        .should('not.be.visible')
      cy.get('@card').find('nb-card-body').as('chart')
        .trigger('mousemove', 40, 150)
        .trigger('mousemove', 90, 150)
        .trigger('mousemove', 100, 150)
        .trigger('mousemove', 130, 150)
        .trigger('mousemove', 200, 150)
        .trigger('mousemove', 280, 150)
        .trigger('mousemove', 300, 150)
        .trigger('mousemove', 380, 150)
        .trigger('mousemove', 420, 150)
        .trigger('mousemove', 550, 150)
        .trigger('mousemove', 590, 150)
        .trigger('mousemove', 650, 150)

      cy.get('ngx-stats-card-front').scrollIntoView({ duration: 600, offset: { top: -100 } })
    })
  })

  context('Theme Button', () => {
    before(() => {
      cy.visit('')
    })

    it('Should be Visible', () => {
      cy.get('ngx-header').find('nb-select').as('theme-button')
        .should('be.visible')
    })

    it('Should change theme', () => {
      cy.get('ngx-header').find('nb-select').as('theme-button')

      cy.get('@theme-button').click()
      cy.get('.cdk-overlay-container').find('nb-option').as('theme-option')
        .should('be.visible')
        .should('have.length.greaterThan', 1)

      cy.get('@theme-option').contains('light', { matchCase: false }).click()
      cy.get('nb-layout').should('have.css', 'background-color', 'rgb(237, 241, 247)')

      cy.wait(1000)

      cy.get('@theme-button').click()
      cy.get('@theme-option').contains('dark', { matchCase: false }).click()
      cy.get('nb-layout').should('have.css', 'background-color', 'rgb(21, 26, 48)')
    })
  })

  context('Time Based Theme Change', () => {

    const evening = Cypress.moment('21:30', 'h:mm').valueOf();
    const morning = Cypress.moment('07:30', 'h:mm').valueOf();

    beforeEach(() => {
    })

    it('should be light themed during the day time', () => {
      cy.clock(morning, ['Date'])
      cy.visit('')
      console.log(Date)
      cy.get('nb-layout').should('have.css', 'background-color', 'rgb(237, 241, 247)')
    })

    it('should be dark themed during the day time', () => {
      cy.clock(evening, ['Date'])
      cy.visit('')
      console.log(Date)
      cy.get('nb-layout').should('have.css', 'background-color', 'rgb(21, 26, 48)')
    })
  })
})
