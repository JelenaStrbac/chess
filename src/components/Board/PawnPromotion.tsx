import styled from "styled-components";
import { useDispatch } from "react-redux";

import { promotePawnTo } from "../../store/slices/board/boardSlice";
import Square from "./Square";
import { FC } from "react";

type Props = {
  color: "B" | "W";
};

type WhitePromotion = "WB" | "WN" | "WQ" | "WR";
type BlackPromotion = "BB" | "BN" | "BQ" | "BR";

const PawnPromotion: FC<Props> = ({ color }) => {
  const dispatch = useDispatch();

  const onClickHandler = (
    name:
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
  ) => {
    const nameLetter = name?.[1];
    dispatch(promotePawnTo(nameLetter));
  };

  const arrWithFigures: (WhitePromotion | BlackPromotion)[] =
    color === "W" ? ["WB", "WN", "WQ", "WR"] : ["BB", "BN", "BQ", "BR"];

  return (
    <Container>
      {arrWithFigures.map((el, i) => (
        <Square
          key={el}
          fig={el}
          color={i % 2 === 0 ? "white" : "black"}
          handleClick={onClickHandler}
        ></Square>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: absolute;
  top: 2rem;
  left: 10rem;

  @media only screen and (max-width: 480px) {
    top: 8rem;
    z-index: 1000;
  }
`;

export default PawnPromotion;
