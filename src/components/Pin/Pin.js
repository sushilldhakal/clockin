import React, { Component } from "react";
import PinInput from "react-pin-input";

import { useHistory } from "react-router-dom";

import Home from "../Home/Home";

class Pin extends Component {
  state = {
    value: ""
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
    e.preventDefault();
    this.props.history.push("/home");
  };

  render() {
    const { value } = this.state;
    return (
      <div className="Pin">
        <PinInput
          length={4}
          focus
          ref={(p) => (this.pin = p)}
          type="numeric"
          onChange={this.onChange}
        />
        <button onClick={this.onClear}>Clear</button>
        <button onClick={this.onSubmitHandler}>Enter</button>
      </div>
    );
  }
}
export default Pin;
