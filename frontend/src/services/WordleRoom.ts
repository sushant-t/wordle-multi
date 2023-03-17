import { v4 } from "uuid";
let url = "http://localhost:3001";

type GameRoom = {
  ready: boolean;
  roomId?: string;
  word?: string;
};

// get game room details from the backend, when game is ready to be played
function queryGameRoom(session_id: string) {
  return new Promise<GameRoom>((resolve, reject) => {
    try {
      fetch(`${url}/room?sid=${session_id}`).then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            data.ready = true;
            resolve(data);
          });
        } else if (response.status == 204) {
          resolve({
            ready: false,
          });
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

// each player has a unique session ID, which allows the backend to keep track of players.
function fetchSession(): string {
  let sid = window.localStorage.getItem("session_id");
  if (!sid) sid = v4();
  window.localStorage.setItem("session_id", sid);
  return sid;
}

export { queryGameRoom, fetchSession };
