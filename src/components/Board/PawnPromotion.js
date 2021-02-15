import styled from "styled-components";
import { useDispatch } from "react-redux";

import { promotePawnTo } from "../../store/slices/board/boardSlice";
import Square from "./Square";

const PawnPromotion = (props) => {
  const dispatch = useDispatch();

  const onClickHandler = (e) => {
    dispatch(promotePawnTo(e.target.name[1]));
  };

  const arrWithFigures =
    props.color === "W" ? ["WB", "WN", "WQ", "WR"] : ["BB", "BN", "BQ", "BR"];

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
