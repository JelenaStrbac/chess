import { FC } from "react";
import styled, { keyframes } from "styled-components";

import { chessIcon } from "./Icons";

type Props = {
  showModal?: boolean;
  children?: React.ReactNode;
};

const Spinner: FC<Props> = ({ showModal, children }) => {
  let renderInSpinner = (
    <Container className="Loader">
      <Load>{chessIcon()}</Load>
      <div>Waiting other player to join...</div>
    </Container>
  );

  if (showModal) {
    renderInSpinner = <>{children}</>;
  }

  return <>{renderInSpinner}</>;
};

const pulse = keyframes`{
  0%   {transform: rotate(90deg);}
  50%  {transform: rotate(180deg);}
  100% {transform: rotate(360deg);}
}`;

const Load = styled.div`
  padding: 1rem;
  animation-name: ${pulse};
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Spinner;
