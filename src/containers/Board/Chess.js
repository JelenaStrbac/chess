import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Square from "../../components/Board/Square";
import {
  gameEnd,
  rematch,
  selectAndMoveFigure,
} from "../../store/slices/board/boardSlice";
import { addUpdatedGame } from "../../store/slices/board/boardSlice";
import Player from "../../components/Board/Player";
import { database } from "../../services/firebase";
import Menu from "../../components/Board/Menu";
import useModal from "../../hooks/useModal";
import Modal from "../../components/UI/Modal";
import ModalWinLose from "../../components/UI/ModalsTexts/ModalWinLose";

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

  const { end } = useSelector((state) => state.game);
  const { isGameEnded } = end;
  const { isRematch } = end;
  const { isShowing, toggle } = useModal();

  const { status } = useSelector((state) => state.room);
  const { roomID } = useSelector((state) => state.room);
  const { game } = useSelector((state) => state);
  const { color } = useSelector((state) => state.room);
  const opositeColor = color === "W" ? "B" : "W";

  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");

  // read once players names from database
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

  // listen all changes in game obj from firebase and dispatch action to update game obj in redux store
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

  // after all changes from players side on game obj, set it to firebase
  useEffect(() => {
    const gameJSON = JSON.stringify(game);

    if (status === "started") {
      database.ref("rooms/" + roomID + "/game").set(gameJSON);
    }
    console.log(game);
  }, [game, roomID, status]);

  // open modal when isGameEnded is changed
  useEffect(() => {
    if (isGameEnded) {
      toggle();
    }
  }, [isGameEnded, toggle]);

  // close modal when isRematch is changed
  useEffect(() => {
    if (isRematch) {
      toggle();
    }
  }, [isRematch, toggle]);

  // on click dispatch actions in redux store to SELECT and MOVE figure (only allowed for active player)
  const onClickHandler = (e) => {
    const currTargetedField = e.target.id;
    const currTargetedFigure = e.target.name;

    if (activePlayer === color) {
      dispatch(selectAndMoveFigure(currTargetedField, currTargetedFigure));
    }
  };

  // handle draw/resign => dispatch action to update redux store
  const handleDraw = () => {
    if (activePlayer === color) {
      dispatch(gameEnd("draw", "", ""));
    }
  };

  const handleResign = () => {
    if (activePlayer === color) {
      const loser = activePlayer;
      const winner = activePlayer === "W" ? "B" : "W";

      dispatch(gameEnd("resign", winner, loser));
    }
  };

  // handle rematch
  const handleRematch = () => {
    dispatch(rematch());
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
          <Menu color={color} draw={handleDraw} resign={handleResign} />
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

      <Modal isShowing={isShowing} hide={toggle}>
        <h2>Game end</h2>

        <ModalWinLose
          handleRematch={handleRematch}
          reason={end.howIsGameEnded}
          winner={end.winner === color}
          player={playerOne.color === color ? playerOne.name : playerTwo.name}
        />
      </Modal>
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
  z-index: 1000;
  transform: ${(props) => (props.isBlack ? "rotate(180deg)" : "")};
`;

const PlayerOne = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  z-index: 10;
`;

const PlayerTwo = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 10;
`;

export default Chess;
