const chars = "abcdefhkmnprstwxyz2345678";
const charsArray = chars.split("");

export default (length = 6): string => {
  const code = Array.from({ length })
    .map(() => charsArray[Math.floor(Math.random() * chars.length)])
    .join("");

  return code;
};
