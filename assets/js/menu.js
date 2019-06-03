$('#list').click(() => {
  $('#list').toggleClass('active');
  $('.list').toggleClass('hidden');
});

$('.container').bind('click', () => {
  $('#list').removeClass('active');
  $('.list').addClass('hidden');
});
