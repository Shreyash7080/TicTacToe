setTimeout(() => {
  startGame();
}, 1000);

let player;

function startGame() {
  $(".start").on("click", resetGame);
  $(".box").text("");
  $(".box").off("click").on("click", boxClick);
  $("#heading").text("Player 1's turn");
  $(".box").map(function () {
    this.innerText = "";
  });
  i = 0;
}

let i = 0;
let turn;
function boxClick() {
  if (i < 9) {
    if (this.innerText !== "O" && this.innerText !== "X") {
      if (i % 2 === 0) {
        player = 1;
        turn = 2;
        $("#heading").text("Player " + turn + "'s turn");
        i++;
      } else {
        player = 2;
        turn = 1;
        $("#heading").text("Player " + turn + "'s Turn");
        i++;
      }

      if (player === 1) {
        $(this).text("O");
        new Audio("./Sounds/blue.mp3").play();
      } else {
        $(this).text("X");
        new Audio("./Sounds/yellow.mp3").play();
      }

      if (checkWin()) return;

      if (i === 9) {
        $("#heading").text("Draw!");
        setTimeout(() => {
          resetGame();
        }, 1000);
      } else {
      }
    }
  } else {
  }
}

function checkWin() {
  let board = $(".box")
    .map(function () {
      return $(this).text();
    })
    .get();

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      let line = $("#line");
      function lineAnimation() {
        if (pattern[0] === 0) {
          if (pattern[1] === 1) {
            line.css("top", "16.33%");
            line.animate({ width: "+=100%" });
            setInterval(() => {
              line.css("top", "0px");
            }, 1000);
          } else if (pattern[1] === 3) {
            line.addClass("vertical");
            line.css("left", "16.33%");
            line.animate({ width: "+=100%" });
            setTimeout(() => {
              line.css("left", "0px");
              line.removeClass("vertical");
            }, 1000);
          } else if (pattern[1] === 4) {
            line.addClass("diagonal1");
            line.animate({ width: "+=141.1%" });
            setTimeout(() => {
              line.animate({ width: "-=41.1%" });
              setTimeout(() => {
                line.removeClass("diagonal1");
              }, 400);
            }, 1000);
          }
        } else if (pattern[0] === 1) {
          line.addClass("vertical");
          line.css("left", "48.99%");
          line.animate({ width: "+=100%" });
          setTimeout(() => {
            line.css("left", "0px");
            line.removeClass("vertical");
          }, 1000);
        } else if (pattern[0] === 2) {
          if (pattern[1] === 5) {
            line.addClass("vertical");
            line.css("left", "83.33%");
            line.animate({ width: "+=100%" });
            setTimeout(() => {
              line.css("left", "0px");
              line.removeClass("vertical");
            }, 1000);
          } else if (pattern[1] === 4) {
            line.addClass("diagonal2");
            line.animate({ width: "+=141.1%" });
            setTimeout(() => {
              line.animate({ width: "-=41.1%" });
              setTimeout(() => {
                line.removeClass("diagonal2");
              }, 400);
            }, 1000);
          }
        } else if (pattern[0] === 3) {
          line.css("top", "48.99%");
          line.animate({ width: "+=100%" });
          setTimeout(() => {
              line.css("top", "0%");
          }, 1000);
        } else {
          line.css("top", "83.33%");
          line.animate({ width: "+=100%" });
          setTimeout(() => {
              line.css("top", "0%");
          }, 1000);
        }
      }

      $("#heading").text("Player " + player + " Wins!");
      lineAnimation();
      setTimeout(() => {
        line.animate({ width: "-=100%" });
      }, 500);
      setTimeout(() => {
        resetGame();
      }, 1000);
      return true;
    }
  }
  return false;
}

async function resetGame() {
  $(".box").off("click"); // Disable further clicks
  $(".start").on("click", startGame);
}
