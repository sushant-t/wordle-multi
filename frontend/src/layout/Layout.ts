// The board and keyboard layouts are both 2D arrays of objects with letter and color properties.

export const boardLayout = Array(6)
  .fill(null)
  .map(() =>
    Array(5)
      .fill(null)
      .map(() => {
        return {
          letter: "",
          color: "",
        };
      })
  );

const firstRow = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "\u232b",
].map((x) => {
  return { letter: x, color: "" };
});
const secondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"].map((x) => {
  return { letter: x, color: "" };
});
const thirdRow = ["z", "x", "c", "v", "b", "n", "m", "\u23ce"].map((x) => {
  return { letter: x, color: "" };
});

export const keyboardLayout = [firstRow, secondRow, thirdRow];
