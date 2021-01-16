const checkField = (board, activePlayer, wanRow, wanCol) => {
  const figOnField = board[Number(wanRow)][Number(wanCol)];

  // 1. odabrano polje je null (dakle, prazno);
  //     ili
  // 2. odabrano polje je popunjeno, ali od suprotnog igraca

  if (!figOnField || (figOnField && activePlayer !== figOnField[0])) {
    return true;
  } else {
    return false;
  }
};

export default checkField;
