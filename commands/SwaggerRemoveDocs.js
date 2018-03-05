'use strict'

const { Command } = require('@adonisjs/ace')

class SwaggerRemoveDocs extends Command {
  static get signature () {
    return `
      swagger:remove-docs
      { --silent : Hide the console log }
    `
  }

  static get description () {
    return 'Remove swagger-ui only'
  }

  async handle (args, options) {
    if (!options.silent) this.info('Removing assets from public folder (public/docs)')
    await this.removeDir('public/docs')

    if (!options.silent) this.success(`${this.icon('success')} Completed`)
  }
}

module.exports = SwaggerRemoveDocs
