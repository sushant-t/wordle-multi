// Get wordle word from some Heroku server online that will provide custom length words
async function fetchWord(wordLength: number) {
  return new Promise<string>((resolve, reject) => {
    try {
      fetch(`https://random-word-api.herokuapp.com/word?length=${wordLength}`)
        .then((response) => response.json())
        .then((data) => {
          data.length ? resolve(data[0]) : reject(new Error("no word found!"));
        });
    } catch (err) {
      reject(err);
    }
  });
}

export { fetchWord };
