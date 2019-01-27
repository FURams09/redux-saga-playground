import axios from 'axios'
import * as d3 from 'd3';
import boroughs from '../data/Borough Boundaries.geojson';

import { put, call, takeEvery} from 'redux-saga/effects';
import {RETRIEVE_STATIONS, GOT_STATIONS, UPDATE_DISPLAY_LIST, FAILED_GET_STATIONS, SORT_STATIONS} from '../constants/stations'

export default function* watchStation() {
  yield takeEvery(RETRIEVE_STATIONS, getStationList);
  yield takeEvery(SORT_STATIONS, sortStations)
}

function* getStationList() {
  try {
    const res = yield call(axios.get, "https://gbfs.citibikenyc.com/gbfs/en/station_information.json")
    let { stations } = res.data.data;
    const boroughStations = yield stations.map(station => {
      let currentBorough = [];
      if (false) { // set to false to prevent expensive filter before adding a local cache
        currentBorough = boroughs.features.filter((borough) => {
          return d3.geoContains(borough.geometry, [station.lon, station.lat]);
        })
  
      }
      
      let boroughName = 'N/A';
      if (currentBorough.length > 0) { 
        boroughName = currentBorough[0].properties.boro_name }
      
      return {
        ...station,
        borough: boroughName
      }
    })
          
    yield put({type: GOT_STATIONS, payload: boroughStations});
  } catch (error) {
    yield put({type: FAILED_GET_STATIONS, payload: error})
  }
}

function* sortStations(action) {
  let sortedStation = yield action.payload.stations.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    } else {
      return 1
    }
  });
 if (!action.payload.isAsc) {  
    sortedStation = action.payload.stations.reverse();
  }
  yield put({type: UPDATE_DISPLAY_LIST, payload: sortedStation});
}