import { fetchWord } from "./WordFetcher";

describe("Testing Word Fetcher service", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("fetch word of length 5", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(["fiver"]));
    const word = await fetchWord(5);

    expect(word.length).toBe(5);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://random-word-api.herokuapp.com/word?length=5"
    );
  });

  test("throw error if no word returned", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));

    await expect(async () => {
      await fetchWord(5);
    }).rejects.toThrowError("no word found!");
  });
});
