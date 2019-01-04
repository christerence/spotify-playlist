import { all } from "redux-saga/effects";
import AuthSaga from './auth';
import SpotifySaga from './spotify';

const saga = function*() {
  yield all([
      AuthSaga(),
      SpotifySaga(),
  ]);
};

export default saga;
