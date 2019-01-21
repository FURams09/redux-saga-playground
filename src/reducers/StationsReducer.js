import {
  RETRIEVE_STATIONS,
  GOT_STATIONS,
  FAILED_GET_STATIONS,
  SORT_STATIONS,
  SELECT_STATION
} from "../constants/stations";

const initialState = {
  stations: [],
  isLoading: false,
  error: null,
  isSorted: false,
  sortAsc: true,
  displayedStation: {
    name: 'N/A',
    lon: 0,
    lat: 0
  }
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
  if (action.type === SELECT_STATION) {
    return {
      ...state,
      displayedStation: action.payload,
    }
  }

  return state;
};
