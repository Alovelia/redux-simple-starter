import { cancel, take, put, takeLatest } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/lib/utils';
import { LOCATION_CHANGE } from 'react-router-redux';
import { ACTION, TYPE } from '../reducer';

import { getData, getDataSaga } from '../sagas';

describe('getData Saga', () => {
  let getDataGenerator;
  const username = 'troll';
  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getDataGenerator = getData();

    const selectDescriptor = getDataGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getDataGenerator.next(username).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the getSuccess action if it requests the data successfully', () => {
    const response = {
      username
    };
    const putDescriptor = getDataGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(ACTION.getSuccess(username)));
  });


  it('should dispatch SOMETHING_ELSE if it requests the data successfully', () => {
    const somethingElseDescriptor = getDataGenerator.next().value;
    expect(somethingElseDescriptor).toMatchSnapshot();
  });

  it('should call the getError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getDataGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(ACTION.getError(response)));
  });
});

describe('getDataSaga Saga', () => {
  const getDataSagaGenerator = getDataSaga();
  const mockedTask = createMockTask();

  it(`should start task to watch for ${TYPE.GET} action`, () => {
    const takeLatestDescriptor = getDataSagaGenerator.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(TYPE.GET, getData));
  });
});
