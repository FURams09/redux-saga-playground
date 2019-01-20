import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";

import reducer from "./reducers";
const store = createStore(reducer);

export default _ => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
