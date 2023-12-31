// // waiting for an event, and that event here is uncaught:exception
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('About me page after clicking on View button against a candidate', function () {
  it('About Me', () => {
    
    //Logging through OPT using custom command
    cy.loginWithOTP();

    //Click on Candidate Management Button
    cy.contains('Candidate Management').click({ force: true })

    //Click on candidates tab
    cy.get('#rc-tabs-0-tab-candidates').click({ force: true })

    //View Candidate using custom command
    cy.viewCandidate();
    
    //Click on Edit button
    cy.get('#candidateEditSaveButtons > .ant-btn').click({ force: true })

    //Editting all the given fields after clicking edit button

    //First Name
    cy.get('#firstName').clear().type('Leonardo')

    //Middle Name
    cy.get('#middleName').clear().type('De')

    //Last Name
    cy.get('#lastName').clear().type('Caprio')
    
    //Display Name
    cy.get('#displayName').clear().type('Leo')
    
    //Birthday
    //Clearing the Date
    cy.get('.ant-picker-clear > .anticon > svg').click({force:true})

    //Select Date element
    cy.get('.ant-picker-input > input').click({force:true})

    //Select Year
    cy.get('.ant-picker-year-btn').click({force:true})
    cy.get('.ant-picker-super-prev-icon').click({force:true})
    cy.get('.ant-picker-super-prev-icon').click({force:true})
    cy.xpath("//div[normalize-space()='2000']").click({force:true})

    //Select Month
    cy.get('.ant-picker-cell-inner').contains('Jan').click({force:true})
    
    //Select Date
    cy.xpath("//div[normalize-space()='13']").click({force:true})

    //Gender
    cy.get(':nth-child(1) > .ant-radio > .ant-radio-input').check()
    
    //Ethnicity
    cy.get('#ethnicity').click({ force: true });

    cy.get('#ethnicity')
      .invoke('removeAttr', 'disabled')
      .type('Afghani{enter}', { force: true });

    //Country of Birth
    cy.get("#react-select-2-input").click({force:true});
    cy.contains('Afghanistan').click({force:true});
    
    //Country of Residence
    cy.get('#react-select-3-input').click({ force: true })
    cy.contains('United States').click({ force: true })
    
    //State of Residence
    cy.get('#react-select-4-input').click({force:true})

    cy.contains('Alaska').click({force:true});

    //City of Residence
    cy.get('#react-select-5-input').click({ force: true })
    cy.contains('Akutan').click({ force: true })

    //Visa Status
    cy.get('#visaStatus').click({ force: true })
      .get('#visaStatus')
      .invoke('removeAttr', 'disabled')
      .type('US Citizen', { force: true });

    //Height- Feet & Inches
    cy.get('#feet').click({ force: true })
      .get('#feet').type('5', { force: true })

    cy.get('#inch').click({ force: true })
      .get('#inch').type('10', { force: true })

    //Phone Number
    cy.get('#phoneContact').clear({ force: true }).type('+11111111111')

    //Saving Information by clicking on 'Save' button
    cy.get('.justify-between > #candidateEditSaveButtons > .ant-btn').click({force: true})

    //Assertion
    cy.get('.ant-message-custom-content > :nth-child(2)')
    .should('have.text','User details are successfully updated')
  });
});
