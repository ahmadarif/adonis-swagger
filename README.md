# Adonis Swagger
[![npm version](https://badge.fury.io/js/adonis-swagger.svg)](https://badge.fury.io/js/adonis-swagger)
[![build status](https://travis-ci.org/ahmadarif/adonis-swagger.svg?branch=master)](https://travis-ci.org/ahmadarif/adonis-swagger)
[![npm](https://img.shields.io/npm/dt/adonis-swagger.svg)](https://www.npmjs.com/package/adonis-swagger)
[![npm](https://img.shields.io/npm/l/adonis-swagger.svg)](https://www.npmjs.com/package/adonis-swagger)
[![Coverage Status](https://coveralls.io/repos/github/ahmadarif/adonis-swagger/badge.svg)](https://coveralls.io/github/ahmadarif/adonis-swagger)

Create documentation easily in Adonis 4.x using [Swagger][Swagger] 😍

# Installation
```
adonis install adonis-swagger
```

# Configuration
* Register `SwaggerProvider` in `start/app.js`:
  ```js
  const providers = [
    ...
    'adonis-swagger/providers/SwaggerProvider'
  ]
  ```

* **Note:** For projects that uses API-only blueprint (using `--api-only` flag), please 
  enable `Adonis/Middleware/Static` under `serverMiddleware` in `start/kernel.js`:
  ```js
  const serverMiddleware = [
    'Adonis/Middleware/Static',
    ...
  ]
  ```

* For other configuration, please update the `config/swagger.js`.

# Sample Usage
* Add new route:
  ```js
  Route.get('/api/hello', 'TestController.hello')
  ```

* Create `TestController` using `adonis make:controller Test` command:
  ```js
  'use strict'
  
  class TestController {
  
    /**
    * @swagger
    * /api/hello:
    *   get:
    *     tags:
    *       - Test
    *     summary: Sample API
    *     parameters:
    *       - name: name
    *         description: Name of the user
    *         in: query
    *         required: false
    *         type: string
    *     responses:
    *       200:
    *         description: Send hello message
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

* You can also define the schema in the Models:
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
  }
  
  module.exports = User
  ```

* Or create a separate file containing documentation from the APIs in either JS or YAML formats, sample structure:
  ```bash
  project
  ├── app
  ├── config 
  ├── docs
  │   ├── controllers
  │   │   ├── **/*.js
  │   │   ├── **/*.yml
  │   └── models
  │       ├── **/*.js
  │       ├── **/*.yml
  ```

* For other sample in YAML and JS format, please refer to this [link](/sample).

Open http://localhost:3333/docs in your browser, ayeey 🎉  
For detail usage, please check the Swagger specification in this [link][SwaggerSpec].

# Command List
Command                       | Description
:-----------------------------|:-----------
 `adonis swagger:export`      | Export config file & swagger-ui assets
 `adonis swagger:export-docs` | Export swagger-ui assets only
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
