import React, { Component } from "react";
import "./App.css";
import { Router, Link } from "@reach/router";
import AL from "./components/AssetList";
import SL from "./components/StationList";
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <nav>
          <Link to="/list">List</Link>
          <Link to="/stations">Stations</Link>
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
