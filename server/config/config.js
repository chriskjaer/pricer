var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://localhost/pricer',
    port: process.env.PORT || 1337
  },
  production: {
    rootPath: rootPath,
    db: 'mongodb://localhost/pricer',
    port: process.env.PORT || 80
  }
};