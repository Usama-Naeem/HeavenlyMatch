

// waiting for an event, and that event here is uncaught:exception
Cypress.on('uncaught:exception', (err, runnable) =>{
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  
  describe('My Profile Feature', function(){
  
    it('Profile Settings', () => {
    
          //Logging through OPT using custom command
          cy.loginWithOTP();
                
          //Click on Candidate Management Button
          cy.contains('My Profile').click()
          
          //Click on edit button
          cy.get('#candidateEditSaveButtons > .ant-btn').click()

          //First Name
          cy.get(':nth-child(1) > :nth-child(1) > .ant-input').clear().type('Awais')
          
          //Last Name
          cy.get(':nth-child(1) > :nth-child(2) > .ant-input').clear().type('Khalid')
          
          // //User Name
          // cy.get(':nth-child(2) > :nth-child(1) > .ant-input').clear().type('BilalAshraf')

          //Phone Number
          cy.get(':nth-child(2) > .flex > .ant-input').clear().type('+12356987455')

          //Click on save button
          cy.get('#candidateEditSaveButtons > .ant-btn').click({force:true})

          //Assertion
        //   cy.get('.ant-message-custom-content ant-message-success')
        //   .should('have.text', "User details are successfully updated")
            
  })

  it('Change Password', () => {

          
           //Logging through OPT using custom command
          cy.loginWithOTP();
                
          //Click on Candidate Management Button
          cy.contains('My Profile').click()
          
          //Change Password
          cy.get('.mt-10 > .flex > div').click({force:true})

          //Enter old password
          cy.get(':nth-child(1) > .ant-input-affix-wrapper > .ant-input').clear().type('awais123')

          //Enter new password
          cy.get(':nth-child(2) > .ant-input-affix-wrapper > .ant-input').clear().type('awais123')

          //Re-Enter Password
          cy.get(':nth-child(3) > .ant-input-affix-wrapper > .ant-input').clear().type('awais123')

          //Click on save password button
          cy.get('.self-center.mt-2 > .ant-btn').click({force:true})
          cy.get('.ant-message-custom-content > :nth-child(2)').should('have.text', 'Your password is successfully changed')

    
  })

  })