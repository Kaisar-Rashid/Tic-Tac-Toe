document.addEventListener("DOMContentLoaded", () => {
  // declaring all the needed quantity
  let resetButton = document.querySelector(".Reset");
  let statusButton = document.querySelector(".status");
  let scoreButton = document.querySelector(".score");
  let buttons = document.querySelectorAll(".btn");
  let Display = document.querySelector(".box");
  let resetScoresButton = document.querySelector(".Reset-score");

  let scoreX = JSON.parse(localStorage.getItem("scoreX")) || 0;
  let scoreO = JSON.parse(localStorage.getItem("scoreO")) || 0;

  scoreButton.innerText = `Score: X=${scoreX}, O=${scoreO}`;

  //declaring all global variable
  let currentPlayer = "X";
  let gameActive = true;

  // winning possiblities
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // check for winner
  function checkForWin(buttons, currentPlayer) {
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (
        buttons[a].innerText === currentPlayer &&
        buttons[b].innerText === currentPlayer &&
        buttons[c].innerText === currentPlayer
      ) {
        return true;
      }
    }
    return false;
  }

  // check for Draw

  function checkForDraw(buttons) {
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].innerText === "") {
        return false;
      }
    }
    return true;
  }

  // Reset Game
  function resetGame() {
    buttons.forEach((btn) => (btn.innerText = ""));
    currentPlayer = "X";
    statusButton.innerText = "";
    Display.style.display = "";
    gameActive = true;
  }

  function resetScores() {
    scoreX = 0;
    scoreO = 0;
    localStorage.setItem("scoreX", JSON.stringify(scoreX));
    localStorage.setItem("scoreX", JSON.stringify(scoreX));
    scoreButton.innerText = `Score: X=${scoreX}, O=${scoreO}`;
  }

  // update score
  function updateScore(player) {
    if (player === "X") {
      scoreX++;
      localStorage.setItem("scoreX", JSON.stringify(scoreX));
    } else {
      scoreO++;
      localStorage.setItem("scoreX", JSON.stringify(scoreX));
    }
    scoreButton.innerText = `Score: X=${scoreX}, O=${scoreO}`;
  }

  //adding eventlisterner

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (gameActive && btn.innerText === "") {
        btn.innerText = currentPlayer;

        if (checkForWin(buttons, currentPlayer)) {
          statusButton.innerText = `${currentPlayer} Wins🤩`;
          updateScore(currentPlayer);
          gameActive = false;
          Display.style.display = "none";
        }
        if (checkForDraw(buttons)) {
          statusButton.innerText = "Its a Draw😶";
          gameActive = false;
          Display.style.display = "none";
        } else {
          currentPlayer = currentPlayer === "X" ? "0" : "X";
        }
      }
    });
  });

  resetButton.addEventListener("click", resetGame);
  resetScoresButton.addEventListener("click", resetScores);
});
