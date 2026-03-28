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