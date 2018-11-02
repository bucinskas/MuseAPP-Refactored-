
// post comment


$('#new-comment-form').submit(function(e){
  e.preventDefault(); 
  //let formAction = $(this).attr('action');
  let formData = $(this).serialize();
  $.post('/', formData, function(data){ 
    $.('#allComments').append(
      `
      <div class="comments">
   <p>Author: <%=comment.author.username%></p>

   <div class="comment-body">   
      <p>${data.body}</p>
   </div>

   <% if(comment.author.equals(currentUser._id)) { %>
   <div>
     <button class="toggleEditForm">Edit</button>
     <form action="/shots/<%= shot.id%>/comments/<%=comment.id%>?_method=PUT" method="POST" class="edit-review-form">
      <textarea name="comment[body]"><%=comment.body%></textarea>
      <input type="submit" value="Update"> 
     </form>

     <div>
     <form action="/shots/<%= shot.id%>/comments/<%=comment.id%>?_method=DELETE" method="POST">
       <input type="submit" value="Delete">
     </form>
     </div>

   </div>
  <% } %>
   <hr>
   </div>
      `
    )
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




  
  
  
  


