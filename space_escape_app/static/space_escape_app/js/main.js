// cookie csrf function
function getCookie(name) {
   var cookieValue = null;
   if (document.cookie && document.cookie !== '') {
       var cookies = document.cookie.split(';');
       for (var i = 0; i < cookies.length; i++) {
           var cookie = jQuery.trim(cookies[i]);
           if (cookie.substring(0, name.length + 1) === (name + '=')) {
               cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
               break;
           }
       }
   }
   return cookieValue;
}


var csrftoken = getCookie('csrftoken');
function csrfSafeMethod(method) {
   return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}


$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});


var current_question
var nextQuestion1
var nextQuestion2


function start() {
    getChoices(1)
}


function getChoices(question_id) {
    $("#question").html("")
    $("#choice1").html("")
    $("#choice2").html("")
    var $table = $("<p>")
    var $table1 = $("<p>")
    var $table2 = $("<p>")
    $.ajax('/api/question/' + question_id).done(function (stuff){
        $table.html($table.html() + "<tr><td>" + stuff['question_text'] + "<br>")
        $table1.html($table1.html() + "<tr><td>" + stuff.choice[0]['choice_text'] + "<br>")
        $table2.html($table2.html() + "<tr><td>" + stuff.choice[1]['choice_text'] + "<br>")
        $('#question').append($table)
        $('#choice1').append($table1)
        $('#choice2').append($table2)
        current_question = question_id
        nextQuestion1 = stuff.choice[0]['next_question']
        nextQuestion2 = stuff.choice[1]['next_question']
    })
}


function getQuestion(question_id) {
    $("#question").html("")
    var $table = $("<p>")
    var $table1 = $("<p>")
    var $table2 = $("<p>")
    $.ajax('/api/question/' + question_id).done(function (stuff){
        console.log(stuff.choice)
        $table.html($table.html() + "<tr><td>" + stuff['question_text'] + "<br>")
        $table1.html($table.html() + "<tr><td>" + stuff['question_text'] + "<br>")
        $table2.html($table.html() + "<tr><td>" + stuff.choice['question_text'] + "<br>")
        $('#question').append($table)
        getChoices(question_id)
    })
}


function choice1() {
    console.log(nextQuestion1)
    getChoices(nextQuestion1)
    $('body').css('background-image', "url('/static/space_escape_app/images/corn_field.jpg')")
}


function choice2() {
    getChoices(nextQuestion2)
    $('body').css('background-image', "url('/static/space_escape_app/images/La.jpg')")
}
