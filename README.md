# [LiveList](https://ll.nikz.in)

a [Sails](http://sailsjs.org) application to list amazon produst prices

###How to run the app in a unix based system:

Install sails by `sudo npm install -g sails@0.12`.

Use `npm install` to get all dependencies.

For starting in production, use `npm start`. For development purpose, use `sails lift`.

Create `local.js` in `config` folder and add the following code by replacing your own database info.

```
module.exports = {
  connections: {
    myDataStore: {
      adapter: 'sails-postgresql',
      host: 'localhost',
      user: 'USERNAME',
      password: 'PASSWORD',
      database: 'DATABASE',
      port: 'PORT'
    }
  }
};
```

Start the app in dev mode once.In `config/models.js`, set `migrate: 'safe'` and then we can start app in production mode.
