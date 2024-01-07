import {useState} from "react";
import Board from "./Board.jsx";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        console.log('nextHistory', nextHistory);

        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }
    console.log('currentMove', currentMove);

    const moves = history.map((_, move) => {
        let description;
        if (move > 0) {
            description = `Go to move # ${move}`;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move} className="mt-2">
                <button className="bg-primary text-white" onClick={() => jumpTo(move)}>
                    {description}
                </button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}