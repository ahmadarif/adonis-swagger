'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class SwaggerProvider extends ServiceProvider {
  _addRoutes () {
    const Route = use('Route')
    const swaggerJSDoc = use('swagger-jsdoc')
    const Config = use('Config')

    if (Config.get('swagger.enable')) {
      // Get custom URL for Swagger specification, if defined.
      const specUrl = Config.get('swagger.specUrl', '/swagger.json')
      Route.get(specUrl, async ({ response }) => (
        swaggerJSDoc(Config.get('swagger.options', {}))
      ))
    }
  }

  _registerCommands () {
    this.app.bind('Adonis/Commands/SwaggerExport', () => require('../commands/SwaggerExport'))
    this.app.bind('Adonis/Commands/SwaggerExportDocs', () => require('../commands/SwaggerExportDocs'))
    this.app.bind('Adonis/Commands/SwaggerRemove', () => require('../commands/SwaggerRemove'))
    this.app.bind('Adonis/Commands/SwaggerRemoveDocs', () => require('../commands/SwaggerRemoveDocs'))
  }

  _addCommands () {
    const ace = require('@adonisjs/ace')
    ace.addCommand('Adonis/Commands/SwaggerExport')
    ace.addCommand('Adonis/Commands/SwaggerExportDocs')
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
