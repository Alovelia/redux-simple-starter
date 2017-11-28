/*
 * @description
 * This file is to keep general properties
 * */
let path = require('path');

module.exports = {
  TEMPLATE_ROOT: path.resolve(__dirname, './templates/'),
  APP_ROOT: process.cwd()
};
