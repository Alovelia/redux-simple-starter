import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { compose } from 'redux';
import { AppContainer } from 'react-hot-loader';
import '../index.css';
import Child from './Child';
import AppConnected from './App';

//ROUTER MODE
// import { Router, browserHistory, hashHistory } from 'react-router'; // eslint-disable-line no-unused-vars
// import { syncHistoryWithStore } from 'react-router-redux';

//DEV TOOLS
// import DevTools from './DevTools';


// Create an enhanced history that syncs navigation events with the store
// const history = syncHistoryWithStore(browserHistory, store); //HTML5 history
// const history = syncHistoryWithStore(hashHistory, store);

/* eslint-disable */
// @connect(() => ({}), {
//   trigger: () => ({ type: 'EVENT' })
// })
const HOC = (ChildComp)=>{
  return <ChildComp />
};

// class App extends Component {
//   constructor(props){
//     super(props);
//     this.state = {}
//   }
//   render() {
//     return (<div>
//       <button onClick={()=>{
//         this.setState({updated: true});
//         this.props.trigger()}}
//         >1Click ME PLEASE21!</button>
//       end122413222
//       <Child />
//     </div>);
//   }
// }
//
// const AppConnected =  compose(
//   connect(() => ({}), {
//   trigger: () => ({ type: 'EVENT1' })
// })
// )(App);

export default ({ store }) => {
    return (
      <AppContainer>
        <Provider store={store}>
          <AppConnected />
        </Provider>
      </AppContainer>
    );
  }
