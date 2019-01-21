import React, { Component } from 'react';
import {connect} from 'react-redux'
import {SELECT_STATION} from '../../constants/stations'
 class StationItem extends Component {
  handleClick() {
    const {name, lon, lat} = this.props
    this.props.selectStation(name, lon, lat)
  }

  render() {
    const {name, borough } = this.props;
    return <li>
      {name} - {borough} <button onClick={this.handleClick.bind(this)}>view</button>
      </li>
  }
}

const mapDispatchToFunction = (dispatch) => {
  return {
    selectStation: (name, lon, lat) => {
      dispatch({type: SELECT_STATION, payload: {name, lon, lat}});
    }
  }
}

export default connect(undefined, mapDispatchToFunction)(StationItem)