const test = require('japa')
const { ioc, registrar } = require('@adonisjs/fold')
const ace = require('@adonisjs/ace')

const isExists = require('fs').existsSync
const path = require('path')

test.group('Swagger provider test', (group) => {
  group.before(async () => {
    await registrar.providers([
      path.join(__dirname, '../providers/SwaggerProvider')
    ]).register()

    // call in boot SwaggerProvider
    ace.addCommand('Adonis/Commands/SwaggerExport')
    ace.addCommand('Adonis/Commands/SwaggerRemove')
    ace.addCommand('Adonis/Commands/SwaggerRemoveDocs')
  })

  test('SwaggerExport command test', async (assert) => {
    // check is command available
    assert.equal('swagger:export', ioc.use('Adonis/Commands/SwaggerExport')._name)

    /*
    // execute command
    await ace.call('swagger:export')
    
    // check file/dir is exists
    assert.isTrue(isExists(path.join(__dirname, '../public/docs')))
    assert.isTrue(isExists(path.join(__dirname, '../config/swagger.js')))
    */
  }).timeout(0)

  test('SwaggerRemove command test', async (assert) => {
    // check is command available
    assert.equal('swagger:remove', ioc.use('Adonis/Commands/SwaggerRemove')._name)

    /*
    // execute command
    await ace.call('swagger:remove')

    // check file/dir is exists
    assert.isFalse(isExists(path.join(__dirname, '../public/docs')))
    assert.isFalse(isExists(path.join(__dirname, '../config/swagger.js')))
    */
  }).timeout(0)

  test('SwaggerRemoveDocs command test', async (assert) => {
    // check is command available
    assert.equal('swagger:remove-docs', ioc.use('Adonis/Commands/SwaggerRemoveDocs')._name)

    /*
    // execute command
    await ace.call('swagger:remove-docs')

    // check docs is exists
    assert.isFalse(isExists(path.join(__dirname, '../public/docs')))
    */
  }).timeout(0)
})