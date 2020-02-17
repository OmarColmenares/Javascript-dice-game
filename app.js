/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, x;


scores = [0 , 0];
roundScore = 0;
activePlayer = 0;
x = document.querySelector('.dice').style.display = 'none';
                        //Score inicial
document.querySelector('#score-0').textContent = '0';
document.querySelector('#current-0').textContent = '0';
document.querySelector('#score-1').textContent = '0';
document.querySelector('#current-1').textContent = '0';

                    //Roll Dice
document.querySelector('.btn-roll').addEventListener('click', ()=>{
    //  Random number
    var dice = Math.floor(Math.random() * 6) + 1
    //Display the result
    var diceDom =document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png';
    //Update the round score IF the rolled number was NOT a 1
    if(dice !== 1){
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore
    }else{
        roundScore = 0;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        //New Player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        //Active Class
        document.querySelector('.player-0-panel').classList.toggle('active')
        document.querySelector('.player-1-panel').classList.toggle('active')
        // document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
        // activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        // document.querySelector('.player-' + activePlayer + '-panel').classList.add('active')
        document.querySelector('.dice').style.display = 'none';
    }
});
                    //Hold score
document.querySelector('.btn-hold').addEventListener('click', ()=> {
    if(activePlayer === 0){
        document.querySelector('#score-0').textContent = roundScore;
    }else{
        document.querySelector('#score-1').textContent = roundScore;
    }
})

                //New game
document.querySelector('.btn-new').addEventListener('click', () => {
     //Reset
     document.querySelector('#score-0').textContent = '0';
     document.querySelector('#current-0').textContent = '0';
     document.querySelector('#score-1').textContent = '0';
     document.querySelector('#current-1').textContent = '0';
     //Reset Scores
     scores[0] = 0;
     scores[1] = 0
})