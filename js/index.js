/*
GAME RULES: 
MODE 1
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

MODE 2
-. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
-. in the input field to the players can set the winning score, so that they can change the predefined score of 100.
-. There are two dice now. The player loses his current score when one of them is a 1.
-. if both dice are equal, they are not added to the roundScore, otherwise they are added to roundScore
*/
//Declarando Variables
let scores, roundScore, activePlayer, mode, gamePlaying, winningScore, lastDiceZero, lastDiceOne;

let elements = {
    diceZero: document.querySelector('.dice-0'),
    diceOne: document.querySelector('.dice-1'),
    playerZeroPanel  : document.querySelector('.player-0-panel'),
    playerOnePanel  : document.querySelector('.player-1-panel'),
    nameZero: document.querySelector('#name-0'),
    nameOne: document.querySelector('#name-1'),
    finalScore: document.querySelector('.final-score'),
    btnRoll: document.querySelector('.btn-roll'),
    btnHold: document.querySelector('.btn-hold'),
    btnNew: document.querySelector('.btn-new'),
    changeMode: document.querySelector('.change-mode')
};
//ChangeMode
elements.changeMode.addEventListener('click', e => {
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
}

const resetScore = () => {
    //Variables
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying= true;
    //DOM
    diceStyle('hidden');
    ['#score-0','#current-0',
    '#score-1','#current-1'].forEach(el => document.querySelector(el).textContent = '0');
    //Reset winner
    elements.nameZero.textContent ='Player 1';
    elements.nameOne.textContent ='Player 2';
    elements.playerZeroPanel.classList.remove('winner');
    elements.playerOnePanel.classList.remove('winner');
    elements.playerZeroPanel.classList.add('active');
};

const winner = activePlayer => {
    document.querySelector('#name-' + activePlayer).textContent ='Winner!';
    diceStyle('hidden')
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    gamePlaying = false;
};

const winScore = () => {
    let finalScore = elements.finalScore.value;
    return finalScore ? winningScore = finalScore : winningScore = 100;
};

const diceContrl = identifier => {
    //Random number
    let dice =  Math.floor(Math.random() * 6) + 1;
    //Display the result
    let diceDom = document.querySelector(`.${identifier}`);
    diceDom.style.visibility = 'visible';
    diceDom.src = `./img/dice-${dice}.png`;
    return dice;
};

const diceStyle = attr => {
    elements.diceZero.style.visibility = attr;
    elements.diceOne.style.visibility = attr;
};

const changeModeStyles = mode => {
    elements.diceZero.style.left = mode === 'mode-2' ? '56%' : '50%';

    diceStyle('hidden');
    elements.finalScore.style.visibility = mode === 'mode-2' ? 'visible' : 'hidden';
    resetScore();
};

gamePlaying = true;
resetScore();

//ROLL DICE
elements.btnRoll.addEventListener('click', () => {

    if(roundScore >= 100) winner(activePlayer);

    if(mode === undefined || mode === 'mode-1'){
        elements.diceZero.style.visibility = 'visible';
        elements.diceOne.style.visibility = 'hidden';
        if(gamePlaying){

        let dice = diceContrl('dice-0')
        if(dice !== 1){
            roundScore += dice;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        } else {
            nextPlayer();
        };
    };
    } else if (mode === 'mode-2') {
        diceStyle('visible')
        if (gamePlaying) {
        //Random number
        let diceZero = diceContrl('dice-0');
        let diceOne = diceContrl('dice-1');

        if ((lastDiceZero === 6 && diceZero === 6) || 
            (lastDiceOne === 6 && diceOne === 6)) 
        {
            document.querySelector(`#score-${activePlayer}`).textContent = "0";
            document.querySelector(`#current-${activePlayer}`).textContent = "0";
            scores[activePlayer] = 0;
            nextPlayer();
            //The player loses his current score when both are 1
        } else if (diceZero === 1 || diceOne === 1) {
            nextPlayer();
            //Update the round score IF the rolled number was NOT a 1
        } else if (diceZero !== 1 || diceOne !== 1) {
            //if both dice are equal, they are not added to the roundScore, otherwise they are added to roundScore
            diceZero === diceOne ? roundScore : roundScore += diceZero + diceOne;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        }
            //last roll of the dice
            lastDiceZero = diceZero;
            lastDiceOne = diceOne;
        };
    };
});
//HOLD SCORE
elements.btnHold.addEventListener('click', ()=> {
    if (gamePlaying) {
        //Update the UI
        diceZero = 0;
        diceOne = 0;
        document.querySelector(`#score-${activePlayer}`).textContent = scores[ activePlayer ] += roundScore;

        winningScore = winScore();
        //Check if the player has not reached 100
        scores[activePlayer] >= winningScore ? winner(activePlayer) : nextPlayer();
    };
});
//NEW GAME
elements.btnNew.addEventListener('click', resetScore);