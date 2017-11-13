import { routingConfig } from 'app/routes-config';
import { errorLoading } from 'common/error-core';
import { getAsyncInjectors } from 'common/async-injectors';
import createReducer from 'app/reducers';

const { path, name } = routingConfig.home;

export default (store) => {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return {
    path,
    name,
    async getComponent(nextState, cb) {
      try {
        const [
          component,
          // #if process.env.NODE_ENV === 'production'
          reducer,
          sagas
          // #endif
        ] = await Promise.all([
          import('./containers/home' /* webpackChunkName: "home" */),
          // #if process.env.NODE_ENV === 'production'
          import('./reducer' /* webpackChunkName: "home" */),
          import('./sagas' /* webpackChunkName: "home" */),
          // #endif
        ]);
        // #if process.env.NODE_ENV === 'production'
        injectReducer('home', createReducer, reducer.default);
        injectSagas(sagas.default);
        // #endif
        cb(null, component);
      } catch (e) {
        errorLoading(e);
      }
    },
  };
};
