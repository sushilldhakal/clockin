import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Pin from "./components/Pin/Pin";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Timesheet from "./components/Dashboard/Timesheet";
import Staff from "./components/Dashboard/Staff";
//import listEmployee from "./components/Dashboard/listEmployee";
import history from "./history";

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Pin} />
          <Route exact path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/staff" component={Staff} />
          <Route path="/timesheet" component={Timesheet} />
        </Switch>
      </Router>
    );
  }
}
