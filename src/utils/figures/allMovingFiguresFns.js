import { bishop } from "./bishop";
import { king } from "./king";
import { knight } from "./knight";
import { pawn } from "./pawn";
import { queen } from "./queen";
import { rook } from "./rook";

const allMovingFiguresFns = {
  P: pawn,
  R: rook,
  B: bishop,
  Q: queen,
  N: knight,
  K: king,
};

export default allMovingFiguresFns;
