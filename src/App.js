import React, { Component } from "react";
import styled from 'styled-components';
import { Router, Link } from "@reach/router";
import AL from "./components/AssetList";
import SL from "./components/stations/StationList";

const NavLink = styled(Link)`
  padding: 0 15px;
`
class App extends Component {
  render() {
    return (
      <div className="App">
       
        <nav>
          <NavLink to="/list">List</NavLink>
          <NavLink to="/stations">Stations</NavLink>
        </nav>
        <Router>
          <AL path="/list" />
          <SL path="/stations" />
        </Router>
      </div>
    );
  }
}

export default App;
