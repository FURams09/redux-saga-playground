import React, { Component } from "react";
import { connect } from "react-redux";
import * as d3 from 'd3';
import boroughs from '../../data/Borough Boundaries.geojson';
import styled from 'styled-components';
import StationItem from './StationItem';
import {
  RETRIEVE_STATIONS,
  GOT_STATIONS,
  FAILED_GET_STATIONS,
  SORT_STATIONS,
} from "../../constants/stations";

import {MAPS_API_KEY} from '../../secrets';
import GoogleMapReact from 'google-map-react';

import axios from "axios";

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 500px;
`
const MapArea = styled.div`
  width: 300px;
  height: 600px;
  border: 1px solid black;
`

const ListContainer = styled.div`
  height: 100vh;
  overflow: auto;
`

const Marker = styled.div`
  font-size: 8px;
`
class StationList extends Component {
  componentDidMount() {
    this.props.getStation();
  }

  handleSort() {
    this.props.sortStations(this.props.stations, this.props.sortAsc)
  }
  render() {
    if (this.props.isLoading) {
      return <div>Loading...</div>;
    }
    console.log(this.props.stations)
    const stations = this.props.stations.map((station, i) => {
      return <StationItem 
        key={i}
        name={station.name}
        borough={station.borough}
        lon={station.lon}
        lat={station.lat}
      />
    });
    return (
      <GridLayout>
        <div>
          <button onClick={this.handleSort.bind(this)}>Sort</button>
          <ListContainer>
            
            <ul>{stations}</ul>
          </ListContainer>
        </div>
        <div>
          <p>{this.props.displayedStation.name} lon: {this.props.displayedStation.lon} lat: {this.props.displayedStation.lat}</p>
          <MapArea>
            <GoogleMapReact
              bootstrapURLKeys={{key: MAPS_API_KEY}}
              center={{lat: this.props.displayedStation.lat, lng: this.props.displayedStation.lon}}
              defaultZoom={11}>
                <Marker lat={this.props.displayedStation.lat} lng = {this.props.displayedStation.lon} >Bike</Marker>
            </GoogleMapReact>
          </MapArea>
        </div>
      </GridLayout>
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
    sortAsc: stationReducer.sortAsc,
    displayedStation: stationReducer.displayedStation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStation: () => dispatch({ type: RETRIEVE_STATIONS }),
    gotStation: payload => dispatch({ type: GOT_STATIONS, payload }),
    failedStation: err => dispatch({ type: FAILED_GET_STATIONS, payload: err }),
    sortStations: (stations, isAsc) => dispatch({ type: SORT_STATIONS, payload: {stations, isAsc} }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StationList);
