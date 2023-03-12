import logo from "./logo.svg";
import "./App.css";
import React, { createContext, useEffect, useState } from "react";
import Board from "./components/board/Board";
import { boardLayout } from "./word/Word";
import { fetchWord } from "./services/WordFetcher";

export type AppContextProps = {
  board: any;
  setBoard: any;
  targetWord: any;
  setTargetWord: any;
};
export const AppContext = createContext<AppContextProps | undefined>(undefined);

function App() {
  const [board, setBoard] = useState(boardLayout);
  const [targetWord, setTargetWord] = useState("");

  useEffect(() => {
    fetchWord(5).then((word) => setTargetWord(word));
  });
  if (!targetWord) {
    return <div></div>;
  }
  return (
    <div className="App">
      <AppContext.Provider
        value={{ board, setBoard, targetWord, setTargetWord }}
      >
        <Board />
      </AppContext.Provider>
    </div>
  );
}

export default App;
