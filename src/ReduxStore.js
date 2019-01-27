import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from 'redux-saga';
import App from "./App";

import reducer from "./reducers";
import sagas from './sagas/';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);
export default _ => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
