import { FC } from "react";
import styled from "styled-components";

import { flag } from "../UI/Icons";

type Props = {
  color: null | "B" | "W";
  activePlayer: "B" | "W";
  resign: () => void;
};

const Menu: FC<Props> = ({ color, activePlayer, resign }) => {
  return (
    <Container>
      <Control onClick={resign}>
        {flag(
          color === "W"
            ? activePlayer === "W"
              ? "white"
              : "rgba(255, 255, 255, 0.3)"
            : activePlayer === "B"
            ? "black"
            : "rgba(0, 0, 0, 0.3)"
        )}
        resign
      </Control>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Control = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  cursor: pointer;

  @media only screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export default Menu;
