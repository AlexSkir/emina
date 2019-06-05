"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeImage = makeImage;
exports.animate = animate;
exports.fullSizePreview = fullSizePreview;
let count = 0;
let anim;

function animate() {
  if (count === undefined) {
    count = 0;
  }

  const time = 1000 / window.state.fps;
  const ticks = time * $('.preview').children().length;
  $('.preview').children().hide();

  if ($('.preview').children()[count]) {
    $('.preview').children()[count].style.display = 'block';
  }

  count += 1;

  if (count === $('.preview').children().length) {
    count = 0;
  }

  clearTimeout(anim);
  anim = setTimeout(animate, ticks);
}

function makeImage(n) {
  const canvasImage = new Image();
  $(canvasImage).attr('id', "canvasImage".concat(n)).css({
    width: '100%'
  }).attr('src', $("#canvas".concat(n))[0].toDataURL('image/png'));

  if ($("#canvasImage".concat(n)).length) {
    $(canvasImage).insertBefore("#canvasImage".concat(n)).next().remove();
  } else {
    $(canvasImage).appendTo('.preview');
  }

  if ($('.preview').children().length > 1) {
    animate();
  }
}

function fullSizePreview() {
  const newWindow = window.open('about:blank', 'preview', 'width=300,height=300');
  const newPreview = $('.preview').clone().appendTo(newWindow.document.body).css({
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    height: '100%'
  });
  $(newWindow.document.body).css({
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center'
  });
  $(newWindow.document).ready(() => {
    count = 0;

    function newAnimate() {
      const time = 1000 / window.state.fps;
      const ticks = time * newPreview.children().length;
      newPreview.children().hide();

      if (newPreview.children()[count]) {
        newPreview.children()[count].style.display = 'block';
      }

      count += 1;

      if (count === newPreview.children().length) {
        count = 0;
      }

      const newAnim = setTimeout(newAnimate, ticks);

      if (newWindow.closed) {
        clearTimeout(newAnim);
      }
    }

    newAnimate();
  });
}