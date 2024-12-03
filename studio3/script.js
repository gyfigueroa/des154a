(function(){
    'use strict'
    console.log('reading JS');
    
    const startGame = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const score = document.querySelector('#score');
    const actionArea = document.querySelector('#actions');
    const scoreboard = document.querySelector("#scoreboard");
    const startSound = document.getElementById('start');
    const rollSound = document.getElementById('roll');
    const winSound = document.getElementById('win');

    const gameData = {
        dice: ['images/1die.svg', 'images/2die.svg', 'images/3die.svg', 'images/4die.svg', 'images/5die.svg', 'images/6die.svg'],
        players: ['Player 1', 'Player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    //This gets the current player: 
    gameData.players[gameData.index]

    //This gets the first die and the second die: 
    gameData.dice[gameData.roll1-1]
    gameData.dice[gameData.roll2-1]

    //This gets the score of the current player: 
    gameData.score[gameData.index]

    //This gets the index, or turn
    gameData.index

    //This gets the individual dice values and the added dice value
    gameData.roll1
    gameData.roll2
    gameData.rollSum

    //This gets the winning threshold
    gameData.rollSum

    startGame.addEventListener('click', function(){
        // play sound
        startSound.play();
        // make rest of game visible
        scoreboard.style.display = 'flex';
        game.style.display = 'flex';
        actionArea.style.display = 'flex';
        //randomly set game index here...
        gameData.index = Math.round(Math.random());
        console.log(gameData.index);
        gameControl.innerHTML = '';
        gameControl.innerHTML += '<button id="quit">Wanna Quit?</button>';

        document.getElementById('quit').addEventListener('click', function(){
            location.reload();
        });

        setUpTurn();
    })

    function setUpTurn(){
        game.innerHTML = `<h1>${gameData.players[gameData.index]}'s Turn</h1>`;
        actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';
        document.getElementById('roll').addEventListener('click', function(){
            throwDice();
        })
    }

    function throwDice(){

        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<h1>${gameData.players[gameData.index]}'s Turn</h1>`;
        game.innerHTML += `<div id=dice><img src="${gameData.dice[gameData.roll1-1]}"> <img src="${gameData.dice[gameData.roll2-1]}"> </div>`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        // if two 1's are rolled...
        if (gameData.rollSum === 2){
            game.innerHTML += '<p>Oh snap! Snake eyes!</p>';
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            showCurrentScore();
            setTimeout(setUpTurn, 2000);
            rollSound.play();
        }
        // if either die is a 1...
        else if (gameData.roll1 === 1 || gameData.roll2 === 1){
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p>Sorry, one of your rolls was a one, switching to ${gameData.players[gameData.index]}</p>`;
            setTimeout(setUpTurn,2000);
            rollSound.play();
        }  
        // if neither die is a 1...
        else {
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<button id="rollagain">Roll again</button> <h2> or </h2> <button id="pass">Pass</button>';

            document.getElementById('rollagain').addEventListener('click', function(){
                throwDice();
            });

            document.getElementById('pass').addEventListener('click', function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            })

            checkWinningCondition();
        }
    }

    function checkWinningCondition(){
        if (gameData.score[gameData.index] > gameData.gameEnd){
            winSound.play();
            showCurrentScore();

        
            game.querySelector("h1").innerHTML = `${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!`;

            actionArea.innerHTML = '';
            document.getElementById('quit').innerHTML = "Start a New Game?";
            document.getElementById('quit').id = 'startgame';
    
            
        } else {
            showCurrentScore();
            rollSound.play();
            
        }
    }

    function showCurrentScore() {
        score.innerHTML = `<p><strong>${gameData.score[0]}</strong> : <strong> ${gameData.score[1]}</strong></p>`;
    }





})();