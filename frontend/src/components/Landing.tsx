import React, { useContext } from "react";

import Button from "@mui/material/Button";
import { GameType, LandingContext, LandingContextProps } from "../App";

function Landing() {
  let { setGameType } = useContext(LandingContext) as LandingContextProps;

  return (
    <div>
      <h1 className="landing-header">
        <b>Wordle</b>
      </h1>
      <div className="landing-buttons">
        <Button onClick={() => setGameType(GameType.SOLO)} variant="contained">
          Solo
        </Button>
        <Button
          onClick={() => setGameType(GameType.MULTIPLAYER)}
          variant="contained"
        >
          Multiplayer
        </Button>
      </div>
    </div>
  );
}

export default Landing;
