document.addEventListener("DOMContentLoaded", () => {
  // declaring all the needed quantity
  let resetButton = document.querySelector(".Reset");
  let statusButton = document.querySelector(".status");
  let scoreButton = document.querySelector(".score");
  let buttons = document.querySelectorAll(".btn");
  let Display = document.querySelector(".box");

  //declaring all global variable
  let currentPlayer = "X";
  let scoreX = 0;
  let scoreO = 0;
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

  // update score
  function updateScore(player) {
    if (player === "X") {
      scoreX++;
    } else {
      scoreO++;
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
});
