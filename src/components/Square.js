import styled from "styled-components";

import BB from "../assets/img/BB.png";
import BK from "../assets/img/BK.png";
import BN from "../assets/img/BN.png";
import BP from "../assets/img/BP.png";
import BQ from "../assets/img/BQ.png";
import BR from "../assets/img/BR.png";
import WB from "../assets/img/WB.png";
import WK from "../assets/img/WK.png";
import WN from "../assets/img/WN.png";
import WP from "../assets/img/WP.png";
import WQ from "../assets/img/WQ.png";
import WR from "../assets/img/WR.png";

const figures = {
  BB: BB,
  BK: BK,
  BN: BN,
  BP: BP,
  BQ: BQ,
  BR: BR,
  WB: WB,
  WK: WK,
  WN: WN,
  WP: WP,
  WQ: WQ,
  WR: WR,
};

const Square = (props) => {
  return (
    <SquareContainer
      id={props.field}
      name={props.fig}
      color={props.color}
      onClick={props.handleClick}
      active={props.active}
      possibleMove={props.possibleMove}
    >
      {props.fig ? (
        <img
          width="80px"
          height="80px"
          src={figures[props.fig]}
          id={props.field}
          name={props.fig}
          alt={props.fig}
        />
      ) : null}
      {props.possibleMove ? (
        <Circle id={props.field} name={props.fig}></Circle>
      ) : null}
    </SquareContainer>
  );
};

const SquareContainer = styled.div`
  background-color: ${(props) =>
    props.color === "selected"
      ? "#abd88d"
      : props.color === "white"
      ? "#ffce9e"
      : "#d18b47"};
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.active ? "not-allowed" : "pointer")};
`;

const Circle = styled.div`
  height: 25px;
  width: 25px;
  background: rgba(171, 216, 141, 0.4);
  border-radius: 50%;
`;

export default Square;
