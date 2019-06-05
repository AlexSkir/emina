"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hoverIn = hoverIn;
exports.hoverOut = hoverOut;
exports.addNewFrame = addNewFrame;
exports.removeFrame = removeFrame;
exports.copyFrame = copyFrame;

var _preview = require("./preview");

var _canvas = require("./canvas");

// show/hide frame buttons
function hoverIn() {
  const children = $(this).find('span');

  if (children.hasClass('hidden')) {
    children.removeClass('hidden');

    if ($(this).is('#frame1')) {
      $('#frame1').find('.removeFrame').addClass('hidden');
    }
  }
}

function hoverOut() {
  const children = $(this).find('span');

  if (!children.hasClass('hidden')) {
    children.addClass('hidden');
  }

  if ($(this).is('#frame1')) {
    $('#frame1').find('.copyFrame').addClass('hidden');
  }
} // update IDs after adding/removing elements


function updateId() {
  for (let i = 0; i < $('#frame-list').children().length; i += 1) {
    $('#frame-list').children()[i].id = "frame".concat(i + 1);
    const child = $($('#frame-list').children()[i]);
    child.find('.number').text(i + 1);
    $('.canvas-area').children()[i].id = "canvas".concat(i + 1);
  }

  for (let i = 0; i < $('.preview').children().length; i += 1) {
    $('.preview').children()[i].id = "canvasImage".concat(i + 1);
  }
}

function removeFrame() {
  // calculating target's ID
  const num = $(this).parent().find('.number').text(); // remove all related elements

  $("#frame".concat(num)).remove();
  $("#canvasImage".concat(num)).remove();
  $("#canvas".concat(num)).remove();
  updateId();
  $("#frame".concat(+num - 1)).click(); // make previous frame active
}

function copyFrame() {
  // calculating target's ID
  const num = $(this).parent().find('.number').text(); // cloning target frame

  $("#frame".concat(num)).clone().insertAfter("#frame".concat(num)).hover(hoverIn, hoverOut).attr('id', "frame".concat(+num + 1)).removeClass('activeFrame').click(_canvas.openCanvas); // cloning target canvas image

  (0, _canvas.copyCanvas)(num); // bind frame events

  $("#frame".concat(+num + 1)).find('.removeFrame').click(removeFrame);
  $("#frame".concat(+num + 1)).find('.copyFrame').click(copyFrame); // make copied frame active

  setTimeout(() => {
    $("#frame".concat(+num + 1)).click();
  }, 100);
  updateId(); // cloning target frame preview image

  const dataURL = $("#canvas".concat(num))[0].toDataURL('image/png');

  if (dataURL) {
    $("#frame".concat(+num + 1)).find('.preview-box').css({
      background: "url(".concat(dataURL, ")"),
      'background-size': 'contain'
    });
  } // update frame images and animation


  for (let i = 0; i < $('#frame-list').children().length; i += 1) {
    (0, _preview.makeImage)(i + 1);
  }
}

function addNewFrame() {
  const count = $('#frame-list').children().length + 1; // calc ID for new frame

  $('.frame').first().clone().appendTo('#frame-list').hover(hoverIn, hoverOut).attr('id', "frame".concat(count)).removeClass('activeFrame').click(_canvas.openCanvas).find('.preview-box').css({
    background: 'none'
  }); // clear preview-box background from first frame

  $('.number').last().text(count); // update number of frame

  (0, _canvas.newCanvas)(count);
  $("#frame".concat(count)).find('.removeFrame').click(removeFrame); // add event

  $("#frame".concat(count)).find('.copyFrame').click(copyFrame); // add event

  setTimeout(() => {
    $("#frame".concat(count)).click(); // make new frame active
  }, 100);
}