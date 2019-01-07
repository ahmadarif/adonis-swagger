'use strict'

const { Command } = require('@adonisjs/ace')
const path = require('path')

class SwaggerExportDocs extends Command {
  static get signature () {
    return `
      swagger:export-docs
      { --silent : Hide the console log }
    `
  }

  static get description () {
    return 'Export swagger-ui assets only'
  }

  async handle (args, options) {
    if (!options.silent) this.info('Exporting assets to public folder (public/docs)')
    await this.copy(path.join(__dirname, '../templates/docs'), 'public/docs')

    if (!options.silent) this.success(`${this.icon('success')} Completed`)
  }
}

module.exports = SwaggerExportDocs
