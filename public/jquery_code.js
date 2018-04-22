$(function() {
  var startSet = false;
  var endSet = false;

  var blockName = "";
  var blockType = "";    
  var blockSizeX = 0;
  var blockSizeY = 0;         
    $(".box").click(function(event) {
      var blockClass = "";
      var boxCoordinateX = $(this).attr("class").split(" ")[1].substring(1);
      var boxCoordinateY = $(this).parent().parent().attr("class").split(" ")[1].substring(1);
      console.log("Box coordinate X: " + boxCoordinateX +  " Y: " + boxCoordinateY);
      if (blockType === "Start" && startSet === false){
        blockClass = "startBlock";
        startSet = true;
      } 
      else if (blockType === "End" && endSet === false){
        blockClass = "endBlock";
        endSet = true;
      }
      else if (blockType === "Obstacle") {
        renderObstacles(blockSizeX, blockSizeY, boxCoordinateX, boxCoordinateY);
      }
      $(this).addClass(blockClass);
      //reduceAvailableAmount(blockName);
    });

    $(".chooseButton").click(function(event){
      blockName = event.target.id;
      blockType = $(this).attr("data");
      blockSizeX = $(this).attr("sizex");
      blockSizeY = $(this).attr("sizey");
      console.log("Clicked block button!" + blockType + "SizeX: " +blockSizeX+ " SizeY: " + blockSizeY);
    });
});

function renderObstacles(blockSizeX, blockSizeY, boxCoordinateX, boxCoordinateY){
  var newCoordinateY = boxCoordinateY;
  var newCoordinateX = boxCoordinateX;
  for (var i = 0; i < blockSizeY; i++){
    for (var j = 0; j < blockSizeX; j++) {
      makeObstacle(newCoordinateY, newCoordinateX);
      newCoordinateX++;
    }
    console.log("Adding to Y coordinates!");
    newCoordinateX = boxCoordinateX;
    newCoordinateY++;
  }
    
}

function makeObstacle(coordinateY, coordinateX){
  console.log("Making obstacle!")
  var yClass = ".y" + coordinateY;
  var xClass = ".x" + coordinateX;
  $(yClass).children().children(xClass).addClass("obstacle");
  console.log($(yClass).children(xClass));
}

//Block availability is not currently used since we'd need to add a check on the top level which only renders the item visible if
//it still has availability left. Think we can just leave the entire thing out for now. :P
function reduceAvailableAmount(blockName){
  var elementId = "#" + blockName + '_block';
  var currentAvailableAmount = parseInt($(elementId).children().children().children('.availableAmount').html());
  var newAvailableAmount = currentAvailableAmount-1;
  console.log("Reducing available amount! Current amount: " + currentAvailableAmount);
  $(elementId).children().children().children('.availableAmount').html(newAvailableAmount);
  if (newAvailableAmount === 0) {
    $(elementId).children().children().children('chooseButton').click(null);
    $(elementId).children().children().children('chooseButton').toggleClass('inactiveButton');
  }

}