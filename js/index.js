/*
GAME RULES: MODE 1

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

MODE 2

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100.
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1.
*/
//Declarando Variables
let scores, roundScore, activePlayer, mode, gamePlaying, winningScore, lastDiceZero, lastDiceOne;

//Change Mode
document.querySelector('.change-mode').addEventListener('click', e => {
    if(e.target.matches('.change-mode, .change-mode *')){
        mode === undefined || mode === 'mode-1' ? mode = 'mode-2' : mode = 'mode-1';
        changeModeStyles(mode);
    };
});

//Functions
const nextPlayer = () => {
    //reset the current score player 
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    //Current Player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //New Player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //document.querySelector('.dice').style.display = 'none'
}

const resetScore = () => {
    //Variables
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying= true;
    //DOM
    document.querySelector('.dice-0').style.visility = 'hidden';
    document.querySelector('.dice-1').style.visility = 'hidden';
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    //Rest winner
    document.querySelector('#name-0').textContent ='Player 1'
    document.querySelector('#name-1').textContent ='Player 2'
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
};

const dadito = classes => {
    //Random number
    let dice =  Math.floor(Math.random() * 6) + 1;
    //Display the result
    let diceDom = document.querySelector(`.${classes}`);
    diceDom.style.visibility = 'visible';
    diceDom.src = `./img/dice-${dice}.png`;
    return dice;
};

const winner = activePlayer => {
    document.querySelector('#name-' + activePlayer).textContent ='Winner!';
    document.querySelector('.dice-0').style.visibility = 'hidden';
    document.querySelector('.dice-1').style.visibility = 'hidden';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    gamePlaying = false;
};

const winScore = () => {
    let finalScore = document.querySelector("#final-score").value;
    return finalScore ? winningScore = finalScore : winningScore = 100;
}

const changeModeStyles = mode => {
    document.querySelector('.dice-0').style.left = mode === 'mode-2' ? '56%' : '50%'

    document.querySelector('.dice-1').style.visibility = 'hidden';
    document.querySelector('.dice-0').style.visibility = 'hidden';
    document.querySelector('.final-score').style.visibility = mode === 'mode-2' ? 'visible' : 'hidden';
    resetScore();
};

gamePlaying = true;
resetScore();

//ROLL DICE
document.querySelector('.btn-roll').addEventListener('click', () => {
    if(mode === undefined || mode === 'mode-1'){
        document.querySelector('.dice-0').style.visibility = 'visible';
        document.querySelector('.dice-1').style.visibility = 'hidden';
        if(gamePlaying){

        let dice = dadito('dice-0')
        if(dice !== 1){
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        };
    };
    } else if (mode === 'mode-2') {
        document.querySelector('.dice-1').style.visibility = 'visible';
        document.querySelector('.dice-0').style.visibility = 'visible';
        if (gamePlaying) {
        //Random number
        let diceZero = dadito('dice-0');
        let diceOne = dadito('dice-1');

        if ((lastDiceZero === 6 && diceZero === 6) || (lastDiceOne === 6 && diceOne === 6)) {

            document.querySelector("#score-" + activePlayer).textContent = "0";
            document.querySelector("#current-" + activePlayer).textContent = "0";
            scores[activePlayer] = 0;
            nextPlayer();

            //The player loses his current score when both are 1
        } else if (diceZero === 1 && diceOne === 1) {
            nextPlayer();

                //Update the round score IF the rolled number was NOT a 1
        } else if (diceZero !== 1 || diceOne !== 1) {
            //if both dice are equal, nothing happens || if both dice are different, they add to the roundScore
            diceZero === diceOne ? roundScore = roundScore : roundScore += diceZero + diceOne;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }
            //last roll of the dice
            lastDiceZero = diceZero;
            lastDiceOne = diceOne;
        };
    };
});
//HOLD SCORE
document.querySelector('.btn-hold').addEventListener('click', ()=> {
    if (gamePlaying) {
        //Update the UI
        diceZero = 0;
        diceOne = 0;
        document.querySelector(`#score-${activePlayer}`).textContent = scores[ activePlayer ] += roundScore;

        winningScore = winScore();
        //Comprobar si el jugador no ha llegado a 100
        scores[activePlayer] >= winningScore ? winner(activePlayer) : nextPlayer();
    };
});
//NEW GAME
document.querySelector('.btn-new').addEventListener('click', resetScore);
