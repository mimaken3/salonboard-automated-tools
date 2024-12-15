const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://salonboard.com',
    experimentalNetworkStubbing: false, // 追加の設定
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return {
        env: {
          ID: process.env.ID,
          PASSWORD: process.env.PASSWORD,
        }
      }
    },
  },
});
