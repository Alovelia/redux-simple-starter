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
import ErrorBoundary from 'common/error-boundary';
import Title from 'common/title/title';
import { connect } from 'react-redux';

export function Layout(props) {
  return (
    <div>
      <Helmet
        titleTemplate="%s"
        defaultTitle="..."
        meta={[
          { name: 'description', content: '...' },
        ]}
      />
      <Title id={props.title} />

      {/*<Header />*/}
      <ErrorBoundary>
        {React.Children.toArray(props.children)}
      </ErrorBoundary>
      {/*<Footer />*/}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};
Layout.defaultProps = {
  children: null,
  title: '_',
};

const mapStateToProps = state => ({
  title: state.getIn(['app', 'activePage', 'title'])
});

export default connect(
  mapStateToProps
)(Layout);
