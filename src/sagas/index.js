import stationSagas from './Stations';
import sstkSagas from './SSTK';
import {all} from 'redux-saga/effects';

export default function* rootSaga() {
  return yield all([
    stationSagas(),
    sstkSagas(),
  ])
}