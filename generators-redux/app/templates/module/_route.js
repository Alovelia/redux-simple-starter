import { routingConfig } from 'app/routes-config';
import { errorLoading } from 'common/error-core';
import { getAsyncInjectors } from 'common/async-injectors';

const { path, name } = routingConfig['<%=name%>'];

export default (store) => {
  // #if process.env.NODE_ENV === 'production'
  // in production reducers and sagas will be loaded asynchronously
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);
  // #endif

  return {
    path,
    name,
    // #if process.env.NODE_ENV !== 'production'
    // eslint-disable-next-line
    component: require('./containers/<%=name%>').default,
    // #endif
    // #if process.env.NODE_ENV === 'production'
    async getComponent(nextState, cb) {
      try {
        const [
          component,
          reducer,
          sagas
        ] = await Promise.all([
          import('./containers/<%=name%>' /* webpackChunkName: "<%=name%>" */),
          import('./reducer' /* webpackChunkName: "<%=name%>" */),
          import('./sagas' /* webpackChunkName: "<%=name%>" */),
        ]);
        injectReducer('<%=_.camelCase(name)%>', reducer.default);
        injectSagas(sagas.default);
        cb(null, component.default);
      } catch (e) {
        errorLoading(e);
      }
    },
    // #endif
  };
};
