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
