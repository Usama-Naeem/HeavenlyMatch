
// waiting for an event, and that event here is uncaught:exception
Cypress.on('uncaught:exception', (err, runnable) =>{
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  
  describe('View Candidate Feature', function(){
  
    it('View Candidate',() => {
    
          //Logging through OPT using custom command
          cy.loginWithOTP();
      
          //Click on Candidate Management Button
          cy.contains('Candidate Management').click({force:true})

          //Click on candidates tab
          cy.get('#rc-tabs-0-tab-candidates').click({force:true})
      
         //View Candidate using custom command
         cy.viewCandidate();
          
      
        })
      
      
    
  })
  