// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "@testing-library/cypress/add-commands";

declare global {
	namespace Cypress {
		interface Chainable {
			/**
			 * logs in with a random user. Yields the email and adds an alias to the email
			 *
			 * @returns {typeof login}
			 * @memberof Chainable
			 * @example
			 *    cy.login().then(user => ...)
			 */
		}
	}
}

/*
eslint
  @typescript-eslint/no-namespace: "off",
*/
