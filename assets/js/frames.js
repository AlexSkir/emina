import { makeImage } from './preview';
import { openCanvas, newCanvas, copyCanvas } from './canvas';

// show/hide frame buttons
function hoverIn() {
  const children = $(this).find('span');
  if (children.hasClass('hidden')) {
    children.removeClass('hidden');
    if ($(this).is('#frame1')) {
      $('#frame1')
        .find('.removeFrame')
        .addClass('hidden');
    }
  }
}
function hoverOut() {
  const children = $(this).find('span');
  if (!children.hasClass('hidden')) {
    children.addClass('hidden');
  }
  if ($(this).is('#frame1')) {
    $('#frame1')
      .find('.copyFrame')
      .addClass('hidden');
  }
}
// update IDs after adding/removing elements
function updateId() {
  for (let i = 0; i < $('#frame-list').children().length; i += 1) {
    $('#frame-list').children()[i].id = `frame${i + 1}`;
    const child = $($('#frame-list').children()[i]);
    child.find('.number').text(i + 1);
    $('.canvas-area').children()[i].id = `canvas${i + 1}`;
  }
  for (let i = 0; i < $('.preview').children().length; i += 1) {
    $('.preview').children()[i].id = `canvasImage${i + 1}`;
  }
}

function removeFrame() {
  // calculating target's ID
  const num = $(this)
    .parent()
    .find('.number')
    .text();
  // remove all related elements
  $(`#frame${num}`).remove();
  $(`#canvasImage${num}`).remove();
  $(`#canvas${num}`).remove();
  updateId();
  $(`#frame${+num - 1}`).click(); // make previous frame active
}

function copyFrame() {
  // calculating target's ID
  const num = $(this)
    .parent()
    .find('.number')
    .text();
  // cloning target frame
  $(`#frame${num}`)
    .clone()
    .insertAfter(`#frame${num}`)
    .hover(hoverIn, hoverOut)
    .attr('id', `frame${+num + 1}`)
    .removeClass('activeFrame')
    .click(openCanvas);
  // cloning target canvas image
  copyCanvas(num);
  // bind frame events
  $(`#frame${+num + 1}`)
    .find('.removeFrame')
    .click(removeFrame);
  $(`#frame${+num + 1}`)
    .find('.copyFrame')
    .click(copyFrame);
  // make copied frame active
  setTimeout(() => {
    $(`#frame${+num + 1}`).click();
  }, 100);
  updateId();
  // cloning target frame preview image
  const dataURL = $(`#canvas${num}`)[0].toDataURL('image/png');
  if (dataURL) {
    $(`#frame${+num + 1}`)
      .find('.preview-box')
      .css({
        background: `url(${dataURL})`,
        'background-size': 'contain'
      });
  }
  // update frame images and animation
  for (let i = 0; i < $('#frame-list').children().length; i += 1) {
    makeImage(i + 1);
  }
}

function addNewFrame() {
  const count = $('#frame-list').children().length + 1; // calc ID for new frame
  $('.frame')
    .first()
    .clone()
    .appendTo('#frame-list')
    .hover(hoverIn, hoverOut)
    .attr('id', `frame${count}`)
    .removeClass('activeFrame')
    .click(openCanvas)
    .find('.preview-box')
    .css({ background: 'none' }); // clear preview-box background from first frame
  $('.number')
    .last()
    .text(count); // update number of frame
  newCanvas(count);
  $(`#frame${count}`)
    .find('.removeFrame')
    .click(removeFrame); // add event
  $(`#frame${count}`)
    .find('.copyFrame')
    .click(copyFrame); // add event
  setTimeout(() => {
    $(`#frame${count}`).click(); // make new frame active
  }, 100);
}

export { hoverIn, hoverOut, addNewFrame, removeFrame, copyFrame };
