import { GlobalStyle } from "./styles/globalStyle";
import styled from "styled-components";

import Chess from "./containers/Chess";

const App = () => {
  return (
    <AppContainer className="App">
      <GlobalStyle />
      <Chess />
    </AppContainer>
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
