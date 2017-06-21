const Promise = require('bluebird');
const readFile = Promise.promisify(require('fs').readFile);
const env = require('getenv');
require('dotenv').config();


const checkEnvironmentVariables = ()=> {
  return readFile(`${__dirname}/.env.tpl`,'utf8')
    .then(file => {
      const envList = file && file.split(/(?:\n|\r\n|\r)/)
          .filter((p) => !(p.match(/^(\/\/ |\/\*|#)/)) && (p.indexOf('=') >= 0))
          .map(line=>line.split('=')[0].trim())
          .filter(envVar => !process.env[envVar]);
      if (envList && envList.length > 0) {
        throw new Error(`Please set environment variable ${envList.toString()}`);
      }
      return envList;
    });
};
const getenv = ()=> env;

module.exports = {
  checkEnvironmentVariables: checkEnvironmentVariables,
  getEnv: getenv
};
