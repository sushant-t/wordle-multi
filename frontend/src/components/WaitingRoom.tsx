import React from "react";

function WaitingRoom() {
  return (
    <body>
      <div id="pre-loader">
        <div id="loader-circle"></div>
        <div className="loader-section section-left"></div>
        <div className="loader-section section-right"></div>
      </div>
      <h1>
        <b>Waiting For Other Players...</b>
      </h1>
    </body>
  );
}

export default WaitingRoom;
