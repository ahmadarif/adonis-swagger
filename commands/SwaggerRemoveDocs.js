'use strict'

const { Command } = require('@adonisjs/ace')
const path = require('path')

class SwaggerExport extends Command {
  static get signature () {
    return 'swagger:remove-docs'
  }

  static get description () {
    return 'Remove docs from public'
  }

  async handle (args, options) {
    this.info('Removing docs file')
    await this.removeDir('public/docs')

    this.success(`${this.icon('success')} Completed`)
  }
}

module.exports = SwaggerExport