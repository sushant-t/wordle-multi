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

const firstRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map((x) => {
  return { letter: x, color: "" };
});
const secondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"].map((x) => {
  return { letter: x, color: "" };
});
const thirdRow = ["z", "x", "c", "v", "b", "n", "m"].map((x) => {
  return { letter: x, color: "" };
});

export const keyboardLayout = [firstRow, secondRow, thirdRow];
