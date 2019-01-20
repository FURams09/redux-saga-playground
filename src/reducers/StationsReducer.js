import {
  RETRIEVE_STATIONS,
  GOT_STATIONS,
  FAILED_GET_STATIONS,
  SORT_STATIONS
} from "../constants/stations";

const initialState = {
  stations: [],
  isLoading: false,
  error: null,
  isSorted: false,
  sortAsc: true
};

export default (state = initialState, action) => {
  if (action.type === RETRIEVE_STATIONS) {
    return {
      ...state,
      isLoading: true
    };
  }
  if (action.type === GOT_STATIONS) {
    return {
      ...state,
      stations: action.payload,
      isLoading: false,
      error: null
    };
  }
  if (action.type === FAILED_GET_STATIONS) {
    return {
      ...state,
      isLoading: false,
      error: action.payload
    };
  }
  if (action.type === SORT_STATIONS) {
    return {
      ...state,
      sortAsc: !state.sortAsc,
      isSorted: true,
      stations: action.payload
    };
  }

  return state;
};
