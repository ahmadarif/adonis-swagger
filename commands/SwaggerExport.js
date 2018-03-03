'use strict'

const { Command } = require('@adonisjs/ace')
const path = require('path')

class SwaggerExport extends Command {
  static get signature () {
    return 'swagger:export'
  }

  static get description () {
    return 'Export config file & swagger-ui assets'
  }

  async handle (args, options) {
    this.info('Exporting assets to public folder (public/docs)')
    await this.copy(path.join(__dirname, '../templates/docs'), 'public/docs')

    this.info('Exporting swagger configuration (config/swagger.js)')
    await this.copy(path.join(__dirname, '../templates/config.js'), 'config/swagger.js')

    this.success(`${this.icon('success')} Completed`)
  }
}

module.exports = SwaggerExport