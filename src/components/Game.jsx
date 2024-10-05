import React, { useEffect, useState } from 'react';
import Result from './Result';

const Game = () => {
    const [boxes, setBoxes] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState("X");
    const [isGameOver, setIsGameOver] = useState(false);
    const [result, setResult] = useState("");
    const [winningBoxes, setWinningBoxes] = useState([]); 

    useEffect(() => {
        checkDraw();
    }, [boxes]);

    const handleClick = (index) => {
        if (!isGameOver && !boxes[index]) {
            const newBoxes = [...boxes];
            newBoxes[index] = turn;
            setBoxes(newBoxes);

            checkWin(newBoxes,turn);
            changeTurn();
        }
    };

    const changeTurn = () => {
        setTurn(turn === "X" ? "O" : "X");
        document.querySelector(".bg").style.left = turn === "X" ? "85px" : "0";
    };

    const checkWin = (newBoxes,currentTurn) => {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (newBoxes[a] && newBoxes[a] === newBoxes[b] && newBoxes[a] === newBoxes[c]) {
                setIsGameOver(true);
                setResult(`${currentTurn} Wins`);
                setWinningBoxes([a, b, c]); 
                document.querySelector("#play-again").style.display = "inline";
                return;
            }
        }
    };

    const checkDraw = () => {
        if (!isGameOver && boxes.every(box => box)) {
            setIsGameOver(true);
            setResult("DRAW");
            document.querySelector("#play-again").style.display = "inline";
        }
    };

    const playAgain = () => {
        setBoxes(Array(9).fill(null));
        setTurn("X");
        setIsGameOver(false);
        setResult("");
        setWinningBoxes([]); 

        document.querySelector(".bg").style.left = 0;
        document.querySelector("#results").innerHTML = "";
        document.querySelector("#play-again").style.display = "none";
    };

    return (
        <div>
            <div className="main-grid grid grid-cols-3 grid-rows-3 h-64 w-64 my-[30px] mx-auto border-2 border-black">
                {boxes.map((box, index) => (
                    <div 
                        key={index} 
                        className={`box align cursor-pointer text-[2rem] font-[700] capitalize  text-2xl border-2 border-black ${winningBoxes.includes(index) ? 'winning' : ''}`}  
                        onClick={() => handleClick(index)}
                    >
                        {box}
                    </div>
                ))}
            </div>
            <Result result={result} onPlayAgain={playAgain} />
        </div>
    );
}

export default Game;
