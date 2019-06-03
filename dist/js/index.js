"use strict";

require("./menu");

require("./color-picker");

require("./paintBucket");

require("./resize");

var _canvas = require("./canvas");

require("./pen");

var _frames = require("./frames");

var _preview = require("./preview");

const currentColor = $('#currentColor').css('background-color');
const prevColor = $('#prevColor').css('background-color');
window.state = {
  currentTool: '',
  currentColor,
  prevColor,
  currentCanvas: '',
  fps: 3
};

function changeBG() {
  $('#currentColor').css({
    'background-color': window.state.currentColor
  });
  $('#prevColor').css({
    'background-color': window.state.prevColor
  });
}

$(document).click(e => {
  if (window.state.currentTool === 'paintBucketTool') {
    if ($(e.target).hasClass('paint-area')) {
      $(e.target).css({
        'background-color': window.state.currentColor
      });
    }

    $("#canvas".concat(window.state.currentCanvas)).off('mousemove').off('mousedown');
  } else if (window.state.currentTool === 'colorPickerTool') {
    if ($(e.target).is('div') && $(e.target).css('background-color') !== window.state.currentColor) {
      window.state.prevColor = window.state.currentColor;
      window.state.currentColor = $(e.target).css('background-color');
      changeBG();
    }

    $('.canvas').off('mousemove').off('mousedown');
  } else if (window.state.currentTool === 'penTool') {
    $("#canvas".concat(window.state.currentCanvas)).unbind('mousedown').unbind('mouseup');
    $("#canvas".concat(window.state.currentCanvas)).mousedown(_canvas.start);
    $("#canvas".concat(window.state.currentCanvas)).mouseup(() => {
      $("#canvas".concat(window.state.currentCanvas)).off('mousemove');
      const dataURL = $("#canvas".concat(window.state.currentCanvas))[0].toDataURL('image/png');
      $("#frame".concat(window.state.currentCanvas)).css({
        background: "url(".concat(dataURL, ")"),
        'background-size': 'contain'
      });
      setTimeout(() => {
        (0, _preview.makeImage)(window.state.currentCanvas);
      }, 500);
    });
  }
});
$('.frame').hover(_frames.hoverIn, _frames.hoverOut);
$('.addNewFrame').click(_frames.addNewFrame);
$('.removeFrame').click(_frames.removeFrame);
$('.copyFrame').click(_frames.copyFrame);
$(document).ready(() => {
  $('#frame1').click(_canvas.openCanvas).click();
});
$('#fps-bar').on('change', () => {
  window.state.fps = $('#fps-bar').val();
  $('#display-fps').text("".concat(window.state.fps, " FPS"));
});