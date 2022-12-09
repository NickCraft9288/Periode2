//Copy Paste van JavaScript Canvas Opdracht Placeholder Code

var mijnObject; // Aan dit object koppelen we een figuur
var canvasNieuw;
// Canvas creéren 
function startCanvas(){
    canvasNieuw = document.createElement("canvas");
    canvasNieuw.width = 480;
    canvasNieuw.height = 360;
    canvasNieuw.Style = "border: 1px solid black";
    document.body.insertBefore(canvasNieuw, document.body.childNodes[0]);
    
    mijnObject = new ObjectMaker(30,30,"red", 20, 120);
}

//Object maken
function ObjectMaker(breedte, hoogte, kleur, x, y) {
    ctx = canvasNieuw.getContext("2d");
    ctx.fillStyle = kleur;
    ctx.fillRect(x,y, breedte, hoogte);
}


//Placeholder 2

var MyCanvas = document.getElementById("MyCanvas"); // koppeling naar Canvas
var ctx = MyCanvas.getContext("2d"); // ctx -> 2d canvas

var SpritePositieX = 50; // plek horizontaal
var SpritePositieY = 50; // plek verticaal
var Snelheid = 5; // snelheid van beweging het blokje over de assen
var blokje = 20; // groote van het blokje

tekenSprite();

document.addEventListener("keydown", (event) => { //toetsindruk inlezen in event funct uitvoeren
    let keypressed = event.key; 
    console.log(keypressed); // in de log weergeven  van indrukte toets
    switch (keypressed) {
        case "ArrowUp" && "w":
            SpritePositieY -= Snelheid; // omhoog op de y as richting 0
            tekenSprite();
            break;
        case "ArrowDown" && "s":
            SpritePositieY += Snelheid; // omlaag op de y as
            tekenSprite();
            break;
        case "ArrowLeft" && "a":
            SpritePositieX -= Snelheid;
            tekenSprite();
            break;
        case "ArrowRight" && "d":
            SpritePositieX += Snelheid;
            tekenSprite();
            break;
        case "ArrowUp" && "ArrowLeft":
            SpritePositieY -= Snelheid;
            SpritePositieX -= Snelheid;
            tekenSprite();
            break;
    }
}

);

function tekenSprite() {
    var breedte = MyCanvas.offsetWidth - blokje; // breedte = breedte canvas - breedte blokje
    var hoogte = MyCanvas.offsetHeight - blokje; // hoogte = hoogte canvas - hoogte blokje
    if (SpritePositieX < 0) { SpritePositieX = breedte;} // als de SpritePositie = breedte / Sprite Positie = 0 omwisselt krijg je dat ze naar de andere kant komen of dat ze tegen een muur aankomt
    if (SpritePositieY < 0) { SpritePositieY = hoogte;}
    if (SpritePositieX > breedte) { SpritePositieX = 0;}
    if (SpritePositieY > hoogte) { SpritePositieY = 0;}
    ctx.clearRect(0,0, MyCanvas.offsetWidth, MyCanvas.offsetHeight);
    ctx.fillStyle = "green";
    ctx.fillRect(SpritePositieX, SpritePositieY, blokje, blokje);
}
