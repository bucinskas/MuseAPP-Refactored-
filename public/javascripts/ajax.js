
// post comment
// CREATE
$('#comment-form').submit(function (e) {
	e.preventDefault();
	var formData = $(this).serialize();
	var url = $(this).attr('action');
	$.post(url, formData).done(function (data) {
		$('#comment-body').val('');
    $('#comment-form').before
    ('\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col-md-8">\n\t\t\t\t\t  <p>' + data.comment.body + '</p>\n\t\t\t\t\t 
     <small class="text-muted">Posted by ' + data.author + ' ' + moment(data.comment.createdAt).fromNow() + 
     '</small>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="col-md-4">\n\t\t\t\t\t  <div class="float-md-right mt-2 mt-md-0">\n\t\t\t\t\t   
      <button class="btn btn-sm btn-outline-warning edit-comment" data-comment-id="' + data.comment._id + '">Edit</button>\n\t\t\t\t\t 
         <form action="/posts/' + data.post._id + '/comments/' + data.comment._id + '" class="delete-comment">\n\t\t\t\t\t     
          <input type="submit" class="btn btn-sm btn-outline-danger" value="Delete">\n\t\t\t\t\t    </form>\n\t\t\t\t\t 
           </div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="col-md-12">\n\t\t\t\t\t  <hr>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t');
	}).fail(function (jqXHR, exception) {
		alert(exception);
	});
});


$('#comment-form').submit(function(e){
  e.preventDefault(); 
  //let formAction = $(this).attr('action');
  var formData = $(this).serialize();
  var url = $(this).attr('action');
  $.post(url, formData).done function(data){ 
    $('#comment-body').val('');
    $('#comment-form').before(
      <% shot.comments.forEach(function(comment){ %>
        <div class="content">
               <form class="edit-comment-form" action="/shots/<%=shot._id%>/comments/<%=comment._id%>" method="POST">
                 <div class="field">
                   <label>comment</label>
                   <input type="text" name="comment[text]" value="<%=comment.text%>">
                 </div>
                <button class="ui secondary button">Update comment</button>
               </form>
      <a href="/users/<%=shot.author.id%>"><img src="<%= comment.author.avatar %>" class="profile-comment-image" alt="user profile image"></a>
      <a href="/users/<%=comment.author.id%>" class="comment-author"><%=comment.author.username%></a>
                   <div class="comment-body">
                   <p><%=comment.body%></p>
                   </div>
                   <div class="comment-meta">
                   <span><%= moment(comment.createdAt).fromNow() %></span>
                  </div>
                   <% if(currentUser && comment.author.equals(currentUser.id)) { %>
                  <div class="pull-right">
                  <button class="edit-button" id="btn">Edit</button>
                   <form class="delete-item-form" action="/shots/<%=shot.id%>/comments/<%=comment.id%>?_method=DELETE" method="POST">
                 <button class="delete-comment-button" id="btn">Delete</button>
                 </form>
                  </div>   
                 <% } %>
                  </div>
      <% }) %>);
    }).fail(function (jqXHR, exception) {
		alert(exception);
	  });
});

// edit comment

$('.edit-review-form').submit(function(e){
    e.preventDefault(); 
    let formAction = $(this).attr('action');
    let formData = $(this).serialize();
    $.ajax({
      url: formAction,
      data: formData,
      type: 'PUT',
      success: function(data) {
          debugger 
      }
    });
  });




  
  
  
  


