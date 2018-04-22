import React, { Component } from 'react';
import Boxes from './Boxes';
/*
import {yAxis} from './App'; 
*/
const yAxis = ["y1", "y2", "y3", "y4", "y5", "y6", "y7", "y8", "y9", "y10"];

const rows = yAxis.map((row) =>
    <div key={row.toString()} className={"boxrow " + row.toString()} >
        <Boxes />
    </div>
);

class Rows extends Component {
    render() {
        return(
            <div id="board">
                {rows}
            </div>
        );
    } 

}

export default Rows; 