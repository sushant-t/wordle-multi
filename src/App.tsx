import logo from "./logo.svg";
import "./App.css";
import React, { createContext, useEffect, useState } from "react";
import Board from "./components/Board";
import { boardLayout, keyboardLayout } from "./layout/Layout";
import { fetchWord } from "./services/WordFetcher";
import Keyboard from "./components/Keyboard";

export type AppContextProps = {
  board: any;
  setBoard: any;
  keyboard: any;
  setKeyboard: any;
  targetWord: any;
  setTargetWord: any;
};
export const AppContext = createContext<AppContextProps | undefined>(undefined);

function App() {
  const [board, setBoard] = useState(boardLayout);
  const [keyboard, setKeyboard] = useState(keyboardLayout);
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
        value={{
          board,
          setBoard,
          keyboard,
          setKeyboard,
          targetWord,
          setTargetWord,
        }}
      >
        <Board />
        <Keyboard />
      </AppContext.Provider>
    </div>
  );
}

export default App;
