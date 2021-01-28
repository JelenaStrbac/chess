import { Link } from "react-router-dom";
import Button from "../components/UI/Button";

const Home = () => {
  return (
    <div className="Home">
      <Link to="/create-game">
        <Button>Create game</Button>
      </Link>
      <Link to="/join-game">
        <Button>Join game</Button>
      </Link>
    </div>
  );
};

export default Home;
