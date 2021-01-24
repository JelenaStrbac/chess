import { bishop } from "./figures/bishop";
import { king } from "./figures/king";
import { knight } from "./figures/knight";
import { pawn } from "./figures/pawn";
import { queen } from "./figures/queen";
import { rook } from "./figures/rook";

const movements = {
  P: pawn,
  R: rook,
  B: bishop,
  Q: queen,
  N: knight,
  K: king,
};

export default movements;
