module.exports = {
  // models: {
  //   connection: 'someMysqlServer'
  // },
  // port: 80,
  // log: {
  //   level: "silent"
  // }
  ssl: {
    //ca: require('fs').readFileSync(require('path').resolve(__dirname, '../ssl/my-gd-bundle.crt')),
    key: require('fs').readFileSync(require('path').resolve(__dirname, '../../../ll_ssl/ll.key')),
    cert: require('fs').readFileSync(require('path').resolve(__dirname, '../../../ll_ssl/ll.crt'))
  }
};
