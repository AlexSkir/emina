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

// let prevCursor;
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
}

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
  const num = $(this).parent().find('.number').text();
  $("#frame".concat(num)).remove();
  $("#canvasImage".concat(num)).remove();
  $("#canvas".concat(num)).remove();
  updateId();
  $("#frame".concat(+num - 1)).click();
}

function copyFrame() {
  const num = $(this).parent().find('.number').text();
  $("#frame".concat(num)).clone().insertAfter("#frame".concat(num)).hover(hoverIn, hoverOut).attr('id', "frame".concat(+num + 1)).css({
    background: 'url(assets/images/background.png)',
    'background-repeat': 'repeat'
  }).removeClass('activeFrame').click(_canvas.openCanvas);
  (0, _canvas.copyCanvas)(num);
  $("#frame".concat(+num + 1)).find('.removeFrame').click(removeFrame);
  $("#frame".concat(+num + 1)).find('.copyFrame').click(copyFrame);
  updateId();

  for (let i = 0; i < $('#frame-list').children().length; i += 1) {
    (0, _preview.makeImage)(i + 1);
  }

  const dataURL = $("#canvas".concat(num))[0].toDataURL('image/png');

  if (dataURL) {
    $("#frame".concat(+num + 1)).css({
      background: "url(".concat(dataURL, ")"),
      'background-size': 'contain'
    });
  }

  $("#canvas".concat(+num - 1)).click();
}

function addNewFrame() {
  const count = $('#frame-list').children().length + 1;
  $('.frame').first().clone().appendTo('#frame-list').hover(hoverIn, hoverOut).attr('id', "frame".concat(count)).css({
    background: 'url(assets/images/background.png)',
    'background-repeat': 'repeat'
  }).removeClass('activeFrame').click(_canvas.openCanvas);
  $('.number').last().text(count);
  (0, _canvas.newCanvas)(count);
  $("#frame".concat(count)).find('.removeFrame').click(removeFrame);
  $("#frame".concat(count)).find('.copyFrame').click(copyFrame);
}