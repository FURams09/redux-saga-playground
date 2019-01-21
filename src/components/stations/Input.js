import React, { Component } from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components'
import {UPDATE_FILTER_VALUE, GOT_STATIONS} from '../../constants/stations'
const InputBar = styled.input`
  margin: 10px 20px;
  padding: 2px;
  width: 300px;
`
const SubmitButton = styled.button`
  padding: 2px 4px;
  margin: 10px;
`


class Input extends Component {
  handleChange(e) {
    this.props.updateInput(e.target.value);
  }

  handleFilter() {
    const newStations = this.props.stations.filter((station) => {
      console.log(station)
      return station.name.toLowerCase().indexOf(this.props.value.toLowerCase()) > -1
    })
    this.props.applyFilter(newStations);
  }
  render() {
    return (<>
        <InputBar placeholder='Filter' value={this.props.value || ''} onChange={this.handleChange.bind(this)}/>
        <SubmitButton onClick={this.handleFilter.bind(this)}>Submit</SubmitButton>
      </>)
  }
}

const mapStateToProps = ({ stationReducer } ) => {
  return {
    value: stationReducer.filterValue,
    stations: stationReducer.stations
  }
}

const mapDispathToProps = dispatch => {
  return {
    updateInput:(value)=>{ dispatch({type: UPDATE_FILTER_VALUE, payload: value })},
    applyFilter:(filteredStations) => {dispatch({type: GOT_STATIONS, payload: filteredStations})}
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Input)