var jsdom = require('jsdom');
module.exports = {
  getCurrentPrice: function(link) {
    return new Promise(function(resolve, reject) {
      jsdom.env({
        url: link,
        done: function(err, window) {
          var $ = require("jquery")(window);
          resolve(parseFloat($('#priceblock_ourprice').text().trim().replace(/,/g, '')));
          window.close();
        }
      });
    });
  }
}
