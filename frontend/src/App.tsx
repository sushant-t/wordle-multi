import logo from "./logo.svg";
import "./App.css";
import React, { createContext, useEffect, useState } from "react";
import Board from "./components/Board";
import { boardLayout, keyboardLayout } from "./layout/Layout";
import Keyboard from "./components/Keyboard";
import { fetchSession, queryGameRoom } from "./services/WordleRoom";
import WaitingRoom from "./components/WaitingRoom";

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
  const [ready, setReady] = useState(false);
  const [board, setBoard] = useState(boardLayout);
  const [keyboard, setKeyboard] = useState(keyboardLayout);
  const [targetWord, setTargetWord] = useState("");

  let sid = fetchSession();

  var pageShown = (
    <div>
      <WaitingRoom />
    </div>
  );
  if (!ready) {
    let interval = setInterval(async () => {
      let data = await getGameDetails(sid);
      console.log(data);
      if (data.ready) {
        setTargetWord(data.word as string);
        setReady(true);
        clearInterval(interval);
      }
    }, 1000);
  } else {
    pageShown = (
      <div>
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
  return <div className="App">{pageShown}</div>;
}

async function getGameDetails(sid: string) {
  let data = await queryGameRoom(sid);
  return data;
}

export default App;
