var playing = false;
var score;
var trialsLeft;
var step;
var action;

//used for set interval action

var fruits = ['apple', 'banana', 'cherry', 'grapes', 'green-apple', 'guava', 'mango', 'orange', 'peach', 'pear', 'pineapple', 'watermelon'];

// $(function () {
//click on start reset button
$("#startreset").click(function () {
    //we are playing
    if (playing == true) {
        //yes
        //reload page
        location.reload();

    }
    //we are not playing
    else {
        //no
        playing = true;
        //game initiated
        //set score to 0
        score = 0;
        $("#scorevalue").html(score);

        //show trials left
        $("#trialsLeft").show();
        trialsLeft = 3;
        addHearts();
        //change button text to reset game

        $("#gameOver").hide();

        $("#startreset").html("RESET GAME");
        //1.create a random fruit
        startAction();

    }

});

$("#fruit1").mouseover(function () {
    score++;
    $("#scorevalue").html(score);
    //update score
    document.getElementById("slicesound").play();
    //play sound

    //stop fruit
    clearInterval(action);

    //hide fruit
    $("#fruit1").hide("explode", 500);
    //slice fruit

    //send new fruit
    setTimeout(startAction, 500);
});



function addHearts() {
    $("#trialsLeft").empty();
    for (i = 0; i < trialsLeft; i++) {
        $("#trialsLeft").append('<img src = "images/heart.jpg" class="life">');
    }

}

function startAction() {

    //generating a fruit
    $("#fruit1").show();
    chooseFruit();
    //choose a random fruit
    $("#fruit1").css({
        'left': Math.floor(550 * Math.random()),
        'top': -50
    });
    //random position


    //generate a random step
    step = 1 + Math.round(Math.random() * 5);

    //move fruit down by 1 step every 10ms
    action = setInterval(function () {
        $("#fruit1").css('top', $("#fruit1").position().top + step);
        //move fruit by 1 step

        //check if fruit is too low
        if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
            //check if any trials left
            if (trialsLeft > 1) {
                //generating a fruit
                $("#fruit1").show();
                chooseFruit();
                //choose a random fruit
                $("#fruit1").css({
                    'left': Math.floor(550 * Math.random()),
                    'top': -50
                });
                //random position


                //generate a random step
                step = 1 + Math.round(Math.random() * 5);

                //reduce trials by 1
                trialsLeft--;
                //populate trialsleft box
                addHearts();


            } else {

                //game over
                playing = false;
                //we are not playing anymore
                $("#startreset").html("START GAME");
                //change button tostart game
                $("#gameOver").show();
                $("#gameOver").html('<h3>Game Over:</h3><p>Your score is ' + score + '</p>');
                $("#trialsLeft").hide();
                stopAction();

            }

        }

    }, 10);

}

//generate a random fruit
function chooseFruit() {
    $("#fruit1").attr('src', 'images/' + fruits[Math.round(Math.random() * 11)] + '.jpg');

    //if error occurs in image loading..

    $("#fruit1").on("error", function () {
        $(this).attr('src', 'images/appleFruit.jpg');
    });
}

//stop dropping fruits
function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
}

// });
