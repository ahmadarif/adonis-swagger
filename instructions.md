# Configuration
* Register `SwaggerProvider` in `start/app.js`:
  ```js
  const providers = [
    ...
    'adonis-swagger/providers/SwaggerProvider'
  ]
  ```

* **Note:** For projects that uses API-only blueprint (using `--api-only` flag), please 
  enable `Adonis/Middleware/Static` middleware in `start/kernel.js`:
  ```js
  const serverMiddleware = [
    'Adonis/Middleware/Static',
    ...
  ]
  ```

* For other configuration, please update the `config/swagger.js`.

# Usage
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

  > For custom directory, please change the `config/swagger.js` as needed.

* For other sample in YAML and JS format, please refer to this [link](https://github.com/ahmadarif/adonis-swagger/tree/master/sample)
