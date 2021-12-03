import React, {mapStateToProps} from "react";
import "./App.css";
import Routes from "./Routes";
import { withRouter } from 'react-router-dom';
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Routes />
      <Footer />
    </div>
  );
}

export default withRouter(App);