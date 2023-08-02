const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
     proxy: 'https://inhollandbackend.azurewebsites.net/'
  }
})
