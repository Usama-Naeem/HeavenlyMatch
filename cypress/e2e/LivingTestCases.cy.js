


// waiting for an event, and that event here is uncaught:exception
Cypress.on('uncaught:exception', (err, runnable) =>{
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  
  describe('Living Feature', function(){
  
    it('Living', () => {
    
          //Logging through OPT using custom command
          cy.loginWithOTP();
          
          //Click on Candidate Management Button
          cy.contains('Candidate Management').click({force:true})

          //Click on candidates tab
          cy.get('#rc-tabs-0-tab-candidates').click({force:true})
      
          //View Candidate using custom command
          cy.viewCandidate();

          cy.wait(5000)

          //Click on Living
          cy.contains('Living').click({force:true})
      
          //Click on edit button
          cy.get('.justify-between > #candidateEditSaveButtons > .ant-btn').click({force:true})
           
          //Living with
          cy.get('#livingWith').click({force:true}) 
          .get('[title="Parents"] > .ant-select-item-option-content').click({force:true})

          //Relocate-Check radio button to 'No'
          cy.get(':nth-child(1) > .flex > .ant-radio-group > :nth-child(2) > .ant-radio > .ant-radio-input').click({force:true})
          
          //Dependents-Check radio button to 'No'
          cy.get('.mt-2 > .flex-col > .ant-radio-group > :nth-child(1) > .ant-radio > .ant-radio-input').click({force:true})
          
          //dependents count 
          cy.get('#noDependent')
          .clear().type('4')

          //Click on save Button
          cy.get('.justify-between > #candidateEditSaveButtons > .ant-btn').click({force:true})

          //Assertion
           cy.get('.ant-message-custom-content > :nth-child(2)')
           .should('have.text','User details are successfully updated' )
       
  })
  })