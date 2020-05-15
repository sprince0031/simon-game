let generatedPattern = [];
let userPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let gameStart = true;
let cheatString = "";
let showLogsCheat = false;
let godModeCheat = false;
let speed = 1000;
// let clearCheatOnInterval = setInterval(function() {
//     cheatString = "";
// }, 5000);

$(document).ready(function() {
    $(".cheat-activated").hide();
});

$(".btn").on("click", function () {
    let userChoice = $(this).attr("id");
    chooseSoundEffect(userChoice);
    $("#"+userChoice).addClass("pressed");
    setTimeout(function() {
        $("#"+userChoice).removeClass("pressed");
    }, 100);
    userPattern.push(userChoice);
    // if (showLogsCheat) {
    //     console.log("User entered sequence: \n" + userPattern);
    // }

    checkAnswer(userPattern.length - 1);
    
});

$(document).on("keydown", function(event) {

    if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
        cheatString += event.key;
        if (cheatString.length === 1) {
            setTimeout(function() {
                cheatString = "";
            }, 5000);
        } else if (cheatString.length > 8) {
            cheatString = "";
        }
        
        if (cheatString === "showlogs") {
            showLogsCheat = cheatToggler(showLogsCheat);
            if (showLogsCheat) {
                console.log("Sequence to complete: \n" + generatedPattern);
            }
        }

        if (cheatString === "godmode") {
            godModeCheat = cheatToggler(godModeCheat);
            godMode(godModeCheat);
        }
    }

    if (gameStart && event.key === "Enter") {
        genSequence();
        gameStart = false;
        if (!godModeCheat) {
            $("#level-title").text("Level " + level);
        } else {
            $("#level-title").html("Level &infin;");
        }

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

    if (showLogsCheat) {
        console.log("Sequence to complete: \n" + generatedPattern);
    }
    
    $("#"+colourChoice).fadeOut(100).fadeIn(100);
    chooseSoundEffect(colourChoice);

    if (!godModeCheat) {
        level++;
        $("#level-title").text("Level " + level);
    }


}

function checkAnswer(index) {

    if (generatedPattern[index] === userPattern[index]) {
        console.log("Correct answer!")

        if (index === generatedPattern.length - 1) {
            setTimeout(function() {
                genSequence();
            }, speed);
        }

    } else {
        console.log("Game Over! :(");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 100);
        chooseSoundEffect("wrong");
        $("#level-title").text("Game Over, Press Enter to Restart");
        resetGame();
    }

}

function resetGame() {
    gameStart = true;
    generatedPattern = [];
    userPattern = [];
    level = 0;
}

/*
*   Cheat codes because they are dank af... 8|
*/

function cheatToggler(cheatMode) {
    let returnMode;
    if (cheatMode) {
        console.log("Cheat Deactivated!");
        $(".cheat-activated").text("Cheat deactivated");
        
        returnMode = false;
    } else {
        console.log("Cheat Activated!");
        $(".cheat-activated").text("Cheat activated");
        
        returnMode = true;
    }
    chooseSoundEffect("cheat");
    $(".cheat-activated").fadeIn(500);
    setTimeout(function() {
        $(".cheat-activated").fadeOut(500);
    }, 2000);
    cheatString = "";

    return returnMode;

}

let godModeBgm = new Audio("./sounds/god-mode-san-bgm.mp3");
function godMode(godModeCheat) {
    
    if (godModeCheat) {
        $("#level-title").html("Level &infin;").css("color", "#E25822").animate({
            fontSize: "+=150px",
        }, 1000);

        $(".btn").addClass("god-mode");
        $("body").addClass("body-god-mode");
        speed = 200;
        $("#favicon").attr("href", "./images/thug-life.jpg");
        $("title").text("🔥🔥🔥 GOD MODE 🔥🔥🔥");
        if (typeof godModeBgm.loop === 'boolean') {
            godModeBgm.loop = true;
        } else {
            godModeBgm.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
        }
        godModeBgm.play();
    } else {
        let titleText;
        if (level === 0) {
            titleText = "Press Enter to Start";
        } else {
            titleText = "Level " + level;
        }
        $("#level-title").text(titleText).css("color", "#FEF2BF").animate({
            fontSize: "-=150px",
        }, 1000);
        gameStart = true;
        $(".btn").removeClass("god-mode");
        $("body").removeClass("body-god-mode");
        speed = 1000;
        $("#favicon").attr("href", "./images/simon-favicon.png");
        $("title").text("Simon Game | By sprince0031")
        godModeBgm.pause();
    }
    resetGame();
}