import React, {mapStateToProps} from "react";
import "./App.css";
import Routes from "./Routes";
import { BrowserRouter, Switch, withRouter } from 'react-router-dom';
import Footer from "./components/Footer";


import Pin from "./components/Pin/Pin";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Main/Dashboard";
import Timesheet from "./components/Dashboard/Timesheet/TimesheetList";
import Staff from "./components/Dashboard/Staff/Staff";

import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import history from "./history";

function App() {
  return (
    <div className="App">

<BrowserRouter history={history}>
        <Switch>
          <PublicRoute restricted={false} component={Pin} path="/" exact />
          <PublicRoute restricted={true} component={Home} path="/home" exact />
          <PublicRoute restricted={true} component={Login} path="/login" exact />
          <PublicRoute restricted={true} component={Dashboard} path="/dashboard" exact />
          <PublicRoute restricted={true} component={Timesheet} path="/timesheet" exact />
          <PublicRoute restricted={true} component={Staff} path="/staff" exact />
          {/* <PrivateRoute component={Employee} path="/employee" exact />
          <PrivateRoute component={Category} path="/catageory" exact />
          <PrivateRoute component={EmployeeDetails} path="/employee-details" exact /> */}
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default withRouter(App);