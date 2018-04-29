console.log('Here we are!');
const imageRootPath = './pics/';

const obstacleImages = ['obstacle1.png', 'obstacle2.png', 'obstacle3.png', 'obstacle4.png'];
const startImage = 'start.png';
const endImage = 'end2.png';
const hindranceImages = ['hindrance.png'];


$(function () {
  var startSet = false;
  var endSet = false;

  var startCoordinate = "";
  var endCoordinate = "";

  const boardXaxisLength = $('#board').attr('xaxislength');
  const boardYaxisLength = $('#board').attr('yaxislength');


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

  $(".box").click(function (event) {
    var blockClass = "";
    var boxCoordinateX = $(this).attr("id").split("_")[0].substring(1);
    var boxCoordinateY = $(this).attr("id").split("_")[1].substring(1);
    var fullCoordinateID = `#x${boxCoordinateX}_y${boxCoordinateY}`;
    if (blockType === "Start" && startSet === false) {
      startCoordinate = `x${boxCoordinateX}y${boxCoordinateY}`;
      $(fullCoordinateID).append(`<img class="blockImage" src="${imageRootPath}${startImage}" />`);
      blockClass = "startBlock";
      startSet = true;
    }
    else if (blockType === "End" && endSet === false) {
      endCoordinate = `x${boxCoordinateX}y${boxCoordinateY}`;
      $(fullCoordinateID).append(`<img class="blockImage" src="${imageRootPath}${endImage}" />`);
      blockClass = "endBlock";
      endSet = true;
    }
    else if (blockType === "Obstacle" || blockType === "Hindrance") {
      renderObstaclesAndHindrances(blockType, blockSizeX, blockSizeY, boxCoordinateX, boxCoordinateY, coordinateNeighbors, coordinates);
    }
    $(this).addClass(blockClass);
    //reduceAvailableAmount(blockName);
  });

  $(".chooseButton").click(function (event) {
    blockName = event.target.id;
    blockType = $(this).attr("data");
    blockSizeX = $(this).attr("sizex");
    blockSizeY = $(this).attr("sizey");
  });

  $("#showRoute").click(function (event) {
    if (startSet && endSet) {
      var path = buildPath(coordinates, coordinateNeighbors, startPoint, endPoint);
      console.log("Calculating route!")
      console.log(path);
    }
  });
});

function renderObstaclesAndHindrances(blockType, blockSizeX, blockSizeY, boxCoordinateX, boxCoordinateY, coordinateNeighbors, coordinates) {
  var newCoordinateY = boxCoordinateY;
  var newCoordinateX = boxCoordinateX;
  for (var i = 0; i < blockSizeY; i++) {
    for (var j = 0; j < blockSizeX; j++) {
      if (blockType === "Obstacle") {
        makeObstacle(newCoordinateY, newCoordinateX, coordinateNeighbors, coordinates);
      } else {
        makeHindrance(newCoordinateY, newCoordinateX, coordinateNeighbors, coordinates);
      }
      newCoordinateX++;
    }
    console.log(coordinateNeighbors);
    newCoordinateX = boxCoordinateX;
    newCoordinateY++;
  }

}

function makeObstacle(coordinateY, coordinateX, coordinateNeighbors, coordinates) {
  var coordinate = `x${coordinateX}y${coordinateY}`;
  var fullCoordinateID = `#x${coordinateX}_y${coordinateY}`
  $(fullCoordinateID).addClass("obstacle");
  $(fullCoordinateID).append(`<img class="blockImage" src="${imageRootPath}${obstacleImages[Math.floor(Math.random() * obstacleImages.length)]}" />`)
  removeFromValidNeigbors(coordinate, coordinateNeighbors);
  removeFromCoordinateList(coordinate, coordinates);
}

function makeHindrance(coordinateY, coordinateX, coordinateNeighbors, coordinates) {
  var coordinate = `x${coordinateX}y${coordinateY}`;
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
      let coordinate = `x${i}y${j}`;
      let coordinateNeighbors = getCoordinateNeighbors(i, j, boardXaxisLength, boardYaxisLength);
      coordinates[coordinate] = coordinateNeighbors;
    }
  }
  return coordinates;
}

function getAllBoxCoordinates(boardXaxisLength, boardYaxisLength) {
  var coordinates = [];
  for (var i = 1; i <= boardXaxisLength; i++) {
    for (var j = 1; j <= boardYaxisLength; j++) {
      let coordinate = `x${i}y${j}`;
      coordinates.push(coordinate);
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
        var coordinate = `x${i}y${j}`;
        neighbors[coordinate] = 1;
      }
    }
  }
  return neighbors;
};

function modifyDistanceForNeighbors(hindranceCoordinate, coordinateNeighbors) {
  for (coordinate in coordinateNeighbors) {
    if (coordinateNeighbors[coordinate][hindranceCoordinate] !== undefined) {
      coordinateNeighbors[coordinate][hindranceCoordinate] = 1.5;
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
    coordinates.splice(index, 1);
  }
  return coordinates;
}
