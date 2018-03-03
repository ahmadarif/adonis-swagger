# Registering provider
```js
const providers = [
  ...
  'adonis-swagger/providers/SwaggerProvider'
]
```

# Usage
* Add new route
  ```js
  Route.get('/api/hello', 'TestController.hello')
  ```

* Create TestController using command adonis make:controller Test
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

* You can also define the schema in the Models
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

  > For custom directory, please change the `config/swagger.js` as needed.

* Other sample in YAML and JS format please refer this [link](https://github.com/ahmadarif/adonis-swagger/tree/master/sample)