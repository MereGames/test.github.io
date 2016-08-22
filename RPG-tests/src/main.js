/**
*
* @ Copyryght Mere Games 2016
* @ support@meregames.ru
* @ Mail - meregames@mail.ru
*
**/

//const test
const TEST_GAME = true;

var startFPS = 60;

var allObjsGame = [];

var numPoints = 10;

var openInput = false;

var viewFPS = true;
var viewMsg = false;

var textMsg = "";


// ================ 'game' loop =============
game.newLoop('game', function () {
	//Clear All
	// ## game.clear(); ##

	//Fill canvas
	game.fill('#777');

	//One func for dell arr *******
	OOP.once("dellArr", function () {
		menuIconsObjs = null;
		gameLog("Clear array 'menuIconsObjs'", "CLR", "Done");
	});

	//Funcs
	drawWorld();
	updateWorld();

	mouseEvents();

	//Fps game
	if(viewFPS == true) {
	    fpsGame = system.getFPS();
	    brush.drawTextS({
		    x: gameWidth, y: 0,
		    size: 25,
		    align: "right",
		    color: "#fff",
		    text: fpsGame + "FPS"
	    });
    }
});


// ====== Pasive Loops ======
// -- Loop menu game --
game.newLoop('menu', function () {
	//Clear All
	// ## game.clear(); ##

	//Fill canvas
	game.fill('#555');

	//Background menu
	scanesGameArr[gameData.totalScaneId].draw();

	rectMenu.draw();

	//Mouse events ------
	mouseEvents();

	if(mouse.isPress("LEFT")) {
	    if(mouse.isInObject(inputObj)) {
		    openInput = true;
	    }else {
    	    openInput = false;
        }
    }

	if(openInput == true) {
		key.setInputMode(true);

		var char = key.getInputChar();
        var iKey = key.getInputKey();

        if(inputText.length < 10 && char) {
    	    inputText += char;
        }

        if(iKey) {
    	    if(iKey == 'BACKSPACE') {
                inputText = inputText.substr(0, inputText.length - 1);
            }
        }
	}else if(key.isInputMode()){
		key.setInputMode(false);
	}

	//Key for enter in game world
	if(iKey == "ENTER" || key.isPress("ENTER")) {
		openInput = false;
		key.setInputMode(false);
        checkEnter();
    }

    //img for input(bg text)
	inputObj.draw();

	drawBrushText();
	// ## drawCtxText(); (--in develop--) ##

	//THIS INPUT TEXT
	brush.drawText({
		x: gameWidth/2 - 140, y: gameHeight - 80,
		size: 25,
		align: "left",
		color: "#fff",
		font: "cursive",
		text: (openInput == true) ? inputText + "|" : inputText + "",
	});

	//MSG for user
	viewMsgEr(textMsg);

	//Draw whioth OOP in PointJS
	OOP.drawArr(menuIconsObjs);
	//Buts menu
	OOP.drawArr(arrPlusMenu);
	OOP.drawArr(arrMinusMenu);

	//Draw stop player
	mainPlayer.playAnim("stop");

	//Fps game - end layer
	if(viewFPS == true) {
	    fpsGame = system.getFPS();
	    brush.drawTextS({
		    x: gameWidth, y: 0,
		    size: 25,
		    align: "right",
		    color: "#fff",
		    text: fpsGame + "FPS"
	    });
    }
});

//Texts menu
function drawBrushText() {
	brush.drawText({
		x: gameWidth/2, y: gameHeight - 33,
		size: 20,
		align: "center",
		color: "red",
		font: "cursive",
		text: "для продолжения нажмите Enter",
	});

	brush.drawText({
		x: gameWidth/2 - 5, y: gameHeight/2 - 135,
		size: 21,
		align: "center",
		color: "#E66659",
		font: "cursive",
		text: "Очки умений",
	});

	brush.drawText({
		x: gameWidth/2 + 145, y: gameHeight/2 - 132,
		size: 20,
		align: "center",
		color: (numPoints > 0) ? "#3BB10A" : "red",
		font: "cursive",
		text: numPoints,
	});

	//Nums
	for(let i = 4;i--;) {
		brush.drawText({
		    x: gameWidth/2 + 90, y: gameHeight/2 - 65 + (45*i),
		    size: 20,
		    align: "center",
		    color: "red",
		    font: "cursive",
		    text: (i==0) ? mainPlayer.dameg : (i==1) ? mainPlayer.skilGmg : (i==2) ? mainPlayer.defent : mainPlayer.health,
	    });
	}
}

//Check enter in game
function checkEnter() {
	if(numPoints == 0 && inputText.length >= 4 && inputText.length <= 10) {
		//Load scane
		gameData.nextScaneId = 0;
		gameData.nextScaneName = "game";
		gameData.newPlayer = false;

		game.startLoop("loadingScane");
	}else {
		openInput = true;
		viewMsg = true;
		if(numPoints > 0) {
			textMsg = "Не все очки навыков распределены!";
		}else if(inputText.length < 4) {
			textMsg = "Слишком короткое имя!";
		}else if(inputText.length > 10) {
			textMsg = "Слишком длиное имя!";
		}

		//timer view msg
		setTimeout(function () {
			viewMsg = false;
		}, 7000);
	}
}

//Massage error use
function viewMsgEr(text) {
	if(viewMsg == true) {
		brush.drawText({
			x: gameWidth/2, y: 60,
			size: 23,
			align: "center",
			font: "cursive",
			color: "red",
			text: text
		});
	}
}




// -- Loop loading --
game.newLoop('loadingScane', function () {
	//Clear All
	// ## game.clear(); ##

	//Fill canvas
	game.fill('#999');
	deletPath(gameData.totalScaneName);
	loadPath(gameData.nextScaneName);
	//Bg load
	scanesGameArr[gameData.nextScaneId].draw();

	if(TEST_GAME == true) {
	    gameLog("Enter in loop 'loading': " + resources.getProgress() + "%", "LOD", "Done");
    }


	brush.drawText({
		x: gameWidth/2, y: gameHeight - 50,
		size: 30,
		align: "center",
		color: "orange",
		font: "cursive",
		text: "Загрузка... " +  resources.getProgress() + "%",
	});

	if(resources.isLoaded() && resources.getProgress() >= 99) {
		setTimeout(function () {
			game.startLoop(gameData.nextScaneName);
		    gameLog('Go to ' + gameData.nextScaneName, 'RPG', 'Done');

		    gameData.totalScaneId = gameData.nextScaneId;
		    gameData.totalScaneName = gameData.nextScaneName;
		    // @ New pos player
		    if(gameData.nextScaneName == "menu") {
		        mainPlayer.setPosition(point(gameWidth/2 - rectMenu.w/2 + 70, gameHeight/2 - mainPlayer.h/2 + 20));
	        }else {
	    	    mainPlayer.setPosition(point(gameWidth/2 - mainPlayer.w, gameHeight/2 + mainPlayer.h));
	        }
		}, 1000);
	}

	//Fps game - and layer
	if(viewFPS == true) {
	    fpsGame = system.getFPS();
	    brush.drawTextS({
		    x: gameWidth, y: 0,
		    size: 25,
		    align: "right",
		    color: "#fff",
		    text: fpsGame + "FPS"
	    });
    }
});





//DrawWorld game ------
function drawWorld() {
	//drawArrObjs
	scanesGameArr[gameData.totalScaneId].draw();

	// ## OOP.drawArr(allObjsGame); ##
	//Player stoping
	mainPlayer.playAnim("stop");
}


//Update game -------
function updateWorld() {
	playerMove();
}

//MovePlayer
function playerMove() {
	//
}


//Mouse events
function mouseEvents() {
	//Left click
	if(mouse.isPress("LEFT")) {
		//Plus and musis
		for(let i = 4; i--;) {
			if(mouse.isInObject(arrPlusMenu[i]) && numPoints > 0) {
				(i==0) ? mainPlayer.dameg += 1 : (i==1) ? mainPlayer.skilGmg += 1 : (i==2) ? mainPlayer.defent += 1 : mainPlayer.health += 1;

				numPoints -= 1;
			}else if(mouse.isInObject(arrMinusMenu[i])) {
				(i==0 && mainPlayer.dameg > 3) ? mainPlayer.dameg -= 1 : (i==1 && mainPlayer.skilGmg > 1) ? mainPlayer.skilGmg -= 1 : (i==2 && mainPlayer.defent > 0) ? mainPlayer.defent -= 1 : (i==3 && mainPlayer.health > 5) ? mainPlayer.health -= 1 : numPoints -= 1;

				numPoints += 1;
			}
		}
	}
}




//Analog console.log() or log()
function gameLog(text, type, stat) {
	console.log("*------------------------------*\n" + stat + ": [" + type + "] : " + text + "\n*------------------------------*");
}

//Start Game!!!
system.addEvent("onload", "loadPage", function () {
	gameLog("Page load!", "ELOAD", "Done");
    system.delEvent("onload", "loadPage");
});
gameData.nextScaneId = 0;
gameData.nextScaneName = "menu";
game.startLoop('loadingScane');
game.setFPS(startFPS);

//Version PointJS
log("Engine: PointJS 0.5.7");


//Window
window.location.indexOf = "";
