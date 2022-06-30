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

function addClass() {
  const firstLi = document.querySelector(
    ".pincode-input-container input:nth-of-type(1)"
  );
  firstLi.setAttribute("id", "input-1");

  const secondLi = document.querySelector(
    ".pincode-input-container input:nth-of-type(2)"
  );
  secondLi.setAttribute("id", "input-2");

  const thirdLi = document.querySelector(
    ".pincode-input-container input:nth-of-type(3)"
  );
  thirdLi.setAttribute("id", "input-3");

  const fourthLi = document.querySelector(
    ".pincode-input-container input:nth-of-type(4)"
  );
  fourthLi.setAttribute("id", "input-4");
}
setTimeout(addClass, 1000);

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
    console.log("Input changed", input);

    const msg = this.state.input;

    console.log("change", this.state.input);

    if (input.length == 1) {
      document.getElementById("input-1").setAttribute("value", msg[0]);
    }
    if (input.length == 2) {
      document.getElementById("input-2").setAttribute("value", msg[1]);
    }
    if (input.length == 3) {
      document.getElementById("input-3").setAttribute("value", msg[2]);
    }
    if (input.length == 4) {
      document.getElementById("input-4").setAttribute("value", msg[3]);
    }

    console.log("input length ", input.length);
    if (input.length == 4) {
      this.onSubmitHandler(input);
    }
  };

  onKeyPress = (button) => {
    console.log("Button pressed", button);

    /**
     * Handle clear
     */
    if (button === "{clear}") this.handleClear();

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
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
    this.pin.values.clear();
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
    //this.pin.clear();
    //this.pin.values.clear();
  };

  onSubmitHandler = (e) => {
    //e.preventDefault();
    this.pin.values = e;
    axios
      .post(process.env.REACT_APP_BASE_URL + "auth/login", {
        pin: this.state.input,
      })
      .then((res) => {
        console.log(this.pin);
        console.log(this.pin.values);
        window.localStorage.setItem("pin", this.pin.values);
        console.log(window.localStorage);
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
    console.log(this.state.currentTime);
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
          //onChange={(e) => this.onChangeInput(e)}
          onComplete={this.onSubmitHandler}
        />

        {/* <div className="lines-input">
          <span className="line-1">&#124;</span>
          <span className="line-2">&#124;</span>
          <span className="line-3">&#124;</span>

          <input
            id="pin-input-area"
            focus
            ref={(p) => (this.pin = p)}
            type="number"
            value={this.state.input}
            maxlength="4"
            onComplete={this.onSubmitHandler}
            onChange={(e) => this.onChangeInput(e)}
          />
        </div> */}
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
