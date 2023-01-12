const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 1;
let Moves;

$("#start").on("click", function () {
  if (level < 2) {
    setTimeout(function () {
      nextSequence();
    }, 1500);
  }
});

//Kullanıcıdan buton seçtirme
$(".btnDiv").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);

  Moves -= 1;
  $("#start").html("Moves: " + Moves);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  Moves = gamePattern.length;

  if (gamePattern.length > 0) {
    for (let i = 0; i < gamePattern.length; i++) {
      setTimeout(function () {
        $("#" + gamePattern[i])
          .fadeOut(100)
          .fadeIn(100);
        playSound(gamePattern[i]);
      }, 1000 * i);
    }
  }

  userClickedPattern = [];
  $(".title").html("Level " + level);
  $("#start").html("Moves: " + Moves);
  level++;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (gamePattern.length === userClickedPattern.length) {
      $(".title").html("Correct!");
      $("html").addClass("correct");
      setTimeout(function () {
        $("html").removeClass("correct");
      }, 2000);
      setTimeout(function () {
        nextSequence();
      }, 2005);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $(".title").html("Game over, Press Button to restart");
    $("html").addClass("wrong");
    setTimeout(function () {
      $("html").removeClass("wrong");
    }, 500);
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  level = 1;
  $("#start").html("Restart");
}
/*
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },200)
Bootstrap kullandığım için gerek kalmadı
}
*/
