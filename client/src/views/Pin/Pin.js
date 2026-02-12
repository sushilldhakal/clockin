import React, { Component } from "react";
import PinInput from "react-pin-input";
import axios from "axios";
import moment from "moment";
import swal from "sweetalert";
import { API_SERVER } from "../../config/constant";

import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./Pin.css";

function doDate() {
  const el = document.getElementById("todaysDate");
  if (el) el.innerHTML = moment().format("hh:mm:ss A");
}
setInterval(doDate, 1000);

class Pin extends Component {
  state = {
    input: "",
    layoutName: "default",
    logging: false,
    date: new Date(),
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  onChange = (input) => {
    this.setState({
      input: input,
    });
  };

  onKeyPress = (button) => {
    if (this.state.logging) {
      return;
    }
    if (button === "{clear}") {
      this.handleClear();
      return;
    }

    if (button === "{bksp}") {
      if (this.pin.elements[3].state.value) {
        this.pin.elements[3].state.value = "";
        this.syncPinState();
        return;
      }
      if (this.pin.elements[2].state.value) {
        this.pin.elements[2].state.value = "";
        this.syncPinState();
        return;
      }
      if (this.pin.elements[1].state.value) {
        this.pin.elements[1].state.value = "";
        this.syncPinState();
        return;
      }
      if (this.pin.elements[0].state.value) {
        this.pin.elements[0].state.value = "";
        this.syncPinState();
        return;
      }
      return;
    }

    if (this.pin.elements[2].state.value) {
      this.pin.elements[3].state.value = button;
      this.syncPinState();
      setTimeout(this.onSubmitHandler, 10);
      return;
    }
    if (this.pin.elements[1].state.value) {
      this.pin.elements[2].state.value = button;
      this.syncPinState();
      return;
    }
    if (this.pin.elements[0].state.value) {
      this.pin.elements[1].state.value = button;
      this.syncPinState();
      return;
    }
    this.pin.elements[0].state.value = button;
    this.syncPinState();
  };

  syncPinState = () => {
    if (!this.pin || !this.pin.elements) return;
    const value = Array.from(this.pin.elements)
      .map((el) => (el.state && el.state.value) || "")
      .join("");
    this.setState({ input: value });
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

  getCurrentPin = () => {
    if (!this.pin || !this.pin.elements || this.pin.elements.length !== 4) {
      return this.state.input;
    }
    const fromInputs = Array.from(this.pin.elements)
      .map((el) => (el.state && el.state.value) || "")
      .join("");
    return fromInputs.length === 4 ? fromInputs : this.state.input;
  };

  onSubmitHandler = (e) => {
    if (this.pin) this.pin.values = e;
    const pinToSend = this.getCurrentPin();
    axios
      .post(API_SERVER + "auth/login", {
        pin: pinToSend,
      })
      .then((res) => {
        if (res.data.token) {
          window.localStorage.setItem("token", res.data.token);
        }
        window.localStorage.setItem("pin", pinToSend);
        this.props.history.push("/home");
      })
      .catch((err) => {
        const msg =
          err.response?.status === 429
            ? err.response?.data?.message || "Too many attempts. Try again later."
            : "Pin you enter didn't match. Try again";
        swal("Invalid PIN!", msg, "error").then((value) => {
          window.location.reload();
        });
      });
  };

  tick = () => {
    this.setState({
      date: new Date(),
    });
  };

  render() {
    return (
      <div className="Pin home-container">
        <div className="text white-text">
          <h2 id="todaysDate">{moment(this.state.date).format("hh:mm A")}</h2>
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
          onChange={this.onChange.bind(this)}
          onKeyPress={this.onKeyPress.bind(this)}
          onComplete={this.onSubmitHandler.bind(this)}
        />
      </div>
    );
  }
}
export default Pin;
