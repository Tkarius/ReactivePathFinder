import React, { Component } from 'react';
/*These are action buttons that will be the selectable blocks in side menu
* The buttons have name, size (Y/X) which indicates how many tiles the block covers as well as
* amount which indicates how many blocks of that type can be present in the board at any one time.
*/

class ActionButton extends Component {
    render() {
        var name = this.props.name;
        var sizeY = this.props.sizeY
        var elementID = `${name}_button`
        return (
        <div className="actionButton" id={elementID}>
            <p>{name}</p>
            <p>{sizeY}</p>
        </div>
        )
    }
}

export default ActionButton;