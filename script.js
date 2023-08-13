var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var randomNumber=Math.floor(Math.random() *4);
var randomChosenColour=buttonColours[randomNumber];
var gameStarted=false;
var userGuessing=false;
var level=0;
var currentGuessNumber=0;


function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function nextSequence(){
    randomNumber= Math.floor(Math.random() *4);
    randomChosenColour=buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);
    level++;
    currentGuessNumber=0;
    userClickedPattern=[];
    $("h1").text("Level "+level);
    // Animation
    $("#" + randomChosenColour).fadeToggle(30);
    $("#" + randomChosenColour).fadeToggle(30);
    // play Audio 
    playSound(randomChosenColour);
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
      }, 100);
}

$(".btn").click(function(event){
    var userChosenColour=event.target.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);

    if(userClickedPattern.length===gamePattern.length){
                
        if(userChosenColour===gamePattern[currentGuessNumber]){
            
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }else{
            // GAME OVER
            gameOver();
        }


    }else{


        if(userChosenColour===gamePattern[currentGuessNumber]){
            // continue game
            currentGuessNumber++;
              
        }else{
            // GAME OVER
            gameOver();
        }


    } 
    
});

$(document).keydown(function(event) {
    if(!gameStarted){
        
        $("h1").text("Level 0");
        nextSequence();
        gameStarted=true;
    }

});
var text;
function gameOver(){
    if(level<5){
        text="First Grader IQ";
    }else if(level<10){
        text="Very Average";
    }else if(level<12){
        text="Not Bad ";
    }else if(level<17){
        text="Pretty Smart for a little bitch!";
    }else{
        text="Nice you smart";
    }

    $("h1").text(" Game Over! "+ text + ", Press any key to start ");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 300);
    userClickedPattern=[];
    gamePattern=[];
    gameStarted=false;
    userGuessing=false;
    level=0;
    currentGuessNumber=0;
}


