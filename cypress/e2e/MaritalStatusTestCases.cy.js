

// waiting for an event, and that event here is uncaught:exception
Cypress.on('uncaught:exception', (err, runnable) =>{
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  
  describe('Marital Status Feature', function(){
  
    it('Marital Status', () => {
    
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
          cy.contains('Marital Status').click({force:true})
      
          //Click on edit button
          cy.get('.justify-between > #candidateEditSaveButtons > .ant-btn').click({force:true})
           
          //Selecting 'Marital Status'
          cy.get('#maritalStatus').click({force:true})
          cy.get("[title='Never Married'] .ant-select-item-option-content").click({force:true})

          //Click on save Button
          cy.get('.justify-between > #candidateEditSaveButtons > .ant-btn').click({force:true})

          //Assertion
        //   cy.get('.ant-message-custom-content > :nth-child(2)')
        //   .should('have.text','User details are successfully updated' )
       
  })
  })