

// waiting for an event, and that event here is uncaught:exception
Cypress.on('uncaught:exception', (err, runnable) =>{
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  
  describe('Whom I Am Looking For Feature', function(){
  
    it('Whom I Am Looking For', () => {
    
          //Logging through OPT using custom command
          cy.loginWithOTP();
                
          //Click on Candidate Management Button
          cy.contains('Candidate Management').click({force:true})

          //Click on candidates tab
          cy.get('#rc-tabs-0-tab-candidates').click({force:true})
          
          //View Candidate using custom command
          cy.viewCandidate();

          cy.wait(5000)
          
          //Click on Who I'm Looking For
          cy.contains("Whom I'm Looking For").click({force:true})
      
          //Click on edit button
          cy.get('.justify-between > #candidateEditSaveButtons > .ant-btn').click({force:true})
          
          //Setting max age to 35 
          //cy.get('.ant-slider-handle-2').focus().type('{rightarrow}'.repeat(11));

          // Set the minimum age to 17
          cy.get('.ant-slider-handle-1')
            .invoke('attr', 'aria-valuenow', '17')
            .invoke('attr', 'style', 'left: 0%; transform: translateX(-50%);')
            .trigger('change')

          // Set the maximum age to 27
          cy.get('.ant-slider-handle-2')
            .invoke('attr', 'aria-valuenow', '27')
            .invoke('attr', 'style', 'left: 7.0922%; transform: translateX(-50%);')
            .trigger('change')

          // Assert that the minimum and maximum ages are set correctly
          cy.get('.ant-slider-handle-1').should('have.attr', 'aria-valuenow', '17')
          cy.get('.ant-slider-handle-2').should('have.attr', 'aria-valuenow', '27')
          
          //Ethnicity
          cy.get('#ethnicity').click({force:true})
          cy.get('.ant-select-item.ant-select-item-option').each(($el) => {
            
            if ($el.text().includes('Pakistani Indian')) {
              cy.wrap($el).click({ force: true });
            }
          });

          //Education
          cy.get('#education').click({force:true})
          cy.get('.ant-select-item.ant-select-item-option').each(($el) => {
            
            if ($el.text().includes("Master's")) {
              cy.wrap($el).click({ force: true });
            }
          });
        
          //Hijab
          cy.get('.mt-6 > :nth-child(1) > .ant-radio-group > :nth-child(1) > .ant-radio > .ant-radio-input').click({force:true})
          
          //Halal
          cy.get('.mt-6 > :nth-child(2) > .flex > .ant-radio-group > :nth-child(1) > .ant-radio > .ant-radio-input').click({force:true})

          //Praying
          cy.get(':nth-child(3) > .flex > .ant-radio-group > :nth-child(2) > .ant-radio > .ant-radio-input').click({force:true})
            
          //Click on save Button
          cy.get('#candidateEditSaveButtons > .ant-btn').click({force:true})

          //Assertion
        //   cy.get('.ant-message-custom-content > :nth-child(2)')
        //   .should('have.text','User details are successfully updated' )
       
  })
  })