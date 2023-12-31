
//importing file upload library
import 'cypress-file-upload';

// waiting for an event, and that event here is uncaught:exception
Cypress.on('uncaught:exception', (err, runnable) =>{
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  
  describe('Gallery Feature', function(){
  
    it('Picture Upload', () => {
    
          //Logging through OPT using custom command
          cy.loginWithOTP()
      
          //Click on Candidate Management Button
          cy.contains('Candidate Management').click({force:true})
      
          //Click on candidates tab
          cy.get('#rc-tabs-0-tab-candidates').click({force:true})
          
          //View Candidate using custom command
          cy.viewCandidate();

          cy.wait(5000)

          //Click on Gallery
          cy.contains('Gallery').click({force:true})

          //Uploading File Method-1 using attachFile function
          //cy.get('input[type=file]').attachFile('PicForGallery.png')
          
          //Uploading File Method-2 using fixtures & selectFile function
          cy.fixture('PicForGallery.png', { encoding: null })
          .as('uploadPic')
          .get('input[type=file]')
          .selectFile('@uploadPic',{force: true})

          //Uploading File by drag & drop function
        //   cy.fixture('PicForGallery.png', { encoding: null })
        //    .as('uploadPic')
        //    .get('input[type=file]')
        //    .selectFile('@uploadPic', {force: true}, {action:'drag-drop'})
   
  })
  })