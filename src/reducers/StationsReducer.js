import {
  RETRIEVE_STATIONS,
  GOT_STATIONS,
  FAILED_GET_STATIONS,
  SORT_STATIONS,
  SELECT_STATION,
  UPDATE_FILTER_VALUE,
  UPDATE_DISPLAY_LIST
} from "../constants/stations";


const initialState = {
  stations: [],
  isLoading: false,
  error: null,
  isSorted: false,
  sortAsc: true,
  displayedStation: {
    name: 'N/A',
    lon: -73.930819,
    lat: 40.76599
  },
  filter: '',
  filteredStations: []
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
      filteredStations: action.payload,
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
      filteredStations: action.payload
    };
  }
  if (action.type === SELECT_STATION) {
    return {
      ...state,
      displayedStation: action.payload,
    }
  }

  if (action.type === UPDATE_FILTER_VALUE) {
    return {
      ...state,
      filter: action.payload
    }
  }

  if (action.type === UPDATE_DISPLAY_LIST) {
    return {
      ...state,
      filteredStations: action.payload
    }
  }

  return state;
};
