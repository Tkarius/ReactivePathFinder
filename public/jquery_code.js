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
    var boxCoordinateX = $(this).attr("class").split(" ")[1].substring(1);
    var boxCoordinateY = $(this).parent().parent().attr("class").split(" ")[1].substring(1);
    console.log("Box coordinate X: " + boxCoordinateX + " Y: " + boxCoordinateY);
    if (blockType === "Start" && startSet === false) {
      startCoordinate = `x${boxCoordinateX}y${boxCoordinateY}`;
      blockClass = "startBlock";
      startSet = true;
    }
    else if (blockType === "End" && endSet === false) {
      endCoordinate = `x${boxCoordinateX}y${boxCoordinateY}`;
      blockClass = "endBlock";
      endSet = true;
    }
    else if (blockType === "Obstacle") {
      renderObstacles(blockSizeX, blockSizeY, boxCoordinateX, boxCoordinateY, coordinateNeighbors, coordinates);
    }
    $(this).addClass(blockClass);
    //reduceAvailableAmount(blockName);
  });

  $(".chooseButton").click(function (event) {
    blockName = event.target.id;
    blockType = $(this).attr("data");
    blockSizeX = $(this).attr("sizex");
    blockSizeY = $(this).attr("sizey");
    console.log("Clicked block button!" + blockType + "SizeX: " + blockSizeX + " SizeY: " + blockSizeY);
  });

  $("#showRoute").click(function(event) {
    //pass the needed parameters to algorithm and calculate route.
    console.log("Calculating route!")
  });
});

function renderObstacles(blockSizeX, blockSizeY, boxCoordinateX, boxCoordinateY, coordinateNeighbors, coordinates) {
  var newCoordinateY = boxCoordinateY;
  var newCoordinateX = boxCoordinateX;
  for (var i = 0; i < blockSizeY; i++) {
    for (var j = 0; j < blockSizeX; j++) {
      makeObstacle(newCoordinateY, newCoordinateX, coordinateNeighbors, coordinates);
      newCoordinateX++;
    }
    console.log("Adding to Y coordinates!");
    newCoordinateX = boxCoordinateX;
    newCoordinateY++;
  }

}

function makeObstacle(coordinateY, coordinateX, coordinateNeighbors, coordinates) {
  var coordinate = `x${coordinateX}y${coordinateY}`;
  removeFromValidNeigbors(coordinate, coordinateNeighbors);
  removeFromCoordinateList(coordinate, coordinates);
  console.log("Making obstacle!")
  var yClass = ".y" + coordinateY;
  var xClass = ".x" + coordinateX;
  $(yClass).children().children(xClass).addClass("obstacle");
  console.log($(yClass).children(xClass));
  console.log(coordinateNeighbors);
  console.log(coordinates);
}

/*
//Block availability is not currently used since we'd need to add a check on the top level which only renders the item visible if
//it still has availability left. Think we can just leave the entire thing out for now. :P
function reduceAvailableAmount(blockName) {
  var elementId = "#" + blockName + '_block';
  var currentAvailableAmount = parseInt($(elementId).children().children().children('.availableAmount').html());
  var newAvailableAmount = currentAvailableAmount - 1;
  console.log("Reducing available amount! Current amount: " + currentAvailableAmount);
  $(elementId).children().children().children('.availableAmount').html(newAvailableAmount);
  if (newAvailableAmount === 0) {
    $(elementId).children().children().children('chooseButton').click(null);
    $(elementId).children().children().children('chooseButton').toggleClass('inactiveButton');
  }
};*/

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

function getAllBoxCoordinates(boardXaxisLength, boardYaxisLength){
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
  for (var i = Math.max(x-1, 1); i <= Math.min(x + 1, boardXaxisLength); i++) {
    for (var j = Math.max(y-1, 1); j <= Math.min(y + 1, boardYaxisLength); j++) {
      if ((i !== x || j !== y) && (i === x || j === y)) { //we need to both prevent the cell from being marked as it's own neighbor as well as prevent moving from corner to corner
        var coordinate = `x${i}y${j}`;
        neighbors[coordinate] = 1;
      }
    }
  }
  return neighbors;
};

/**
 * Removes the obstacle coordinate from coordinate neighbors list as well as removes the
 * obstacle coordinate from valid neighbors from other coordinates.
 * @param {*} obstacleCoordinate 
 * @param {*} coordinateNeighbors 
 */
function removeFromValidNeigbors(obstacleCoordinate, coordinateNeighbors){
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
  if(index !== -1){
    coordinates.splice(index, 1);
  }
  return coordinates;
}
