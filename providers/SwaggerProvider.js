'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const GE = require('@adonisjs/generic-exceptions')

class SwaggerProvider extends ServiceProvider {
  _addRoutes() {
    const Route = use('Route')
    const swaggerJSDoc = use('swagger-jsdoc')
    const Config = use('Config')
    const options = Config.get('swagger.options')

    try {
      if(Config.get('swagger.isCustom')) {

        return swaggerJSDoc(options.options)
      }
    } catch (error) {
      throw GE.RuntimeException.incompleteConfig(['isCustom','options'], 'config/swagger.js', 'docs')
    }
    

    let apis = ['app/**/*.js', 'start/routes.js']
    let apisConfig = options.apis
    apis = apis.concat(apisConfig)

    if (Config.get('swagger.enable')) {
      Route.get('/swagger.json', async ({ response }) => {

        const defaultOptions = {
          swaggerDefinition: {
            info: {
              title: options.title,
              version: options.version
            },
            basePath: options.basePath,
            security: options.security,
            securityDefinitions: {
              'ApiKey': {
                'type': 'apiKey',
                'description': options.securityDefinitions.ApiKey.description,
                'name': options.securityDefinitions.ApiKey.name,
                'in': 'header'
              },
              'BasicAuth': {
                'type': 'basic'
              },
              'OAuth2': {
                'type': 'oauth2',
                'flow': 'accessCode',
                'authorizationUrl': options.securityDefinitions.OAuth2.authorizationUrl,
                'tokenUrl': options.securityDefinitions.OAuth2.tokenUrl,
                'scopes': options.securityDefinitions.OAuth2.scopes
              }
            }
          },
          apis: apis
        }

        return swaggerJSDoc(defaultOptions)
      })
    }
  }

  _registerCommands() {
    this.app.bind('Adonis/Commands/SwaggerExport', () => require('../commands/SwaggerExport'))
    this.app.bind('Adonis/Commands/SwaggerRemove', () => require('../commands/SwaggerRemove'))
    this.app.bind('Adonis/Commands/SwaggerRemoveDocs', () => require('../commands/SwaggerRemoveDocs'))
  }

  _addCommands() {
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
  register() {
    this._registerCommands()
  }

  /**
   * Boot the provider
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    this._addCommands()
    this._addRoutes()
  }
}

module.exports = SwaggerProvider
