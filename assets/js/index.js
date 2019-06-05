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

// change current and previous color-blocks background-color
function changeBG() {
  $('#currentColor').css({ 'background-color': window.state.currentColor });
  $('#prevColor').css({ 'background-color': window.state.prevColor });
}

// click event depends on current tool
$(document).click(e => {
  // does not work yet
  if (window.state.currentTool === 'paintBucketTool') {
    if ($(e.target).hasClass('paint-area')) {
      $(e.target).css({ 'background-color': window.state.currentColor });
    }
    $(`#canvas${window.state.currentCanvas}`)
      .off('mousemove')
      .off('mousedown');
  } else if (window.state.currentTool === 'colorPickerTool') {
    if (
      $(e.target).is('.radiobutton') &&
      $(e.target).css('background-color') !== window.state.currentColor
    ) {
      window.state.prevColor = window.state.currentColor;
      window.state.currentColor = $(e.target).css('background-color');
      changeBG();
    }
    // click does not draw on canvas if current tool is not "pen"
    $('.canvas')
      .off('mousemove')
      .off('mousedown');
  } else if (window.state.currentTool === 'penTool') {
    // remove old events
    $(`#canvas${window.state.currentCanvas}`)
      .unbind('mousedown')
      .unbind('mouseup');
    // initialize new events
    $(`#canvas${window.state.currentCanvas}`).mousedown(start);
    $(`#canvas${window.state.currentCanvas}`).mouseup(() => {
      $(`#canvas${window.state.currentCanvas}`).off('mousemove');
      // create canvas-image url
      const dataURL = $(`#canvas${window.state.currentCanvas}`)[0].toDataURL('image/png');
      // put canvas image in preview-box
      $(`#frame${window.state.currentCanvas}`)
        .find('.preview-box')
        .css({
          background: `url(${dataURL})`,
          'background-size': 'contain'
        });
      // create image for animation preview
      setTimeout(() => {
        makeImage(window.state.currentCanvas);
      }, 500);
    });
  }
});

// bind events on buttons on page load
$(document).ready(() => {
  $('.frame').hover(hoverIn, hoverOut); // show/hide frame buttons
  $('.addNewFrame').click(addNewFrame); // button creating new frames
  $('.removeFrame').click(removeFrame); // frame-button to remove frame
  $('.copyFrame').click(copyFrame); // frame-button to copy frame

  // make the first frame active
  $('#frame1')
    .click(openCanvas)
    .click();

  // calculating canvas resize options
  $('#current-width').text(window.state.customWidth);
  $('#current-height').text(window.state.customWidth);
  $('#new-width').text($('#canvas1').width());
});
// range-input for fps tuning
$('#fps-bar').on('change', () => {
  window.state.fps = $('#fps-bar').val();
  $('#display-fps').text(`${window.state.fps} FPS`);
});
// change canvas size
$('#resize-button').click(() => {
  if ($('#resize-input').val()) {
    window.state.customWidth = $('#resize-input').val();
    $('#current-width').text(window.state.customWidth);
    $('#current-height').text(window.state.customWidth);
  }
});
// show/hide animation preview buttons
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
// open animation in full size mode
$('#preview-open').click(fullSizePreview);
