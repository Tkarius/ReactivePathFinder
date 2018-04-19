import React, { Component } from 'react';
import ActionButton from './ActionButton.js';
/*this component will be responsible for creating the block menu from which
* the user can select start/end point and boulder blocks to place on the board.
*/
var availableActions = {'StartPoint':{'SizeY':1,'SizeX':1, 'AvailableAmount':1}, 'EndPoint':{'SizeY':1, 'SizeX':1,'AvailableAmount':1}, 'Obstacle1':{'SizeY':1, 'SizeX':1,'AvailableAmount':50}};
var actionButtons = [];
for (var action in availableActions) {
    actionButtons.push(<ActionButton key={action} name={action} sizeY={availableActions['SizeY']} sizeX={availableActions['SizeX']} availableAmount={availableActions['AvailableAmount']} />)
}

class SideMenu extends Component {
    render(){
        return(
            <div className="sideMenu">
                {actionButtons}
            </div>
        );
    }
}

export default SideMenu;