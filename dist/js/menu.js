"use strict";

// show/hide drop-down menu, menu-items do not work yet
$('#list').click(() => {
  $('#list').toggleClass('active');
  $('.list').toggleClass('hidden');
}); // if mouse clicked elsewhere should hide drop-down menu

$('.container').bind('click', () => {
  $('#list').removeClass('active');
  $('.list').addClass('hidden');
});