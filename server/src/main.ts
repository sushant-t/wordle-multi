import express from "express";
import { v4 } from "uuid";
import { fetchWord } from "./services";
import cors from "cors";

// needed to bypass CORS issues
const app = express();
app.use(cors());

// get room for players

let rooms: any = {};
let currentRoom = v4();

app.get("/room", async (req, res) => {
  if (!rooms[currentRoom]) {
    res.status(204).end();
    return;
  }

  // using client-side session ID to differentiate between players
  rooms[currentRoom].members.add(req.query.sid);
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

var priorRoom = "";
async function manageRooms() {
  if (priorRoom && rooms[priorRoom] && rooms[priorRoom].members < 2) {
    delete rooms[priorRoom];
  }
  priorRoom = await assignRooms();
  setTimeout(manageRooms, 10000);
}

function main() {
  const port = 3001;
  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
  });

  manageRooms();
  setInterval(() => {
    console.log(rooms);
  }, 1000);
}

main();
