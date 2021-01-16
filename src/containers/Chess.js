import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Square from "../components/Square";
import { selectAndMoveFigure } from "../store/slices/board/boardSlice";
import Player from "../components/Player";

const Chess = () => {
  const dispatch = useDispatch();
  const { board } = useSelector((state) => state.game);

  const { activePlayer } = useSelector((state) => state.game);

  const { selectedField } = useSelector((state) => state.game);
  const [row, column] = selectedField?.split("-");

  const onClickHandler = (e) => {
    const currTargetedField = e.target.id;
    const currTargetedFigure = e.target.name;

    dispatch(selectAndMoveFigure(currTargetedField, currTargetedFigure));
  };

  return (
    <Container>
      <Player color="white" activePlayer={activePlayer}>
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
              fig={elem}
              handleClick={onClickHandler}
            ></Square>
          ))
        )}
      </ChessBoardContainer>

      <Player color="black" activePlayer={activePlayer}>
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
