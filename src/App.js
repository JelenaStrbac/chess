import { GlobalStyle } from "./styles/globalStyle";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Home from "./containers/Home";
import CreateGame from "./containers/CreateAndJoinGame/CreateGame";
import JoinGame from "./containers/CreateAndJoinGame/JoinGame";

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AppContainer>
        <GlobalStyle />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/create-game">
            <CreateGame />
          </Route>
          <Route path="/join-game">
            <JoinGame />
          </Route>
        </Switch>
        <Redirect to="/" />
      </AppContainer>
    </Router>
  );
};

const AppContainer = styled.div`
  background-image: radial-gradient(circle, #427e60, #35654d, #2a513e);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
