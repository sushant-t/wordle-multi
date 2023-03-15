import express from "express";
import { v4 } from "uuid";
import { fetchWord } from "./services";
const app = express();

// get room for players

let rooms: any = {};
let currentRoom = v4();

app.get("/room", async (req, res) => {
  rooms[currentRoom].members.add(req.ip);
  if (rooms[currentRoom].members.size > 1) {
    res
      .status(200)
      .send({
        roomId: currentRoom,
        word: rooms[currentRoom].word,
      })
      .end();
  } else {
    res.status(204).end();
  }
});

async function assignRooms() {
  // every 10 seconds, generate new room. if no one in a room, delete room
  let roomId = v4();
  rooms[roomId] = {};
  rooms[roomId].word = await fetchWord(5);
  rooms[roomId].members = new Set();
  currentRoom = roomId;

  return roomId;
}

function main() {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
  });
  var priorRoom = "";
  setInterval(async () => {
    if (priorRoom && rooms[priorRoom].members < 2) {
      delete rooms[priorRoom];
    }
    priorRoom = await assignRooms();
  }, 10000);
}

main();
