import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Rows from './Rows';
import SideMenu from './SideMenu';
import Form from './Form';
var loadjs = require('loadjs');


/*
* We need to ask the board dimensions from the user and then populate the arrays. These are only for testing
*/
var yAxis = ["y1", "y2", "y3", "y4", "y5", "y6", "y7", "y8", "y9", "y10"];
var xAxis = ["x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9", "x10"];

function createArrays(newYAxis, newXAxis){
  console.log('Creating new arrays!');
  var tempX  = [];
  var tempY = [];
  for (var i = 1; i <= newYAxis; i++){
    tempY.push(`y${i}`)
  }
  for (var i = 1; i <= newXAxis; i++){
    tempX.push(`x${i}`)
  }
  yAxis = tempY;
  xAxis = tempX;
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xAxis: 10,
      yAxis: 10
    };
  };
  componentWillMount(){
    loadjs('./jquery_code.js');
  }
  updateAxis = (newYAxis, newXAxis) => {
    createArrays(newYAxis, newXAxis);
    this.setState({'xAxis': newXAxis});
    this.setState({'yAxis': newYAxis});
    loadjs('./jquery_code.js');
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Reactive Path Finder</h1>
        </header>
        <p className="App-intro">

        </p>
        <div id ="showRouteDiv"><p className="button" id="showRoute">Calculate route!</p></div>
        <Rows yAxis = {yAxis} xAxis = {xAxis}/>
        <SideMenu />
        <Form updateAxis = {this.updateAxis}/>
      </div>
    );
  }
}

export default App;
export { yAxis };