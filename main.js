const choices = ["Rock", "Paper", "Scissors"];
const buttons = ["✊🏼", "✋🏼", "✌🏼"];
const modes = ["🌙", "🔅"];
const audio = new Audio("game-over.mp3");

const modeSwitch = document.querySelector(".btn--switch");
const playerChoice = document.querySelector(".player-choice");
const computerChoice = document.querySelector(".computer-choice");
const playerScore = document.querySelector(".player-score");
const computerScore = document.querySelector(".computer-score");
const winner = document.querySelector(".winner");
const results = document.querySelector(".results");
const details = document.querySelector(".results__details");
const overall = document.querySelector(".overall-score");
const dialog = document.querySelector("dialog");
const dialogreplay = document.querySelector("dialog .btn--reset");
const backdrop = document.querySelector(".backdrop");

modeSwitch.addEventListener("click", () => {
  modeSwitch.textContent = modes.reverse()[0];
  document.body.classList.toggle("dark");
});

dialogreplay.addEventListener("click", () => {
  dialog.close();
  resetGame();
});

let playerScores = 0;
let computerScores = 0;

let gameStarted = false;

function getComputerChoice() {
  return Math.floor(Math.random() * 3);
}

function playGame(playerSelection) {
  if (!gameStarted) {
    gameStarted = true;
    details.classList.add("started");
    results.classList.add("started");
  }

  const computerSelection = getComputerChoice();

  let point = 0;

  playerChoice.textContent = buttons[playerSelection];
  computerChoice.textContent = buttons[computerSelection];

  if (playerSelection === computerSelection) {
    results.textContent = "Oh no!";
    details.textContent = "It's a tie!";
  } else {
    switch (playerSelection) {
      case 0:
        point = computerSelection === 1 ? 0 : 1;
        break;
      case 1:
        point = computerSelection === 2 ? 0 : 1;
        break;
      case 2:
        point = computerSelection === 0 ? 0 : 1;
        break;
      default:
        return;
    }

    // Update scores
    if (point === 1) {
      playerScores++;
      playerScore.textContent = playerScores;
      results.textContent = "You win!";
      details.textContent = `${choices[playerSelection]} beats ${choices[computerSelection]}`;
    } else {
      computerScores++;
      computerScore.textContent = computerScores;
      results.textContent = "You lose!";
      details.textContent = `${choices[computerSelection]} beats ${choices[playerSelection]}`;
    }

    // Check for winner
    if (playerScores === 5 || computerScores === 5) {
      audio.play();
      winner.textContent = playerScores === 5 ? "You won!" : "You lose!";
      overall.textContent = `${playerScores} - ${computerScores}`;
      dialog.showModal();
      backdrop.classList.add("show");
    }
  }
}

function resetGame() {
  playerScores = 0;
  computerScores = 0;

  playerChoice.textContent = "?";
  computerChoice.textContent = "?";

  playerScore.textContent = 0;
  computerScore.textContent = 0;

  results.textContent = "Let's Play!";
  details.textContent = "Earn 5 points to win";

  gameStarted = false;

  results.classList.remove("started");
  details.classList.remove("started");

  backdrop.classList.remove("show");
}
