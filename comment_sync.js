 var typingTimer; //timer identifier
 var doneTypingInterval = 1000; //time in ms
 var oldComment = "";
 var $input = $('#comments');

 var GetDiff = function(oldValue, newValue) {
     var diff = newValue;
     console.log("upload Comments : " + diff);

     return newValue;
 };

 //on keyup, start the countdown
 $input.on('keyup', function() {
     clearTimeout(typingTimer);
     typingTimer = setTimeout(doneTyping, doneTypingInterval);
 });

 //on keydown, clear the countdown
 $input.on('keydown', function() {
     clearTimeout(typingTimer);
 });

 //user is "finished typing," save data

 function doneTyping() {
     var comment = $input.val();
     var diff = GetDiff(oldComment, comment);
     oldComment = comment;
     var email = $('#email').val();
     console.log(email);
     var data = { comments: comment, email: email };

     $.ajax({
         dataType: "json",
         type: 'post',
         url: "/saveData",
         data: data
     });
 }

 $(document).ready(function() {
     $.ajax({
         dataType: "json",
         type: 'get',
         url: "/fetchData?email=shruti.tanwar93@gmail.com",
         success: function(response) {
             assignData(response);
         }
     });
 });

 function assignData(response) {
     console.log(response.comment);
     $input.val(response.comment);
     $('#email').val(response.email);
 }
