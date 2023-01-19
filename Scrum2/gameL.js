const gameBoard = document.querySelector("#gameBoard"); //canvas
const ctx = gameBoard.getContext("2d");                 // aangeven 2d omgeving
const scoreText = document.querySelector("#scoreText"); // de score
const resetBtn = document.querySelector("#resetBtn"); // de reset knop
const gameWidth = gameBoard.width;              // breedte game
const gameHeight = gameBoard.height;        // hoogte game
const boardBackground = "white";        // kleur achtergrond game
const snakeColor = "lightgreen";         // kleur slang
const snakeBorder = "black";             // kleur rand van de slang
const foodColor = "red";                //kleur eten
const unitSize = 25;
let running = false;                    // testen of game werkt
let xVelocity = unitSize;               // hoe snel de slang gaat horizontaal, positief is rechts en negatief is naar links
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [                           // lichaamsdelen slang
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart(){               //zorgt ervoor dat de game start
    running= true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){                // checkt of de game aan het runnen is
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }
    else{                           // als de game niet runned ben je game over
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){                                  // vind een random plek om voedsel te plaatsen
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};
function moveSnake(){                                   //bewegen slang
    const head = {x: snake[0].x + xVelocity,            // voor horizontaal
                  y: snake[0].y + yVelocity};              // verticaal
    
    snake.unshift(head);
    //als het eten word gegeten
    if(snake[0].x == foodX && snake[0].y == foodY){   //zorgt ervoor dat als het hoofd en voedsel op een plek zijn de slang het voedsel eet
        score+=1;                               // zorgt dat als je voedsel oppakt je score met 1 omhoog gaat
        scoreText.textContent = score;
        createFood();                       // maakt 1 nieuwe voedsel aan als een gegeten word
    }
    else{
        snake.pop();            // zorgt dat de snake evenlang blijft en haalt dan de achterste weg
    }     
};
function drawSnake(){               // zorgt dat de slang zichtbaar word
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function changeDirection(event){                // richting veranderen
    const keyPressed = event.keyCode;           // de knoppen die je gebruikt om te bewegen
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRight):            //zorgt dat je niet in je lichaam kan gaan de andere kant op
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
};
function checkGameOver(){
    switch(true){
        case (snake[0].x < 0):          // eindigt als je de linker rand raakt eindigt de game
            running = false;
            break;
        case (snake[0].x >= gameWidth):     // eindigt als je de rechter rand raakt eindigt de game
            running = false;
            break;
        case (snake[0].y < 0):              // eindigt als je de boventse rand raakt eindigt de game
            running = false;
            break;
        case (snake[0].y >= gameHeight):        // eindigt als je de onderste rand raakt eindigt de game
                running = false;
                break;
    }
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){       //eindigt de game als het hoofd op de zelfde plek is als een lichaamsdeel
            running = false;
        }
    }
};
function displayGameOver(){                     // laat dit zien als je verliest
    ctx.font = "50px Serif";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", gameWidth / 2, gameHeight / 2);
    running = false;
};
function resetGame(){                   // reset de game zodat je het opnieuw kan spelen
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();                // zorgt dat de game weer begint
};