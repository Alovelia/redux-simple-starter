let chalk = require('chalk');

const log = console.log.bind(console);

exports.showWarning = function showWarning(text) {
  log(chalk.green('--------Info--------'));
  log(chalk.yellow('You did not have this folder!'));
  log(chalk.yellow(text));
  log(chalk.yellow('I have created folder structure for you'));
  log(chalk.green('-----------------------'));
};

exports.showExistWarning = function showExistWarning(fName) {
  log(chalk.yellow('--------Warning--------'));
  log(chalk.yellow('You have this file'));
  log(chalk.red(fName));
  log(chalk.yellow('skip...'));
  log(chalk.yellow('-----------------------'));
};
