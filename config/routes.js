module.exports.routes = {
  '/': {
    view: 'homepage'
  },
  'GET /users': 'UserController.getAllUser',
  'GET /categories': 'CategoryController.findAll',
  'GET /products': 'ProductController.findAll',
  'GET /settings': {
    view: 'settings'
  }
};
