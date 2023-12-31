// waiting for an event, and that event here is uncaught:exception
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('Personality and Interests Feature', function () {
  it('Personality and Interests', () => {
    //Logging through OPT using custom command
    cy.loginWithOTP();

    //Click on Candidate Management Button
    cy.contains('Candidate Management').click({ force: true });

    //Click on candidates tab
    cy.get('#rc-tabs-0-tab-candidates').click({ force: true });

    //View Candidate using custom command
    cy.viewCandidate();

    cy.wait(5000)

    //Click on Personality and Interests
    cy.contains('Personality and Interests').click({ force: true });

    //Click on edit button
    cy.get('.justify-between > #candidateEditSaveButtons > .ant-btn').click({
      force: true,
    });

    //Closing the selected interests

    // cy.get('span[aria-label="close"]').each(($el, index) => {
    //      cy.wrap($el).as(`closeButton${index}`).should('be.visible');
    //    });

    //   cy.get('@closeButton0').click({ force: true });
    //   cy.get('@closeButton0').click({ force: true });
    //   cy.get('@closeButton0').click({ force: true });

    //Selecting 'interests'
    cy.get(
      ':nth-child(2) > .ant-select > .ant-select-selector > .ant-select-selection-item'
    ).click({ force: true });

    cy.get('.ant-select-item.ant-select-item-option').each(($el) => {
      if ($el.text().includes('Gaming')) {
        cy.wrap($el).click({ force: true });
      } else if ($el.text().includes('TV')) {
        cy.wrap($el).click({ force: true });
      } else if ($el.text().includes('Cycling')) {
        cy.wrap($el).click({ force: true });
      } else if ($el.text().includes('testingual')) {
        cy.wrap($el).click({ force: true });
      }
    });

    //Click on save Button
    cy.get('.justify-between > #candidateEditSaveButtons > .ant-btn').click({
      force: true,
    });

    //Assertion
    //   cy.get('.ant-message-custom-content > :nth-child(2)')
    //   .should('have.text','User details are successfully updated' )
  });
});
