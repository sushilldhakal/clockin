import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { API_SERVER } from "../../config/constant";
import { Row, Col, Card, Form, Accordion } from "react-bootstrap";

class Flag extends Component {
  state = {
    users: [],
    user: "",
    timesheets: [],
    timeLog: [],
    employer: [],
    categoryEmployer: [],
  };

  componentDidMount() {
    axios.get(API_SERVER + "flag").then((res) => {
      this.setState({
        users: res.data,
      });
      console.log(res.data);
    });
  }
  render() {
    return <div></div>;
  }
}
export default Flag;
