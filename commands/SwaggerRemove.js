'use strict'

const { Command } = require('@adonisjs/ace')
const path = require('path')

class SwaggerRemove extends Command {
  static get signature () {
    return 'swagger:remove'
  }

  static get description () {
    return 'Remove config file & swagger-ui assets'
  }

  async handle (args, options) {
    this.info('Removing assets from public folder (public/docs)')
    await this.removeDir('public/docs')

    this.info('Removing swagger configuration (config/swagger.js)')
    await this.removeFile('config/swagger.js')

    this.success(`${this.icon('success')} Completed`)
  }
}

module.exports = SwaggerRemove