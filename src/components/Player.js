import styled from "styled-components";

const Player = (props) => {
  return (
    <PlayerContainer color={props.color} activePlayer={props.activePlayer}>
      {props.children} player
    </PlayerContainer>
  );
};

const PlayerContainer = styled.div`
  color: ${(props) =>
    props.color === "white"
      ? props.activePlayer === "W"
        ? "white"
        : "rgba(255, 255, 255, 0.3)"
      : props.activePlayer === "B"
      ? "black"
      : "rgba(0, 0, 0, 0.3)"};
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Player;
