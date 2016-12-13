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


function getQuestion(next_question) {
    var new_url = next_question
    $("#question").html("")
    var $table = $("<p>")
    chBackcolor(next_question)
    $.ajax('/api/question/1').done(function (stuff){
        console.log(stuff)
        $table.html($table.html() + "<tr><td>" + stuff['question_text'] + "<br>")
        $('#question').append($table)
        getChoices(stuff['id'])
    })
}



function getChoices(question_id) {
    $("#choices").html("")
    var $table = $("<p>")
    $.ajax('/api/choice/').done(function (stuff){
        for(i = 0; i < stuff.results.length; i++){
            console.log(question_id)
            $table.html($table.html() + "<br>" + "<button class='choiceButton' onClick='getQuestion(" + stuff.results[i]['next_question'] + ')>' + stuff.results[i]['choice_text'] + "</button><br>")
            console.log($table)
            $('#choices').append($table)
        }
    })
}


function chBackcolor(question_image_url) {
    console.log('here')
   $('body').css('background-image', "url('/static/space_escape_app/images/corn_field.jpg')")
}
