import React, { Component } from 'react';
import boxImage1 from './grass1.png';
import boxImage2 from './grass2.png';

const boxImages = [boxImage1, boxImage2];

class Boxes extends Component {
    render() {
        var boxStyle = {
            backgroundSize: "cover",                     
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${boxImages[Math.floor(Math.random() * boxImages.length)]})`
        }
        var xAxis = this.props.xAxis;
        var yAxis = this.props.yAxis;
        const boxes = xAxis.map((box) =>
            <div key={box.toString()} className={"box"} id={`${box.toString()}_${yAxis}`} style={boxStyle}>
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