import styled from "styled-components";

import BB from "../../assets/img/BB.png";
import BK from "../../assets/img/BK.png";
import BN from "../../assets/img/BN.png";
import BP from "../../assets/img/BP.png";
import BQ from "../../assets/img/BQ.png";
import BR from "../../assets/img/BR.png";
import WB from "../../assets/img/WB.png";
import WK from "../../assets/img/WK.png";
import WN from "../../assets/img/WN.png";
import WP from "../../assets/img/WP.png";
import WQ from "../../assets/img/WQ.png";
import WR from "../../assets/img/WR.png";

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
      isBlack={props.isBlack}
    >
      {props.fig ? (
        <ImgStyled
          src={figures[props.fig]}
          id={props.field}
          name={props.fig}
          alt={props.fig}
        />
      ) : null}
      {props.possibleMove ? (
        <Circle id={props.field} name={props.fig}></Circle>
      ) : null}
      {props.capturedFigures ? (
        <CapturedCircle id={props.field} name={props.fig}></CapturedCircle>
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
  position: relative;
  transform: ${(props) => (props.isBlack ? "rotate(180deg)" : "")};

  @media only screen and (max-width: 480px) {
    width: 40px;
    height: 40px;
  }

  @media only screen and (min-width: 481px) and (max-width: 1920px) {
    width: 60px;
    height: 60px;
  }
`;

const Circle = styled.div`
  height: 25px;
  width: 25px;
  background: rgba(171, 216, 141, 0.4);
  border-radius: 50%;

  @media only screen and (max-width: 480px) {
    width: 15px;
    height: 15px;
  }

  @media only screen and (min-width: 481px) and (max-width: 1920px) {
    width: 20px;
    height: 20px;
  }
`;

const CapturedCircle = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  border: 8px solid rgba(171, 216, 141, 0.4);
  z-index: 100;
  position: absolute;

  @media only screen and (max-width: 480px) {
    width: 20px;
    height: 20px;
    border: 5px solid rgba(171, 216, 141, 0.4);
  }

  @media only screen and (min-width: 481px) and (max-width: 1920px) {
    width: 40px;
    height: 40px;
    border: 7px solid rgba(171, 216, 141, 0.4);
  }
`;

const ImgStyled = styled.img`
  height: 80px;
  width: 80px;

  @media only screen and (max-width: 480px) {
    width: 40px;
    height: 40px;
  }

  @media only screen and (min-width: 481px) and (max-width: 1920px) {
    width: 60px;
    height: 60px;
  }
`;

export default Square;
