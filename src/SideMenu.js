import React, { Component } from 'react';
import Block from './Block.js';
/*this component will be responsible for creating the block menu from which
* the user can select start/end point and boulder blocks to place on the board.
*/
var availableActions = { 'StartPoint': { 'Label': 'Start Point', 'Type': 'Start', 'SizeY': 1, 'SizeX': 1, 'AvailableAmount': 1 }, 'EndPoint': { 'Label': 'End Point', 'Type': 'End', 'SizeY': 1, 'SizeX': 1, 'AvailableAmount': 1 }, 'Obstacle1': { 'Label': 'Small Obstacle', 'Type':'Obstacle', 'SizeY': 1, 'SizeX': 1, 'AvailableAmount': 50 }, 'Obstacle2': { 'Label': 'Medium Obstacle', 'Type':'Obstacle', 'SizeY': 3, 'SizeX': 2, 'AvailableAmount': 10 } };
var actionButtons = [];
for (var action in availableActions) {
    actionButtons.push(<Block key={action} label={availableActions[action]['Label']} type={availableActions[action]['Type']} name={action} sizeY={availableActions[action]['SizeY']} sizeX={availableActions[action]['SizeX']} availableAmount={availableActions[action]['AvailableAmount']} />)
}

class SideMenu extends Component {
    render() {
        return (
            <div id="sideMenu">
                {actionButtons}
            </div>
        );
    }
}

export default SideMenu;