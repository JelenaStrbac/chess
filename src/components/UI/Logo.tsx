import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { chessIcon } from "./Icons";

type Props = {
  handleReset: () => void;
};

const Logo: FC<Props> = ({handleReset}) => {
  return (
    <LinkStyled to="/" onClick={handleReset}>
      <LogoStyled onClick={handleReset}>
        <ChessLogoIcon onClick={handleReset}>
          {chessIcon("white", "25px")}{" "}
        </ChessLogoIcon>
        CHESS
      </LogoStyled>
    </LinkStyled>
  );
};

const LogoStyled = styled.div`
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 480px) {
    background-image: linear-gradient(to right, #7433ff, #7433ff, #ffa3fd);
    width: 100%;
  }
`;

const ChessLogoIcon = styled.div`
  transform: rotate(135deg);
  display: flex;
  align-items: center;
  padding: 0.5rem;
`;

const LinkStyled = styled(Link)`
  position: absolute;
  left: 0;
  top: 0;
  padding: 10px;
  width: "100%";

  @media only screen and (max-width: 480px) {
    width: 100%;
    padding: 0;
  }
`;

export default Logo;
