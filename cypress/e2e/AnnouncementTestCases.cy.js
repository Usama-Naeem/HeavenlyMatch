



// waiting for an event, and that event here is uncaught:exception
Cypress.on('uncaught:exception', (err, runnable) =>{
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  
  describe('Announcement Feature', function(){
  
    it('View Announcement',() => {

          //Logging through OPT using custom command
          cy.loginWithOTP();      
          
          //Click on Candidate Management Button
          cy.contains('Announcement').click()
          
          //View Announcement
          cy.get('a').eq(7).click({force:true})

          //Assertion for title i.e. Announcement
          cy.get('.ant-modal-title')
          .should('have.text','Announcement')

          //Closing announcement modal
          cy.get('.ant-modal-close').click({force:true})

          //Creating new announcement
          
          //click on new announcement button
          cy.get('.ant-btn > :nth-child(2)').click()

          //Check Boxes
          cy.get('.ant-checkbox-input').eq(0).check();
          cy.get('.ant-checkbox-input').eq(2).check();
          cy.get('.ant-checkbox-input').eq(3).check();
          
          //announcement text
          cy.get('#announcementsText').clear().type('This is an announcement text for testing')

          //Click on publish button
          cy.get('.ant-form-item-control-input-content > .ant-btn').click()

          //Assertion for confirmation
          cy.get('.ant-message-custom-content > :nth-child(2)')
          .should('have.text', 'Annoucement created successfully')
            
  })
  })