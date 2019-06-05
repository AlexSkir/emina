"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = start;
exports.copyCanvas = copyCanvas;
exports.newCanvas = newCanvas;
exports.openCanvas = openCanvas;

var _preview = require("./preview");

let endX;
let endY;
let mouseDownX;
let mouseDownY; // drawing on mouse move

function end(e) {
  const ctx = $("#canvas".concat(window.state.currentCanvas)).get(0).getContext('2d');
  endX = e.offsetX;
  endY = e.offsetY;
  ctx.fillStyle = $('#currentColor').css('background-color'); // color depends on chosen color

  ctx.strokeStyle = $('#currentColor').css('background-color'); // calc pen size according to chosen canvas width

  const canvasSize = Math.ceil($("#canvas".concat(window.state.currentCanvas)).width() / window.state.customWidth); // calc position and size of canvas rectangles according to pen size

  const mouseMoveX = Math.floor(e.offsetX / canvasSize) * canvasSize;
  const mouseMoveY = Math.floor(e.offsetY / canvasSize) * canvasSize;

  if (mouseDownX > endX || mouseDownY > endY) {
    ctx.fillRect(mouseMoveX, mouseMoveY, canvasSize, canvasSize);
  } else if (mouseDownX + canvasSize < endX || mouseDownY + canvasSize < endY) {
    ctx.fillRect(mouseMoveX, mouseMoveY, canvasSize, canvasSize);
  }
} // drawing on mouse click


function start(e) {
  const ctx = $("#canvas".concat(window.state.currentCanvas)).get(0).getContext('2d');
  const canvasSize = Math.ceil($("#canvas".concat(window.state.currentCanvas)).width() / window.state.customWidth);
  ctx.fillStyle = $('#currentColor').css('background-color');
  ctx.strokeStyle = $('#currentColor').css('background-color');
  mouseDownX = Math.floor(e.offsetX / canvasSize) * canvasSize;
  mouseDownY = Math.floor(e.offsetY / canvasSize) * canvasSize;
  ctx.fillRect(mouseDownX, mouseDownY, canvasSize, canvasSize);
  $("#canvas".concat(window.state.currentCanvas)).mousemove(end);
} // show canvas according to active frame, hide other canvas


function openCanvas() {
  const num = $(this).find('.number').text(); // calc target frame ID

  window.state.currentCanvas = +num;
  $('.canvas').addClass('hidden'); // hide all canvas

  $("#canvas".concat(num)).removeClass('hidden'); // show current canvas

  if ($('.activeFrame')) {
    $('.activeFrame').removeClass('activeFrame');
  }

  $(this).toggleClass('activeFrame'); // make current frame active

  (0, _preview.makeImage)(+num); // automatically make image of current canvas for animation
} // create new canvas if new frame was created


function newCanvas(n) {
  const canvasWidth = window.innerWidth - 450 < window.innerHeight - 155 ? window.innerWidth - 450 : window.innerHeight - 155;
  const canvas = $('<canvas/>', {
    class: 'canvas hidden',
    id: "canvas".concat(n)
  }).attr('width', canvasWidth).attr('height', canvasWidth);
  canvas.appendTo('.canvas-area');
} // copy target frame's canvas with content if the frame was cloned


function copyCanvas(n) {
  const cloneWrapper = $("#canvas".concat(n)).clone().attr('id', "canvas".concat(+n + 1)).attr('width', $("#canvas".concat(n)).width()).attr('height', $("#canvas".concat(n)).width()).insertAfter("#canvas".concat(n));
  const originalContext = $("#canvas".concat(n)).get(0).getContext('2d');
  const imageData = originalContext.getImageData(0, 0, $("#canvas".concat(n)).width(), $("#canvas".concat(n)).width());
  const cloneContext = cloneWrapper.get(0).getContext('2d');
  cloneContext.putImageData(imageData, 0, 0);
}