import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Square from "../../components/Board/Square";
import {
  gameEnd,
  rematch,
  resetGame,
  selectAndMoveFigure,
} from "../../store/slices/board/boardSlice";
import { addUpdatedGame } from "../../store/slices/board/boardSlice";
import Player from "../../components/Board/Player";
import { database } from "../../services/firebaseDb";
import Menu from "../../components/Board/Menu";
import useModal from "../../hooks/useModal";
import Modal from "../../components/UI/Modal";
import ModalWinLose from "../../components/UI/ModalsTexts/ModalWinLose";
import PawnPromotion from "../../components/Board/PawnPromotion";
import Logo from "../../components/UI/Logo";
import { resetRoom } from "../../store/slices/rooms/roomsSlice";
import { RootState } from "../../types";
import { useAppDispatch } from "../../store/store";

const Chess = () => {
  const dispatch = useAppDispatch();
  const { board } = useSelector((state: RootState) => state.game);

  const { activePlayer } = useSelector((state: RootState) => state.game);
  const { possibleMoves } = useSelector((state: RootState) => state.game);

  const { field } = useSelector((state: RootState) => state.game.current);
  const [row, column] = field?.split("-");

  const { notation } = useSelector((state: RootState) => state.game);
  const notationWhite = notation?.filter((el, i) => i % 2 === 0);
  const notationBlack = notation?.filter((el, i) => i % 2 !== 0);

  const { captured } = useSelector((state: RootState) => state.game);
  const { shouldPawnPromote } = useSelector((state: RootState) => state.game);

  const { end } = useSelector((state: RootState) => state.game);
  const { isGameEnded } = end;
  const { isRematch } = end;
  const { isShowing, toggle } = useModal();

  const { status } = useSelector((state: RootState) => state.room);
  const { roomID } = useSelector((state: RootState) => state.room);
  const { game } = useSelector((state: RootState) => state);
  const { color } = useSelector((state: RootState) => state.room);
  const oppositeColor = color === "W" ? "B" : "W";

  const [playerOne, setPlayerOne] = useState({ color: "", name: "" });
  const [playerTwo, setPlayerTwo] = useState({ color: "", name: "" });

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
    let gameRef = database.ref("rooms/" + roomID + "/game");
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
  const onClickHandler = (
    fig:
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
      | null,
    field: string
  ) => {
    const currFigure = fig;
    const currField = field;

    if (activePlayer === color) {
      dispatch(selectAndMoveFigure({ currFigure, currField }));
    }
  };

  // handle resign => dispatch action to update redux store
  const handleResign = () => {
    if (activePlayer === color) {
      const loser = activePlayer;
      const winner = activePlayer === "W" ? "B" : "W";
      dispatch(gameEnd({ howIsGameEnded: "resign", winner, loser }));
    }
  };

  // handle rematch
  const handleRematch = () => {
    dispatch(rematch());
  };

  // handle reset
  const handleReset = () => {
    dispatch(resetRoom());
    dispatch(resetGame());
  };

  return (
    <Container>
      <PlayerOne>
        <Player
          color={color}
          activePlayer={activePlayer}
          capturedFigures={color && captured?.[color]}
          notation={color === "W" ? notationWhite : notationBlack}
          name={playerOne.color === color ? playerOne.name : playerTwo.name}
        >
          <Menu
            color={color}
            activePlayer={activePlayer}
            resign={handleResign}
          />
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
          color={oppositeColor}
          activePlayer={activePlayer}
          capturedFigures={captured?.[oppositeColor]}
          notation={color !== "W" ? notationWhite : notationBlack}
          name={
            playerOne.color === oppositeColor ? playerOne.name : playerTwo.name
          }
        ></Player>
      </PlayerTwo>

      <Logo handleReset={handleReset} />

      {activePlayer === color &&
      shouldPawnPromote &&
      possibleMoves.length !== 0 ? (
        <PawnPromotion color={color} />
      ) : null}

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
  position: relative;

  @media only screen and (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

const ChessBoardContainer = styled.div<{ isBlack: boolean }>`
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

  @media only screen and (max-width: 480px) {
    position: static;
  }
`;

const PlayerTwo = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 10;

  @media only screen and (max-width: 480px) {
    position: static;
    margin-top: 2.5rem;
  }
`;

export default Chess;
