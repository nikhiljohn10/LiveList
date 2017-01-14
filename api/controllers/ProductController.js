module.exports = {
  findAll: function(req, res) {
    Product.find().exec(function(err, result) {
      if (err) {
        return res.serverError(err);
      }
      return res.json(result);
    });
  },
  getGraphData: function(req, res) {
    Product.find().populate('priceList').exec(function(err, result) {
      if (err) {
        return res.serverError(err);
      }
      return res.json(result);
    });
  },
  add: function(req, res) {
    var values = {
      name: (req.body.name) ? req.body.name : undefined,
      category: (req.body.category) ? req.body.category : undefined,
      link: (req.body.link) ? req.body.link : null,
      ff: (req.body.ff == true) ? true : false,
      currentPrice: (req.body.currentPrice) ? req.body.currentPrice : 0
    };
    Product.create(values).exec(function(err, resp) {
      if (err) return res.serverError(err);
      Price.create({
        product: resp.id,
        amount: values.currentPrice
      }).exec(function(err1, resp1) {
        if (err1) return res.serverError(err1);
        return res.json({
          id: resp.id,
          updatedAt: resp.updatedAt
        });
      });
    });
  },
  update: function(req, res) {
    var pid = (req.body.id) ? req.body.id : undefined;
    Product.find({
      id: pid
    }).exec(function(err, result) {
      if (err) return res.serverError(err);
      var data = result[0];
      AmazonService.getCurrentPrice(data.link)
        .then(function(currentPrice) {
          data.currentPrice = currentPrice;
          Product.update({
            id: pid
          }, {
            currentPrice: currentPrice
          }).exec(function(err, resp) {
            if (err) return res.serverError(err);
            Price.create({
              product: pid,
              amount: currentPrice
            }).exec(function(err1, resp1) {
              if (err1) return res.serverError(err1);
              return res.json(data);
            });
          });
        })
        .catch(function(err) {
          if (err) return res.serverError(err);
        });
    });
  },
  remove: function(req, res) {
    var pid = (req.body.id) ? req.body.id : undefined;
    Product.destroy({
      id: pid
    }).exec(function(err, resp) {
      if (err) return res.serverError(err);
      Price.destroy({
        product: pid
      }).exec(function(err1, resp1) {
        if (err1) return res.serverError(err1);
        return res.ok();
      });
    });
  }
};
