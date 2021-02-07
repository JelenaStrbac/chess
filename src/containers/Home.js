import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "../components/UI/Button";
import Title from "../components/UI/Title";

const Home = () => {
  return (
    <HomeContainer className="Home">
      <Title />
      <div>
        <Link to="/create-game">
          <Button>Create game</Button>
        </Link>
        <Link to="/join-game">
          <Button>Join game</Button>
        </Link>
      </div>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Home;
