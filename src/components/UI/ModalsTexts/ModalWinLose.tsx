import { FC } from "react";
import styled from "styled-components";
import { cup, rematch } from "../Icons";

type Props = {
  winner: boolean;
  player: string;
  reason: "" | "checkmate" | "resign";
  handleRematch: () => void;
};

const ModalWinLose: FC<Props> = ({ winner, player, reason, handleRematch }) => {
  const message = winner
    ? `Congratulations, you won ${player}!`
    : `Sorry, ${player}, you lost the game...`;

  const reasonText = winner
    ? reason === "checkmate"
      ? "You checkmated your opponent!"
      : "Your opponent decided to resign the game."
    : reason === "checkmate"
    ? "The opponent checkmated you."
    : "";

  return (
    <Container winner={winner}>
      {winner ? cup : null}
      <Message>{message}</Message>
      <div>{reasonText}</div>
      <Rematch onClick={handleRematch}>
        <div>{rematch}</div>
        <div>Rematch</div>
      </Rematch>
    </Container>
  );
};

const Container = styled.div<{ winner: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: ${(props) =>
    props.winner
      ? `linear-gradient(
    to bottom,
    rgba(66, 126, 96, 0.6),
    rgba(53, 101, 77, 1)
  )`
      : `linear-gradient(
    to bottom,
    rgba(247, 68, 63, 0.6),
    rgba(151, 10, 6, 1)
  )`};
  clip-path: polygon(0 10%, 100% 0%, 100% 90%, 0% 100%);
  padding: 2rem 1rem;
  width: 100%;
  height: 100%;
  color: white;
`;

const Message = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Rematch = styled.div`
  cursor: pointer;
  padding-top: 3rem;
`;

export default ModalWinLose;
