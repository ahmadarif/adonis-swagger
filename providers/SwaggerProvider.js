'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class SwaggerProvider extends ServiceProvider {
  _addRoutes () {
    const Route = use('Route')
    const swaggerJSDoc = use('swagger-jsdoc')
    const Config = use('Config')

    let apis = ['app/**/*.js', 'start/routes.js']
    let apisConfig = Config.get('swagger.apis')
    apis = apis.concat(apisConfig)

    if (Config.get('swagger.enable')) {
      Route.get('/swagger.json', async ({ response }) => {
        const options = {
          swaggerDefinition: {
            info: {
              title: Config.get('swagger.title'),
              version: Config.get('swagger.version')
            },
            basePath: Config.get('swagger.basePath'),
            securityDefinitions: {
              'ApiKey': {
                'type': 'apiKey',
                'description': Config.get('swagger.securityDefinitions.ApiKey.description'),
                'name': Config.get('swagger.securityDefinitions.ApiKey.name'),
                'in': 'header'
              },
              'BasicAuth': {
                'type': 'basic'
              },
              'OAuth2': {
                'type': 'oauth2',
                'flow': 'accessCode',
                'authorizationUrl': Config.get('swagger.securityDefinitions.OAuth2.authorizationUrl'),
                'tokenUrl': Config.get('swagger.securityDefinitions.OAuth2.tokenUrl'),
                'scopes': Config.get('swagger.securityDefinitions.OAuth2.scopes')
              }
            }
          },
          apis: apis
        }

        return swaggerJSDoc(options)
      })
    }
  }

  _registerCommands () {
    this.app.bind('Adonis/Commands/SwaggerExport', () => require('../commands/SwaggerExport'))
    this.app.bind('Adonis/Commands/SwaggerRemove', () => require('../commands/SwaggerRemove'))
    this.app.bind('Adonis/Commands/SwaggerRemoveDocs', () => require('../commands/SwaggerRemoveDocs'))
  }

  _addCommands () {
    const ace = require('@adonisjs/ace')
    ace.addCommand('Adonis/Commands/SwaggerExport')
    ace.addCommand('Adonis/Commands/SwaggerRemove')
    ace.addCommand('Adonis/Commands/SwaggerRemoveDocs')
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
  }

  /**
   * Boot the provider
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
    this._addCommands()
    this._addRoutes()
  }
}

module.exports = SwaggerProvider
