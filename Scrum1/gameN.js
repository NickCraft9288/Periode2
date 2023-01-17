var origBoard;
const huPlayer = 'O';  /// de player die speeld zet een o neer
const aiPlayer = 'X';  /// dit zorcht ervoor dat de ai x neerzet 
const winCombos = [ /// alle mogelijke combinaties om te winnen
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],              
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
	document.querySelector(".endgame").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);   ///hiermee begin je de game anders werkt het niet
	}
}

function turnClick(square) {    ///hiermee can je clicken 
	if (typeof origBoard[square.target.id] == 'number') {
		turn(square.target.id, huPlayer)
		if (!checkTie()) turn(bestSpot(), aiPlayer);
	}
}
function turn(squareId, player) {
	origBoard[squareId] = player;           /// laat zien of de player heeft gewonen, veloren of geleik heeft gespeeld
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {   /// dit laat de ai werken en de X neer zetten
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =    
			gameWon.player == huPlayer ? "blue" : "red";   ///als player wint word zijn rij blauw als ai wint word het rood
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == huPlayer ? "Gewonnen" : "Verloren");   ///dit laat zien wie heeft gewonnen of verloren
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;     ///zecht wie heeft gewonnen
}

function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');   /// zorgt ervoor dat je kan clicken op de vakjes
}

function bestSpot() {
	return emptySquares()[0]; /// zecht de beste spot voor de ai
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Gelijk spel")  /// zecht gelijk spell als niemand wint
		return true;
	}
	return false;
}
