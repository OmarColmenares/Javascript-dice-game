//Declarando Variables
var scores, roundScore, activePlayer, gamePlaying;
//Inicialization

gamePlaying = true;
resetScore();
                    //Roll Dice
document.querySelector('.btn-roll').addEventListener('click', ()=>{
    if(gamePlaying){
                //Random number
        var dice =  Math.floor(Math.random() * 6) + 1;
                //Display the result
        var diceDom =document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';
        if(dice !== 1){
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

         }else{
           nextPlayer()
         }    
    }
});
                    //Hold score
document.querySelector('.btn-hold').addEventListener('click', ()=> {
    if(gamePlaying){
            //Sumar al GlobalScore
        if(activePlayer === 0){
            document.querySelector('#score-0').textContent = (scores[0] += roundScore);
        }else{
            document.querySelector('#score-1').textContent = (scores[1] += roundScore);
        }
        //Comprobar si el jugador no ha llegado a 100
        if(scores[activePlayer] >= 100){
            document.querySelector('#name-' + activePlayer).textContent ='Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }else{
            nextPlayer();
        }
    }
})
                //New game
document.querySelector('.btn-new').addEventListener('click', resetScore);

//Functions
function nextPlayer(){
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

function resetScore(){
    //Variables
    scores = [0 , 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying= true;
    //DOM
    document.querySelector('.dice').style.display = 'none';
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
}
