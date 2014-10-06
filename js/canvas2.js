/**
 * Created by amit on 5/10/14.
 */
(function (document, window) {
  var canvasId = "game";
  var roadSrc = './images/road.jpg', topForestSrc = "./images/lake.jpg", bottomForestScr = './images/lake.jpg';
  var canvasWidth = 1000, canvasHeight = 260;
  var roadWidth = canvasWidth / 10, roadHeight = 100;
  var context;

  function draw() {
    var canvas = document.getElementById(canvasId);
    if (canvas.getContext) {
      drawGame();
    } else {
      // Canvas unsupported code will go here.
    }
  }

  function drawGame() {
    context = document.getElementById(canvasId).getContext('2d');
    context.canvas.width = canvasWidth;
    context.canvas.height = canvasHeight;
    drawTopForest();
    drawRoad();
    drawBottomForest();
  }

  function drawRoad() {
    var roadX = 0, roadY = (canvasHeight - roadHeight) / 2, roadIndex = 0;
    var road = new Image();
    road.onload = function () {
      while (roadIndex < 10) {
        context.drawImage(road, roadX, roadY, roadHeight, roadWidth);
        roadX = roadX + roadWidth;
        roadIndex++;
      }
    };
    road.src = roadSrc;
  }

  function drawTopForest() {
    var forestX = 0, forestY = 0, forestIndex = 0;
    var forest = new Image();
    forest.onload = function () {
      while (forestIndex < 10) {
        context.drawImage(forest, forestX, forestY, roadHeight, roadWidth);
        forestX = forestX + roadWidth;
        forestIndex++;
      }
    };
    forest.src = topForestSrc;
  }

  function drawBottomForest() {
    var forestX = 0, forestY = roadHeight + ((canvasHeight - roadHeight) / 2), forestIndex = 0;
    var forest = new Image();
    forest.onload = function () {
      while (forestIndex < 10) {
        context.drawImage(forest, forestX, forestY, roadHeight, roadWidth);
        forestX = forestX + roadWidth;
        forestIndex++;
      }
    };
    forest.src = bottomForestScr;
  }

  window.onload = draw;
}(document, window));