


// waiting for an event, and that event here is uncaught:exception
Cypress.on('uncaught:exception', (err, runnable) =>{
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  
  describe('Religion Feature', function(){
  
    it('Religion', () => {
    
          //Logging through OPT using custom command
          cy.loginWithOTP();
          
          //Click on Candidate Management Button
          cy.contains('Candidate Management').click({force:true})
      
          //Click on candidates tab
          cy.get('#rc-tabs-0-tab-candidates').click({force:true})

          //View Candidate using custom command
          cy.viewCandidate();

          cy.wait(5000)

          //Click on Religion
          cy.contains('Religion').click({force:true})
      
          //Click on edit button
          cy.get('.justify-between > #candidateEditSaveButtons > .ant-btn').click({force:true})
           
          //Sect
          cy.get('#sect').click({force:true}) 
          .get('[title="Sunni"] > .ant-select-item-option-content').click({force:true})

          //Pray
          cy.get('#pray').click({force:true})
          .get('[title="Daily"] > .ant-select-item-option-content').click({force:true})
          
          //Mosque
          cy.get('#gotoMosque').click({force:true})
          .get('[title="Every Program"] > .ant-select-item-option-content').click({force:true})
          
          //Beard
          cy.get(':nth-child(1) > .ant-radio-group > :nth-child(2) > .ant-radio > .ant-radio-input').click({force:true})

          //Hajj
          cy.get(':nth-child(2) > .ant-radio-group > :nth-child(2) > .ant-radio > .ant-radio-input').click({force:true})

          //Click on save Button
          cy.get('.justify-between > #candidateEditSaveButtons > .ant-btn').click({force:true})

          //Assertion
        //    cy.get('.ant-message-custom-content > :nth-child(2)')
        //    .should('have.text','User details are successfully updated' )
       
  })
  })