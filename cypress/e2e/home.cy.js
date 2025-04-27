/// <reference types="cypress" />
/* eslint-disable no-undef */

describe('App', () => {
  it('loads the home page', () => {
    cy.visit('http://localhost:3001');

    cy.contains('Car Dealer List').should('exist');
    cy.contains('Select a City').should('exist');
    cy.contains('Sort by').should('exist');
    cy.contains('Rating :').should('exist');
    cy.contains('Filtered result').should('exist')


  
    cy.get('[data-cy="switch-theme"]').click(); // Change theme
    cy.wait(2500)

    // Search by car name
    cy.get('[data-cy="search-input"]').type("Mazda")
    cy.wait(2500)
    cy.get('[data-cy="car-title"]').should("contain", "Mazda")

    // Select City
    cy.contains('Select a City').click();
    cy.wait(2500)
    cy.get('[data-cy="city-option"]').first().click();

    // Select Sort by
    cy.contains('Sort by').click();
    cy.wait(2500)
    cy.get('[data-cy="sort-by-option"]').first().click();
    // Select Order
    cy.contains('ASC').first().click();
    cy.wait(2500)
    cy.contains('DESC').first().click();
    cy.wait(2500)

    // Set Rating
    cy.get('#rating-score')
    .invoke('val', 1)
    .trigger('input')
    .trigger('change');  
    cy.wait(2500)


  });

});
