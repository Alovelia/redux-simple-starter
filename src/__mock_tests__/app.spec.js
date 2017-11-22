import React from 'react';
import ReactDOM from 'react-dom';
// https://github.com/airbnb/enzyme
import { mount, shallow } from 'enzyme';
import App from './app';

// https://github.com/vjwilson/enzyme-example-jest/blob/master/src/__tests__/Foo-test.js
/* global it, expect */
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders and check html in component', () => {
  const wrapper = shallow(<App />);
  const welcome = <h2>Welcome to React</h2>;
  expect(wrapper.contains(welcome)).toEqual(true);
});

it('renders and checks text in tag', () => {
  const wrapper = shallow(<App />);
  const code = wrapper.find('code');
  expect(code.text()).toBe('src/app.js');
});
