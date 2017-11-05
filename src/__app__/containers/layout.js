/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

export function App(props) {
  return (
    <div>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
        meta={[
          { name: 'description', content: 'React.js' },
        ]}
      />
      {/*<Header />*/}
      {React.Children.toArray(props.children)}
      {/*<Footer />*/}
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};
App.defaultProps = {
  children: null,
};

export default App;
