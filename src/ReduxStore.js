import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from 'redux-saga';
import App from "./App";

import reducer from "./reducers";
import stationSagas from './sagas/Stations';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(stationSagas);
export default _ => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
