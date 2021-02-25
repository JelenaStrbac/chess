export interface RootState {
  game: {
    board: (
      | "BB"
      | "BK"
      | "BN"
      | "BP"
      | "BQ"
      | "BR"
      | "WB"
      | "WK"
      | "WN"
      | "WP"
      | "WQ"
      | "WR"
      | null
    )[][];
    activePlayer: "W" | "B";
    activePlayerStatus: "selecting" | "moving";
    current: {
      field: string;
      figure:
        | "BB"
        | "BK"
        | "BN"
        | "BP"
        | "BQ"
        | "BR"
        | "WB"
        | "WK"
        | "WN"
        | "WP"
        | "WQ"
        | "WR"
        | null
        | "";
    };
    possibleMoves: string[];
    notation: string[];
    captured: {
      W: (
        | "BB"
        | "BK"
        | "BN"
        | "BP"
        | "BQ"
        | "BR"
        | "WB"
        | "WK"
        | "WN"
        | "WP"
        | "WQ"
        | "WR"
      )[];
      B: (
        | "BB"
        | "BK"
        | "BN"
        | "BP"
        | "BQ"
        | "BR"
        | "WB"
        | "WK"
        | "WN"
        | "WP"
        | "WQ"
        | "WR"
      )[];
    };
    shouldPawnPromote: boolean;
    pawnPromotion: {
      W: "Q" | "R" | "B" | "N";
      B: "Q" | "R" | "B" | "N";
    };
    end: {
      isGameEnded: boolean;
      howIsGameEnded: "" | "checkmate" | "resign"; // checkmate, resign
      winner: string;
      loser: string;
      isRematch: boolean;
    };
  };
  room: {
    roomID: string | null;
    status: null | "started" | "pending" | "loading" | "error";
    color: null | "W" | "B";
    name: null | string;
  };
}
