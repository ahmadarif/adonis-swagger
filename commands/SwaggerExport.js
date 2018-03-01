'use strict'

const { Command } = require('@adonisjs/ace')

class SwaggerExport extends Command {
  static get signature () {
    return 'swagger:export'
  }

  static get description () {
    return 'Export config file & swagger-ui assets'
  }

  async handle (args, options) {
    this.info('Exporting assets to public folder')
    await this.copy('docs', 'public/docs')

    this.info('Exporting swagger configuration')
    await this.copy('templates/swagger.js', 'config/swagger.js')

    console.log(`${this.icon('success')} Completed`)
  }
}

module.exports = SwaggerExport