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
let mouseDownY;

function end(e) {
  const ctx = $("#canvas".concat(window.state.currentCanvas)).get(0).getContext('2d');
  endX = e.offsetX;
  endY = e.offsetY;
  ctx.fillStyle = $('#currentColor').css('background-color');
  ctx.strokeStyle = $('#currentColor').css('background-color');
  const canvasSize = Math.ceil($("#canvas".concat(window.state.currentCanvas)).width() / 33);
  const mouseMoveX = Math.floor(e.offsetX / canvasSize) * canvasSize;
  const mouseMoveY = Math.floor(e.offsetY / canvasSize) * canvasSize;

  if (mouseDownX > endX || mouseDownY > endY) {
    ctx.fillRect(mouseMoveX, mouseMoveY, canvasSize, canvasSize);
  } else if (mouseDownX + canvasSize < endX || mouseDownY + canvasSize < endY) {
    ctx.fillRect(mouseMoveX, mouseMoveY, canvasSize, canvasSize);
  }
}

function start(e) {
  const ctx = $("#canvas".concat(window.state.currentCanvas)).get(0).getContext('2d');
  const canvasSize = Math.ceil($("#canvas".concat(window.state.currentCanvas)).width() / 33);
  ctx.fillStyle = $('#currentColor').css('background-color');
  ctx.strokeStyle = $('#currentColor').css('background-color');
  mouseDownX = Math.floor(e.offsetX / canvasSize) * canvasSize;
  mouseDownY = Math.floor(e.offsetY / canvasSize) * canvasSize;
  ctx.fillRect(mouseDownX, mouseDownY, canvasSize, canvasSize);
  $("#canvas".concat(window.state.currentCanvas)).mousemove(end);
}

function openCanvas() {
  const num = $(this).find('.number').text();
  window.state.currentCanvas = +num;
  $('.canvas').addClass('hidden');
  $("#canvas".concat(num)).removeClass('hidden');

  if ($('.activeFrame')) {
    $('.activeFrame').removeClass('activeFrame');
  }

  $(this).toggleClass('activeFrame');
  (0, _preview.makeImage)(+num);
}

function newCanvas(n) {
  const canvasWidth = window.innerWidth - 450 < window.innerHeight - 155 ? window.innerWidth - 450 : window.innerHeight - 155;
  const canvas = $('<canvas/>', {
    class: 'canvas hidden',
    id: "canvas".concat(n)
  }).attr('width', canvasWidth).attr('height', canvasWidth);
  canvas.appendTo('.canvas-area');
}

function copyCanvas(n) {
  const cloneWrapper = $("#canvas".concat(n)).clone().attr('id', "canvas".concat(+n + 1)).attr('width', $("#canvas".concat(n)).width()).attr('height', $("#canvas".concat(n)).width()).insertAfter("#canvas".concat(n));
  const originalContext = $("#canvas".concat(n)).get(0).getContext('2d');
  const imageData = originalContext.getImageData(0, 0, $("#canvas".concat(n)).width(), $("#canvas".concat(n)).width());
  const cloneContext = cloneWrapper.get(0).getContext('2d');
  cloneContext.putImageData(imageData, 0, 0);
}