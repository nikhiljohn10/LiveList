var cssFilesToInject = [
  '!styles/layouts/*.css',
  'styles/main.css',
  'styles/**/*.css'
];
var jsFilesToInject = [

  'js/dependencies/sails.io.js',
  'js/ui.js',
  'js/dependencies/**/*.js',
  '!js/app.js',
  'js/**/*.js'
];
var templateFilesToInject = [
  'templates/**/*.html'
];
var tmpPath = '.tmp/public/';
module.exports.cssFilesToInject = cssFilesToInject.map(function(cssPath) {
  if (cssPath[0] === '!') {
    return require('path').join('!.tmp/public/', cssPath.substr(1));
  }
  return require('path').join('.tmp/public/', cssPath);
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(jsPath) {
  if (jsPath[0] === '!') {
    return require('path').join('!.tmp/public/', jsPath.substr(1));
  }
  return require('path').join('.tmp/public/', jsPath);
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(tplPath) {
  if (tplPath[0] === '!') {
    return require('path').join('!assets/', tplPath.substr(1));
  }
  return require('path').join('assets/', tplPath);
});
