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
var choiceBackground1
var choiceBackground2

function start() {
    getChoices(1)
}


function getChoices(question_id) {
    $(".mainText").html("")
    $(".optionButton1").html("")
    $(".optionButton2").html("")
    var $table = $("<p>")
    var $table1 = $("<p>")
    var $table2 = $("<p>")
    $.ajax('/api/question/' + question_id).done(function (stuff){
        console.log(stuff['question_text'])
        $table.html($table.html() + "<p>" + stuff['question_text'] + "</p>")
        $table1.html($table1.html() + "<tr><td>" + stuff.choice[0]['choice_text'] + "<br>")
        $table2.html($table2.html() + "<tr><td>" + stuff.choice[1]['choice_text'] + "<br>")
        $('.mainText').append($table)
        $('.optionButton1').append($table1)
        $('.optionButton2').append($table2)
        current_question = question_id
        nextQuestion1 = stuff.choice[0]['next_question']
        nextQuestion2 = stuff.choice[1]['next_question']
        choiceBackground1 = "url('" + stuff.choice[0]['choice_image_url'] + "')"
        choiceBackground2 = "url('" + stuff.choice[1]['choice_image_url'] + "')"
        console.log(choiceBackground1)
        console.log(choiceBackground2)
    })
}


function magicBall(){
  arr = [1, 2];
  var rand = Math.random();
  rand *= arr.length;
  rand = Math.floor(rand);
  if(rand == 0){
      $(".optionButton1").css('background-color', 'red')
      setTimeout($(".optionButton1").css('background-color', 'pink'), 1500)
      setTimeout(choice1, 2000)
  }
  else{
      $(".optionButton2").css('background-color', 'red')
      setTimeout($(".optionButton2").css('background-color', 'pink'), 1500)
      setTimeout(choice2, 2000)
  }
}


function choice1() {
    getChoices(nextQuestion1)
    $('.heroRocketship').css('background-image', choiceBackground1)
}


function choice2() {
    getChoices(nextQuestion2)
    $('.heroRocketship').css('background-image', choiceBackground2)
}


$(".optionButton1").click(choice1)
$(".optionButton2").click(choice2)
$(".magicBallButton").click(magicBall)
