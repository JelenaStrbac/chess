import {
  GiFlyingFlag,
  GiShakingHands,
  GiEmptyChessboard,
} from "react-icons/gi";
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
