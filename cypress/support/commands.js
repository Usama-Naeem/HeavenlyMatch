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
/// <reference types = "cypress"/>

//Custom command for logging in with OTP 
Cypress.Commands.add('loginWithOTP', () => {
    cy.visit('https://staging.d1zuvcn685ymz3.amplifyapp.com/');
  
    cy.get('input[placeholder="Email"]').type('awais.khalid+2@emerald-labs.com');
    cy.get('input[placeholder="Password"]').type('awais123');
    cy.get('button[type="Submit"]').click({force:true});
  
    const otpList = ['9', '6', '4', '3', '0', '1'];
  
    otpList.forEach((otp, index) => {
      cy.get(`[name="number-${index + 1}"]`).type(otp);
    });
  
    cy.get('.ant-btn > span').contains('Verify OTP').click({ force: true });
  });
  

//Custom Command for View Candidate
// Cypress.Commands.add("viewCandidate", (candidateName) => {
//     cy.get(".ant-table-container tbody tr")
//       .should("have.length.gt", 0) // Check if table rows exist
//       .then(($rowsArray) => {
//         const row = Array.from($rowsArray).find((row) =>
//           Cypress.$(row).find(".ant-typography").text().includes(candidateName)
//         );
        
//         if (row) {
//           cy.wrap(row).find(".ant-typography").click();
//         } else {
//           cy.wait(2000); 
//           cy.viewCandidate(candidateName); // will retry recursively
//         }
//       });
//   });

Cypress.Commands.add("viewCandidate", (candidateName) => {
  cy.get(".ant-table-container tbody tr")
    .should("have.length.gt", 0) // Check if table rows exist
    .then(($rowsArray) => {
      const row = Array.from($rowsArray).find((row) =>
        Cypress.$(row).find(".ant-typography").text().includes(candidateName)
      );

      if (row) {
        cy.wrap(row).find(".ant-typography").click();
      } else {
        cy.wait(2000);
        cy.viewCandidate("donaven"); // Updated candidate name
      }
    });
});

  

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
