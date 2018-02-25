/**
 * Asynchronously loads the component
 */
import Loadable from 'react-loadable';

import LoadingIndicator from 'common/components/loading-indicator';

export default Loadable({
  loader: () => import('./containers/home'),
  loading: LoadingIndicator,
});
