// Get wordle word from some Heroku server online that will provide custom length words
async function fetchWord(wordLength: number) {
  var word = window.localStorage.getItem("current_word");
  if (word) return word;
  return new Promise<string>((resolve, reject) => {
    try {
      fetch(`https://random-word-api.herokuapp.com/word?length=${wordLength}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length) {
            window.localStorage.setItem("current_word", data[0]);
            resolve(data[0]);
          } else {
            reject(new Error("no word found!"));
          }
        });
    } catch (err) {
      reject(err);
    }
  });
}

function removeStoredWord() {
  window.localStorage.setItem("current_word", "");
}

async function checkValidWord(word: string) {
  return new Promise<boolean>((resolve, reject) => {
    try {
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then(
        (response) => {
          resolve(response.status !== 404);
        }
      );
    } catch (err) {
      reject(err);
    }
  });
}
export { fetchWord, removeStoredWord, checkValidWord };
