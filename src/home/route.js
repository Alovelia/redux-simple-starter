import { routingConfig } from 'app/config';
import { errorLoading } from 'common/error-core';

const { path, name } = routingConfig.home;

export default store => ({
  path,
  name,
  getComponent(nextState, cb) {
    const importModules = Promise.all([
      // import('containers/HomePage/reducer'),
      // import('containers/HomePage/sagas'),
      import('./containers/home'),
    ]);

    importModules.then(([
      /*reducer, sagas,*/ component
    ]) => {
      // injectReducer('home', reducer.default);
      // injectSagas(sagas.default);

      cb(null, component);
    });

    importModules.catch(errorLoading);
  },
});
