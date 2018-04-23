import React, { Component } from 'react';
/*These are action buttons that will be the selectable blocks in side menu
* The buttons have name, size (Y/X) which indicates how many tiles the block covers as well as
* amount which indicates how many blocks of that type can be present in the board at any one time.
*/

class Block extends Component {
    render() {
        var label = this.props.label;
        var name = this.props.name;
        var sizeY = this.props.sizeY;
        var sizeX = this.props.sizeX;
        var availableAmount = this.props.availableAmount;
        var type = this.props.type;
        var elementID = `${name}_block`
        return (
            <table className="blockTable" id={elementID}>
                <tbody>
                    <tr>
                        <th colSpan="3">{label}</th>
                    </tr>
                    <tr>
                        <td>SizeY: </td>
                        <td>{sizeY}</td>
                    </tr>
                    <tr>
                        <td>SizeX: </td>
                        <td>{sizeX}</td>
                        <td rowSpan="3" className="chooseButtonCell"><p className="chooseButton button" id={name} data={type} sizey={sizeY} sizex={sizeX}>Choose!</p></td>
                    </tr>
                    {/**<tr>
                        <td>Available: </td>
                        <td className="availableAmount">{availableAmount}</td>
                    </tr>*/}
                </tbody>
            </table>
        )
    }
}

export default Block;