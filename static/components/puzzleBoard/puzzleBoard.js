import React from 'react';
import autobind from 'autobind-decorator';
import { inject, observer } from 'mobx-react';


import Store from "./puzzleBoardStore";
import "./puzzleBoard.scss";


const maxBoardSize = 6;

@inject("Commons") @observer
class PuzzleBoard extends React.Component {

    constructor(props) {
        super();

        this.state = {
            board: Store.createNewBoard()
        }

        this.isShuffled = false;

        Store.emptyCell = this.state.board[0][0];
    }


    renderCells(row, rowIndex) {
        return row.map((item, colIndex) => {
            const x = (item.row) * 100 / (Store.boardSize - 1);
            const y = (item.col) * 100 / (Store.boardSize - 1);
            const style = {
                "backgroundSize": `${Store.boardSize * 100}% ${Store.boardSize * 100}%`,
                "backgroundPosition": `${y}% ${x}%`,
                "width": `${100 / Store.boardSize}%`
            }
            return <td style={style} className={Store.isEmptyCell(rowIndex, colIndex) ? 'empty' : ''}
                key={rowIndex + colIndex} onClick={() => this.onCellClick(rowIndex, colIndex)}>
            </td>
        });
    }


    renderBoard() {
        return this.state.board.map((row, rowIndex) => {
            return <tr key={rowIndex}>{this.renderCells(row, rowIndex)}</tr>
        });
    }


    onCellClick(rowIndex, colIndex) {

        let item = this.state.board[rowIndex][colIndex];

        if (this.isShuffled && !Store.isEmptyCell(item) &&
            (
                (rowIndex == Store.emptyCell.row && Math.abs(colIndex - Store.emptyCell.col) == 1) ||
                (colIndex == Store.emptyCell.col && Math.abs(rowIndex - Store.emptyCell.row) == 1)
            )
        ) {

            let emptyCellCopy = this.state.board[Store.emptyCell.row][Store.emptyCell.col];

            this.state.board[Store.emptyCell.row][Store.emptyCell.col] = item;
            this.state.board[rowIndex][colIndex] = emptyCellCopy

            Store.emptyCell = {
                "row": rowIndex,
                "col": colIndex
            };

            Store.steps++;

            this.setState
                ({
                    "board": [...this.state.board]
                },
                () => {
                    let checkWinning = Store.checkWinning(this.state.board);
                    if (checkWinning) {
                        setTimeout(() => {
                            alert("success !!!");
                        }, 0);
                    }
                });
        }
    }


    @autobind
    shuffle() {
        this.isShuffled = true;
        Store.steps = 0;
        this.setState({
            "board": Store.shuffle()
        });
    }


    @autobind
    onboardSizeChange(event) {
        Store.boardSize = Number(event.target.value)
        this.setState({
            "board": Store.createNewBoard(),
        });
    }


    @autobind
    resetBoard() {
        Store.steps = 0;
        this.setState({
            "board": Store.createNewBoard(),
        });
    }


    render() {
        return (
            <div className="comp puzzle-board">
                <table>
                    <tbody>{this.renderBoard()}</tbody>
                </table>
                <div className="controllers">
                    <div className="ib">
                        <span>Difficulty</span>
                        <input type="number"
                            value={Store.boardSize}
                            step="1"
                            min="3"
                            max={maxBoardSize}
                            onChange={this.onboardSizeChange} />
                    </div>
                    <button onClick={this.shuffle}>Shuffle</button>
                    <button onClick={this.resetBoard}>Rest</button>
                    <label>Steps : {Store.steps}</label>
                </div>
            </div>
        )
    }
}

export default PuzzleBoard;
