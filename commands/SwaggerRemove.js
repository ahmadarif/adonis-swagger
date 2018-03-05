'use strict'

const { Command } = require('@adonisjs/ace')

class SwaggerRemove extends Command {
  static get signature () {
    return `
      swagger:remove
      { --silent : Hide the console log }
    `
  }

  static get description () {
    return 'Remove config file & swagger-ui assets'
  }

  async handle (args, options) {
    if (!options.silent) this.info('Removing assets from public folder (public/docs)')
    await this.removeDir('public/docs')

    if (!options.silent) this.info('Removing swagger configuration (config/swagger.js)')
    await this.removeFile('config/swagger.js')

    if (!options.silent) this.success(`${this.icon('success')} Completed`)
  }
}

module.exports = SwaggerRemove
