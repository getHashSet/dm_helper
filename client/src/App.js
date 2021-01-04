import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Error from "./pages/Error/Error";
import Dm from "./pages/Dm/Dm";
import Player from "./pages/Player/Player";
import UploadPage from "./pages/UploadPage/UploadPage.jsx";

function App() {
  return (
    <main className="root">
      <Switch>
        <Route exact path="/" render={() => <Home />} />

        <Route exact path="/dm" render={() => <Dm />} />

        <Route exact path="/player" render={() => <Player />} />

        <Route exact path="/pc" render={() => <Player />} />

        <Route exact path="/upload" render={() => <UploadPage />} />

        {/* DO NOT ADD CODE BELOW THIS LINE */}
        <Route render={() => <Error />} />
        
      </Switch>
    </main>
  );
}

export default App;
