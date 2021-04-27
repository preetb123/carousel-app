describe('carousel app workflow', () => {
  beforeEach(() => {
    cy.intercept("/api/images", { fixture: "images.json" }).as('images')
    cy.visit('/')
    cy.get('div').contains('Loading...');
    cy.wait('@images')
  });

  it('should display welcome message', () => {
    cy.get('h1').contains('Welcome to Carousel App!');
  });

  it('previous button is disabled initially', () => {
    cy.get('.button').contains('Previous').should('be.disabled')
  });

  it('next button should be disabled when end is reached', () => {
    cy.get('.button').contains('Next').click()
    cy.get('.button').contains('Next').click()
    cy.get('.button').contains('Previous').should('not.be.disabled')
    cy.get('.button').contains('Next').should('be.disabled')
  });
});
