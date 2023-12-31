
// waiting for an event, and that event here is uncaught:exception

Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  describe('Login to Heavenly Match- DDT Implementation', function(){

    it.skip('Visit Heavenly Match Website & login using DDT', function(){ 

        //Loading Fixture File i.e. HeavenlyMatch.json before hitting URL
        cy.fixture('HeavenlyMatch').then((data)=>{

        data.forEach((userData) => {

        //Hitting URL
        cy.visit('https://staging.d1zuvcn685ymz3.amplifyapp.com/')
        
        //Entering Email using DDT
        .get('input[placeholder="Email"]')
        .type(userData.Email)
        
        //Entering Password using DDT
        .get('input[placeholder="Password"]')
        .type(userData.Password)
        
        //Clicking on Login Button
        .get('button[type="Submit"]').click()
        
        //Multiple If Statements according to the dataset i.e. HeavenlyMatch.json 
        if (userData.Email=="bilal.ashraf@emerald-labs.com" && userData.Password=="12345678") {
            
            
            cy.get('.pt-5').should('have.text', userData.Expected)  
            cy.get('.items-center > .ant-btn').click({force:true})
        }
        
        else if (userData.Email=="bilal.ashraf@emerald-labs.com" && userData.Password=="1234567") {
            cy
            .contains("Incorrect username or password.")
            .should('have.text', userData.Expected)
        } 
        
        else {
            cy.contains("User does not exist.").should('have.text', userData.Expected)  
        }   
    })
});
})
})