import React, { Component } from "react";
import { connect } from "react-redux";
import * as d3 from 'd3';
import boroughs from '../data/Borough Boundaries.geojson';
import {
  RETRIEVE_STATIONS,
  GOT_STATIONS,
  FAILED_GET_STATIONS,
  SORT_STATIONS
} from "../constants/stations";

import axios from "axios";
class StationList extends Component {
  componentDidMount() {
    this.props.getStation();
    axios
      .get("https://gbfs.citibikenyc.com/gbfs/en/station_information.json")
      .then(({ data }) => {
        let { stations } = data.data;

        const boroughStations = stations.map(station => {
          let currentBorough = boroughs.features.filter((borough) => {
            return d3.geoContains(borough.geometry, [station.lon, station.lat]);
          })
          
          let boroughName = 'N/A';
          if (currentBorough.length > 0) { 
            boroughName = currentBorough[0].properties.boro_name }
          
          return {
            ...station,
            borough: boroughName
          }
        })
        
        this.props.gotStation(boroughStations);
      })
      .catch(err => {
        this.props.failedStation(err);
      });
  }

  handleSort() {
    let sortedStation = [...this.props.stations];
    sortedStation.sort((a, b) => {
        if (a.name < b.name) {
          return -1
        } else {
          return 1
        }
      });
     if (!this.props.sortAsc) {  
      sortedStation = this.props.stations.reverse();
    }
    this.props.sortStations(sortedStation)
  }
  render() {
    if (this.props.isLoading) {
      return <div>Loading...</div>;
    }
    const stations = this.props.stations.map((station, i) => {
      return <li key={i}>{station.name} - {station.borough}</li>;
    });

    return (
      <>
        <button onClick={this.handleSort.bind(this)}>Sort</button>
        <ul>{stations}</ul>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { stationReducer } = state;
  return {
    stations: stationReducer.stations,
    isLoading: stationReducer.isLoading,
    error: stationReducer.error,
    isSorted: stationReducer.isSorted,
    sortAsc: stationReducer.sortAsc
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStation: () => dispatch({ type: RETRIEVE_STATIONS }),
    gotStation: payload => dispatch({ type: GOT_STATIONS, payload }),
    failedStation: err => dispatch({ type: FAILED_GET_STATIONS, payload: err }),
    sortStations: (newStations) => dispatch({ type: SORT_STATIONS, payload: newStations })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StationList);
