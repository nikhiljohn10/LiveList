/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getAllUser: function(req, res) {
    User.find().exec(function(err, users) {
      if (err) throw err;
      res.json(users);
    });
  }
};
