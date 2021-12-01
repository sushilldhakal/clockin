import React, { Component } from "react";
import PinInput from "react-pin-input";
import axios from 'axios';

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
    axios.post("http://localhost:4000/api/auth/login", {
      pin: this.state.value
    }).then(res => {
      console.log(this.pin)
      window.localStorage.setItem("pin", this.pin.values.join(''));
      this.props.history.push("/home");
    }).catch(err => {
      alert('Invalid PIN');
      this.onClear()
    });
  };

  render() {
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
