// waiting for an event, and that event here is uncaught:exception
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('Invite Candidate Feature', function () {
  it('Invite Candidate', () => {
    //Logging through OPT using custom command
    cy.loginWithOTP();

    //Click on Candidate Management Button
    cy.contains('Candidate Management')
      .click({ force: true })

      //Click on Invite Candidate button
      .get('.ant-btn > :nth-child(2)')
      .click({ force: true })

      .get('[placeholder="Enter email addresses to invite users"]')
      .type('awais.khalid+2@emerald.com')

      //Click on Invite Button
      cy.get('.ant-modal-body > .ant-btn')
      .click({ force: true })

      .get('[placeholder="Enter email addresses to invite users"]')
      .type('awais.khalid+2@emerald.com')

      //Click on Invite Button
      cy.get('.ant-modal-body > .ant-btn')
      .click({ force: true })

  });
});
