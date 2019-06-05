"use strict";

// canvas width depends on device width and height
const canvasWidth = window.innerWidth - 450 < window.innerHeight - 155 ? window.innerWidth - 450 : window.innerHeight - 155;
$('.canvas').attr('width', canvasWidth);
$('.canvas').attr('height', canvasWidth);
$(window).bind('resize', () => {
  for (let i = 0; i < $('.canvas-area').children().length; i += 1) {
    // get context before resizing
    const imageData = $("#canvas".concat(i + 1)).get(0).getContext('2d').getImageData(0, 0, canvasWidth, canvasWidth); // calc new canvas width on resize the window

    const changeWidth = window.innerWidth - 450 < window.innerHeight - 155 ? window.innerWidth - 450 : window.innerHeight - 155;
    $("#canvas".concat(i + 1)).attr('width', changeWidth).attr('height', changeWidth); // all canvases will resize
    // put context after resizing

    $("#canvas".concat(i + 1)).get(0).getContext('2d').putImageData(imageData, 0, 0);
  }

  $('#new-width').text($('#canvas1').width()); // change resize options
});