
// waiting for an event, and that event here is uncaught:exception
Cypress.on('uncaught:exception', (err, runnable) =>{
  // returning false here prevents Cypress from
  // failing the test
  return false
})

describe('Work', function(){

  it('Work', () => {
  
        //Logging through OPT using custom command 
        cy.loginWithOTP();
        
        //Click on Candidate Management Button
        cy.contains('Candidate Management').click({force:true})

        //Click on candidates tab
        cy.get('#rc-tabs-0-tab-candidates').click({force:true})
    
        //View Candidate using custom command
        cy.viewCandidate();

        cy.wait(5000)

        //Click on Work
        cy.contains('Work').click({force:true})
    
        //Click on edit button
        cy.get('.justify-between > #candidateEditSaveButtons > .ant-btn').click({force:true})
         
        //Check Radio Button to 'Yes'
        cy.get(':nth-child(1) > .ant-radio > .ant-radio-input').check()
        
        //What do you do 
        cy.get('#occupation').clear().type('Engineer')
        
        //Check Radio Button
        cy.get('.ant-radio-group input[type="radio"][value="true"]').check();

        //How often you Travel
        cy.get('#travelForWork').click({force:true})
        cy.contains('Weekly').click({force:true})
        
        //Click on save Button
        cy.get('.justify-between > #candidateEditSaveButtons > .ant-btn').click({force:true})

        //Assertion
         cy.get('.ant-message-custom-content > :nth-child(2)')
         .should('have.text','User details are successfully updated' )
     
})
})