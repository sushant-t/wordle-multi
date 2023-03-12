import React, { useState, useEffect, useContext } from "react";
import { AppContext, AppContextProps } from "../../App";
import { checkValidWord, removeStoredWord } from "../../services/WordFetcher";
import {
  calculateTimeElapsed,
  clearTimer,
  startTimer,
} from "../../services/WordMetrics";
import Letter from "./Letter";

function Board(): JSX.Element {
  //   let curRow: number = 0;
  //   let curCol: number = 0;
  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);

  let { board, setBoard, targetWord, setTargetWord } = useContext(
    AppContext
  ) as AppContextProps;

  useEffect(() => {
    // Update the document title using the browser API

    const useKeyHandler = (event: KeyboardEvent) => {
      if (event.key === "Backspace" || event.key === "Delete") {
        console.log("deleting");
        if (curCol - 1 < 0) return;
        board[curRow][curCol - 1].letter = "";
        setBoard(board);
        setCurCol(curCol - 1);
        console.log(board);
      } else if (event.key === "Enter") {
        if (curCol == 5) {
          let curWord = board[curRow]
            .map((entry: { letter: string; color: string }) => entry.letter)
            .join("");
          console.log(curWord);
          checkValidWord(curWord).then((valid) => {
            if (!targetWord && !valid) return;
            for (let ind = 0; ind < curWord.length; ind++) {
              if (curWord[ind] == targetWord[ind]) {
                // mark letter as green
                board[curRow][ind].color = "green";
              } else if (targetWord.includes(curWord[ind])) {
                // mark letter as yellow
                board[curRow][ind].color = "yellow";
              } else {
                // mark as black
                board[curRow][ind].color = "black";
              }
            }
            console.log(targetWord);
            setCurCol(0);
            setBoard(board);
            if (curWord == targetWord) {
              let timeElapsed = calculateTimeElapsed();
              console.log(`you won in ${timeElapsed} seconds!`);
              setCurCol(-1);
              removeStoredWord();
              clearTimer();
              return;
            }
            if (curRow == 5) {
              console.log("You lost!");
              return;
            }
            setCurRow(curRow + 1);
          });
        }
      } else if (curCol >= 5 || curCol < 0) return;
      else {
        if (/^[a-z]$/i.test(event.key) == false) return;
        board[curRow][curCol].letter = event.key;
        setCurCol(curCol + 1);
        setBoard(board);
        console.log(board);
      }
    };
    document.addEventListener("keydown", useKeyHandler);

    return () => {
      document.removeEventListener("keydown", useKeyHandler);
    };
  });
  let rows = [];

  for (let i = 0; i < 6; i++) {
    let cells = [];
    for (let j = 0; j < 5; j++) {
      cells.push(<Letter row={i as number} col={j as number} />);
    }
    rows.push(<div className="boardRow">{cells}</div>);
  }

  // start timer for metrics
  startTimer();
  return <div className="board">{rows}</div>;
}

export default Board;
