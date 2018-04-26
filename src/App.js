import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Rows from './Rows';
import SideMenu from './SideMenu'


/*
* We need to ask the board dimensions from the user and then populate the arrays. These are only for testing
*/
const yAxis = ["y1", "y2", "y3", "y4", "y5", "y6", "y7", "y8", "y9", "y10"];
const xAxis = ["x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9", "x10"];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">

        </p>
        <div id ="showRouteDiv"><p className="button" id="showRoute">Calculate route!</p></div>
        <Rows yAxis = {yAxis} xAxis = {xAxis}/>
        <SideMenu />
        <Form />
      </div>
    );
  }
}

export default App;
export { yAxis };