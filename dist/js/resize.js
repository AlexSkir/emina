"use strict";

const canvasWidth = window.innerWidth - 450 < window.innerHeight - 155 ? window.innerWidth - 450 : window.innerHeight - 155;
$('.canvas').attr('width', canvasWidth);
$('.canvas').attr('height', canvasWidth);
$(window).bind('resize', () => {
  const changeWidth = window.innerWidth - 450 < window.innerHeight - 155 ? window.innerWidth - 450 : window.innerHeight - 155;
  $('.canvas').attr('width', changeWidth);
  $('.canvas').attr('height', changeWidth);
  $('#new-width').text($('#canvas1').width());
});