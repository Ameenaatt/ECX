document.addEventListener("DOMContentLoaded", function () {
  const playerSelection = document.getElementById("player-selection");
  const container = document.querySelector(".container");
  const selectX = document.getElementById("select-x");
  const selectO = document.getElementById("select-o");
  const vsCpu = document.getElementById("vs-cpu");
  const vsPlayer = document.getElementById("vs-player");
  const cells = document.querySelectorAll(".cell");
  const turnIndicator = document.querySelector(".turn-indicator");
  const resetButton = document.getElementById("next-round-button");
  const xScoreValue = document.querySelector(".x-score .score-value");
  const tiesScoreValue = document.querySelector(".ties .score-value");
  const oScoreValue = document.querySelector(".o-score .score-value");
  const modal = document.getElementById("game-modal");
  const modalMessage = document.getElementById("modal-message");
  const quitButton = document.getElementById("quit-button");
  const nextRoundButton = document.getElementById("next-round-button");
  let currentPlayer = "X";
  let gameState = ["", "", "", "", "", "", "", "", ""];
  let gameActive = true;
  let scores = { X: 0, O: 0, Ties: 0 };
  let player1Mark = "X";
  let gameMode = "cpu";

  playerSelection.style.display = "block";
  container.style.display = "none";

  selectX.addEventListener("click", function () {
    player1Mark = "X";
    selectX.classList.add("selected");
    selectO.classList.remove("selected");
  });

  selectO.addEventListener("click", function () {
    player1Mark = "O";
    selectO.classList.add("selected");
    selectX.classList.remove("selected");
  });

  vsCpu.addEventListener("click", function () {
    gameMode = "cpu";
    startGame();
  });

  vsPlayer.addEventListener("click", function () {
    gameMode = "player";
    startGame();
  });
  function startGame() {
    playerSelection.style.display = "none";
    container.style.display = "block";
    currentPlayer = player1Mark;
    turnIndicator.textContent = `${currentPlayer}'s Turn`;
    resetGame();
  }

  const restartButton = document.getElementById("restartButton");
  const modalOverlay = document.getElementById("modalOverlay");
  const modals = document.getElementById("modal");
  const noButton = document.getElementById("noButton");
  const yesButton = document.getElementById("yesButton");

  function openModal() {
    modalOverlay.classList.add("open");
    modals.classList.add("open");
  }
  function closeModal() {
    modalOverlay.classList.remove("open");
    modals.classList.remove("open");
  }
  restartButton.addEventListener("click", openModal);
  noButton.addEventListener("click", closeModal);
  yesButton.addEventListener("click", function () {
    closeModal();
    alert("Game restarted!");
    restartGame();
  });

  function restartGame() {
    resetGame();
    modal.style.display = "none";
    playerSelection.style.display = "block";
    container.style.display = "none";
    currentPlayer = player1Mark;
    turnIndicator.textContent = `${currentPlayer}'s Turn`;
  }
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
      return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());

    checkForWinner();
  }

  function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
      const winCondition = winningConditions[i];
      const a = gameState[winCondition[0]];
      const b = gameState[winCondition[1]];
      const c = gameState[winCondition[2]];

      if (a === "" || b === "" || c === "") {
        continue;
      }

      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      scores[currentPlayer]++;
      updateScoreboard();
      gameActive = false;
      modalMessage.textContent = ` ${currentPlayer} TAKES THE ROUND!`;
      modal.style.display = "flex";
      return;
    }

    if (!gameState.includes("")) {
      scores.Ties++;
      updateScoreboard();
      gameActive = false;
      modalMessage.textContent = "OUT!";
      modal.style.display = "flex";
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnIndicator.textContent = `${currentPlayer}'s Turn`;
  }

  function updateScoreboard() {
    xScoreValue.textContent = scores.X;
    tiesScoreValue.textContent = scores.Ties;
    oScoreValue.textContent = scores.O;
  }

  function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    turnIndicator.textContent = "X's Turn";
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("x", "o");
    });
  }

  function nextRound() {
    resetGame();
    modal.style.display = "none";
  }

  quitButton.addEventListener("click", () => {
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    turnIndicator.textContent = "X's Turn";
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("x", "o");
    });
    modal.style.display = "none";
  });

  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  resetButton.addEventListener("click", resetGame);
  nextRoundButton.addEventListener("click", nextRound);
  quitButton.addEventListener("click", restartGame);
});
