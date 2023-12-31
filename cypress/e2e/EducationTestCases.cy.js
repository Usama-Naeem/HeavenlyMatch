

// waiting for an event, and that event here is uncaught:exception
Cypress.on('uncaught:exception', (err, runnable) =>{
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  
  describe('Education', function(){
  
    it('Education', () => {
    
          //Logging through OPT using custom command
          cy.loginWithOTP();
          
          //Click on Candidate Management Button
          cy.contains('Candidate Management').click({force:true})

          //Click on candidates tab
          cy.get('#rc-tabs-0-tab-candidates').click({force:true})
      
          //View Candidate using custom command
          cy.viewCandidate();

          cy.wait(5000)

          //Click on Education
          cy.contains('Education').click({force:true})
      
          //Click on edit button
          cy.get('#candidateEditSaveButtons > .ant-btn').click({force:true})
           
          //Degree
          cy.get('#education')
          .click({force:true})
          .get('[title="Associate Degree"] > .ant-select-item-option-content')
          .click({force:true})

          //Field of Study
          cy.get('#fieldOfStudy')
          .clear().type('Software Engineering')

          //School
          cy.get('#schoolName')
          .clear().type('BNU')

          //Clearing the Date
          cy.get('.ant-picker-clear > .anticon > svg').click({force:true})

          //Select Date element
          cy.get('.ant-picker-input > input').click({force:true})

          //Select Year
          cy.get('.ant-picker-year-btn').click()
          cy.xpath("//div[normalize-space()='2020']").click({force:true})

          //Select Month
          cy.get('.ant-picker-month-btn')

          //Select Date
          cy.xpath("//div[normalize-space()='13']").click({force:true})
          
          //Click on Save Button
          cy.get('#candidateEditSaveButtons > .ant-btn').click({force:true})

          //Assertion
          cy.get('.ant-message-custom-content > :nth-child(2)')
          .should('have.text','User details are successfully updated' )
       
  })
  })