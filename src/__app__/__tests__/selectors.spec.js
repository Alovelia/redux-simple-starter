import { fromJS } from 'immutable';

import {
  selectRoute,
  selectApp,
  makeActivePageSelector,
  makeTitleSelector,
} from '../selectors';

describe('selectRoute', () => {
  it('should select the route state', () => {
    const routeState = fromJS({
      location: 'home',
    });
    const mockedState = fromJS({
      route: routeState,
    });
    expect(selectRoute(mockedState)).toEqual(routeState);
  });
});

describe('selectApp', () => {
  it('should select the app state', () => {
    const appState = fromJS({
      activePage: 'home',
    });
    const mockedState = fromJS({
      app: appState,
    });
    expect(selectApp(mockedState)).toEqual(appState);
  });
});

describe('makeActivePageSelector', () => {
  const selector = makeActivePageSelector();
  it('should select activePage', () => {
    const activePage = { title: 'home' };
    const app = { activePage };
    const mockedState = fromJS({
      app,
    });
    expect(selector(mockedState)).to.equal(fromJS(activePage));
  });
});

describe('makeTitleSelector', () => {
  const selector = makeTitleSelector();
  it('should select title', () => {
    const title = 'home';
    const app = { activePage: { title } };
    const mockedState = fromJS({
      app,
    });
    expect(selector(mockedState)).toEqual(title);
  });
});
