export const determineRowAndCol = (currFig: string) => {
  return currFig?.split("-").map((el) => Number(el));
};
