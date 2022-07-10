import React from "react";
import { Card } from "react-bootstrap";

import { API_SERVER } from "../../config/constant";
import Breadcrumb from "../../layouts/AdminLayout/Breadcrumb";

import swal from "sweetalert";
import ReactiveButton from "reactive-button";

import { Button, TextField, Link } from "@material-ui/core";
const axios = require("axios");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      submit: null,
      value: "idle",
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  login = (e) => {
    //e.preventDefault();
    const pwd = bcrypt.hashSync(this.state.password, salt);

    this.setState({
      value: "loading",
    });

    axios
      .post(API_SERVER + "auth/admin/login", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        this.setState({
          value: "success",
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", this.state.username);
        if (Boolean(res.data.location))
          localStorage.setItem("location", res.data.location);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          this.setState({
            value: "error",
          });
          swal({
            text: err.response.data.message,
            icon: "error",
            type: "error",
          });
        }
      });
  };

  render() {
    return (
      <div>
        <Breadcrumb />
        <div className="auth-wrapper">
          <div className="auth-content">
            <div className="auth-bg">
              <span className="r" />
              <span className="r s" />
              <span className="r s" />
              <span className="r" />
            </div>

            <form onSubmit={this.login.bind(this)}>
              <Card className="borderless text-center">
                <Card.Body>
                  <div className="mb-4">
                    <i className="feather icon-unlock auth-icon"></i>
                  </div>
                  <h3 className="mb-4">Login</h3>

                  <TextField
                    id="standard-basic"
                    type="text"
                    autoComplete="off"
                    name="username"
                    value={this.state.username}
                    onChange={(e) =>
                      this.setState({ username: e.target.value })
                    }
                    placeholder="User Name"
                    required
                  />
                  <br />
                  <br />
                  <TextField
                    id="standard-basic1"
                    type="password"
                    autoComplete="off"
                    name="password"
                    value={this.state.password}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                    placeholder="Password"
                    required
                  />
                  <br />
                  <br />
                  {/* <Button
                    className="button_style"
                    variant="contained"
                    color="primary"
                    size="small"
                    type="submit"
                    disabled={
                      this.state.username == "" && this.state.password == ""
                    }
                    onClick={this.login.bind(this)}
                  >
                    Login
                  </Button> */}
                  <ReactiveButton
                    buttonState={this.state.value}
                    onClick={this.login.bind(this)}
                    idleText={"Login"}
                  />
                </Card.Body>
              </Card>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
