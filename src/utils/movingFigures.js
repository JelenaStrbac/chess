const movements = {
  P: (player, currRow, currCol, wanRow, wanCol) => {
    if (
      (player === "W" ? Number(currRow) - 1 : Number(currRow) + 1) ===
        Number(wanRow) &&
      Number(currCol) === Number(wanCol)
    )
      return true;
    return false;
  },
};

export default movements;
