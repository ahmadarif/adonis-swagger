'use strict'

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Swagger Information
  | Please use Swagger 2 Spesification Docs
  | https://swagger.io/docs/specification/2-0/basic-structure/
  |--------------------------------------------------------------------------
  */

  // enable or disable route '/swagger.json'
  enable: true,

  // if you need your own configuration, put the truth in the option property and write down your implementation
  isCustom: false,
  options: {
    title: 'Adonis 💘 Swagger',
    version: '1.0.0',
    basePath: '/',

    security: [{
      ApiKey: []
    }],

    // security definition config
    securityDefinitions: {
      ApiKey: {
        description: 'ApiKey description',
        name: 'Authorization'
      },

      // OAuth2 configuration
      OAuth2: {
        authorizationUrl: 'https://example.com/oauth/authorize',
        tokenUrl: 'https://example.com/oauth/token',

        // define your scopes here
        // remove read, write and admin if not necessary
        scopes: {
          read: 'Grants read access (this is just sample)',
          write: 'Grants write access (this is just sample)',
          admin: 'Grants read and write access to administrative information (this is just sample)'
        }
      },
    },

    // Path to the API docs
    // Sample usage
    // apis: [
    //    'docs/**/*.yml',    // load recursive all .yml file in docs directory
    //    'docs/**/*.js',     // load recursive all .js file in docs directory
    // ]
    apis: []
  }
}