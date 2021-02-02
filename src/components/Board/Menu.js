import styled from "styled-components";

import { flag, hands } from "../UI/Icons";

const Menu = (props) => {
  const handleDraw = (e) => {};

  const handleResign = (e) => {};

  return (
    <Container>
      <Control onClick={handleDraw}>
        {hands(props.color === "W" ? "white" : "black")} draw
      </Control>
      <Control onClick={handleResign}>
        {flag(props.color === "W" ? "white" : "black")}resign
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
`;

export default Menu;
