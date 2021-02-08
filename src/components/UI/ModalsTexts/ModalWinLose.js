import styled from "styled-components";
import { cup, rematch } from "../Icons";

const ModalWinLose = (props) => {
  const message = props.winner
    ? `Congratulations, you won ${props.player}!`
    : `Sorry, ${props.player}, you lost the game...`;

  const reason = props.winner
    ? props.reason === "checkmate"
      ? "You checkmated your opponent!"
      : "Your opponent decided to resign the game."
    : props.reason === "checkmate"
    ? "The opponent checkmated you."
    : "";

  return (
    <Container winner={props.winner}>
      {props.winner ? cup : null}
      <Message>{message}</Message>
      <div>{reason}</div>
      <Rematch onClick={props.handleRematch}>
        <div>{rematch}</div>
        <div>Rematch</div>
      </Rematch>
    </Container>
  );
};

const Container = styled.div`
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
