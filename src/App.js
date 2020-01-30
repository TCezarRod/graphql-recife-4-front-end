import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PlacesPage from "./PlacesPage";
import NeighboursPage from "./NeighboursPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <PlacesPage />} />
        <Route exact path="/neighbours" render={() => <NeighboursPage />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
