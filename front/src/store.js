import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import combinedReducer from "./reducers";
import saga from "./reducers/saga";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combinedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(saga);

export default store;
