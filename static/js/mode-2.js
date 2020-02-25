//Varaibles statements
var scores, roundScore, activePlayer, gamePlaying, lastDiceZero, lastDiceOne;

//Inicialization
gamePlaying = true;
resetScore();
//Roll Dice
document.querySelector(".btn-roll").addEventListener("click", () => {
  if (gamePlaying) {
    //Random number
    var rollDiceZero = Math.floor(Math.random() * 6) + 1;
    var rollDiceOne = Math.floor(Math.random() * 6) + 1;
    //Display the result
    var diceDomZero = document.querySelector(".dice-0");
    var diceDomOne = document.querySelector(".dice-1");

    diceDomZero.style.display = "block";
    diceDomOne.style.display = "block";

    diceDomZero.src = "./img/dice-" + rollDiceZero + ".png";
    diceDomOne.src = "./img/dice-" + rollDiceOne + ".png";
    //A player looses his ENTIRE score when he rolls two 6 in a row.
    if ((lastDiceZero === 6 && rollDiceZero === 6) || (lastDiceOne === 6 && rollDiceOne === 6)) {
      document.querySelector("#score-" + activePlayer).textContent = "0";
      document.querySelector("#current-" + activePlayer).textContent = "0";
      scores[activePlayer] = 0;
      nextPlayer();
      //The player loses his current score when both are 1
    } else if (rollDiceZero === 1 && rollDiceOne === 1) {
      nextPlayer();
      //Update the round score IF the rolled number was NOT a 1
    } else if (rollDiceZero !== 1 || rollDiceOne !== 1) {
      //if both dice are equal, nothing happens
      if (rollDiceZero == rollDiceOne) {
        roundScore = roundScore - (rollDiceZero + rollDiceOne);
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
        scores[activePlayer] = roundScore;
      } //if both dice are different, they add to the roundScore
      roundScore += rollDiceZero + rollDiceOne;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    }
    //last roll of the dice
    lastDiceZero = rollDiceZero;
    lastDiceOne = rollDiceOne;
  }
});
//Hold score
document.querySelector(".btn-hold").addEventListener("click", () => {
  if (gamePlaying) {
    //Update the UI
    lastDiceZero = 0;
    lastDiceOne = 0;
    document.querySelector("#score-" + activePlayer).textContent = scores[
      activePlayer
    ] += roundScore;
    var finalScore = document.querySelector("#final-score").value;
    var winningScore;

    if (finalScore) {
      winningScore = finalScore;
    } else {
      winningScore = 100;
    }

    //Comprobar si el jugador no ha llegado a 100
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice-0").style.display = "none";
      document.querySelector(".dice-1").style.display = "none";
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});
//New game
document.querySelector(".btn-new").addEventListener("click", resetScore);

//Functions
function nextPlayer() {
  //reset the current score player
  lastDiceZero = 0;
  lastDiceOne = 0;

  roundScore = 0;
  document.querySelector("#current-" + activePlayer).textContent = roundScore;
  //Current Player
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //New Player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  //document.querySelector('.dice').style.display = 'none'
}

function resetScore() {
  //Variables
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  lastDiceZero = 0;
  lastDiceOne = 0;
  finalScore = 0;
  //DOM
  document.querySelector(".dice-0").style.display = "none";
  document.querySelector(".dice-1").style.display = "none";
  document.querySelector("#score-0").textContent = "0";
  document.querySelector("#current-0").textContent = "0";
  document.querySelector("#score-1").textContent = "0";
  document.querySelector("#current-1").textContent = "0";
  //Reset winner
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.add("active");
}
