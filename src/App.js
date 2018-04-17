import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Rows from './Rows';



const yAxis = ["y1", "y2", "y3", "y4", "y5"];
const xAxis = ["x1", "x2", "x3", "x4", "x5"];

/*
const rows = yAxis.map((row) =>
  <div key={row.toString()} className={"boxrow " + row.toString()} >
    x
    {boxes}
  </div>
);

const boxes = xAxis.map((box) =>
  <div key={box.toString()} className={"box " + box.toString()}>
    {box}
  </div>
);
*/

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
          <Rows />
      </div>
    );
  }
}

export default App; 
export {yAxis};