const arrWithAllFieldsFromFigsAreMoved = [];

export const writeFieldFromWhichFigIsMoved = (figure, r, c) => {
  //const arrWithAllFieldsFromFigsAreMoved = [];

  arrWithAllFieldsFromFigsAreMoved.push(`${figure}-${r}${c}`);

  return arrWithAllFieldsFromFigsAreMoved;
};
