import {
  GiFlyingFlag,
  GiShakingHands,
  GiEmptyChessboard,
  GiTrophyCup,
} from "react-icons/gi";
import { BsArrowRepeat } from "react-icons/bs";
import { IconContext } from "react-icons";

const changeIcon = (icon, color, size = "40px") => {
  return (
    <IconContext.Provider value={{ color, size }}>{icon}</IconContext.Provider>
  );
};

export const flag = (color, size) =>
  changeIcon(<GiFlyingFlag />, color, "20px");
export const hands = (color, size) =>
  changeIcon(<GiShakingHands />, color, "20px");
export const chessIcon = changeIcon(<GiEmptyChessboard />, "white", "40px");
export const cup = changeIcon(<GiTrophyCup />, "white", "80px");
export const rematch = changeIcon(<BsArrowRepeat />, "white", "40px");
