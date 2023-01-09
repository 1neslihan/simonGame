const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 1;


$("#start").on("click", function () {
  if(level<2){
    $("#start").hide();
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

  checkAnswer(userClickedPattern.length - 1);

  //  animatePress(userChosenColour);
  // console.log(this);
});

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);

  userClickedPattern = [];
  $(".title").html("Level " + level);
  
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
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $(".title").html("Game over, Press Button to restart");
    $("#start").html("Restart");
    $("html").addClass("wrong");
    setTimeout(function () {
      $("html").removeClass("wrong");
    },500);
    startOver();
  }
}

function startOver(){
  gamePattern=[];
  level=1;
  $("#start").show();

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
