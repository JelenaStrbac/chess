const arrWithAllFieldsFromFigsAreMoved: string[] = [];

export const writeFieldFromWhichFigIsMoved = (
  figure: string | undefined,
  r: number,
  c: number
) => {
  figure && arrWithAllFieldsFromFigsAreMoved.push(`${figure}-${r}${c}`);

  return arrWithAllFieldsFromFigsAreMoved;
};
