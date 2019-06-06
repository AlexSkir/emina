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
  fps: 3,
  customWidth: 33
}; // change current and previous color-blocks background-color

function changeBG() {
  $('#currentColor').css({
    'background-color': window.state.currentColor
  });
  $('#prevColor').css({
    'background-color': window.state.prevColor
  });
} // click event depends on current tool


$(document).click(e => {
  // does not work yet
  if (window.state.currentTool === 'paintBucketTool') {
    if ($(e.target).hasClass('paint-area')) {
      $(e.target).css({
        'background-color': window.state.currentColor
      });
    }

    $("#canvas".concat(window.state.currentCanvas)).off('mousemove').off('mousedown');
  } else if (window.state.currentTool === 'colorPickerTool') {
    if ($(e.target).is('.radiobutton') && $(e.target).css('background-color') !== window.state.currentColor) {
      window.state.prevColor = window.state.currentColor;
      window.state.currentColor = $(e.target).css('background-color');
      changeBG();
    } // click does not draw on canvas if current tool is not "pen"


    $('.canvas').off('mousemove').off('mousedown');
  } else if (window.state.currentTool === 'penTool') {
    // remove old events
    $("#canvas".concat(window.state.currentCanvas)).unbind('mousedown').unbind('mouseup'); // initialize new events

    $("#canvas".concat(window.state.currentCanvas)).mousedown(_canvas.start);
    $("#canvas".concat(window.state.currentCanvas)).mouseup(() => {
      $("#canvas".concat(window.state.currentCanvas)).off('mousemove'); // create canvas-image url

      const dataURL = $("#canvas".concat(window.state.currentCanvas))[0].toDataURL('image/png'); // put canvas image in preview-box

      $("#frame".concat(window.state.currentCanvas)).find('.preview-box').css({
        background: "url(".concat(dataURL, ")"),
        'background-size': 'contain'
      }); // create image for animation preview

      setTimeout(() => {
        (0, _preview.makeImage)(window.state.currentCanvas);
      }, 500);
    });
  }
}); // bind events on buttons on page load

$(document).ready(() => {
  $('.frame').hover(_frames.hoverIn, _frames.hoverOut); // show/hide frame buttons

  $('.addNewFrame').click(_frames.addNewFrame); // button creating new frames

  $('.removeFrame').click(_frames.removeFrame); // frame-button to remove frame

  $('.copyFrame').click(_frames.copyFrame); // frame-button to copy frame
  // make the first frame active

  $('#frame1').click(_canvas.openCanvas).click(); // calculating canvas resize options

  $('#current-width').text(window.state.customWidth);
  $('#current-height').text(window.state.customWidth);
  $('#new-width').text($('#canvas1').width());
  $('#resize-input').attr('max', $('#canvas1').width());
}); // range-input for fps tuning

$('#fps-bar').on('change', () => {
  window.state.fps = $('#fps-bar').val();
  $('#display-fps').text("".concat(window.state.fps, " FPS"));
}); // change canvas size

$('#resize-button').click(() => {
  if ($('#resize-input').val()) {
    const inputVal = +$('#resize-input').val();
    const maxSize = +$('#resize-input').attr('max');

    if (inputVal > 0 && inputVal < maxSize) {
      window.state.customWidth = $('#resize-input').val();
      $('#current-width').text(window.state.customWidth);
      $('#current-height').text(window.state.customWidth);
      $('#resize-input').val('');
      $('#error-message').text('');
    } else {
      $('#error-message').text("Size can be from ".concat($('#resize-input').attr('min'), " to ").concat($('#resize-input').attr('max'), " px"));
      $('#resize-input').val('');
    }
  }
}); // show/hide animation preview buttons

$('#preview-area').hover(() => {
  if ($('#preview-open').hasClass('hidden')) {
    $('#preview-open').removeClass('hidden');
  }
}, () => {
  if (!$('#preview-open').hasClass('hidden')) {
    $('#preview-open').addClass('hidden');
  }
}); // open animation in full size mode

$('#preview-open').click(_preview.fullSizePreview);