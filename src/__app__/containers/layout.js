import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeTitleSelector } from '../selectors';
import Layout from '../components/layout';

export const mapStateToProps = createStructuredSelector({
  title: makeTitleSelector(),
});

export const mapDispatchToProps = {
  //†action
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
