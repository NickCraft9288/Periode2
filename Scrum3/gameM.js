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