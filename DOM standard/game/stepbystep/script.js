var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height/2;
var level = 1;
var dx = 3;
var dy = -3;
var ballRadius = 10;
var score = 0;
const boxWidth = 35;
const boxHeight = 35;
var boxCount = 7;
var time = 20;
document.addEventListener("keydown", keyDownHandler, false);
var timer = document.getElementById("timer");
table = document.getElementById("players");

var boxes = new Array();
function generateBoxes(boxCount){
    for(var c=0; c<boxCount; c++) {
        boxes.push({x:Math.random()*800, y:Math.random()*600, points: 20, isGreen: Math.floor(Math.random()*2), time: Math.floor(Math.random()*35)});
        if(boxes[c].x + boxWidth > 800){
            boxes.pop();
            c--;
        }
        if(boxes[c].y + boxHeight > 600){
            boxes.pop();
            c--;
        }
        for(var i = 0; i < c; i++){
            var b = boxes[i];
            if(Math.abs(b.x - boxes[c].x) < 35 || Math.abs(b.y - boxes[c].y) < 35  || Math.abs(boxes[c].x - b.x) < 35 || Math.abs(boxes[c].y - b.y) < 35){
                boxes.pop();
                c--;
            }
        }
    }
}

function decreaseTime(){
    console.log(time)
    console.log(timer)
    timer.innerHTML = "Time " + time + " Level: " + level;
    // for(var r=0; r<boxCount; r++) {
    //     var b = boxes[r];
    //     b.time--;
    //     if(b.time == 0){;
    //         b.x = Math.random()*800;
    //         b.y = Math.random()*600;
    //         b.isGreen = 1;
    //         b.time = 35;
    //         b.points = 20;
    //     }
    // }
    if(time == 0 && level == 3){
        var playerName = window.prompt(`GAME OVER\n You collected ${score} points`);
        newRow = table.insertRow(1);
        var cell1 = newRow.insertCell(0);
        cell1.innerHTML = playerName;
        var cell2 = newRow.insertCell(1);
        cell2.innerHTML = score;
        time = 20;
        level = 1;
        boxCount = 7;
        score = 0;
        boxes = new Array();
    }
    if(time == 0){
        draw();
        time = 20;
        level++;
        dx += 2;
        dy -= 2;
        boxCount += 4;
        generateBoxes(4);
    }
    time--;
    setTimeout(decreaseTime, 1000);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}



function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight")
        dx += 2 * level;
    else if(e.key == "Left" || e.key == "ArrowLeft")
        dx -= 2 * level;
    else if(e.key == "Down" || e.key == "ArrowDown")
        dy += 2 * level;
    else
        dy -= 2 * level;
}

function drawBoxes() {
    for(var r = 0; r < boxCount; r++) {
            var brickX = boxes[r].x;
            var brickY = boxes[r].y;
            ctx.beginPath();
            ctx.rect( brickX, brickY, boxWidth, boxHeight);
            if(boxes[r].isGreen)
                ctx.fillStyle = "green";
            else
                ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
    }
}

function collisionDetection() {
    for(var r=0; r<boxCount; r++) {
         var b = boxes[r];
            if(x > b.x && x < b.x+boxWidth && y > b.y && y < b.y+boxHeight) {
                if(b.isGreen){
                    score+=b.points;
                    b.points = 0;
                }
                else{
                    score -= b.points;
                    b.points = 0;
                }
            }
    }
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoxes();
    collisionDetection();
    drawScore();
    if(x + dx > canvas.width-ballRadius)
        x = ballRadius;
    if(x + dx < ballRadius)
        x = canvas.width-ballRadius;
    if(y + dy > canvas.height-ballRadius)
        y = ballRadius;
    if(y + dy < ballRadius)
        y = canvas.height-ballRadius;

    drawBall();
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}
//////
generateBoxes(7);
requestAnimationFrame(draw);
decreaseTime();