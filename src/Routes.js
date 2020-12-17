import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Home from "./core/Home";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;
