import React, { useState, Component } from "react";

import { render } from "react-dom";
import Webcam from "react-webcam";
import "./homeStyles.css";
import { WebcamCapture } from "../Webcam/Webcam";

class Home extends Component {
  constructor() {
    var today = new Date(),
      time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    super();
    this.state = {
      name: "",
      email: "",
      time: "",
      image: "",
      pin: "",
      currentTime: time
    };
  }

  onClick = (e) => {
    console.log("data on submit");
    e.preventDefault();
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="home-container">
        <div className="container-fluid">
          <div className="text white-text">
            <h2> {this.state.currentTime} </h2>

            <div className="container">
              <div className="col-sm-4">
                <WebcamCapture />
              </div>
              <div className="col-sm-8">
                <div className="record-slider ">
                  <div className="record-slider-block sucess">
                    <input
                      type="radio"
                      className="btn-check"
                      name="options"
                      id="option1"
                      autoComplete="off"
                      checked
                      onChange={(e) => e.target.value}
                      onClick={this.onClick}
                    />
                    <label className="btn btn-secondary" htmlFor="option1">
                      START
                    </label>
                    <div className="tooltip btn-outline-success left">
                      <span>CLOCK IN</span>
                    </div>
                  </div>
                  <div className="record-slider-block warning">
                    <input
                      type="radio"
                      className="btn-check"
                      name="options"
                      id="option2"
                      autoComplete="off"
                      onChange={(e) => e.target.value}
                      onClick={this.onClick}
                    />
                    <label className="btn btn-secondary" htmlFor="option2">
                      BREAK
                    </label>
                    <div className="tooltip btn-outline-warning middle">
                      <span>BREAK</span>
                    </div>
                  </div>
                  <div className="record-slider-block danger">
                    <input
                      type="radio"
                      className="btn-check"
                      name="options"
                      id="option3"
                      autoComplete="off"
                      onChange={(e) => e.target.value}
                      onClick={this.onClick}
                    />
                    <label className="btn btn-secondary" htmlFor="option3">
                      FINISH
                    </label>
                    <div className="tooltip btn-outline-danger right">
                      <span>CLOCK OUT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
