// basic metric tracking for game

// track the time elapsed from start to finish for a game
function startTimer() {
  if (!window.localStorage.getItem("current_time")) {
    window.localStorage.setItem("current_time", Date.now().toString());
  }
}

function clearTimer() {
  window.localStorage.removeItem("current_time");
}

function calculateTimeElapsed() {
  if (!window.localStorage.getItem("current_time")) {
    throw new Error("No start time found.");
  }
  let startTime = parseInt(
    window.localStorage.getItem("current_time") as string
  );

  return Math.round((Date.now() - startTime) / 1000);
}

export { startTimer, calculateTimeElapsed, clearTimer };
