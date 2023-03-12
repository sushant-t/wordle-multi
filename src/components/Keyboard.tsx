import React, { useContext } from "react";
import { AppContext, AppContextProps } from "../App";
import Key from "./Key";

function Keyboard() {
  let { keyboard } = useContext(AppContext) as AppContextProps;

  return (
    <div className="keyboard">
      <div className="line1">
        {keyboard[0].map((key: { letter: string; color: string }) => {
          return <Key value={key.letter} />;
        })}
      </div>
      <div className="line2">
        {keyboard[1].map((key: { letter: string; color: string }) => {
          return <Key value={key.letter} />;
        })}
      </div>
      <div className="line3">
        {keyboard[2].map((key: { letter: string; color: string }) => {
          return <Key value={key.letter} />;
        })}
      </div>
    </div>
  );
}
export default Keyboard;
