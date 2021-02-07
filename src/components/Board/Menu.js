import styled from "styled-components";

import { flag } from "../UI/Icons";

const Menu = (props) => {
  return (
    <Container>
      <Control onClick={props.resign}>
        {flag(
          props.color === "W"
            ? props.activePlayer === "W"
              ? "white"
              : "rgba(255, 255, 255, 0.3)"
            : props.activePlayer === "B"
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
