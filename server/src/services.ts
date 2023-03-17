import axios from "axios";

// fetch word of certain length from a random word API
async function fetchWord(wordLength: number) {
  return new Promise<string>((resolve, reject) => {
    try {
      axios
        .get(`https://random-word-api.herokuapp.com/word?length=${wordLength}`)
        .then((response: any) => {
          let data = response.data;
          if (data.length) {
            resolve(data[0]);
          } else {
            reject(new Error("no word found!"));
          }
        });
    } catch (err: any) {
      reject(err);
    }
  });
}

export { fetchWord };
