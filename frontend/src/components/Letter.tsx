import React, { useContext } from "react";
import { AppContext, AppContextProps } from "../App";
type LetterProps = {
  row: number;
  col: number;
};
function Letter(props: LetterProps) {
  const { row, col } = props;
  const { board } = useContext(AppContext) as AppContextProps;
  const letter = board[row][col].letter;

  const className = `letter ${board[row][col].color}-letter`;
  return <div className={className}>{letter}</div>;
}

export default Letter;
