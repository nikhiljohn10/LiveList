module.exports = function sendOK(data, options) {
  var req = this.req;
  var res = this.res;
  var sails = req._sails;
  sails.log.silly('res.ok() :: Sending 200 ("OK") response');
  res.status(200);
  if (req.wantsJSON || sails.config.hooks.views === false) {
    return res.jsonx(data);
  }
  options = (typeof options === 'string') ? {
    view: options
  } : options || {};
  var viewData = data;
  if (!(viewData instanceof Error) && 'object' == typeof viewData) {
    try {
      viewData = require('util').inspect(data, {
        depth: null
      });
    } catch (e) {
      viewData = undefined;
    }
  }
  if (options.view) {
    return res.view(options.view, {
      data: viewData,
      title: 'OK'
    });
  } else return res.guessView({
    data: viewData,
    title: 'OK'
  }, function couldNotGuessView() {
    return res.jsonx(data);
  });

};
