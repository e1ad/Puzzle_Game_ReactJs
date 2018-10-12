import { observable } from 'mobx';

class PuzzleBoardStore {

    @observable emptyCell;
    @observable boardSize = 3;
    @observable steps = 0;

    createNewBoard() {
        let board = [];
        for (let i = 0; i < this.boardSize; i++) {
            board[i] = [];
            for (let j = 0; j < this.boardSize; j++) {
                board[i][j] = {
                    row: i,
                    col: j
                }
            }
        }
        return board;
    }


    shuffle(array) {
        let i = array.length;
        while (--i) {
            let j = Math.floor(Math.random() * (i + 1));
            let tempi = array[i];
            let tempj = array[j];
            array[i] = tempj;
            array[j] = tempi;
        }
        for (let i = 0; i < array.length; i++) {
            let k = array[i].length;
            while (k--) {
                let j = Math.floor(Math.random() * (array.length - 1));
                let tempk = array[i][k];
                let tempj = array[i][j];
                array[i][k] = tempj;
                array[i][j] = tempk;
            }
        }
        return array;
    }


    isEmptyCell(rowIndex, colIndex) {
        if (rowIndex == this.emptyCell.row &&
            colIndex == this.emptyCell.col
        ) {
            return true;
        }
    }


    checkWinning(board) {
        for (let i in board) {
            for (let j in board[i]) {
                if (board[i][j].row != Number(i) ||
                    board[i][j].col != Number(j)) {
                    return false;
                }
            }
        }
        return true;
    }


}

export default new PuzzleBoardStore();