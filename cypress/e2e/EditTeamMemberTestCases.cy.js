
// waiting for an event, and that event here is uncaught:exception
Cypress.on('uncaught:exception', (err, runnable) =>{
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  
  describe('Edit Team Member Feature', function(){
  
    it('Edit Team Member',() => {
    
            //Logging through OPT using custom command
            cy.loginWithOTP();

            //Clicking on Team Management menu option
            cy.contains('Team Management').click({force:true})

            //Clicking on Edit Team Member Button
            cy.get(".ant-table-tbody").get('p')
            .eq('1').click({force:true})
            
            //Editting Fields after clicking 'Edit' button
            
            //First name Field
            cy.get('#firstName').clear().type('Khalid')
            
            //Last name Field
            cy.get('#lastName').clear().type('Awais')

            //Role Field
            .get('[title="Role"] > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-item').click()
            .get('.ant-select-item-option-content').contains('Volunteer').click({force:true})
            
            //Status Field
            .get('[title="Status"] > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-item').click()
            .get('.ant-select-item-option-content').contains('Archive').click({force:true})

            //Confirmation
            .get('#actionButtons > :nth-child(1)').click({force:true})
            .get('.ant-popconfirm-buttons > :nth-child(2) > span').click({force:true})
            
      })
    })    
  