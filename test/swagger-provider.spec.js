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
    ace.addCommand('Adonis/Commands/SwaggerExportDocs')
    ace.addCommand('Adonis/Commands/SwaggerRemove')
    ace.addCommand('Adonis/Commands/SwaggerRemoveDocs')
  })

  test('Check is swagger:export command available', async (assert) => {
    assert.equal('swagger:export', ioc.use('Adonis/Commands/SwaggerExport')._name)
  }).timeout(0)

  test('Check is swagger:export-docs command available', async (assert) => {
    assert.equal('swagger:export-docs', ioc.use('Adonis/Commands/SwaggerExportDocs')._name)
  }).timeout(0)

  test('Check is swagger:remove command available', async (assert) => {
    assert.equal('swagger:remove', ioc.use('Adonis/Commands/SwaggerRemove')._name)
  }).timeout(0)

  test('Check is swagger:remove-docs command available', async (assert) => {
    assert.equal('swagger:remove-docs', ioc.use('Adonis/Commands/SwaggerRemoveDocs')._name)
  }).timeout(0)

  test('Execute swagger:export command test', async (assert) => {
    // execute command
    await ace.call('swagger:export', null, { silent: true })

    // check config and docs is exists
    assert.isTrue(isExists(path.join(__dirname, '../public/docs')))
    assert.isTrue(isExists(path.join(__dirname, '../config/swagger.js')))
  })

  test('Execute swagger:export-docs command test', async (assert) => {
    // execute command
    await ace.call('swagger:export-docs', null, { silent: true })

    // check config and docs is exists
    assert.isTrue(isExists(path.join(__dirname, '../public/docs')))
  })

  test('Execute swagger:remove command test', async (assert) => {
    // execute command
    await ace.call('swagger:remove', null, { silent: true })

    // check is config and docs not exists
    assert.isFalse(isExists(path.join(__dirname, '../public/docs')))
    assert.isFalse(isExists(path.join(__dirname, '../config/swagger.js')))
  })

  test('Execute swagger:remove-docs command test', async (assert) => {
    // execute command
    await ace.call('swagger:remove-docs', null, { silent: true })

    // check is docs not exists
    assert.isFalse(isExists(path.join(__dirname, '../public/docs')))
  })
})
