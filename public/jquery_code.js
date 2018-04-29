console.log('Here we are!');
var imageRootPath = './pics/';

var obstacleImages = ['obstacle1.png', 'obstacle2.png', 'obstacle3.png', 'obstacle4.png'];
var startImage = 'start.png';
var endImage = 'end2.png';
var hindranceImages = ['hindrance.png'];

var startSet = false;
var endSet = false;

var startCoordinate = "";
var endCoordinate = "";

var boardXaxisLength = $('#board').attr('xaxislength');
var boardYaxisLength = $('#board').attr('yaxislength');

var pathMarker = 'path.png';


console.log(`Board dimensions: ${boardXaxisLength} x ${boardYaxisLength}`);
//array of coordinates in form of coordinates = [x1y1, x2y1...]
var coordinates = getAllBoxCoordinates(boardXaxisLength, boardYaxisLength);

/*object of coordinates and their valid neighbors in form of {x1y1: {x2y1, x1y2...}...}
* only valid neighbors are listed and as obstacles are added to the board the invalid coordinates
* are removed.
*/
var coordinateNeighbors = getAllBoxCoordinatesWNeighbors(boardXaxisLength, boardYaxisLength);;

//Information about the currently active block mode. We might want to encapsulate these to an object
var blockName = "";
var blockType = "";
var blockSizeX = 0;
var blockSizeY = 0;

$(function () {
  console.log("here again!")
  $(".box").bind("click", function (event) {
    console.log("Status: end: " + endSet + " start: " + startSet)
    var blockClass = "";
    var boxCoordinateX = $(this).attr("id").split("_")[0].substring(1);
    var boxCoordinateY = $(this).attr("id").split("_")[1].substring(1);
    var fullCoordinateID = `#x${boxCoordinateX}_y${boxCoordinateY}`;
    console.log("Clicked on board! " + fullCoordinateID);
    if (blockType === "Start") {
      if (!startSet) {
        startCoordinate = `x${boxCoordinateX}_y${boxCoordinateY}`;
        $(fullCoordinateID).append(`<img class="blockImage" src="${imageRootPath}${startImage}" />`);
        $(this).addClass("startBlock");
        startSet = true;
      } else if (startSet && `x${boxCoordinateX}_y${boxCoordinateY}` === startCoordinate){
        $(fullCoordinateID).removeClass(`startBlock`);
        $(fullCoordinateID).children('img').remove();
        startSet = false;
        startCoordinate = "";
      }
    }
    else if (blockType === "End") {
      if (!endSet) {
        endCoordinate = `x${boxCoordinateX}_y${boxCoordinateY}`;
        $(fullCoordinateID).append(`<img class="blockImage" src="${imageRootPath}${endImage}" />`);
        $(this).addClass("endBlock");
        endSet = true;
      } else if (endSet && `x${boxCoordinateX}_y${boxCoordinateY}` === endCoordinate){
        $(fullCoordinateID).removeClass(`endBlock`);
        $(fullCoordinateID).children('img').remove();
        endSet = false;
        endCoordinate = "";
      }
    }
    else if (blockType === "Obstacle" || blockType === "Hindrance") {
      renderObstaclesAndHindrances(blockType, blockSizeX, blockSizeY, boxCoordinateX, boxCoordinateY, coordinateNeighbors, coordinates);
    }
  });

  $(".chooseButton").click(function (event) {
    blockName = event.target.id;
    blockType = $(this).attr("data");
    blockSizeX = $(this).attr("sizex");
    blockSizeY = $(this).attr("sizey");
  });

  $("#showRoute").click(function () {
    if (startSet && endSet) {
      console.log("Calculating route!")
      var path = buildPath(coordinates, coordinateNeighbors, startCoordinate, endCoordinate);
      console.log(path);
      for (var i = 0; i < path.length; i++) {
        var coordinateID = "#" + path[i];
        if (path[i] !== startCoordinate && path[i] !== endCoordinate) {
          $(coordinateID).addClass("path");
          $(coordinateID).append(`<img class="blockImage" src="${imageRootPath}${pathMarker}" />`);
        }
      }
    }
  });
});
function renderObstaclesAndHindrances(blockType, blockSizeX, blockSizeY, boxCoordinateX, boxCoordinateY, coordinateNeighbors, coordinates) {
  var newCoordinateY = boxCoordinateY;
  var newCoordinateX = boxCoordinateX;
  for (var i = 1; i <= blockSizeY; i++) {
    for (var j = 1; j <= blockSizeX; j++) {
      if (checkBoxClass(i, j) !== 'startBlock' && checkBoxClass(i, j) != 'endBlock') {
        var fullCoordinateID = `#x${newCoordinateX}_y${newCoordinateY}`;
        if ($(fullCoordinateID).children().length != 0) {
          cleanBox(fullCoordinateID);
          
        }
        if (blockType === "Obstacle") {
          makeObstacle(newCoordinateY, newCoordinateX, coordinateNeighbors, coordinates);
        } else {
          makeHindrance(newCoordinateY, newCoordinateX, coordinateNeighbors, coordinates);
        }
        newCoordinateX++;
      }
    }
    newCoordinateX = boxCoordinateX;
    newCoordinateY++;
  }

}

function makeObstacle(coordinateY, coordinateX, coordinateNeighbors, coordinates) {
  var coordinate = `x${coordinateX}_y${coordinateY}`;
  var fullCoordinateID = `#x${coordinateX}_y${coordinateY}`;
  $(fullCoordinateID).addClass("obstacle");
  $(fullCoordinateID).append(`<img class="blockImage" src="${imageRootPath}${obstacleImages[Math.floor(Math.random() * obstacleImages.length)]}" alt="obstacle"/>`)
  //console.log(`${fullCoordinateID}: ${imageRootPath}${obstacleImages[Math.floor(Math.random() * obstacleImages.length)]}`);
  removeFromValidNeigbors(coordinate, coordinateNeighbors);
  removeFromCoordinateList(coordinate, coordinates);
}

function makeHindrance(coordinateY, coordinateX, coordinateNeighbors, coordinates) {
  var coordinate = `x${coordinateX}_y${coordinateY}`;
  var fullCoordinateID = `#x${coordinateX}_y${coordinateY}`
  modifyDistanceForNeighbors(coordinate, coordinateNeighbors);
  $(fullCoordinateID).append(`<img class="blockImage" src="${imageRootPath}${hindranceImages[Math.floor(Math.random() * hindranceImages.length)]}" />`)
  console.log("Making hindrance!" + hindranceImages[Math.floor(Math.random() * hindranceImages.length)])
  $(fullCoordinateID).addClass("hindrance");
}


function getAllBoxCoordinatesWNeighbors(boardXaxisLength, boardYaxisLength) {
  var coordinates = {};
  for (var i = 1; i <= boardXaxisLength; i++) {
    for (var j = 1; j <= boardYaxisLength; j++) {
      if (checkBoxClass(i, j) != "obstacle") {
        let coordinate = `x${i}_y${j}`;
        let coordinateNeighbors = getCoordinateNeighbors(i, j, boardXaxisLength, boardYaxisLength);
        coordinates[coordinate] = coordinateNeighbors;
      }
    }
  }
  return coordinates;
}

function getAllBoxCoordinates(boardXaxisLength, boardYaxisLength) {
  var coordinates = [];
  for (var i = 1; i <= boardXaxisLength; i++) {
    for (var j = 1; j <= boardYaxisLength; j++) {
      var boxClass = checkBoxClass(i, j);
      if (boxClass != "obstacle") {
        let coordinate = `x${i}_y${j}`;
        if (boxClass === 'startBlock') {
          console.log("Start block found at: " + coordinate);
          startSet = true;
          startCoordinate = coordinate;
        }
        else if (boxClass === 'endBlock') {
          console.log("End block found at: " + coordinate);
          endSet = true;
          endCoordinate = coordinate;
        }
        coordinates.push(coordinate);
      }
    }
  }
  return coordinates;
}

/**
 * Finds all neighbors for a given coordinate and returns an object of valid neighbors. This method
 * is called at board initialization and assumes all cells that are within board boundaris are valid.
 * 
 * @param {*} x 
 * @param {*} y 
 * @param {*} boardXaxisLength 
 * @param {*} boardYaxisLength 
 */
function getCoordinateNeighbors(x, y, boardXaxisLength, boardYaxisLength) {
  var neighbors = {};
  for (var i = Math.max(x - 1, 1); i <= Math.min(x + 1, boardXaxisLength); i++) {
    for (var j = Math.max(y - 1, 1); j <= Math.min(y + 1, boardYaxisLength); j++) {
      if ((i !== x || j !== y) && (i === x || j === y)) { //we need to both prevent the cell from being marked as it's own neighbor as well as prevent moving from corner to corner
        var boxClass = checkBoxClass(i, j);
        if (boxClass != "obstacle") {
          var coordinate = `x${i}_y${j}`;
          var weight = 1;
          if (boxClass === 'hindrance') {
            weight = 3;
          }
          neighbors[coordinate] = weight;
        }
      }
    }
  }
  return neighbors;
};

function cleanBox(fullCoordinateID) {
  $(`${fullCoordinateID}.obstacle`).children().remove();
  $(`${fullCoordinateID}.path`).children().remove();
  $(`${fullCoordinateID}.hindrance`).children().remove();
  $(`${fullCoordinateID}`).removeClass('obstacle');
  $(`${fullCoordinateID}`).removeClass('path');
  $(`${fullCoordinateID}`).removeClass('hindrance');
}

function modifyDistanceForNeighbors(hindranceCoordinate, coordinateNeighbors) {
  for (coordinate in coordinateNeighbors) {
    if (coordinateNeighbors[coordinate][hindranceCoordinate] !== undefined) {
      coordinateNeighbors[coordinate][hindranceCoordinate] = 3;
    }
  }
};

/**
 * Removes the obstacle coordinate from coordinate neighbors list as well as removes the
 * obstacle coordinate from valid neighbors from other coordinates.
 * @param {*} obstacleCoordinate 
 * @param {*} coordinateNeighbors 
 */
function removeFromValidNeigbors(obstacleCoordinate, coordinateNeighbors) {
  delete coordinateNeighbors[obstacleCoordinate];
  for (coordinate in coordinateNeighbors) {
    if (coordinateNeighbors[coordinate][obstacleCoordinate] !== undefined) {
      delete coordinateNeighbors[coordinate][obstacleCoordinate];
    }
  }
};

//Used to remove invalid coordinates from coordinates array as we add obstacles.
function removeFromCoordinateList(coordinateToRemove, coordinates) {
  var index = coordinates.indexOf(coordinateToRemove);
  if (index !== -1) {
    console.log("removing coordinate from list index: " + index);
    coordinates.splice(index, 1);
  }
  return coordinates;
}

function checkBoxClass(coordinateX, coordinateY) {
  var fullCoordinateID = `#x${coordinateX}_y${coordinateY}`
  var classes = $(fullCoordinateID).attr('class').split(/\s+/);
  //console.log(classes);
  if (classes.length > 1) {
    return classes[1];
  }
  return " ";
}
