var jsdom = require('jsdom');
module.exports = {
  getCurrentPrice: function(link) {
    return new Promise(function(resolve, reject) {
      jsdom.env({
        url: link,
        done: function(err, window) {
          var $ = require("jquery")(window);
          var price = $('#priceblock_ourprice').text().trim().replace(/,/g, '');
          if (!price) price = $('#priceblock_saleprice').text().trim().replace(/,/g, '');
          resolve(parseFloat(price));
          window.close();
        }
      });
    });
  }
}
