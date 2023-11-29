const choices = ["rock", "paper", "scissors"];

const replay = document.querySelector(".btn--reset");
const playerChoice = document.querySelector(".player-choice");
const computerChoice = document.querySelector(".computer-choice");
const playerScore = document.querySelector(".player-score");
const computerScore = document.querySelector(".computer-score");
const winner = document.querySelector(".winner");
const results = document.querySelector(".results");
let playerScores = 0;
let computerScores = 0;

function getComputerChoice() {
  const random = Math.floor(Math.random() * 3);
  console.log(choices[random]);
  return choices[random];
}

function playGame(playerSelection) {
  playerSelection = playerSelection.toLowerCase();
  const computerSelection = getComputerChoice();

  let point = 0;

  playerChoice.textContent = playerSelection;
  computerChoice.textContent = computerSelection;

  if (playerSelection === computerSelection) {
    results.textContent = "It's a tie!";
  } else {
    switch (playerSelection) {
      case choices[0]:
        point = computerSelection === choices[1] ? 0 : 1;
        break;
      case choices[1]:
        point = computerSelection === choices[2] ? 0 : 1;
        break;
      case choices[2]:
        point = computerSelection === choices[0] ? 0 : 1;
        break;
      default:
        return;
    }

    // Update scores
    if (point === 1) {
      playerScores++;
      playerScore.textContent = playerScores;
      results.textContent = `You win! ${playerSelection} beats ${computerSelection}.`;
    } else {
      computerScores++;
      computerScore.textContent = computerScores;
      results.textContent = `You lose! ${computerSelection} beats ${playerSelection}.`;
    }

    // Check for winner
    if (playerScores === 5) winner.textContent = "You win!";
    if (computerScores === 5) winner.textContent = "You lose!";

    // Show replay button
    if (playerScores === 5 || computerScores === 5) {
      replay.classList.remove("hidden");
    }
  }
}

function resetGame() {
  playerScores = 0;
  computerScores = 0;
  playerChoice.textContent = "";
  computerChoice.textContent = "";
  playerScore.textContent = 0;
  computerScore.textContent = 0;
  winner.textContent = "";
  results.textContent = "";
  replay.classList.add("hidden");
}
