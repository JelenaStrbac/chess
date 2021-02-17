const arrWithAllFieldsFromFigsAreMoved: string[] = [];

export const writeFieldFromWhichFigIsMoved = (figure: string, r: number, c: number) => {

  arrWithAllFieldsFromFigsAreMoved.push(`${figure}-${r}${c}`);

  return arrWithAllFieldsFromFigsAreMoved;
};
