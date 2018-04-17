import React, { Component } from 'react';

const xAxis = ["x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9", "x10"];
const boxes = xAxis.map((box) =>
<div key={box.toString()} className={"box " + box.toString()}>
    
</div>
);


class Boxes extends Component {
    render() {
        return (
            <div>
                {boxes}
            </div>

        );
    }
}

export default Boxes; 