import MainLayout from './containers/layout';
import homeRoute from '../home/route';
//†import

// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
// import { getAsyncInjectors } from './utils/asyncInjectors';

// eslint-disable-next-line
export default function createRoutes(store) {
  return [
    {
      component: MainLayout,
      childRoutes: [
        homeRoute(store),
        //†route
        // {
        //   path: '/features',
        //   name: 'features',
        //   getComponent(nextState, cb) {
        //     import('containers/FeaturePage')
        //       .then(loadModule(cb))
        //       .catch(errorLoading);
        //   },
        // },
        // {
        //   path: '*',
        //   name: 'notfound',
        //   getComponent(nextState, cb) {
        //     import('containers/NotFoundPage')
        //       .then(loadModule(cb))
        //       .catch(errorLoading);
        //   },
        // },
        //†route
      ],
      // onEnter: requireAuth(store),
      // onChange: test(store)
    },
    // {
    //
    //   component: LoginLayoutContainer,
    //   childRoutes: [
    //     loginRoute(store),
    //     forgotPasswordRoute(store),
    //     newPasswordRoute(store)
    //   ]
    // },
    // {
    //   path: '/logout',
    //   onEnter: (nextState, replace) => {
    //     global.location.href = `${global.context}/api/logout`;
    //   }
    // },
    // {
    //   path: '/*',
    //   onEnter: ({ params }, replace) => {
    //     replace('/');
    //   }
    // }
  ];
}
/*eslint-disable*/
