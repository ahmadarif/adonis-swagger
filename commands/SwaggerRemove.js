'use strict'

const { Command } = require('@adonisjs/ace')
const path = require('path')

class SwaggerExport extends Command {
  static get signature () {
    return 'swagger:remove'
  }

  static get description () {
    return 'Remove config file & swagger-ui assets'
  }

  async handle (args, options) {
    this.info('Removing assets from public folder')
    await this.removeDir('public/docs')

    this.info('Removing swagger configuration')
    await this.removeFile('config/swagger.js')

    this.success(`${this.icon('success')} Completed`)
  }
}

module.exports = SwaggerExport