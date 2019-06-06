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
  clearTimeout(anim); // stop old animation

  const time = 1000 / window.state.fps; // calc animation speed

  $('.preview').children().css({
    display: 'none'
  }); // hide all canvas-images

  if ($('.preview').children()[count]) {
    $('.preview').children()[count].style.display = 'block'; // show only the "count"-th image
  }

  count += 1;

  if (count === $('.preview').children().length) {
    count = 0; // restart counting if all images were shown
  }

  anim = setTimeout(animate, time); // repeat animation
} // make image from canvas drawing


function makeImage(n) {
  const canvasImage = new Image();
  $(canvasImage).attr('id', "canvasImage".concat(n)).css({
    width: '100%'
  }).attr('src', $("#canvas".concat(n))[0].toDataURL('image/png')); // if the image is from the same canvas should update the image

  if ($("#canvasImage".concat(n)).length) {
    $(canvasImage).insertBefore("#canvasImage".concat(n)).next().remove();
  } else {
    // if new canvas was made should append new image
    $(canvasImage).appendTo('.preview');
  }

  if ($('.preview').children().length > 1) {
    count = 0;
    animate();
  }
} // open new window to watch animation in full-size mode


function fullSizePreview() {
  const newWindow = window.open('about:blank', 'preview', 'width=300,height=300'); // cloning animation box with images to new window

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
  let newCount = 0;

  function newAnimate() {
    const time = 1000 / window.state.fps;
    newPreview.children().css({
      display: 'none'
    });

    if (newPreview.children()[newCount]) {
      newPreview.children()[newCount].style.display = 'block';
    }

    newCount += 1;

    if (newCount === newPreview.children().length) {
      newCount = 0;
    }

    const newAnim = setTimeout(newAnimate, time);

    if (newWindow.closed) {
      clearTimeout(newAnim);
    }
  } // when new window loaded should start animation


  $(newWindow.document).ready(() => {
    newAnimate();
  });
}