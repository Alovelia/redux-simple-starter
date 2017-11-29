let prompts = {
  strategy: [
    {
      name: 'strategy',
      message: 'What should I do?',
      type: 'list',
      choices: [
        {
          name: 'Inject',
          value: 'inject'
        },
        {
          name: 'Create',
          value: 'compile'
        }
      ]
    }
  ],
  compilationType: [
    {
      name: 'compilationType',
      message: '----',
      type: 'list',
      choices: [
        // {
        //  name: 'Action'
        //  ,value: 'action'
        // }
        {
          name: 'Component (Dump)',
          value: 'component'
        },
        // {
        //  name: 'Container (Smart)',
        //  value: 'container'
        // },
        {
          name: 'Reducer',
          value: 'reducer'
        },
        // {
        //   name: 'Saga',
        //   value: 'saga'
        //  },
        // {
        //   name: 'Store folder',
        //   value: 'store-folder'
        // },
        {
          name: 'Module name: (kebab-case)',
          value: 'module'
        },
      ],
      default: 0
    }
  ],
  injectionType: [
    {
      name: 'injectionType',
      message: '----',
      type: 'list',
      choices: [
        {
          name: 'Action (e.g. SYNC_ACTION or ~ASYNC_ACTION)',
          value: 'action'
        },
        // {
        //   name: 'Property to INITIAL_STATE + selector (e.g. loading)'
        //   ,value: 'property_to_ducks'
        // },
        // {
        //   name: 'Saga async method (e.g. getData)'
        //   ,value: 'saga_async_method'
        // }
      ],
      default: 0
    }
  ],

  file: [
    {
      name: 'fileName',
      message: 'Into file (e.g. fileName)',
      type: 'input'
    }
  ],

  actionType: [
    {
      name: 'actionType',
      message: 'Input action type (e.g. GET_DATA):',
      type: 'input'
    }
  ],

  inputs: [
    {
      name: 'name',
      message: 'Name: ***',
      type: 'input'
    }
    // ,{
    //  name: 'moduleName'
    //  ,message: 'In which module? CM.***'
    //  ,type: 'input'
    // }
    //,{
    // name: 'inCommon'
    // ,message: '---'
    // ,type: 'list'
    // ,choices: [
    //  {
    //   name: 'In module'
    //   ,value: false
    //  }
    //  ,{
    //   name: 'In common module'
    //   ,value: true
    //  }
    // ]
    // ,default: 0
    //}
  ],
  module: [
    {
      name: 'moduleName',
      message: 'In which module?: ***',
      type: 'input'
    }
    //,{
    // name: 'inCommon'
    // ,message: '---'
    // ,type: 'list'
    // ,choices: [
    //  {
    //   name: 'In root'
    //   ,value: false
    //  }
    //  ,{
    //   name: 'In common folder'
    //   ,value: true
    //  }
    // ]
    // ,default: 0
    //}
  ]
};

module.exports = prompts;
