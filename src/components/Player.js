import styled from "styled-components";

import BB from "../assets/img/BB.png";
import BK from "../assets/img/BK.png";
import BN from "../assets/img/BN.png";
import BP from "../assets/img/BP.png";
import BQ from "../assets/img/BQ.png";
import BR from "../assets/img/BR.png";
import WB from "../assets/img/WB.png";
import WK from "../assets/img/WK.png";
import WN from "../assets/img/WN.png";
import WP from "../assets/img/WP.png";
import WQ from "../assets/img/WQ.png";
import WR from "../assets/img/WR.png";

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
    <PlayerContainer>
      <Title color={props.color} activePlayer={props.activePlayer}>
        {props.children} player
      </Title>
      <Box>
        <MiniTitle>Moves</MiniTitle>
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
      <Box>
        <MiniTitle>Captured pieces</MiniTitle>
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
      <BoxTimer>10:00</BoxTimer>
    </PlayerContainer>
  );
};

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
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
`;

const MiniTitle = styled.div`
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid #7a7876;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  font-weight: bold;
  background-color: rgba(39, 37, 34, 0.3);
  border: 3px double #7a7876;
  min-height: 200px;
`;

const BoxTimer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  margin-top: 0.5rem;
  font-weight: bold;
  background-color: #272522;
  border: 3px double #7a7876;
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
