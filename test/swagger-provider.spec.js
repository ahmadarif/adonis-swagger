const test = require('japa')
const { ioc, registrar } = require('@adonisjs/fold')

const path = require('path')

test.group('Swagger provider test', (group) => {
  group.before(async () => {
    await registrar.providers([
      path.join(__dirname, '../providers/SwaggerProvider')
    ]).register()
  })

  test('SwaggerExport command test', async (assert) => {
    assert.equal('swagger:export', ioc.use('Adonis/Commands/SwaggerExport')._name)
  }).timeout(0)

  test('SwaggerRemove command test', async (assert) => {
    assert.equal('swagger:remove', ioc.use('Adonis/Commands/SwaggerRemove')._name)
  }).timeout(0)

  test('SwaggerRemoveDocs command test', async (assert) => {
    assert.equal('swagger:remove-docs', ioc.use('Adonis/Commands/SwaggerRemoveDocs')._name)
  }).timeout(0)
})