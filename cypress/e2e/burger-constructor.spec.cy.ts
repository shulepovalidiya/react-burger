// @ts-ignore
describe('burger constructor works correctly', () => {

  beforeEach(() => cy.visit('http://localhost:3000/'))

  it('should check if submit button is disabled without buns in constructor', () => {
    cy
        .get('button')
        .contains('Оформить заказ')
        .should('be.disabled')
  })

  it('should check if ingredient modal works correctly', () => {
    cy
        .get('figure')
        .contains('Краторная булка N-200i')
        .click()
    cy
        .get('h2')
        .contains('Краторная булка N-200i')
    cy
        .get('svg').first().click({force: true})
  })

  it('should drag bun to constructor', () => {
    cy
        .contains('булка')
        .first()
        .trigger('mousedown')
        .trigger('dragstart')
    cy
        .get('#drop-target')
        .trigger('drop')
    cy
        .get('#drop-target').contains('булка')
  })

  it('should make order', () => {
    cy.contains('Личный кабинет').click()
    cy.get('input[name=email]').type('testtesttestteststtstststst@test.test')
    cy.get('input[name=password]').type('12345678')
    cy.get('button').should('have.text', 'Войти').click().wait(1000)

    cy
        .contains('булка')
        .first()
        .trigger('mousedown')
        .trigger('dragstart')
    cy
        .get('#drop-target')
        .trigger('drop')
    cy
        .get('#drop-target').contains('булка')

    cy.contains('Оформить заказ').click().wait(15000)
    cy.contains('идентификатор заказа')
  })
})