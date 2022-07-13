import React, { Component } from "react";
import PinInput from "react-pin-input";
import axios from "axios";
import moment from "moment";
import swal from "sweetalert";

import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./Pin.css";

function doDate() {
  var str = "";
  var now = new Date();

  str = now.toDateString() + " " + now.toLocaleTimeString();

  var pinTime = moment(str).format("hh:mm:ss A");
  document.getElementById("todaysDate").innerHTML = pinTime;
}
setInterval(doDate, 1000);

class Pin extends Component {
  state = {
    input: "",
    currentTime: moment().format("LT"),
    layoutName: "default",
  };

  onChange = (input) => {
    this.setState({
      input: input,
    });
  };

  onKeyPress = (button) => {
    console.log("Button pressed", button);

    if (button === "{clear}") {
      this.handleClear();
      return;
    }

    if (button === "{bksp}") {
      if (this.pin.elements[3].state.value) {
        //this.pin.elements[3].state.value = "";
        return;
      }
      if (this.pin.elements[2].state.value) {
        this.pin.elements[2].state.value = "";
        return;
      }
      if (this.pin.elements[1].state.value) {
        this.pin.elements[1].state.value = "";
        return;
      }
      if (this.pin.elements[0].state.value) {
        this.pin.elements[0].state.value = "";
        return;
      }
    }

    if (this.pin.elements[2].state.value) {
      this.pin.elements[3].state.value = button;
      setTimeout(this.onSubmitHandler, 10);
      return;
    }
    if (this.pin.elements[1].state.value) {
      this.pin.elements[2].state.value = button;
      return;
    }
    if (this.pin.elements[0].state.value) {
      this.pin.elements[1].state.value = button;
      return;
    }
    this.pin.elements[0].state.value = button;
  };

  handleClear = () => {
    this.setState(
      {
        input: "",
      },
      () => {
        this.keyboard.clearInput();
      }
    );

    this.pin.clear();
  };

  handleShift = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default",
    });
  };

  onChangeInput = (event) => {
    let input = event.target.value;
    this.setState(
      {
        input: input,
      },
      () => {
        this.keyboard.setInput(input);
      }
    );
  };

  onClear = () => {
    this.setState({
      input: "",
    });
  };

  onSubmitHandler = (e) => {
    this.pin.values = e;
    axios
      .post(process.env.REACT_APP_BASE_URL + "auth/login", {
        pin: this.state.input,
      })
      .then((res) => {
        window.localStorage.setItem("pin", this.state.input);
        this.props.history.push("/home");
      })
      .catch((err) => {
        swal(
          "Invalid PIN!",
          "Pin you enter didn't match. Try again",
          "error"
        ).then((value) => {
          window.location.reload();
        });
      });
  };

  render() {
    return (
      <div className="Pin home-container">
        <div className="text white-text">
          <h2 id="todaysDate"> </h2>
        </div>
        <PinInput
          length={4}
          focus
          ref={(p) => (this.pin = p)}
          type="numeric"
          inputMode="number"
          pattern="\d*"
          value={this.state.input}
          onChange={this.onChange.bind(this)}
          onComplete={this.onSubmitHandler.bind(this)}
        />
        <Keyboard
          keyboardRef={(r) => (this.keyboard = r)}
          layoutName={this.state.layoutName}
          theme={
            "hg-theme-default hg-theme-numeric hg-layout-numeric numeric-theme"
          }
          layout={{
            default: ["1 2 3", "4 5 6", "7 8 9", "{clear} 0 {bksp}"],
          }}
          mergeDisplay
          display={{
            "{clear}": "Clear",
            "{bksp}": "&#8592",
          }}
          maxLength={4}
          onChange={(input) => this.onChange(input)}
          onKeyPress={(button) => this.onKeyPress(button)}
          onComplete={this.onSubmitHandler}
        />
      </div>
    );
  }
}
export default Pin;
