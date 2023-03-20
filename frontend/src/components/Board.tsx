import React, { useState, useEffect, useContext } from "react";
import { AppContext, AppContextProps, GameOutcome } from "../App";
import { checkValidWord, removeStoredWord } from "../services/WordFetcher";
import {
  calculateTimeElapsed,
  clearTimer,
  startTimer,
} from "../services/WordMetrics";
import Letter from "./Letter";

function Board(): JSX.Element {
  //   let curRow: number = 0;
  //   let curCol: number = 0;
  const [curCol, setCurCol] = useState(0);
  const [curRow, setCurRow] = useState(0);

  let { board, setBoard, keyboard, setKeyboard, targetWord, setGameOutcome } =
    useContext(AppContext) as AppContextProps;

  useEffect(() => {
    // handle keyboard input and update the Board accordingly
    const useKeyHandler = (event: KeyboardEvent) => {
      if (event.key === "Backspace" || event.key === "Delete") {
        // can't backspace in an empty row
        if (curCol - 1 < 0) return;
        board[curRow][curCol - 1].letter = "";
        setBoard(board);
        setCurCol(curCol - 1);
      } else if (event.key === "Enter") {
        if (curCol == 5) {
          let curWord = board[curRow]
            .map((entry: { letter: string; color: string }) => entry.letter)
            .join("");
          // validate word against a dictionary API
          checkValidWord(curWord).then((valid) => {
            if (curWord != targetWord && !valid) return;
            for (let ind = 0; ind < curWord.length; ind++) {
              if (curWord[ind] == targetWord[ind]) {
                // mark letter as green on board and keyboard
                board[curRow][ind].color = "green";
                updateKeyboard(keyboard, curWord[ind], "green");
              } else if (targetWord.includes(curWord[ind])) {
                // mark letter as yellow
                board[curRow][ind].color = "yellow";
                updateKeyboard(keyboard, curWord[ind], "yellow");
              } else {
                // mark as black
                board[curRow][ind].color = "black";
                updateKeyboard(keyboard, curWord[ind], "black");
              }
            }
            // we deep copy the object to ensure the state is getting updated
            setKeyboard(JSON.parse(JSON.stringify(keyboard)));
            setCurCol(0);
            setBoard(board);
            if (curWord == targetWord) {
              // calculate metrics
              let timeElapsed = calculateTimeElapsed();
              console.log(`you won in ${timeElapsed} seconds!`);
              setGameOutcome(GameOutcome.WIN);
              setCurCol(-1);
              removeStoredWord();
              clearTimer();
              return;
            }
            if (curRow == 5) {
              console.log("You lost!");
              setGameOutcome(GameOutcome.LOSS);
              return;
            }
            setCurRow(curRow + 1);
          });
        }
      } else if (curCol >= 5 || curCol < 0)
        return; // do not accept input if curCol is not in a valid position
      else {
        if (/^[a-z]$/i.test(event.key) == false) return; // limit key presses to letters
        board[curRow][curCol].letter = event.key;
        setCurCol(curCol + 1);
        setBoard(board);
      }
    };
    document.addEventListener("keydown", useKeyHandler);

    return () => {
      document.removeEventListener("keydown", useKeyHandler);
    };
  });
  let rows = [];

  // each grid in the Board is a Letter component
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

// update color and state of each key in keyboard
function updateKeyboard(keyboard: any, letter: string, color: string) {
  keyboard.forEach((row: any) => {
    let ind = row
      .map((x: { letter: string; color: string }) => x.letter)
      .indexOf(letter);
    if (ind >= 0) {
      if (color == "green") row[ind].color = color;
      if (row[ind].color == "") row[ind].color = color;
    }
  });
}

export default Board;
