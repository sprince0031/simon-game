let generatedPattern = [];
let userPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let level = 1;
let lostGame = false;

function chooseSoundEffect(colourChoice) {
    switch (colourChoice) {
        case "red":
            new Audio("./sounds/red.mp3").play();
            break;
        case "blue":
            new Audio("./sounds/blue.mp3").play();
            break;
        case "green":
            new Audio("./sounds/green.mp3").play();
            break;
        case "yellow":
            new Audio("./sounds/yellow.mp3").play();
            break;
    }
}

function genRandom() {
    let randomNumber = Math.floor(Math.random() * 4);
    let colourChoice = buttonColours[randomNumber];
    generatedPattern.push(colourChoice);

    $("#"+colourChoice).fadeOut(100).fadeIn(100);
    chooseSoundEffect(colourChoice);

}

$(".btn").on("click", function (event) {
    let userChoice = $(this).attr("id");
    chooseSoundEffect(userChoice);
    $("#"+userChoice).toggleClass(".pressed");
    setTimeout(function() {
        $("#"+userChoice).removeClass(".pressed");
    }, 1000);

});

while (! lostGame) {
    genRandom();
    if (generatedPattern.length > 4) {
        break;
    }
}