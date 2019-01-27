import {put, delay, takeEvery} from 'redux-saga/effects'
import * as actions from '../constants/SSTK';

export default function* watchSSTK() {
    yield takeEvery(actions.ATTEMPT_LOGIN, login);
    yield takeEvery(actions.ATTEMPT_LOGOUT, logout);
  
}


function* login() {
  try {
    yield delay(1500)
    yield put({type: actions.LOGIN_SUCCESS});
  } catch (error) {
   yield put({type: actions.LOGIN_FAILURE}) 
  }
}

function* logout() {
  console.log('failed')
  try {
    yield delay(1000)
    yield put({type: actions.LOGOUT_SUCCESS})
  } catch (error) {
   yield put({type: actions.LOGOUT_FAILURE}) 
  }
}