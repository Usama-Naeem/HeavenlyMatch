

// waiting for an event, and that event here is uncaught:exception
Cypress.on('uncaught:exception', (err, runnable) =>{
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  
  describe('Life Style Feature', function(){
  
    it('Life Style', () => {
    
          //Logging through OPT using custom command
          cy.loginWithOTP()
          
          //Click on Candidate Management Button
          cy.contains('Candidate Management').click({force:true})

          //Click on candidates tab
          cy.get('#rc-tabs-0-tab-candidates').click({force:true})
      
          //View Candidate using custom command
          cy.viewCandidate();

          cy.wait(5000)

          //Click on Life Style
          cy.contains('Life Style').click({force:true})
      
          //Click on edit button
          cy.get('.justify-between > #candidateEditSaveButtons > .ant-btn').click({force:true})
           
          //Hangout
          cy.get('#hangoutFriends').click({force:true}) 
          
          cy.get('#hangoutFriends').type('Sometimes').type('{Enter}')
          
          //Cooking
          cy.get('#doCooking').click({force:true})
        
          cy.get('#doCooking').type('Rarely').type('{Enter}')
        
          //Tv
          cy.get('#watchingTv').click({force:true})
          
          cy.get('#watchingTv').type('Daily').type('{Enter}')
        
          //Video Games
          cy.get('#playVideoGames').click({force:true})
        
          cy.get('#playVideoGames').type('Rarely').type('{Enter}')
        
          //Sports
          cy.get('#exercise').click({force:true})
          
          cy.get('#exercise').type('Rarely').type('{Enter}')
         
          //Smoking
          cy.get('#smoking').click({force:true})
        
          cy.get('#smoking').type('Yes').type('{Enter}')
       
          //Click on save Button
           cy.get('.justify-between > #candidateEditSaveButtons > .ant-btn').click({force:true})

          //Assertion
          //  cy.get('.ant-message-custom-content > :nth-child(2)')
          //  .should('have.text','User details are successfully updated' )
       
  })
  })