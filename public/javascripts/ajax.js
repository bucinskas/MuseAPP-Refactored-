


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
			$form.closest().remove();
		}).fail(function (jqXHR, exception) {
			alert(exception);
		});
	}
});


