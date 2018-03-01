'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class SwaggerProvider extends ServiceProvider {

  _registerRoutes() {
    const Route = use('Route')
    const swaggerJSDoc = use('swagger-jsdoc')
    const Config = use('Config')

    Route.get('/swagger.json', async ({ response }) => {
      const options = {
        swaggerDefinition: {
          info: {
            title: Config.get('swagger.title'),
            version: Config.get('swagger.version')
          },
          basePath: Config.get('swagger.basPath'),
          securityDefinitions: {
            'API Token': {
              'type': 'apiKey',
              'description': "add 'Bearer ' before token",
              'name': 'Authorization',
              'in': 'header'
            }
          }
        },
        apis: ['app/**/*.js']
      }

      return swaggerJSDoc(options)
    })
  }

  _registerCommands() {
    this.app.bind('Adonis/Commands/SwaggerExport', () => require('../commands/SwaggerExport'))
  }

  /**
   * Register all the required providers
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this._registerCommands()
    this._registerRoutes()
  }

  /**
   * Boot the provider
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    const ace = require('@adonisjs/ace')
    ace.addCommand('Adonis/Commands/SwaggerExport')
  }

}

module.exports = SwaggerProvider