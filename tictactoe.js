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

    const GameController = (() => {
        const player1 = Player("Player 1", "X");
        const player2 = Player("Player 2", "O");

        let currentPlayer = player1;
        let gameOver = false;

        const switchPlayer = () => {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        };

        const playTurn = (index) => {
            if (gameOver) return;

            const movePlayed = Gameboard.setCell(index, currentPlayer.marker);
            if (!movePlayed) return;

            if (checkWinner()) {
                console.log(`${currentPlayer.name} wins!`);
                gameOver = true;
                return;
            }

            if (isDraw()) {
                console.log("It's a draw!");
                gameOver = true;
                return;
            }

            switchPlayer();
        };

        const checkWinner = () => () => {
            const b = Gameboard.getBoard();

            const winningCombos = [
                [0,1,2], [3,4,5], [6,7,8],
                [0,3,6], [1,4,7], [2,5,8],
                [0,4,8], [2,4,6]
            ];

            return wins.some(combo => 
            combo.every(i => b[i] === currentPlayer.marker)
            );
        };

        const isDraw = () =>
            Gameboard.getBoard().every(cell => cell !== "");

        return { playTurn };
    })();

    return {
        playTurn: GameController.playTurn,
        getBoard: Gameboard.getBoard
    };

})();
