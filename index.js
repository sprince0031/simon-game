let generatedPattern = [];
let userPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let gameStart = true;

$(".btn").on("click", function () {
    let userChoice = $(this).attr("id");
    chooseSoundEffect(userChoice);
    $("#"+userChoice).addClass("pressed");
    setTimeout(function() {
        $("#"+userChoice).removeClass("pressed");
    }, 100);
    userPattern.push(userChoice);
    // console.log("user: " + userPattern);

    checkAnswer(userPattern.length - 1);
    
});

$(document).on("keydown", function(event) {
    if (gameStart && event.key === "Enter") {
        genSequence();
        gameStart = false;
        $("#level-title").text("Level " + level);
    }
});

function chooseSoundEffect(soundFile) {
    new Audio("./sounds/" + soundFile + ".mp3").play();
}

function genSequence() {
    userPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let colourChoice = buttonColours[randomNumber];
    generatedPattern.push(colourChoice);
    // console.log("generated: " + generatedPattern);
    $("#"+colourChoice).fadeOut(100).fadeIn(100);
    chooseSoundEffect(colourChoice);

    level++;
    $("#level-title").text("Level " + level);

}

function checkAnswer(index) {

    if (generatedPattern[index] === userPattern[index]) {
        console.log("correct answer!")

        if (index === generatedPattern.length - 1) {
            setTimeout(function() {
                genSequence();
            }, 1000);
        }

    } else {
        console.log("Game Over! :(");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 100);
        chooseSoundEffect("wrong");
        $("#level-title").text("Game Over, Press Enter to Restart");
        gameStart = true;
        generatedPattern = [];
        userPattern = [];
        level = 0;
    }

}