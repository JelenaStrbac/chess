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

const Player = (props) => {
  return (
    <PlayerContainer rotate={props.rotate} color={props.color}>
      <Box
        rotate={props.rotate}
        color={props.color}
        activePlayer={props.activePlayer}
      >
        <MiniTitle color={props.color}>Moves</MiniTitle>
        <Table>
          <tbody>
            {props.notation?.map((el, i) => (
              <tr key={i}>
                <TData>{i + 1}.</TData>
                <TData>{el}</TData>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>

      <Box
        rotate={props.rotate}
        color={props.color}
        activePlayer={props.activePlayer}
      >
        <MiniTitle color={props.color}>Captured pieces</MiniTitle>
        <div>
          {props.capturedFigures?.map((el, i) => (
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
      {/* <BoxTimer>10:00</BoxTimer> */}

      <MenuStyled
        rotate={props.rotate}
        color={props.color}
        activePlayer={props.activePlayer}
      >
        <Title color={props.color} activePlayer={props.activePlayer}>
          {props.name}
        </Title>
        {props.children}
      </MenuStyled>
    </PlayerContainer>
  );
};

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.rotate ? "column-reverse" : "column")};
  align-items: ${(props) => (props.rotate ? "flex-end" : "flex-start")};
  color: ${(props) => (props.color === "W" ? "white" : "black")};
`;

const MenuStyled = styled.div`
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
`;

const Title = styled.div`
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
`;

const MiniTitle = styled.div`
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-bottom: ${(props) =>
    props.color === "W"
      ? "solid 1px rgba(255, 255, 255, 0.25)"
      : "solid 1px rgba(0, 0, 0, 0.25)"};
`;

const Box = styled.div`
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
`;

// const BoxTimer = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 0.5rem;
//   margin-top: 0.5rem;
//   font-weight: bold;
//   background-color: #272522;
//   border: 3px double #7a7876;
// `;

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
