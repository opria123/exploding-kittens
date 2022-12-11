import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Game from "./components/Game/Game";
import CreateUser from "./components/CreateUser/CreateUser";
import MainMenu from "./components/MainMenu/MainMenu";
import CreateServer from "./components/CreateServer/CreateServer";
import JoinServer from "./components/JoinServer/JoinServer";
import Lobby from "./components/WaitingLobby/Lobby";
import { Provider } from "react-redux";
import { store } from "./stores/store";
import { useState } from "react";
import StartPage from "./components/StartPage/StartPage";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Loader from "./utils/loader";
import GameAudio from "./utils/audio";
import ErrorBoundary from "./components/Shared/ErrorBoundary/ErrorBoundary";
import AudioControls from "./components/Shared/AudioControls/AudioControls";

const Root = styled.div`
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  background: radial-gradient(#B01E23, #650B0B);
`;

// screen.lockOrientation("landscape");

function App() {

  Loader.load();
  
  Loader.addEventListener("completed", () => {
    GameAudio.playMusic("music");
  });

  const location = useLocation();

  return (
    <Root>
      <AudioControls />
      <Provider store={store}>
        <AnimatePresence exitBeforeEnter>
          <ErrorBoundary>
            <Routes location={location} key={location.key}>
              <Route
                key={"/create-user"}
                path="/create-user"
                element={<CreateUser />}
              />
              <Route
                key={"/main-menu"}
                path="/main-menu"
                element={<MainMenu />}
              />
              <Route
                key={"/create-server"}
                path="/create-server"
                element={<CreateServer />}
              />
              <Route
                key={"/join-server"}
                path="/join-server"
                element={<JoinServer />}
              />
              <Route key={"/game"} path="/game" element={<Game />} />
              <Route
                key={"/waiting-lobby"}
                path="/waiting-lobby"
                element={<Lobby />}
              />
              <Route key={"/"} path="/" element={<StartPage />} />
            </Routes>
          </ErrorBoundary>
        </AnimatePresence>
      </Provider>
    </Root>
  );
}

export default App;
