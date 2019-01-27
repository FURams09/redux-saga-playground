import { combineReducers } from "redux";
import listReducer from "./ListReducer";
import stationReducer from "./StationsReducer";
import SSTKReducer from './SSTK';
export default combineReducers({
  listReducer,
  stationReducer,
  SSTKReducer
});
