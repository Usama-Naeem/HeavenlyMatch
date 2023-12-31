// waiting for an event, and that event here is uncaught:exception
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('Family', function () {
  it('Family', () => {
    //Logging through OPT using custom command
    cy.loginWithOTP();

    //Click on Candidate Management Button
    cy.contains('Candidate Management').click({ force: true });

    //Click on candidates tab
    cy.get('#rc-tabs-0-tab-candidates').click({ force: true });

    //View Candidate using custom command
    cy.viewCandidate();

    cy.wait(5000)
    
    //Click on Family
    cy.contains('Family').click({ force: true })

    //Click on edit button
    cy.get('#candidateEditSaveButtons > .ant-btn').click({ force: true })

    //Father Name
    cy.get('#fatherName').clear().type('Muhammad Khalid')

    //Mother Name
    cy.get('#motherName').clear().type('Fatima')

    //Check siblings to 'Yes'
    cy.get('.mt-2 > .flex > .ant-radio-group > :nth-child(1) > .ant-radio > .ant-radio-input').click({ force: true })

    //Siblings Information, Brothers/Sisters
    cy.get('#brothersCount')
      .click({ force: true })
      .type('{downarrow}{downarrow}{enter}')

    cy.get('#sistersCount')
      .click({ force: true })
      .type('{downarrow}{downarrow}{downarrow}{downarrow}{enter}')

    //Check radio button
    cy.get('input[type="radio"][value="true"]').first().click({ force: true })

    //Click on save Button
    cy.get('.justify-between > #candidateEditSaveButtons > .ant-btn').click({force: true})

    //Assertion
    cy.get('.ant-message-custom-content > :nth-child(2)')
      .should('have.text','User details are successfully updated')
  });
});
