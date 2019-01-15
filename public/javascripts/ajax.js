


// // CREATE

// $('#comment-form').submit(function (e) {
// 	e.preventDefault();
// 	var formData = $(this).serialize();
// 	var url = $(this).attr('action');
// 	$.post(url, formData).done(function (data) {
// 		$('#comment-body').val('');
// 		$('#comment-form').before('\n\t\t\t\t<div class="content">\n\t\t\t\t\t<div class="comment-body">\n\t\t\t\t\t  <p>' + data.comment.body + '</p>\n\t\t\t\t\t  <small class="text-muted">Posted by ' + data.author + ' ' + moment(data.comment.createdAt).fromNow() + '</small>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="col-md-4">\n\t\t\t\t\t  <div class="float-md-right mt-2 mt-md-0">\n\t\t\t\t\t    <button class="btn btn-sm btn-outline-warning edit-comment" data-comment-id="' + data.comment._id + '">Edit</button>\n\t\t\t\t\t    <form action="/posts/' + data.post._id + '/comments/' + data.comment._id + '" class="delete-comment">\n\t\t\t\t\t      <input type="submit" class="btn btn-sm btn-outline-danger" value="Delete">\n\t\t\t\t\t    </form>\n\t\t\t\t\t  </div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="col-md-12">\n\t\t\t\t\t  <hr>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t');
// 	}).fail(function (jqXHR, exception) {
// 		alert(exception);
//   });
// });


{/* <div class="content">
<a href="/users/<%=shot.author.id%>"><img src="<%= comment.author.avatar %>" class="profile-comment-image" alt="user profile image"></a>
<a href="/users/<%=comment.author.id%>" class="comment-author">${ data.comment.author }</a>
 <div class="comment-body">
	   <p>${ data.comment.body }</p>
	   </div>
	   <div class="comment-meta">
	   <span>${ moment(data.comment.createdAt).fromNow() }</span>
	  </div>
	  <div>
// 	  <button class="toggleEditForm" id="btn">Edit</button>
// 	  <form action="/shots/<%=shot.id%>/comments/<%=comment.id%>?_method=PUT" method="POST" class="edit-comment-form">
// 	   <textarea name="comment[body]">${ data.comment.body }</textarea>
// 	  <input type="submit" value="Update">
// 	</form>
// 	   <form class="delete-item-form" action="/shots/<%=shot.id%>/comments/<%=comment.id%>?_method=DELETE" method="POST">
// 	 <button class="delete-comment-button" id="btn">Delete</button>
// 	 </form>
// 	  </div>  */}


// $('#comment-form').submit(function(e) {
// 	e.preventDefault();
// 	let formData = $(this).serialize();
// 	let url = $(this).attr('action');
// 	$.post(url, formData)
// 		.done(function(data) {
// 			$('#comment-body').val('');
// 			$('#comment-form').before(`
// 			<div class="content">
// 			<a href="/users/<%=shot.author.id%>"><img src="<%= comment.author.avatar %>" class="profile-comment-image" alt="user profile image"></a>
// 			<a href="/users/<%=comment.author.id%>" class="comment-author">${ data.comment.author }</a>
// 			 <div class="comment-body">
// 				   <p>${ data.comment.body }</p>
// 				   </div>
// 				   <div class="comment-meta">
// 				   <span>${ moment(data.comment.createdAt).fromNow() }</span>
// 				  </div>
// 				  <div>
// 				  <button class="toggleEditForm" id="btn">Edit</button>
// 				  <form action="/shots/<%=shot.id%>/comments/<%=comment.id%>?_method=PUT" method="POST" class="edit-comment-form">
// 				   <textarea name="comment[body]">${ data.comment.body }</textarea>
// 				  <input type="submit" value="Update">
// 				</form>
// 				   <form class="delete-item-form" action="/shots/<%=shot.id%>/comments/<%=comment.id%>?_method=DELETE" method="POST">
// 				 <button class="delete-comment-button" id="btn">Delete</button>
// 				 </form>
// 				  </div> 
// 			`);
// 		})
// 		.fail(function(jqXHR, exception) {
// 			alert(exception);
// 		});
// });




$('.comments-list').on('submit', '.delete-item-form', function (e) {
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


