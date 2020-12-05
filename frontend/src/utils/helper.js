export const stringTruncate = (str, n) =>
  str.length > n ? str.substr(0, n - 1) + "..." : str;

export const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }
  return range;
};
