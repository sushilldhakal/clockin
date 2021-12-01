import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Pin from "./components/Pin/Pin";
import Home from "./components/Home/Home";
import history from "./history";

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Pin} />
          <Route exact path="/home">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}
