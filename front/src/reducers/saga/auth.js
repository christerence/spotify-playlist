import { call, put, takeEvery } from "redux-saga/effects";
import { actions } from "../auth";
import { checkLoginState, logout } from "../../api/spotify";
import { isEmpty, hasIn } from "lodash";


export const fetchUserAction = function*(action) {
  const result = yield call(checkLoginState);
  if (!isEmpty(result) && result.data !== "") {
    yield put({ type: actions.login, payload: result });
  }
};

export const logoutCallAction = function*(action) {
  const result = yield call(logout);
  if (result.data.success) {
    yield put({ type: actions.logout, payload: {} });
  }
};

const AuthSaga = function* Auth() {
  yield takeEvery(actions.fetchUser, fetchUserAction);
  yield takeEvery(actions.logoutCall, logoutCallAction);
};

export default AuthSaga;
