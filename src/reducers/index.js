import { combineReducers } from "redux";
import listReducer from "./ListReducer";
import stationReducer from "./StationsReducer";

export default combineReducers({
  listReducer,
  stationReducer
});
