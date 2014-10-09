/**
 * Created by amit on 5/10/14.
 */
(function (document, window) {
  var canvasId = "game";
  var roadSrc = './images/road.jpg', topForestSrc = "./images/lake.jpg", bottomForestScr = './images/lake.jpg',
    carSrc = './images/car.png';
  var canvasWidth = 1000, canvasHeight = 350, blockCount = 10;
  var actualImageWidth = 225, actualImageHeight = 225, moveWidth = 5;
  var blockWidth = canvasWidth / blockCount, blockHeight = canvasHeight / 3.5, maxMove = blockWidth / moveWidth;
  var context;
  var carWidth = 100, carHeight = 50, carX = 20, actualCarY = ((canvasHeight - blockHeight) / 2) + carHeight / 2, carY = actualCarY;
  var roadHeight = blockHeight * 1.5;
  var carCurrentMove = 0, carMove = 2, carMaxMove = (roadHeight - (roadHeight / 2) + (carHeight / 2)) / 2;
  var KEY_CODE = {
    RIGHT: 39,
    UP: 38,
    DOWN: 40
  };
  var CAR_MOVE = {
    UP: "UP",
    DOWN: "DOWN"
  };

  function draw() {
    var canvas = document.getElementById(canvasId);
    if (canvas.getContext) {
      context = canvas.getContext('2d');
      context.canvas.width = canvasWidth;
      context.canvas.height = canvasHeight;
      var moveCount = 0;
      drawBackground(moveCount++);
      drawCar();
      window.addEventListener("keydown", keyDownHandler, true);
      function keyDownHandler(event) {
        switch (event.keyCode) {
          case KEY_CODE.RIGHT:
            drawBackground(moveCount++);
            break;
          case KEY_CODE.UP:
            drawBackground(moveCount++, CAR_MOVE.UP);
            break;
          case KEY_CODE.DOWN:
            drawBackground(moveCount++, CAR_MOVE.DOWN);
            break;
        }
        if (moveCount >= maxMove) {
          moveCount = 0;
        }
      }
    } else {
      // Canvas unsupported code will go here.
    }
  }

  function drawBackground(move, side) {
    drawTopForest(move);
    drawRoad(move);
    drawBottomForest(move);
    drawCar(side);
  }

  function drawRoad(move) {
    var roadX = 0, roadY = blockHeight, roadIndex = 0;
    var road = new Image();
    road.onload = function () {
      context.clearRect(roadX, roadY, canvasWidth, blockHeight * 1.5);
      while (roadIndex < blockCount + 1) {
        if (roadIndex == 0 && move != 0) {
          context.drawImage(road, move * actualImageWidth / maxMove, 0, actualImageWidth, actualImageHeight, roadX, roadY, blockWidth, blockHeight * 1.5);
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
      context.clearRect(forestX, forestY, canvasWidth, blockHeight);
      while (forestIndex < blockCount + 1) {
        if (forestIndex == 0 && move != 0) {
          context.drawImage(forest, move * actualImageWidth / maxMove, 0, actualImageWidth, actualImageHeight, forestX, forestY, blockWidth, blockHeight);
        } else {
          context.drawImage(forest, forestX - (moveWidth * move), forestY, blockWidth, blockHeight);
        }
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
      context.clearRect(forestX, forestY, canvasWidth, blockHeight);
      while (forestIndex < blockCount + 1) {
        if (forestIndex == 0 && move != 0) {
          context.drawImage(forest, move * actualImageWidth / maxMove, 0, actualImageWidth, actualImageHeight, forestX, forestY, blockWidth, blockHeight);
        } else {
          context.drawImage(forest, forestX - (moveWidth * move), forestY, blockWidth, blockHeight);
        }
        forestX = forestX + blockWidth;
        forestIndex++;
      }
    };
    forest.src = bottomForestScr;
  }

  function drawCar(side) {
    var car = new Image();
    car.onload = function () {
      if (side === CAR_MOVE.UP) {
        if (carCurrentMove >= -carMaxMove) {
          carY -= carMove;
          carCurrentMove -= carMove;
        }
      } else if (side === CAR_MOVE.DOWN) {
        if (carCurrentMove <= carMaxMove) {
          carY += carMove;
          carCurrentMove += carMove;
        }
      }
      context.drawImage(car, carX, carY, carWidth, carHeight);
    };
    car.src = carSrc;
  }

  window.onload = draw;
}(document, window));