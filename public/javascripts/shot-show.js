
// toggle edit comment form 


  $('.toggleEditForm').on('click', function(){
    // toggle the edit button text on click 
    $(this).text() === 'Edit' ? $(this).text('Cancel') : $(this).text('Edit');
    // toggle visisbility of the edit review form
    $(this).siblings('.edit-comment-form').toggle(); 
  });




var $menuOpenIcon = $('.icon-menu'),
$menuCloseIcon = $('.icon-menu-close'),
$menuList = $('.site-menu'),
$menuOverlay = $('.site-menu-overlay');


$menuOverlay.on('click', function(e){
closeMenu();
});

$menuCloseIcon.on('click', function(e){
closeMenu();
});

$menuOpenIcon.on('click', function(e){
openMenu();
});

function closeMenu(){
$menuCloseIcon.addClass('hidden');
$menuList.addClass('hidden');
$menuOverlay.addClass('hidden');
}

function openMenu() {
$menuCloseIcon.removeClass('hidden');
$menuList.removeClass('hidden');
$menuList.removeClass('hidden');
$menuOverlay.removeClass('hidden');
}

     


