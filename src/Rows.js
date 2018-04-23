import React, { Component } from 'react';
import Boxes from './Boxes';
class Rows extends Component {
    render() {
        var yAxis = this.props.yAxis;
        var xAxis = this.props.xAxis;

        const rows = yAxis.map((row) =>
            <div key={row.toString()} className={"boxrow " + row.toString()} >
                <Boxes xAxis = {xAxis}/>
            </div>
        );
        console.log(yAxis.length);
        return (
            <div id="board" yaxislength={yAxis.length} xaxislength={xAxis.length}>
                {rows}
            </div>
        );
    }

}

export default Rows; 