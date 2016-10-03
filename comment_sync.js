/*var dmpmod = require('diff_match_patch');
var dmp = new dmpmod.diff_match_patch();*/
    //var controller = require("./controllers/comments.controller.js");  
    var typingTimer;                //timer identifier
    var doneTypingInterval = 1000;  //time in ms, 5 second for example
    var oldComment = "";
    var $input = $('#comment');

    var GetDiff = function (oldValue, newValue) {
    var diff = newValue;
    console.log("upload Comments : "+diff);
    ///// USE DIFF MATCH PATCH HERERERERERE
    ///// ADD DIFF_MATCH_PATCH IN package.json dependencies
    ///// npm install
    return newValue;
    };
    //on keyup, start the countdown
    $input.on('keyup', function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    //on keydown, clear the countdown
    $input.on('keydown', function () {
        clearTimeout(typingTimer);
    });

    //user is "finished typing," do something
    function doneTyping () {
        // get the current value of the input field.
        var comment = $input.val();
        var diff = GetDiff(oldComment, comment);
        oldComment = comment;
        var email = $('#email').val();
        console.log(email);
        var data = {comments: comment, email: email};
        //controller.saveData(diff);

        $.ajax({
        dataType: "json",
        type: 'post',
        url: "/saveData",
        data: data
        });
    }



