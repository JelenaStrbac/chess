import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Square from "../components/Square";

const Chess = (props) => {
  //const dispatch = useDispatch();
  const { board } = useSelector((state) => state.board);

  //console.log(board.flat());

  return (
    <ChessContainer>
      {board.map((el, i) =>
        el.map((elem, j) => (
          <Square
            key={j}
            id={elem}
            color={(i + j) % 2 ? "white" : "black"}
            fig={elem}
          ></Square>
        ))
      )}
    </ChessContainer>
  );
};

const ChessContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-rows: 1fr;
  justify-content: space-evenly;
  margin: 30px;
`;

export default Chess;
