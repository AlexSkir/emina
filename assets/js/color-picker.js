$('#customed').on('change', () => {
  const customedColor = $('#customed').val();
  window.state.prevColor = window.state.currentColor;
  window.state.currentColor = customedColor;
  $('#prevColor').css({ 'background-color': $('#currentColor').css('background-color') });
  $('#currentColor').css({ 'background-color': customedColor });
});

$('#color-picker').click(() => {
  if (window.state.currentTool !== 'colorPickerTool') {
    $('#color-picker').addClass('hovered');
    $('#paint-bucket').removeClass('hovered');
    $('#pen').removeClass('hovered');
    $('.color').removeClass('hidden');
    window.state.currentTool = 'colorPickerTool';
    $('#color-picker').focus();
    $(document.body).css({ cursor: 'url(assets/images/colorpicker.png) 4 12, auto' });
  } else if (window.state.currentTool === 'colorPickerTool') {
    window.state.currentTool = '';
    $('#color-picker').removeClass('hovered');
    $('.color').addClass('hidden');
    $('#color-picker').blur();
    $(document.body).css({ cursor: 'default' });
  }
});
