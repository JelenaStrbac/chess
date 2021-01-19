import { bishop } from "./figures/bishop";
import { pawn } from "./figures/pawn";
import { queen } from "./figures/queen";
import { rook } from "./figures/rook";

const movements = {
  P: pawn,
  R: rook,
  B: bishop,
  Q: queen,
};

export default movements;
