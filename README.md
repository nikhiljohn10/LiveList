# LiveList

a [Sails](http://sailsjs.org) application to list amazon produst prices

*Note:*

Use `npm install` to get all dependencies.

If you have nodemon, use `npm start`, else use `sails lift`.

Create `local.js` in `config` folder and add the following code by replacing your own database info.

```
module.exports = {
  connections: {
    myDataStore: {
      adapter: 'sails-postgresql', // check sails documentation for right adapter
      host: 'localhost',
      user: 'YOUR_DATABASE_USERNAME',
      password: 'YOUR_DATABASE_PASSWORD',
      database: 'YOUR_DATABASE_NAME',
      port: 'YOUR_DATABASE_PORT'
    }
  }
};
```
