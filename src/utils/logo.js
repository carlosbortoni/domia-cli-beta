const chalk = require('chalk')
const figlet = require('figlet')


const logo = () => {
  return console.log(
    chalk.blue.bold(
      figlet.textSync('Domia.Cli')
    )
  );
}

module.exports = logo