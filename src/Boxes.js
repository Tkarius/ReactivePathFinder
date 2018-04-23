import React, { Component } from 'react';

class Boxes extends Component {
    render() {
        var xAxis = this.props.xAxis;
        const boxes = xAxis.map((box) =>
            <div key={box.toString()} className={"box " + box.toString()}>

            </div>
        );
        return (
            <div>
                {boxes}
            </div>

        );
    }
}

export default Boxes; 