var jsdom = require('jsdom');
module.exports = {
  getCurrentPrice: function(link) {
    return new Promise(function(resolve, reject) {
      jsdom.env({
        url: link,
        done: function(err, window) {
          var $ = require("jquery")(window);
          if ($('#priceblock_ourprice').text()) {
            resolve(parseFloat($('#priceblock_ourprice').text().trim().replace(/,/g, '')));
          } else {
            resolve(parseFloat($('#priceblock_ourprice').textContent.trim().replace(/,/g, '')));
          }
          window.close();
        }
      });
    });
  }
}
