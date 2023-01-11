var MyCanvas = document.getElementById("MyCanvas"); // Koppeling naar Canvas
var ctx = MyCanvas.getContext("2d"); // Koppelen aan 2D modus
 
// Variabelen Definieren
//Scores
var levens = 3;
var points = 0;
//Sprite1
let Spr1Formaat = 40; //Sprite Groote
let Spr1PosX = 50; //Sprite Start Positie
let Spr1PosY = 50;
//Sprite2
var Spr2Formaat = 30;
let Spr2PosX = 200;
let Spr2Posy = 200;
// Sprite3
var Spr3Formaat = 30;
let Spr3PosX = 200;
let Spr3PosY = 200;
//Toetsen
let ingedrukteToets = []; // Array Aanmaken


document.addEventListener("keydown", function (uitlezen) {
  ingedrukteToets = ingedrukteToets || [];
  ingedrukteToets[uitlezen.keyCode] = true; // In de array geef ik aan welke toets is ingedrukt
})
document.addEventListener("keyup", function (uitlezen) {
  ingedrukteToets[uitlezen.keyCode] = false; // 
})


setInterval(speelVeldUpdate,5); // Om de 5 cycles uitvoeren functie speelveldupdate


function speelVeldUpdate() {
  if (ingedrukteToets && (ingedrukteToets[38] || ingedrukteToets[87])) {
    Spr1PosY--;
  }
  if (ingedrukteToets && (ingedrukteToets[40] || ingedrukteToets[83])) {
    Spr1PosY++;
  }
  if (ingedrukteToets && (ingedrukteToets[39] || ingedrukteToets[68])) {
    Spr1PosX++;
  }
  if (ingedrukteToets && (ingedrukteToets[37] || ingedrukteToets[65])) {
    Spr1PosX--;
  }
  // aanroepen diverse functies om beeld te tekenen en voor beweging
  ctx.clearRect(0,0, MyCanvas.offsetWidth, MyCanvas.offsetHeight); // leegmaken scherm
  Spr1();
  Spr2();
  botsing();
  Spr3();
  botsing2();
}


function Spr1() {
  if (Spr1PosX < 0) {
    Spr1PosX = MyCanvas.offsetWidth - Spr1Formaat;
  }
  if (Spr1PosY < 0) {
    Spr1PosY = MyCanvas.offsetHeight - Spr1Formaat;
  }
  if (Spr1PosX > MyCanvas.offsetWidth - Spr1Formaat) {
    Spr1PosX = 0;
  }
  if (Spr1PosY > MyCanvas.offsetHeight - Spr1Formaat) {
    Spr1PosY = 0;
  }
  ctx.fillStyle = "green"; // kleur toekennen
  ctx.fillRect(Spr1PosX, Spr1PosY, Spr1Formaat, Spr1Formaat); // vierkant tekenen
 }
 

// Spr2 - schrijf sprite 2
var telSpr2 = 0;
var maxSpr2 = 100;
var richtSpr2PosX = 1; // -1 = links, 0 = midden, 1 = rechts
var richtSpr2Posy = 1; // -1 = omhoog, 0 = horiz, 1 = beneden
function Spr2() {
  // na maxSpr2 > richting veranderen
  telSpr2++;
  if (telSpr2 > maxSpr2) {
    telSpr2 = 0;
    richtSpr2PosX = Math.floor(Math.random()*3) -1;
    richtSpr2Posy = Math.floor(Math.random()*3) -1;
  }
  Spr2PosX += richtSpr2PosX;  
  Spr2Posy += richtSpr2Posy;
  if (Spr2PosX<0) {richtSpr2PosX = 1;}
  if (Spr2PosX>MyCanvas.offsetWidth-Spr2Formaat) {richtSpr2PosX = -1;}
  if (Spr2Posy<0) {richtSpr2Posy = 1;}
  if (Spr2Posy>MyCanvas.offsetHeight-Spr2Formaat) {richtSpr2Posy = -1;}
  ctx.fillStyle = "red"; // kleur spr2
  ctx.fillRect(Spr2PosX, Spr2Posy, Spr2Formaat, Spr2Formaat);
}
 


//
function botsing() {
  // test voor botsing.
  var helftHoogteSpr1 = Spr2Formaat / 2; // let op!
  var Spr1boven = Spr1PosY - helftHoogteSpr1;
  var Spr1beneden = Spr1PosY + helftHoogteSpr1;
  var Spr1links = Spr1PosX - helftHoogteSpr1;
  var Spr1rechts = Spr1PosX + helftHoogteSpr1;
  var helftGrooteSpr2 = Spr2Formaat / 2;
  var Spr2boven = Spr2Posy - helftGrooteSpr2;
  var Spr2beneden = Spr2Posy + helftGrooteSpr2;
  var Spr2links = Spr2PosX - helftGrooteSpr2;
  var Spr2rechts = Spr2PosX + helftGrooteSpr2;
 
 //test voor levens
 if(Spr1beneden < Spr2boven || Spr1boven > Spr2beneden || Spr1rechts < Spr2links || Spr1links > Spr2rechts){
  // niets
 } else {
  levens--;
  document.getElementById("levens").innerHTML = "Nog " + levens + " Levens";
  Spr1PosX = 50; Spr1PosY = 50;
  Spr2PosX = 200; Spr2Posy = 200;
  eindscherm();
}
 }


 

 // Spr3 - schrijf sprite 3
var telSpr3 = 0;
var maxSpr3 = 100;
var richtSpr3PosX = 1; // -1 = links, 0 = midden, 1 = rechts
var richtSpr3PosY = 1; // -1 = omhoog, 0 = horiz, 1 = beneden
function Spr3() {
  // na maxSpr2 > richting veranderen
  telSpr3++;
  if (telSpr3 > maxSpr3) {
    telSpr3 = 0;
    richtSpr3PosX = Math.floor(Math.random()*3) -1;
    richtSpr3PosY = Math.floor(Math.random()*3) -1;
  }
  Spr3PosX += richtSpr3PosX;  
  Spr3PosY += richtSpr3PosY;
  if (Spr3PosX<0) {richtSpr3PosX = 1;}
  if (Spr3PosX>MyCanvas.offsetWidth-Spr3Formaat) {richtSpr3PosX = -1;}
  if (Spr3PosY<0) {richtSpr3PosY = 1;}
  if (Spr3PosY>MyCanvas.offsetHeight-Spr3Formaat) {richtSpr3PosY = -1;}
  ctx.fillStyle = "blue"; // kleur spr2
  ctx.fillRect(Spr3PosX, Spr3PosY, Spr3Formaat, Spr3Formaat);
}



// 
function botsing2() {
  // test voor botsing.
  var helftHoogteSpr1 = Spr3Formaat / 2; // let op!
  var Spr1boven = Spr1PosY - helftHoogteSpr1;
  var Spr1beneden = Spr1PosY + helftHoogteSpr1;
  var Spr1links = Spr1PosX - helftHoogteSpr1;
  var Spr1rechts = Spr1PosX + helftHoogteSpr1;
  var helftGrooteSpr3 = Spr3Formaat / 2;
  var Spr3boven = Spr3PosY - helftGrooteSpr3;
  var Spr3beneden = Spr3PosY + helftGrooteSpr3;
  var Spr3links = Spr3PosX - helftGrooteSpr3;
  var Spr3rechts = Spr3PosX + helftGrooteSpr3;
 
 //test voor punten
 if(Spr1beneden < Spr3boven || Spr1boven > Spr3beneden || Spr1rechts < Spr3links || Spr1links > Spr3rechts){
  // niets
 } else {
  points++;
  document.getElementById("points").innerHTML = "Points: " + points;
  Spr3PosX = 400; Spr3PosY = 400;
}
 }

//Eind Scherm
function eindscherm() {
if (levens <= 0){
    Spr1PosX = 50; Spr1PosY = 50;
    Spr2PosX = 200; Spr2Posy = 200;
    Spr3PosX = 400; Spr3PosY = 400;
    alert("Jouw HighScore is " + points);
    levens = 3;
    document.getElementById("levens").innerHTML = "Nog " + levens + " Levens";
    points = 0;
    document.getElementById("points").innerHTML = "Points: " + points;
}
}