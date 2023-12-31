
// waiting for an event, and that event here is uncaught:exception
Cypress.on('uncaught:exception', (err, runnable) =>{
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  // import { faker } from '@faker-js/faker';

  describe('Invite Team Member Feature', function(){
  
    it('Invite Team Member', () => {
    
          //Logging through OPT using custom command
          cy.loginWithOTP();      
          
          //Clicking on Team Management menu option
          cy.contains('Team Management').click()
          
          //Clicking on Invite Member Button
          cy.get('.ant-btn > :nth-child(2)').click()
      
          cy.get('#firstName').clear().type('Awais')
            .get('#lastName').clear().type('Khalid')
            .get('#phoneNumber').clear().type('+11111111111')
            .get('#email').clear().type('awais.khalid@emerald-labs.com')
            .get('#role').click()
      
          //Getting value from Role dropdown
          cy.get('[title=Admin]').click({force: true})
      
          //Clicking on 'Send Invite' Button
          cy.get('.ant-form-item-control-input-content > .ant-btn > span').click()
    
  })
  })