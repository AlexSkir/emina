import './menu';
import './color-picker';
import './paintBucket';
import './resize';
import { start, openCanvas } from './canvas';
import './pen';
import { hoverIn, hoverOut, addNewFrame, removeFrame, copyFrame } from './frames';
import { makeImage, fullSizePreview } from './preview';

const currentColor = $('#currentColor').css('background-color');
const prevColor = $('#prevColor').css('background-color');

window.state = {
  currentTool: '',
  currentColor,
  prevColor,
  currentCanvas: '',
  fps: 3,
  customWidth: 33
};

function changeBG() {
  $('#currentColor').css({ 'background-color': window.state.currentColor });
  $('#prevColor').css({ 'background-color': window.state.prevColor });
}

$(document).click(e => {
  if (window.state.currentTool === 'paintBucketTool') {
    if ($(e.target).hasClass('paint-area')) {
      $(e.target).css({ 'background-color': window.state.currentColor });
    }
    $(`#canvas${window.state.currentCanvas}`)
      .off('mousemove')
      .off('mousedown');
  } else if (window.state.currentTool === 'colorPickerTool') {
    if (
      $(e.target).is('div') &&
      $(e.target).css('background-color') !== window.state.currentColor
    ) {
      window.state.prevColor = window.state.currentColor;
      window.state.currentColor = $(e.target).css('background-color');
      changeBG();
    }
    $('.canvas')
      .off('mousemove')
      .off('mousedown');
  } else if (window.state.currentTool === 'penTool') {
    $(`#canvas${window.state.currentCanvas}`)
      .unbind('mousedown')
      .unbind('mouseup');
    $(`#canvas${window.state.currentCanvas}`).mousedown(start);
    $(`#canvas${window.state.currentCanvas}`).mouseup(() => {
      $(`#canvas${window.state.currentCanvas}`).off('mousemove');
      const dataURL = $(`#canvas${window.state.currentCanvas}`)[0].toDataURL('image/png');
      $(`#frame${window.state.currentCanvas}`).css({
        background: `url(${dataURL})`,
        'background-size': 'contain'
      });
      setTimeout(() => {
        makeImage(window.state.currentCanvas);
      }, 500);
    });
  }
});

$('.frame').hover(hoverIn, hoverOut);
$('.addNewFrame').click(addNewFrame);
$('.removeFrame').click(removeFrame);
$('.copyFrame').click(copyFrame);
$(document).ready(() => {
  $('#frame1')
    .click(openCanvas)
    .click();
  $('#current-width').text(window.state.customWidth);
  $('#current-height').text(window.state.customWidth);
  $('#new-width').text($('#canvas1').width());
});
$('#fps-bar').on('change', () => {
  window.state.fps = $('#fps-bar').val();
  $('#display-fps').text(`${window.state.fps} FPS`);
});
$('#resize-button').click(() => {
  if ($('#resize-input').val()) {
    window.state.customWidth = $('#resize-input').val();
    $('#current-width').text(window.state.customWidth);
    $('#current-height').text(window.state.customWidth);
  }
});
$('#preview-area').hover(
  () => {
    if ($('#preview-open').hasClass('hidden')) {
      $('#preview-open').removeClass('hidden');
    }
  },
  () => {
    if (!$('#preview-open').hasClass('hidden')) {
      $('#preview-open').addClass('hidden');
    }
  }
);
$('#preview-open').click(fullSizePreview);
