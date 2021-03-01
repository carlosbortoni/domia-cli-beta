const logo = require('./../utils/logo')

const command = {
  name: 'domia',
  run: async toolbox => {
    const { print } = toolbox

    logo();
    print.info('Welcome to your CLI')
  }
}

module.exports = command
