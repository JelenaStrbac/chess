export interface RootState {
    game: {
        board: (string | null)[],
          activePlayer: "W" | "B",
          activePlayerStatus: "selecting" | "moving",
          current: {
            field: string,
            figure: string,
          },
          possibleMoves: string[],
          notation: string[],
          captured: {
            W: string[],
            B: string[],
          },
          shouldPawnPromote: boolean,
          pawnPromotion: {
            W: "Q" | "R" | "B" | "N",
            B: "Q" | "R" | "B" | "N",
          },
          end: {
            isGameEnded: boolean,
            howIsGameEnded: string, // checkmate, resign
            winner: string,
            loser: string,
            isRematch: boolean,
          },
    }
    room: {
        roomID: string | null,
        status: null | "started" | "pending" | "loading" | "error",
        color: null | "W" | "B",
        name: null | string,
    }
}