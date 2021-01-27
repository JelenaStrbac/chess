export const determineRowAndCol = (currFig) => {
  return currFig?.split("-").map((el) => Number(el));
};
