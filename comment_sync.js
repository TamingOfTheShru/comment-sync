 var typingTimer; //timer identifier
 var doneTypingInterval = 1000; //time in ms
 var oldComment = "";
 var $ = require('jquery');
 var $input = $('#comments');
 var dmpmod = require('diff_match_patch');
 var dmp = new dmpmod.diff_match_patch();


 var GetDiff = function(oldValue, newValue) {
     console.log("old:" + oldValue);
     console.log("new :" + newValue);
     var diffs = dmp.diff_main(oldValue, newValue);
     dmp.diff_cleanupSemantic(diffs);
     var value = "";
     console.log("Diffs " + diffs);
     diffs.forEach(function(diff) {
         if (diff[0] != 0) {
             console.log(diff[0] + " " + diff[1]);
             value = value + " " + diff[1];
         }
     });
     return value;
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
     if(oldComment == ""){
        oldComment = diff;
     }
     var email = $('#email').val();
     var data = { diff: diff, email: email };

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
     $input.val(response.comment + response.diff);
     oldComment = response.comment + response.diff;
     $('#email').val(response.email);
 }
