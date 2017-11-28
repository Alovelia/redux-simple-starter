let prompt = require('inquirer').prompt;
let o = require('./options');
let compilationStrategy = require('./compile');
let injectionStrategy = require('./inject');

module.exports = {
  async prompting() {
    let props = await prompt(o.strategy); //strategy

    switch (props.strategy) {
      case 'compile': {
        let types = await prompt(o.compilationType);
        let inputs = await prompt(o.inputs);
        let inmodule = await prompt(o.module);
        return Object.assign(props, types, inputs, inmodule);
      }
      case 'inject': {
        let injectionType = await prompt(o.injectionType);
        let inputs = await prompt(o.inputs);
        let inmodule = await prompt(o.module);

        return Object.assign(props, injectionType, inputs, inmodule);
      }
    }
  },
  async writing(props) {
    switch (props.strategy) {
      case 'compile': {
        return compilationStrategy(props);
      }
      case 'inject': {
        return injectionStrategy(props);
      }
    }
  }
};
