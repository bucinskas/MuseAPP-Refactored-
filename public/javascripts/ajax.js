// CREATE
$('#comment-form').submit(function(e) {
	e.preventDefault();
	let formData = $(this).serialize();
	let url = $(this).attr('action');
	$.post(url, formData)
		.done(function(data) {
	
		// 	$('#comment-body').val('');
		// 	$('#comment-form').before(`
		// <div class="content">
        //     <a href="/users/<%=shot.author.id%>"><img src="<%= comment.author.avatar %>" class="profile-comment-image" alt="user profile image"></a>
        //     <a href="/users/<%=comment.author.id%>" class="comment-author"><%=comment.author.username%></a>
        //      <div class="comment-body">
        //            <p>${data.body}</p>
        //            </div>
        //            <div class="comment-meta">
        //            <span><%= moment(comment.createdAt).fromNow() %></span>
        //           </div>
        //            <% if(currentUser && comment.author.equals(currentUser.id)) { %>
        //           <div>
        //           <form action="/shots/<%=shot.id%>/comments/<%=comment.id%>?_method=PUT" method="POST" class="edit-comment-form">
        //            <textarea name="comment[body]"><%=comment.body%></textarea>
        //           <input type="submit" id="btn" value="Update">
        //         </form>
        //          <input type="submit" class="toggleEditForm" id="btn" value="Edit">
        //            <form class="delete-item-form" action="/shots/<%=shot.id%>/comments/<%=comment.id%>?_method=DELETE" method="POST">
        //          <input type="submit" class="delete-comment-button" id="btn" value="Delete">
        //          </form>
        //           </div>   
        //          <% } %>
        //           </div>

		// 	`);
		})
		.fail(function(jqXHR, exception) {
			alert(exception);
		});
});



	//   <div class="row">
	// 				<div class="col-md-8">
	// 				  <p>${ data.comment.body }</p>
	// 				  <small class="text-muted">Posted by ${ data.author } ${ moment(data.comment.createdAt).fromNow() }</small>
	// 				</div>
	// 				<div class="col-md-4">
	// 				  <div class="float-md-right mt-2 mt-md-0">
	// 				    <button class="btn btn-sm btn-outline-warning edit-comment" data-comment-id="${ data.comment._id }">Edit</button>
	// 				    <form action="/posts/${ data.post._id }/comments/${ data.comment._id }" class="delete-comment">
	// 				      <input type="submit" class="btn btn-sm btn-outline-danger" value="Delete">
	// 				    </form>
	// 				  </div>
	// 				</div>
	// 				<div class="col-md-12">
	// 				  <hr>
	// 				</div>
	// 			</div>





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


 