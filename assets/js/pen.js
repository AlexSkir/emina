$('#pen').click(() => {
  if (window.state.currentTool !== 'penTool') {
    window.state.currentTool = 'penTool';
    $('#pen').addClass('hovered');
    $('#color-picker').removeClass('hovered');
    $('#paint-bucket').removeClass('hovered');
    if (!$('.color').hasClass('hidden')) {
      $('.color').addClass('hidden');
    }
    $('#pen').focus();
    $(document.body).css({ cursor: 'url(assets/images/pen.png) 1 18, auto' });
  } else if (window.state.currentTool === 'penTool') {
    window.state.currentTool = '';
    $('#pen').removeClass('hovered');
    $('#pen').blur();
    $(document.body).css({ cursor: 'default' });
  }
});
