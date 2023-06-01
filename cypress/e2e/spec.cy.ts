import "cypress-localstorage-commands";

describe('burger constructor works correctly', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/').request('POST', `https://norma.nomoreparties.space/api/auth/login`, {
      email: "testtesttestteststtstststst@test.test",
      password: "12345678",
    }).then((response) => {
      cy.window().then(win => win.localStorage.setItem('accessToken', response.body.accessToken.split('Bearer ')[1]))
  })})

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
    const dataTransfer = new DataTransfer();
    cy
        .contains('булка')
        .first()
        .trigger('dragstart', {dataTransfer})
    cy
        .get('#drop-target')
        .trigger('drop', {dataTransfer})
    cy
        .get('#drop-target').contains('булка')
  })

  it('should make order', () => {
    const dataTransfer = new DataTransfer();
    cy
        .contains('булка')
        .first()
        .trigger('dragstart', {dataTransfer})
    cy
        .get('#drop-target')
        .trigger('drop', {dataTransfer})
    cy
        .get('#drop-target').contains('булка')
    cy
        .contains('Оформить заказ').click()
  })




})