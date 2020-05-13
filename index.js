$(document).ready(function() {
    
    let level = 1;
    let lostGame = false;
    let pattern = [];

    function genRandom() {
        return Math.floor(Math.random() * 4 + 1);
    }

    $(document).on("keydown", function() {
        if (lostGame) {
            $("#level-title").text("Game Over, Press Any Key to Restart");
            level = 1;
            pattern = [];
            lostGame = false;
        } else {
            $("#level-title").text("Level " + level);
        }
    });

    while(!lostGame) {

        switch(genRandom()) {
            case 1:
                pattern.push(1);
                $("#green").addClass("pressed");
                setTimeout(function() {
                    $("#green").removeClass("pressed");
                }, 100);
                break;
            case 2:
                pattern.push(2);
                $("#red").addClass("pressed");
                setTimeout(function() {
                    $("#red").removeClass("pressed");
                }, 100);
                break;
            case 3:
                pattern.push(3);
                $("#yellow").addClass("pressed");
                setTimeout(function() {
                    $("#yellow").removeClass("pressed");
                }, 100);
                break;
            case 4:
                pattern.push(4);
                $("#blue").addClass("pressed");
                setTimeout(function() {
                    $("#blue").removeClass("pressed");
                }, 100);
                break;
        }

        console.log(pattern);
        setTimeout(function() {
            // Do Nothing
            console.log("Waiting..");
        }, 5000);

        if (pattern[pattern.length - 1] === 4) {
            lostGame = true;
        }

    }

});