const chalk = require("chalk");
const log = require("fancy-log");

const notifyMessage = (message) => {
  log(chalk.green.bold(`✅ ${message}`));
};

const onError = (taskName) => (err) => {
  log.error(chalk.red.bold(`❌ Error in ${taskName}:`));
  console.error(err.toString());
};

module.exports = { notifyMessage, onError };
