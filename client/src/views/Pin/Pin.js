import React, { Component } from "react";
import PinInput from "react-pin-input";
import axios from "axios";
import moment from "moment";
import swal from 'sweetalert';

import "./Pin.css";

class Pin extends Component {
  state = {
    value: "",
    currentTime: moment().format("LT")
  };

  onChange = (value) => {
    this.setState({ value });
  };

  onClear = () => {
    this.setState({
      value: ""
    });
    this.pin.clear();
  };

  onSubmitHandler = (e) => {
    //e.preventDefault();
    axios
      .post(process.env.REACT_APP_BASE_URL + "auth/login", {
        pin: this.state.value
      })
      .then((res) => {
        console.log(this.pin);
        window.localStorage.setItem("pin", this.pin.values.join(""));
        this.props.history.push("/home");
      })
      .catch((err) => {
        swal("Invalid PIN!", "Pin you enter didn't match. Try again", "error");
        this.onClear();
      });
  };

  render() {
    return (
      <div className="Pin home-container">
        <div className="text white-text">
          <h2> {this.state.currentTime} </h2>
        </div>
        <PinInput
          length={4}
          focus
          ref={(p) => (this.pin = p)}
          type="numeric"
          onChange={this.onChange}
          onComplete={this.onSubmitHandler}
        />
       
      </div>
    );
  }
}
export default Pin;
