import { FC } from "react";
import styled from "styled-components";

import BB from "../../assets/img/BB.png";
import BK from "../../assets/img/BK.png";
import BN from "../../assets/img/BN.png";
import BP from "../../assets/img/BP.png";
import BQ from "../../assets/img/BQ.png";
import BR from "../../assets/img/BR.png";
import WB from "../../assets/img/WB.png";
import WK from "../../assets/img/WK.png";
import WN from "../../assets/img/WN.png";
import WP from "../../assets/img/WP.png";
import WQ from "../../assets/img/WQ.png";
import WR from "../../assets/img/WR.png";

const figures = {
  BB: BB,
  BK: BK,
  BN: BN,
  BP: BP,
  BQ: BQ,
  BR: BR,
  WB: WB,
  WK: WK,
  WN: WN,
  WP: WP,
  WQ: WQ,
  WR: WR,
};

type Props = {
  rotate?: string;
  color: null | "W" | "B";
  activePlayer: "W" | "B";
  notation: string[];
  capturedFigures:
    | (
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
      )[]
    | null;
  name: string;
};

const Player: FC<Props> = ({
  rotate,
  color,
  activePlayer,
  notation,
  capturedFigures,
  name,
  children,
}) => {
  return (
    <PlayerContainer rotate={rotate} color={color || undefined}>
      <Box
        rotate={rotate}
        color={color || undefined}
        activePlayer={activePlayer}
      >
        <MiniTitle color={color || undefined}>Moves</MiniTitle>
        <Table>
          <tbody>
            {notation?.map((el, i) => (
              <tr key={i}>
                <TData>{i + 1}.</TData>
                <TData>{el}</TData>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>

      <Box
        rotate={rotate}
        color={color || undefined}
        activePlayer={activePlayer}
      >
        <MiniTitle color={color || undefined}>Captured pieces</MiniTitle>
        <div>
          {capturedFigures?.map((el, i) => (
            <img
              key={i}
              width="20px"
              height="20px"
              src={figures[el]}
              alt={el}
            />
          ))}
        </div>
      </Box>

      <CapturedMobile>
        {capturedFigures?.map((el, i) => (
          <img key={i} width="20px" height="20px" src={figures[el]} alt={el} />
        ))}
      </CapturedMobile>

      <MenuStyled
        rotate={rotate}
        color={color || undefined}
        activePlayer={activePlayer}
      >
        <Title color={color || undefined} activePlayer={activePlayer}>
          {name}
        </Title>
        {children}
      </MenuStyled>
    </PlayerContainer>
  );
};

const PlayerContainer = styled.div<{
  color?: "W" | "B";
  rotate?: string;
}>`
  display: flex;
  flex-direction: ${(props) => (props.rotate ? "column-reverse" : "column")};
  align-items: ${(props) => (props.rotate ? "flex-end" : "flex-start")};
  color: ${(props) => (props.color === "W" ? "white" : "black")};
`;

const MenuStyled = styled.div<{
  color?: "W" | "B";
  rotate?: string;
  activePlayer: "W" | "B";
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin: 0.3rem 0;
  width: 600px;
  border: ${(props) =>
    props.color === "W"
      ? "solid 1px rgba(255, 255, 255, 0.25)"
      : "solid 1px rgba(0, 0, 0, 0.25)"};
  flex-direction: ${(props) => (props.rotate ? "row-reverse" : "row")};
  background-color: ${(props) =>
    props.color === "W"
      ? props.activePlayer === "W"
        ? "rgba(250, 250, 250, 0.3)"
        : "rgba(255, 255, 255, 0.1)"
      : props.activePlayer === "B"
      ? "rgba(0, 0, 0, 0.3)"
      : "rgba(0, 0, 0, 0.1)"};
  box-shadow: ${(props) =>
    props.color === "W"
      ? props.activePlayer === "W"
        ? "0px 0px 20px rgba(250, 250, 250, 0.3)"
        : "none"
      : props.activePlayer === "B"
      ? "0px 15px 20px rgba(0, 0, 0, 0.3)"
      : "none"};

  color: ${(props) =>
    props.color === "W"
      ? props.activePlayer === "W"
        ? "white"
        : "rgba(255, 255, 255, 0.3)"
      : props.activePlayer === "B"
      ? "black"
      : "rgba(0, 0, 0, 0.3)"};

  @media only screen and (max-width: 480px) {
    max-width: 300px;
    padding: 0.5rem;
  }
`;

const Title = styled.div<{ color?: "W" | "B"; activePlayer: "W" | "B" }>`
  color: ${(props) =>
    props.color === "W"
      ? props.activePlayer === "W"
        ? "white"
        : "rgba(255, 255, 255, 0.3)"
      : props.activePlayer === "B"
      ? "black"
      : "rgba(0, 0, 0, 0.3)"};
  font-size: 1.5rem;
  font-weight: bold;

  @media only screen and (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const MiniTitle = styled.div<{ color?: "W" | "B" }>`
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-bottom: ${(props) =>
    props.color === "W"
      ? "solid 1px rgba(255, 255, 255, 0.25)"
      : "solid 1px rgba(0, 0, 0, 0.25)"};

  @media only screen and (max-width: 480px) {
    display: none;
  }
`;

const Box = styled.div<{
  color?: "W" | "B";
  rotate?: string;
  activePlayer: "W" | "B";
}>`
  display: flex;
  flex-direction: column;
  margin: 0.3rem 0;
  font-weight: bold;
  width: 300px;
  min-height: 100px;
  max-height: 200px;
  overflow: scroll;
  color: ${(props) =>
    props.color === "W"
      ? props.activePlayer === "W"
        ? "white"
        : "rgba(255, 255, 255, 0.3)"
      : props.activePlayer === "B"
      ? "black"
      : "rgba(0, 0, 0, 0.3)"};
  border: ${(props) =>
    props.color === "W"
      ? "solid 1px rgba(255, 255, 255, 0.25)"
      : "solid 1px rgba(0, 0, 0, 0.25)"};

  background-color: ${(props) =>
    props.color === "W"
      ? props.activePlayer === "W"
        ? "rgba(250, 250, 250, 0.3)"
        : "rgba(255, 255, 255, 0.1)"
      : props.activePlayer === "B"
      ? "rgba(0, 0, 0, 0.3)"
      : "rgba(0, 0, 0, 0.1)"};

  box-shadow: ${(props) =>
    props.color === "W"
      ? props.activePlayer === "W"
        ? "0px 0px 20px rgba(250, 250, 250, 0.3)"
        : "none"
      : props.activePlayer === "B"
      ? "0px 15px 20px rgba(0, 0, 0, 0.3)"
      : "none"};

  text-align: ${(props) => (props.rotate ? "right" : "left")};

  @media only screen and (max-width: 480px) {
    display: none;
  }

  @media only screen and (min-width: 481px) and (max-width: 1200px) {
    width: 200px;
  }
`;

const CapturedMobile = styled.div`
  display: none;

  @media only screen and (max-width: 480px) {
    display: block;
  }
`;

const Table = styled.table`
  width: max-content;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr;
`;

const TData = styled.td`
  font-weight: normal;
  font-size: 0.8rem;
`;

export default Player;
