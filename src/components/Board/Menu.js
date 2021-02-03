import styled from "styled-components";

import { flag, hands } from "../UI/Icons";

const Menu = (props) => {
  return (
    <Container>
      <Control onClick={props.draw}>
        {hands(props.color === "W" ? "white" : "black")} draw
      </Control>
      <Control onClick={props.resign}>
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
