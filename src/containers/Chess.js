import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Square from "../components/Square";
import { selectAndMoveFigure } from "../store/slices/board/boardSlice";
import Player from "../components/Player";

const Chess = () => {
  const dispatch = useDispatch();
  const { board } = useSelector((state) => state.game);

  const { activePlayer } = useSelector((state) => state.game);
  const { possibleMoves } = useSelector((state) => state.game);

  const { selectedField } = useSelector((state) => state.game);
  const [row, column] = selectedField?.split("-");

  const { notation } = useSelector((state) => state.game);
  const notationWhite = notation.filter((el, i) => i % 2 === 0);
  const notationBlack = notation.filter((el, i) => i % 2 !== 0);

  const { captured } = useSelector((state) => state.game);

  const onClickHandler = (e) => {
    const currTargetedField = e.target.id;
    const currTargetedFigure = e.target.name;

    dispatch(selectAndMoveFigure(currTargetedField, currTargetedFigure));
  };

  return (
    <Container>
      <Player
        color="white"
        activePlayer={activePlayer}
        capturedFigures={captured?.["W"]}
        notation={notationWhite}
      >
        WHITE
      </Player>

      <ChessBoardContainer>
        {board.map((el, i) =>
          el.map((elem, j) => (
            <Square
              key={`${i}-${j}`}
              field={`${i}-${j}`}
              color={
                Number(row) === i && Number(column) === j
                  ? "selected"
                  : (i + j) % 2
                  ? "white"
                  : "black"
              }
              possibleMove={possibleMoves
                .map((element) => element.split("-"))
                .some((n) => Number(n[0]) === i && Number(n[1]) === j)}
              fig={elem}
              handleClick={onClickHandler}
            ></Square>
          ))
        )}
      </ChessBoardContainer>

      <Player
        color="black"
        activePlayer={activePlayer}
        capturedFigures={captured?.["B"]}
        notation={notationBlack}
      >
        BLACK
      </Player>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const ChessBoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-rows: 1fr;
  justify-content: space-evenly;
  margin: 30px;
`;

export default Chess;
