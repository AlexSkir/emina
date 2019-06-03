import { makeImage } from './preview';
import { openCanvas, newCanvas, copyCanvas } from './canvas';

// let prevCursor;
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
  const num = $(this)
    .parent()
    .find('.number')
    .text();
  $(`#frame${num}`).remove();
  $(`#canvasImage${num}`).remove();
  $(`#canvas${num}`).remove();
  updateId();
  $(`#frame${+num - 1}`).click();
}

function copyFrame() {
  const num = $(this)
    .parent()
    .find('.number')
    .text();
  $(`#frame${num}`)
    .clone()
    .insertAfter(`#frame${num}`)
    .hover(hoverIn, hoverOut)
    .attr('id', `frame${+num + 1}`)
    .css({ background: 'url(assets/images/background.png)', 'background-repeat': 'repeat' })
    .removeClass('activeFrame')
    .click(openCanvas);
  copyCanvas(num);
  $(`#frame${+num + 1}`)
    .find('.removeFrame')
    .click(removeFrame);
  $(`#frame${+num + 1}`)
    .find('.copyFrame')
    .click(copyFrame);
  updateId();
  for (let i = 0; i < $('#frame-list').children().length; i += 1) {
    makeImage(i + 1);
  }
  const dataURL = $(`#canvas${num}`)[0].toDataURL('image/png');
  if (dataURL) {
    $(`#frame${+num + 1}`).css({
      background: `url(${dataURL})`,
      'background-size': 'contain'
    });
  }
  $(`#canvas${+num - 1}`).click();
}

function addNewFrame() {
  const count = $('#frame-list').children().length + 1;
  $('.frame')
    .first()
    .clone()
    .appendTo('#frame-list')
    .hover(hoverIn, hoverOut)
    .attr('id', `frame${count}`)
    .css({ background: 'url(assets/images/background.png)', 'background-repeat': 'repeat' })
    .removeClass('activeFrame')
    .click(openCanvas);
  $('.number')
    .last()
    .text(count);
  newCanvas(count);
  $(`#frame${count}`)
    .find('.removeFrame')
    .click(removeFrame);
  $(`#frame${count}`)
    .find('.copyFrame')
    .click(copyFrame);
}

export { hoverIn, hoverOut, addNewFrame, removeFrame, copyFrame };
