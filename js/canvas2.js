/**
 * Created by amit on 5/10/14.
 */
(function (document, window) {
  var canvasId = "game";
  var roadSrc = './images/road.jpg', topForestSrc = "./images/lake.jpg", bottomForestScr = './images/lake.jpg',
    carSrc = './images/car.jpg';
  var canvasWidth = 1000, canvasHeight = 350, blockCount = 10;
  var actualImageWidth = 225, actualImageHeight = 225, moveWidth = 25, maxMove = actualImageWidth / moveWidth;
  var blockWidth = canvasWidth / blockCount, blockHeight = canvasHeight / 3.5;
  var context;

  function draw() {
    var canvas = document.getElementById(canvasId);
    if (canvas.getContext) {
      context = canvas.getContext('2d');
      context.canvas.width = canvasWidth;
      context.canvas.height = canvasHeight;
      var moveCount = 0;
      drawGame(moveCount++);
      setInterval(function () {
        drawGame(moveCount++);
        if(moveCount > maxMove) {
          moveCount = 0;
        }
      }, 1000);
    } else {
      // Canvas unsupported code will go here.
    }
  }

  function drawGame(move) {
    drawTopForest(move);
    drawRoad(move);
    drawBottomForest(move);
//    drawCar();
  }

  function drawRoad(move) {
    var roadX = 0, roadY = blockHeight, roadIndex = 0;
    var road = new Image();
    road.onload = function () {
      while (roadIndex < blockCount + 1) {
        if (false && roadIndex == 0 && move != 0) {
          context.drawImage(road, moveWidth * move, 0, actualImageWidth, actualImageHeight, roadX, roadY, blockWidth, blockHeight * 1.5);
        } else {
          context.drawImage(road, roadX - (moveWidth * move), roadY, blockWidth, blockHeight * 1.5);
        }
        roadX = roadX + blockWidth;
        roadIndex++;
      }
    };
    road.src = roadSrc;
  }

  function drawTopForest(move) {
    var forestX = 0, forestY = 0, forestIndex = 0;
    var forest = new Image();
    forest.onload = function () {
      while (forestIndex < blockCount + 1) {
        context.drawImage(forest, forestX, forestY, blockWidth, blockHeight);
        forestX = forestX + blockWidth;
        forestIndex++;
      }
    };
    forest.src = topForestSrc;
  }

  function drawBottomForest(move) {
    var forestX = 0, forestY = blockHeight * 2.5, forestIndex = 0;
    var forest = new Image();
    forest.onload = function () {
      while (forestIndex < blockCount + 1) {
        context.drawImage(forest, forestX, forestY, blockWidth, blockHeight);
        forestX = forestX + blockWidth;
        forestIndex++;
      }
    };
    forest.src = bottomForestScr;
  }

  function drawCar() {
    var carX = 20, carY = ((canvasHeight - blockHeight) / 2) + (blockHeight / 3);
    var car = new Image();
    car.onload = function () {
      context.drawImage(car, carX, carY, 40, 30);
    };
    car.src = carSrc;
  }

  window.onload = draw;
}(document, window));