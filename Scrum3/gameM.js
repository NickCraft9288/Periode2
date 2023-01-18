var MyCanvas = document.getElementById("MyCanvas"); // Koppeling naar Canvas
var ctx = MyCanvas.getContext("2d"); // Koppelen aan 2D modus 

// Variabelen Definieren
    // Scores
        var levens = 5;
        document.getElementById("levens").innerHTML = "Nog " + levens +" Levens";
        var points = 0;
        document.getElementById("points").innerHTML = "Points: " + points;
    // Sprite1
        let Spr1Formaat = 40; //Sprite Groote
        let Spr1PosX = 50; //Sprite Start Positie
        let Spr1PosY = 50;
    // Sprite2 Enemy1
        let Spr2E1Formaat = 40;
        let Spr2E1PosX = 250;
        let Spr2E1PosY = 250;
    // Sprite2 Enemy2
        let Spr2E2Formaat = 40;
        let Spr2E2PosX = 300;
        let Spr2E2PosY = 300;
    // Sprite3
        let Spr3Formaat = 30;
        let Spr3PosX = 200;
        let Spr3PosY = 200;
    // Toetsen
        let ingedrukteToets = []; // Array Aanmaken

// Toets Knoppen Lezen
document.addEventListener("keydown",function(uitlezen){
    ingedrukteToets = ingedrukteToets || [];
    ingedrukteToets[uitlezen.keyCode] = true; // In de array geef ik aan welke toets is ingedrukt
})
document.addEventListener("keyup",function(uitlezen){
    ingedrukteToets[uitlezen.keyCode] = false; // 
})


setInterval(speelVeldUpdate,7.5); // Om de 7.5 cycles uitvoeren functie speelveldupdate

// VeldUpdate + Sprite1 Movements + Functies heroproepen
function speelVeldUpdate() {
    if(ingedrukteToets && (ingedrukteToets[38] || ingedrukteToets[87])) {
        Spr1PosY--;
        Spr1PosY--;
    }
    if(ingedrukteToets && (ingedrukteToets[40] || ingedrukteToets[83])) {
        Spr1PosY ++;
        Spr1PosY ++;
    }
  if(ingedrukteToets && (ingedrukteToets[39] || ingedrukteToets[68])) {
        Spr1PosX ++;
        Spr1PosX ++;
    }
  if(ingedrukteToets && (ingedrukteToets[37] || ingedrukteToets[65])) {
        Spr1PosX--;
        Spr1PosX--;
    }
// aanroepen diverse functies om beeld te tekenen en voor beweging
    ctx.clearRect(0,0, MyCanvas.offsetWidth, MyCanvas.offsetHeight); // leegmaken scherm
    Spr1();
    Spr2E1();
    BotsingE1();
    Spr2E2();
    BotsingE2();
    Spr3();
    BotsingP();
}

// Sprite1
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



// Spr2E1 - schrijf sprite 2 - Enemy 1
var telSpr2E1 = 0;
var maxSpr2E1 = 100;
var richtSpr2E1PosX = 1; // -1 = links, 0 = midden, 1 = rechts
var richtSpr2E1PosY = 1; // -1 = omhoog, 0 = horiz, 1 = beneden
function Spr2E1() {
    // na maxSpr2E1 > richting veranderen
    telSpr2E1++;
    if (telSpr2E1 > maxSpr2E1) {
        telSpr2E1 = 0;
        richtSpr2E1PosX = Math.floor(Math.random()*3) -1;
        richtSpr2E1PosY = Math.floor(Math.random()*3) -1;
    }
    Spr2E1PosX += richtSpr2E1PosX;  
    Spr2E1PosY += richtSpr2E1PosY;
    if (Spr2E1PosX<0) {richtSpr2E1PosX = 1;}
    if (Spr2E1PosX>MyCanvas.offsetWidth-Spr2E1Formaat) {richtSpr2E1PosX = -1;}
    if (Spr2E1PosY<0) {richtSpr2E1PosY = 1;}
    if (Spr2E1PosY>MyCanvas.offsetHeight-Spr2E1Formaat) {richtSpr2E1PosY = -1;}
    ctx.fillStyle = "red"; // kleur Spr2E1
    ctx.fillRect(Spr2E1PosX, Spr2E1PosY, Spr2E1Formaat, Spr2E1Formaat);
}

function BotsingE1() {
    // test voor Botsing.
    var helftHoogteSpr1 = Spr2E1Formaat / 2; // let op!
    var Spr1boven = Spr1PosY - helftHoogteSpr1;
    var Spr1beneden = Spr1PosY + helftHoogteSpr1;
    var Spr1links = Spr1PosX - helftHoogteSpr1;
    var Spr1rechts = Spr1PosX + helftHoogteSpr1;
    var helftGrooteSpr2E1 = Spr2E1Formaat / 2;
    var Spr2E1boven = Spr2E1PosY - helftGrooteSpr2E1;
    var Spr2E1beneden = Spr2E1PosY + helftGrooteSpr2E1;
    var Spr2E1links = Spr2E1PosX - helftGrooteSpr2E1;
    var Spr2E1rechts = Spr2E1PosX + helftGrooteSpr2E1;
//test voor levens
if(Spr1beneden < Spr2E1boven || Spr1boven > Spr2E1beneden || Spr1rechts < Spr2E1links || Spr1links > Spr2E1rechts){
// niets
} else {
    levens--;
    document.getElementById("levens").innerHTML = "Nog " + levens + " Levens";
    Spr1PosX = 50; Spr1PosY = 50;
    Spr2E1PosX = Math.floor(Math.random() * 200) + 200; Spr2E1PosY = Math.floor(Math.random() * 200) + 200;
    Spr2E2PosX = Math.floor(Math.random() * 200) + 200; Spr2E2PosY = Math.floor(Math.random() * 200) + 200;
    Eindscherm();
}}


// Spr2E2 - schrijf sprite 2 - Enemy 2
var telSpr2E2 = 0;
var maxSpr2E2 = 100;
var richtSpr2E2PosX = 1; // -1 = links, 0 = midden, 1 = rechts
var richtSpr2E2PosY = 1; // -1 = omhoog, 0 = horiz, 1 = beneden
function Spr2E2() {
// Na maxSpr2E2 > richting veranderen
telSpr2E2++;
if (telSpr2E2 > maxSpr2E2) {
    telSpr2E2 = 0;
    richtSpr2E2PosX = Math.floor(Math.random()*3) -1;
    richtSpr2E2PosY = Math.floor(Math.random()*3) -1;
}
Spr2E2PosX += richtSpr2E2PosX;  
Spr2E2PosY += richtSpr2E2PosY;
if (Spr2E2PosX<0) {richtSpr2E2PosX = 1;}
if (Spr2E2PosX>MyCanvas.offsetWidth-Spr2E2Formaat) {richtSpr2E2PosX = -1;}
if (Spr2E2PosY<0) {richtSpr2E2PosY = 1;}
if (Spr2E2PosY>MyCanvas.offsetHeight-Spr2E2Formaat) {richtSpr2E2PosY = -1;}
ctx.fillStyle = "red"; // kleur Spr2E2
ctx.fillRect(Spr2E2PosX, Spr2E2PosY, Spr2E2Formaat, Spr2E2Formaat);
}

function BotsingE2() {
    // test voor Botsing.
    var helftHoogteSpr1 = Spr2E2Formaat / 2; // let op!
    var Spr1boven = Spr1PosY - helftHoogteSpr1;
    var Spr1beneden = Spr1PosY + helftHoogteSpr1;
    var Spr1links = Spr1PosX - helftHoogteSpr1;
    var Spr1rechts = Spr1PosX + helftHoogteSpr1;
    var helftGrooteSpr2E2 = Spr2E2Formaat / 2;
    var Spr2E2boven = Spr2E2PosY - helftGrooteSpr2E2;
    var Spr2E2beneden = Spr2E2PosY + helftGrooteSpr2E2;
    var Spr2E2links = Spr2E2PosX - helftGrooteSpr2E2;
    var Spr2E2rechts = Spr2E2PosX + helftGrooteSpr2E2;
//test voor levens
if(Spr1beneden < Spr2E2boven || Spr1boven > Spr2E2beneden || Spr1rechts < Spr2E2links || Spr1links > Spr2E2rechts){
    // niets
} else {
    levens--;
    document.getElementById("levens").innerHTML = "Nog " + levens + " Levens";
    Spr1PosX = 50; Spr1PosY = 50;
    Spr2E1PosX = Math.floor(Math.random() * 200) + 200; Spr2E1PosY = Math.floor(Math.random() * 200) + 200;
    Spr2E2PosX = Math.floor(Math.random() * 200) + 200; Spr2E2PosY = Math.floor(Math.random() * 200) + 200;

    telSpr2E2 = -200;
    richtSpr2E1PosX = -2;
    richtSpr2E1PosY = -2;
    telSpr2E2 = -200;
    richtSpr2E2PosX = -2;
    richtSpr2E2PosY = -2;
    Eindscherm();
}}






 

 // Spr3 - schrijf sprite 3
var telSpr3 = 0;
var maxSpr3 = 100;
var richtSpr3PosX = 1; // -1 = links, 0 = midden, 1 = rechts
var richtSpr3PosY = 1; // -1 = omhoog, 0 = horiz, 1 = beneden
function Spr3() {
    // na maxSpr3 > richting veranderen
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
    ctx.fillStyle = "blue"; // kleur spr3
    ctx.fillRect(Spr3PosX, Spr3PosY, Spr3Formaat, Spr3Formaat);
}




function BotsingP() {
    // test voor Botsing.
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
    Spr3PosX = Math.floor(Math.random() * 300) + 200; Spr3PosY = Math.floor(Math.random() * 300) + 200;
}}

//Eind Scherm
function Eindscherm() {
if (levens <= 0){
    Spr1PosX = 50; Spr1PosY = 50;
    Spr2E1PosX = 200; Spr2E1PosY = 200;
    //Spr 2E2PosX = 200; Spr 2E2PosY = 200;
    Spr3PosX = 400; Spr3PosY = 400;
    alert("Jouw HighScore is " + points);
    levens = 5;
    document.getElementById("levens").innerHTML = "Nog " + levens + " Levens";
    points = 0;
    document.getElementById("points").innerHTML = "Points: " + points;
    ingedrukteToets = 0;
}}

