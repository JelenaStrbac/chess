import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Square from "../../components/Board/Square";
import { selectAndMoveFigure } from "../../store/slices/board/boardSlice";
import { addUpdatedGame } from "../../store/slices/board/boardSlice";
import Player from "../../components/Board/Player";
import { database } from "../../services/firebase";
import Menu from "../../components/Board/Menu";

const Chess = () => {
  const dispatch = useDispatch();
  const { board } = useSelector((state) => state.game);

  const { activePlayer } = useSelector((state) => state.game);
  const { possibleMoves } = useSelector((state) => state.game);

  const { field } = useSelector((state) => state.game.current);
  const [row, column] = field?.split("-");

  const { notation } = useSelector((state) => state.game);
  const notationWhite = notation?.filter((el, i) => i % 2 === 0);
  const notationBlack = notation?.filter((el, i) => i % 2 !== 0);

  const { captured } = useSelector((state) => state.game);

  const { status } = useSelector((state) => state.room);
  const { roomID } = useSelector((state) => state.room);
  const { game } = useSelector((state) => state);
  const { color } = useSelector((state) => state.room);
  const opositeColor = color === "W" ? "B" : "W";

  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");

  useEffect(() => {
    database
      .ref("rooms/" + roomID + "/playerOne")
      .once("value")
      .then((snapshot) => {
        setPlayerOne(snapshot.val() || "Anonymous");
      });

    database
      .ref("rooms/" + roomID + "/playerTwo")
      .once("value")
      .then((snapshot) => {
        setPlayerTwo(snapshot.val() || "Anonymous");
      });
  }, [roomID]);

  useEffect(() => {
    let gameRef;

    gameRef = database.ref("rooms/" + roomID + "/game");
    gameRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const gameObj = JSON.parse(data);

      dispatch(addUpdatedGame(gameObj));
    });

    return () => gameRef && gameRef.off();
  }, [status, roomID, dispatch]);

  useEffect(() => {
    const gameJSON = JSON.stringify(game);

    if (status === "started") {
      database.ref("rooms/" + roomID + "/game").set(gameJSON);
    }
  }, [game, roomID, status]);

  const onClickHandler = (e) => {
    const currTargetedField = e.target.id;
    const currTargetedFigure = e.target.name;

    if (activePlayer === color) {
      dispatch(selectAndMoveFigure(currTargetedField, currTargetedFigure));
    }
  };

  return (
    <Container>
      <PlayerOne>
        <Player
          color={color}
          activePlayer={activePlayer}
          capturedFigures={captured?.[color]}
          notation={color === "W" ? notationWhite : notationBlack}
          name={playerOne.color === color ? playerOne.name : playerTwo.name}
        >
          <Menu color={color} />
        </Player>
      </PlayerOne>

      <ChessBoardContainer isBlack={color === "B"}>
        {board?.map((el, i) =>
          el.map((elem, j) => (
            <Square
              key={`${i}-${j}`}
              field={`${i}-${j}`}
              isBlack={color === "B"}
              color={
                Number(row) === i && Number(column) === j
                  ? "selected"
                  : (i + j) % 2
                  ? "white"
                  : "black"
              }
              possibleMove={possibleMoves
                ?.map((element) => element.split("-"))
                .some((n) => Number(n[0]) === i && Number(n[1]) === j)}
              capturedFigures={possibleMoves
                ?.map((element) => element.split("-"))
                .some(
                  (n) =>
                    Number(n[0]) === i &&
                    Number(n[1]) === j &&
                    board[i][j] !== null &&
                    board[i][j]?.[0] !== activePlayer
                )}
              fig={elem}
              handleClick={onClickHandler}
            ></Square>
          ))
        )}
      </ChessBoardContainer>

      <PlayerTwo>
        <Player
          rotate="true"
          color={opositeColor}
          activePlayer={activePlayer}
          capturedFigures={captured?.[opositeColor]}
          notation={color !== "W" ? notationWhite : notationBlack}
          name={
            playerOne.color === opositeColor ? playerOne.name : playerTwo.name
          }
        ></Player>
      </PlayerTwo>
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
  transform: ${(props) => (props.isBlack ? "rotate(180deg)" : "")};
`;

const PlayerOne = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
`;

const PlayerTwo = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
`;

export default Chess;
