/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('uploadEnrollmentPicture', () => {
  cy.findByTestId('picture-file-upload').selectFile(
    {
      contents: Cypress.Buffer.from('fake image content'),
      fileName: 'student.jpg',
      mimeType: 'image/jpeg',
    },
    { force: true }
  );
});

Cypress.Commands.add('uploadEnrollmentFile', () => {
  cy.findByTestId('pdf-file-upload').selectFile(
    {
      contents: Cypress.Buffer.from('fake pdf content'),
      fileName: 'documents.pdf',
      mimeType: 'application/pdf',
    },
    { force: true }
  );
});

// ***********************************************
// This example commands.ts shows you how to
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
//
declare global {
  namespace Cypress {
    interface Chainable {
      uploadEnrollmentPicture(): Chainable<void>;
      uploadEnrollmentFile(): Chainable<void>;
    }
  }
}
