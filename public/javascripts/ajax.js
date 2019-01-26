// CREATE COMMENT

$('#comment-form').submit(function(e) {
	e.preventDefault();
	let formData = $(this).serialize();
	let url = $(this).attr('action');
	$.post(url, formData)
	   .done(function(data) {

	   $('#comment-body').val('');
	   $('#comments-list').before(
		   `
		   <div class="content">
		       <a href="/users/${data.shot.author._id}"><img src="${data.author.avatar}" class="profile-comment-image" alt="user profile image"></a>
		       <a href="/users/${data.comment.author}" class="comment-author">${data.author.username}</a>
		        <div class="comment-body">
		              <p>${data.comment.body}</p>
		              </div>
		              <div class="comment-meta">
		              <span>${ moment(data.comment.createdAt).fromNow() }</span>
		             </div>
		          
		             <div>
		             <form action="/shots/${data.shot._id}/comments/${data.comment._id}?_method=PUT" method="POST" class="edit-comment-form">
		              <textarea name="comment[body]">${data.comment.body}</textarea>
		             <input type="submit" id="btn" value="Update">
		           </form>
		            <input type="submit" class="toggleEditForm" id="btn" value="Edit">
		              <form class="delete-item-form" action="/shots/${data.shot._id}/comments/${data.comment._id}?_method=DELETE" method="POST">
		            <input type="submit" class="delete-comment-button" id="btn" value="Delete">
		            </form>
		             </div>   
		 
		             </div>
		   `
		);
	})
	.fail(function(jqXHR, exception) {
		alert(exception);
	});
	});
	


// UPDATE COMMENT


$('#comments-list').on('submit', '.edit-comment-form', function(e){
  e.preventDefault();
  let formData = $(this).serialize();
  let url = $(this).attr('action');
  $originalItem = $(this).closest('.content');
  $.ajax({
	  url: url,
	  data: formData,
	  type: 'PUT',
	  originalItem: $originalItem,
	  success: function(data) {
        this.originalItem.html(
			`
            <a href="/users/${data.shot.author._id}"><img src="${data.author.avatar}" class="profile-comment-image" alt="user profile image"></a>
            <a href="/users/${data.comment.author}" class="comment-author">${data.author.username}</a>
             <div class="comment-body">
                   <p>${data.comment.body}</p>
                   </div>
                   <div class="comment-meta">
                   <span>${ moment(data.comment.createdAt).fromNow() }</span>
				  </div>
				  
                

                  <div class="edit-and-delete">
                  <form action="/shots/${data.shot.id}/comments/${data.comment.id}?_method=PUT" method="POST" class="edit-comment-form">
                   <textarea name="comment[body]">${data.comment.body}</textarea>
                  <input type="submit" id="btn" value="Update">
                </form>
                 <input type="submit" class="toggleEditForm" id="btn" value="Edit">
                   <form class="delete-item-form" action="/shots/${data.shot.id}/comments/${data.comment._id}?_method=DELETE" method="POST">
                 <input type="submit" class="delete-comment-button" id="btn" value="Delete">
                 </form>
				  </div>   
				  

          
			`
		)
	  }
  });
});



// 	DELETE COMMENT 

$('#comments-list').on('submit', '.delete-item-form', function (e) {
	e.preventDefault();
	var response = confirm('Are you sure?');
	if (response) {
		var url = $(this).attr('action');
		var $form = $(this);
		$.ajax({
			url: url,
			method: 'DELETE',
			$form: $form
		}).done(function (data) {
			console.log('Successfully deleted!');
			$form.closest('.content').remove();
		}).fail(function (jqXHR, exception) {
			alert(exception);
		});
	}
});



