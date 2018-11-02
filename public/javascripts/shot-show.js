
// toggle edit comment form 


  $('.toggleEditForm').on('click', function(){
    // toggle the edit button text on click 
    $(this).text() === 'Edit' ? $(this).text('Cancel') : $(this).text('Edit');
    // toggle visisbility of the edit review form
    $(this).siblings('.edit-review-form').toggle(); 
  });


