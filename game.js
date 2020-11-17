var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gameStart = false;
var level = 0;

$(document).on("keydown", function(){
  if(gameStart === false) {
    gameStart = true;
    $("h1").html("Level 0");
    nextSequence();
  }
})

$(".btn").on("click", function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length -1);
  var audio = new Audio("sounds/" + userChosenColor + ".mp3");
  audio.play();
  animatePress(userChosenColor);
});

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("div#" + randomChosenColor).fadeOut().delay(10).fadeIn();
  playSound(randomChosenColor);
  level++;
  $("h1").html("Level " + level);
  return randomNumber;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence();
    }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(
      function() {
      $("body").removeClass("game-over");
    } , 200);

    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  gameStart = false;
  level = 0;
  gamePattern = [];
}
