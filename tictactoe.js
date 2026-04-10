const TicTacToe = (() => {

    const Gameboard = (() => {
        let board = ["", "", "", "", "", "", "", "", ""];

        const getBoard = () => board;
    
        const setCell = (index, marker) => {
            if (board[index] === "") {
                board[index] = marker;
                return true;
            }
            return false;
        };

        const resetBoard = () => {
            board = ["", "", "", "", "", "", "", "", ""];
        };

        return { getBoard, setCell, resetBoard };
    })();

    const Player = (name, marker) => ({ name, marker });

    const DisplayController = (() => {
        const modal = document.querySelector(".modal");
        const startBtn = document.querySelector("#startBtn");
        const player1Input = document.querySelector("#player1");
        const player2Input = document.querySelector("#player2");
        const boardContainer = document.querySelector(".gameboard");
        const statusDiv = document.querySelector(".status");
        const resetBtn = document.querySelector(".reset");
        const scoreDiv = document.querySelector(".scoreboard");

        const updateStatus = () => {
            const status = GameController.getStatus();
            const player = GameController.getCurrentPlayer();

            if (!player) {
                statusDiv.textContent = "Enter player names to start!";
                return;
            }

            if (status === "Win!") {
                statusDiv.textContent =
                `${player.name} wins!`;
            } else if (status === "It's a draw!") {
                statusDiv.textContent = "It's a draw!";
            } else {
                statusDiv.textContent = 
                `Current Player: ${player.name}`;
            }
        };

        if (!boardContainer || !statusDiv || !resetBtn) {
            console.error("Required elements not found!");
            return;
        }

        const render = () => {
            const board = Gameboard.getBoard();
            const winningCells = GameController.getWinningCells();
            
            boardContainer.innerHTML = "";

            board.forEach((cell, index) => {
                const cellDiv = document.createElement("div");
                cellDiv.classList.add("cell");
                cellDiv.dataset.index = index;
                cellDiv.textContent = cell;

                if (winningCells.length && winningCells.includes(index)) {
                    cellDiv.classList.add("winning-cell");
                }

                boardContainer.appendChild(cellDiv);
            });

            updateStatus();
            updateScoreboard();
        };

        const updateScoreboard = () => {
            const scores = GameController.getScores();
            const player = GameController.getCurrentPlayer();
            const p1 = GameController.getPlayers().player1;
            const p2 = GameController.getPlayers().player2;

            if(!player) {
                scoreDiv.textContent = "";
                return;
            }

            scoreDiv.textContent = 
            `${p1.name}: ${scores.player1} | ${p2.name}: ${scores.player2}`;
        };

        const init = () => {
            startBtn.addEventListener("click", () => {
                const name1 = player1Input.value;
                const name2 = player2Input.value;

                GameController.setPlayers(name1, name2);

                player1Input.value = "";
                player2Input.value = "";

                modal.style.display = "none";

                render();

            });

            boardContainer.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                if (index === undefined) return;

                GameController.playTurn(Number(index));
                render();
            });

            resetBtn.addEventListener("click", () => {
                GameController.resetGame();
                render();
            });
        };

        return { render, init };
    })();

    const GameController = (() => {
        let player1;
        let player2;

        const setPlayers = (name1, name2) => {
            player1 = Player(name1 || "Player 1", "X");
            player2 = Player(name2 || "Player 2", "O");
            currentPlayer = player1;
        };

        let scores = {
            player1: 0,
            player2: 0
        };

        let currentPlayer;
        let gameOver = false;
        let status = "playing";
        let winningCells = [];

        const getCurrentPlayer = () => currentPlayer;
        const getStatus = () => status;

        const resetGame = () => {
            Gameboard.resetBoard();
            currentPlayer = player1;
            gameOver = false;
            status = "playing";
            winningCells = [];
            scores = { player1: 0, player2: 0 };
        }

        const switchPlayer = () => {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        };

        const playTurn = (index) => {
            if (!player1 || !player2) return;
            if (gameOver) return;

            const movePlayed = Gameboard.setCell(index, currentPlayer.marker);
            if (!movePlayed) return;

            if (checkWinner()) {
                status = "Win!";
                console.log(status);
                gameOver = true;

                if (currentPlayer === player1) {
                    scores.player1++;
                } else {
                    scores.player2++;
                }
                return;
            }

            if (isDraw()) {
                status = "It's a draw!";
                console.log(status);
                gameOver = true;
                return;
            }

            switchPlayer();
            
        };

        const checkWinner = () => {
            const b = Gameboard.getBoard();

            const winningCombos = [
                [0,1,2], [3,4,5], [6,7,8],
                [0,3,6], [1,4,7], [2,5,8],
                [0,4,8], [2,4,6]
            ];

            for (let combo of winningCombos) {
                if (combo.every(i => b[i] === currentPlayer.marker)) {
                    winningCells = combo;
                    return true;
                }
            }

            return false;
        };

        const getWinningCells = () => winningCells;

        const isDraw = () =>
            Gameboard.getBoard().every(cell => cell !== "");

        const getScores = () => scores;

        const getPlayers = () => ({ player1, player2 });

        return { playTurn, getCurrentPlayer, getStatus, resetGame, setPlayers, 
            getWinningCells, getScores, getPlayers };
    })();


    DisplayController.render();
    DisplayController.init();


    return {
        playTurn: GameController.playTurn,
    };

})();