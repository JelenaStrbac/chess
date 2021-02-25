import {
  GiFlyingFlag,
  GiShakingHands,
  GiEmptyChessboard,
  GiTrophyCup,
} from "react-icons/gi";
import { BsArrowRepeat } from "react-icons/bs";
import { IoCopy } from "react-icons/io5";
import { IconContext } from "react-icons";

const changeIcon = (icon: React.ReactNode, color: string, size = "40px") => {
  return (
    <IconContext.Provider value={{ color, size }}>{icon}</IconContext.Provider>
  );
};

export const flag = (color: string) =>
  changeIcon(<GiFlyingFlag />, color, "20px");
export const hands = (color: string) =>
  changeIcon(<GiShakingHands />, color, "20px");
export const chessIcon = (color = "white", size = "40px") =>
  changeIcon(<GiEmptyChessboard />, color, size); 
export const cup = changeIcon(<GiTrophyCup />, "white", "80px");
export const rematch = changeIcon(<BsArrowRepeat />, "white", "40px");
export const copy = changeIcon(<IoCopy />, "#ae88ff", "25px");
