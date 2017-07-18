var Promise = require('bluebird');
var readFile = Promise.promisify(require('fs').readFile);
var env = require('getenv');
require('dotenv').config();


const checkEnvironmentVariables = function () {
  return readFile('.env.tpl', 'utf8')
  .then(function (file) {
    var envList = file && file.split(/(?:\n|\r\n|\r)/)
    .filter((p) => !(p.match(/([\/\/|\/\*|\#].*)/)) && (p.indexOf('=') >= 0))
    .map(line=>line.split('=')[0].trim())
    .filter(envVar => !process.env[envVar]);
    if (envList && envList.length > 0) {
      throw new Error('Please set environment variable ' + envList.toString());
    }
    return envList;
  });
};
const getenv = function () {
  return env;
};

module.exports = {
  checkEnvironmentVariables: checkEnvironmentVariables,
  getEnv: getenv
};

