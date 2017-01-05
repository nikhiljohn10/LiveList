/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findAll: function(req, res) {
    // Product.find().populate('priceList').exec(function(err, result) {
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
      currentPrice: (req.body.currentPrice) ? req.body.currentPrice : undefined
    };
    Product.create(values).exec(function(err, resp) {
      if (err) return res.serverError(err);
      Price.create({
        product: resp.id,
        amount: values.currentPrice
      }).exec(function(err1, resp1) {
        if (err1) return res.serverError(err1);
        return res.ok();
      });
    });
  },
  update: function(req, res) {
    var pid = (req.body.id) ? req.body.id : undefined;
    var currentPrice = (req.body.currentPrice) ? req.body.currentPrice : undefined;
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
        return res.ok();
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
