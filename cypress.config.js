const { defineConfig } = require("cypress");


module.exports = defineConfig({
  
  projectId: "f1ivcu",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    
  },
  e2e : {
    defaultCommandTimeout: 25_000
  }
});
