"use strict";

$('#paint-bucket').click(() => {
  if (window.state.currentTool !== 'paintBucketTool') {
    $('#paint-bucket').addClass('hovered');
    $('#color-picker').removeClass('hovered');
    $('#pen').removeClass('hovered');

    if (!$('.color').hasClass('hidden')) {
      $('.color').addClass('hidden');
    }

    window.state.currentTool = 'paintBucketTool';
    $('#paint-bucket').focus();
    $(document.body).css({
      cursor: 'url(assets/images/bucket.png), auto'
    });
  } else if (window.state.currentTool === 'paintBucketTool') {
    window.state.currentTool = '';
    $('#paint-bucket').removeClass('hovered');
    $('#paint-bucket').blur();
    $(document.body).css({
      cursor: 'default'
    });
  }
});
$('.palette-button').hover(e => {
  $(e.target).children().addClass('fas-hovered');
}, e => {
  $(e.target).children().removeClass('fas-hovered');
});