module.exports = {
  getAllUser: function(req, res) {
    User.find().exec(function(err, users) {
      if (err) throw err;
      res.json(users);
    });
  }
};
