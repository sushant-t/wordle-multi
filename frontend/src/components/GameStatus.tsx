import { Box, Modal } from "@mui/material";
import React, { useContext } from "react";
import { AppContext, AppContextProps, GameOutcome } from "../App";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  display: "flex",
  justifyContent: "center",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function GameStatus() {
  const [open, setOpen] = React.useState(false);

  let { gameOutcome } = useContext(AppContext) as AppContextProps;

  const handleClose = () => {
    setOpen(false);
  };

  const getGameStatusText = (gameOutcome: GameOutcome) => {
    if (gameOutcome == GameOutcome.WIN) {
      return "You won!";
    }
    if (gameOutcome == GameOutcome.LOSS) {
      return "You lost!";
    }
  };

  console.log(gameOutcome);

  return (
    <Modal
      open={gameOutcome != null}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{getGameStatusText(gameOutcome)}</Box>
    </Modal>
  );
}

export default GameStatus;
