'use strict'

const path = require('path')

module.exports = async function (cli) {
  try {
    await cli.makeConfig('swagger.js', path.join(__dirname, './config/swagger.js'))
    cli.command.completed('create', 'config/swagger.js')
  } catch (error) {
    // ignore errors
  }
}