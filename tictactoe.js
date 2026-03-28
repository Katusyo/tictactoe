const Gameboard = (() => {
let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;
    
    const setCell = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker;
        }
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return { getBoard, setCell, resetBoard };
})();

const Player = (name, marker) => {
    return { name, marker };
}

const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

const GameController = (() => {
    let player1 = Player("Player 1", "X");
    let player2 = Player("Player 2", "O");

    let currentPlayer = player1;
    let gameOver = false;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const playTurn = (index) => {
        if (gameOver) return;

        Gameboard.setCell(index, currentPlayer.marker);

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

        return winningCombos.some(combo => {
            return combo.every(i => b[i] === currentPlayer.marker);
        });
    };

    const isDraw = () => {
        return Gameboard.getBoard().every(cell => cell !== "");
    };

    return { playTurn };
})();