export const generateRandomPlayerColor = () => {
  const randomNum = Math.floor(Math.random() * 2);
  return randomNum === 0 ? "W" : "B";
};
