import React, { Component } from "react";
import { connect } from "react-redux";
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
        const { stations } = data.data;
        this.props.gotStation(stations);
      })
      .catch(err => {
        this.props.failedStation(err);
      });
  }
  render() {
    console.log(this.props.isLoading);
    if (this.props.isLoading) {
      return <div>Loading...</div>;
    }
    const stations = this.props.stations.map((station, i) => {
      return <li key={i}>{station.name}</li>;
    });

    return (
      <>
        <button onClick={this.props.sortStations}>Sort</button>
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
    error: stationReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStation: () => dispatch({ type: RETRIEVE_STATIONS }),
    gotStation: payload => dispatch({ type: GOT_STATIONS, payload }),
    failedStation: err => dispatch({ type: FAILED_GET_STATIONS, payload: err }),
    sortStations: () => dispatch({ type: SORT_STATIONS })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StationList);
