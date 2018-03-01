# Adonis Swagger
Create documentation easily in Adonis 4.x using [Swagger][Swagger] 😍

# Installation
You can install the package from npm.
```
npm install --save adonis-swagger
```

# Configure
Register it in start/app.js:
```js
const providers = [
  ...
  'adonis-swagger/providers/SwaggerProvider'
]
```

And then, export the assets and config file using command:
```
adonis swagger:export
```

# Sample Usage
* Add new route
  ```js
  Route.get('/api/hello', 'TestController.hello')
  ```
  
* Create `TestController` using command `adonis make:controller Test`
  ```js
  'use strict'

  class TestController {

    /**
    * @swagger
    * /api/hello:
    *   get:
    *     tags:
    *       - Test
    *     summary: Contoh API greeting
    *     parameters:
    *       - name: name
    *         description: Nama user
    *         in: query
    *         required: false
    *         type: string
    *     responses:
    *       200:
    *         description: Mengirim pesan hello
    *         example:
    *           message: Hello Guess
    */
    async hello({ request, response }) {
      const name = request.input('name', 'Guess')
      response.send({ message: 'Hello ' + name })
    }
  }

  module.exports = TestController
  ```

* Sample usage in Models (optional, just for sample)
  ```js
  'use strict'

  const Model = use('Model')

  /** 
  *  @swagger
  *  definitions:
  *    User:
  *      type: object
  *      properties:
  *        id:
  *          type: uint
  *        username:
  *          type: string
  *        email:
  *          type: string
  *        password:
  *          type: string
  *      required:
  *        - username
  *        - email
  *        - password
  */
  class User extends Model {
    static boot () {
      super.boot()

      this.addHook('beforeSave', 'User.hashPassword')
    }

    static get hidden () {
      return ['password']
    }

    tokens () {
      return this.hasMany('App/Models/Token')
    }
    
  }

  module.exports = User
  ```


Open http://localhost:3333/docs in your browser, ayeey 🎉 </br>
For detail usage, please check the swagger specification in this [link][SwaggerSpec].

# Command List
Command                       | Description
:-----------------------------|:-----------
 `adonis swagger:export`      | Export config file & swagger-ui assets
 `adonis swagger:remove`      | Remove config file & swagger-ui assets
 `adonis swagger:remove-docs` | Remove swagger-ui only

# Dependencies
- [swagger-jsdocs](https://www.npmjs.com/package/swagger-jsdoc)
- [swagger-ui-dist](https://www.npmjs.com/package/swagger-ui-dist)

# Thanks
Special thanks to the creator(s) of [AdonisJS][AdonisJS] for creating such a great framework.

[Swagger]:https://swagger.io/
[SwaggerSpec]:https://swagger.io/specification/
[AdonisJS]: http://adonisjs.com/