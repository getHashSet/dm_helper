import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Error from "./pages/Error/Error";

function App() {
  return (
    <main className="root">
      <Switch>
        <Route exact path="/" render={() => <Home />} />

        {/* DO NOT ADD CODE BELOW THIS LINE */}
        <Route render={() => <Error />} />
      </Switch>
    </main>
  );
}

export default App;
