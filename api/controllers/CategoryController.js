module.exports = {
  findAll: function(req, res) {
    Category.find().exec(function(err, categories) {
      if (err) {
        return res.serverError(err);
      }
      return res.json(categories);
    });
  },
  add: function(req, res) {
    var cVal = (req.body.value) ? req.body.value : undefined;
    Category.create({
      itemName: cVal.toLowerCase()
    }).exec(function(err, resp) {
      if (err) {
        return res.serverError(err);
      }
      return res.ok();
    });
  },
  remove: function(req, res) {
    var cid = (req.body.value) ? req.body.value : undefined;
    Category.destroy({
      id: cid
    }).exec(function(err, resp) {
      if (err) {
        return res.serverError(err);
      }
      return res.ok();
    });
  }
};
