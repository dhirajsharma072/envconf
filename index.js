const fs = require('fs');
const env = require('getenv');
require('dotenv').config();

const checkEnvironmentVariables = ()=> {
  fs.readFile(`${__dirname}/.env.tpl`, 'utf-8', (err, file) => {
    const envList = file && file.split('\n')
        .filter((p) => ( p.length > 0 && p.indexOf('=') >= 0))
        .map(line=>line.split('=')[0].trim())
        .filter(envVar => !process.env[envVar]);
    if (envList && envList.length > 0) {
      throw new Error(`Please set environment variable ${envList.toString()}`);
    }
  });
};
const getenv = ()=> env;

module.exports = {
  checkEnvironmentVariables: checkEnvironmentVariables,
  getEnv: getenv
};