import "./App.css";
import React, { createContext, useEffect, useState } from "react";
import Board from "./components/Board";
import { boardLayout, keyboardLayout } from "./layout/Layout";
import Keyboard from "./components/Keyboard";
import { fetchSession, queryGameRoom } from "./services/WordleRoom";
import WaitingRoom from "./components/WaitingRoom";
import { fetchWord } from "./services/WordFetcher";
import Landing from "./components/Landing";
import GameStatus from "./components/GameStatus";

export type AppContextProps = {
  board: any;
  setBoard: any;
  keyboard: any;
  setKeyboard: any;
  targetWord: any;
  setTargetWord: any;
  gameOutcome: any;
  setGameOutcome: any;
};

export type LandingContextProps = {
  gameType: any;
  setGameType: any;
};

export enum GameType {
  SOLO,
  MULTIPLAYER,
}

export enum GameOutcome {
  WIN,
  LOSS,
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);
export const LandingContext = createContext<LandingContextProps | undefined>(
  undefined
);

function App() {
  const [ready, setReady] = useState(false);
  const [board, setBoard] = useState(boardLayout);
  const [keyboard, setKeyboard] = useState(keyboardLayout);
  const [targetWord, setTargetWord] = useState("");
  const [gameType, setGameType] = useState(null);
  const [gameOutcome, setGameOutcome] = useState(null);
  let sid = fetchSession();

  var pageShown = (
    <div>
      <LandingContext.Provider value={{ gameType, setGameType }}>
        <Landing />
      </LandingContext.Provider>
    </div>
  );
  useEffect(() => {
    console.log(gameType == GameType.SOLO);
    if (gameType == GameType.SOLO) {
      fetchWord(5).then((word) => {
        setTargetWord(word);
        setReady(true);
      });
    }
  });
  if (gameType == GameType.MULTIPLAYER) {
    pageShown = <WaitingRoom />;
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
    }
  }

  if (ready) {
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
            gameOutcome,
            setGameOutcome,
          }}
        >
          <Board />
          <Keyboard />
          <GameStatus />
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
