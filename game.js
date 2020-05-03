var buttonColors = ["green", "red", "yellow", "blue"];

var userClickedPattern = [];

var gamePattern = [];

var started = false;

var level = 0;

//detecting clicks and playing sounds and animation on it

$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1)
});

//detecting keypress
$(document).keypress(function() {

  if (!started) {
    nextSequence();
    started = true;
  }

});

//function called nextSequence to start a new sequence

function nextSequence() {
  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

}

//function to play sound

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");

  audio.play();
}

//function to start animation

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100)
}

//function to check the answer

function checkAnswer(currentLevel) {

  //if the user got it right

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  }

  //if the user got it wrong
  else {
    console.log("wrong");

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over")
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over! Press any key to restart");

    startover();
  }

}

//function to startover

function startover() {
  level = 0;
  gamePattern = [];
  started = false;
}
