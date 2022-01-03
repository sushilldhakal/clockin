import React, { Component, useEffect } from "react";
import "./homeStyles.css";
import { WebcamCapture } from "../../components/Webcam/Webcam";
import axios from "axios";
import swal from "sweetalert";
import moment from "moment";

import { API_SERVER } from "../../config/constant";

class Home extends Component {
  state = {
    currentTime: moment().format("LT"),
    name: "",
    role: "",
    clockin: "",
    breakin: "",
    breakout: "",
    user: { name: "" },
    timesheets: [],
  };

  onClick = (e) => {
    if (!document.getElementById("screen-image")) {
      document.getElementById("webcam-btn").click();
    }

    setTimeout(() => {
      axios
        .post(API_SERVER + "clock/" + e, {
          pin: localStorage.getItem("pin"),
          image: document.getElementById("screen-image").src,
        })
        .then((res) => {
          localStorage.clear();
          window.location.href = "/pin";
        })
        .catch((err) => {
          swal("Error: Something went wrong.");
        });
    }, 100);
  };

  componentDidMount() {
    axios
      .get(API_SERVER + "get-timesheets/" + localStorage.getItem("pin"))
      .then((res) => {
        this.setState({
          timesheets: res.data.timesheets,
          user: res.data.user,
        });
      });

    // setTimeout(() => {
    //   localStorage.removeItem("pin");
    //   window.location.href = "/";
    // }, 6000);
  }

  render() {
    console.log(this.state.timesheets);
    if (localStorage.getItem("pin") === null) {
      this.props.history.push("/");
    }
    return (
      <div className="home-container">
        <div className="container-fluid">
          <div className="text white-text">
            <h2> {this.state.currentTime} </h2>
            <div className="container">
              <div className="col-sm-4">
                <div className="user-name">
                  <h2 className="white-text">{this.state.user.name}</h2>
                </div>
                {this.state.timesheets.map((timesheet) => {
                  return (
                    <div className="user-home-clocksheet">
                      <span className="clock-time">
                        Clock {timesheet.type} :
                      </span>
                      <span className="clock-break-time">
                        {" "}
                        {timesheet.time}
                      </span>
                    </div>
                  );
                })}
                <div className="video-wrapper">
                  <WebcamCapture id="webimage" />
                  <div className="css-loader">
                    <div className="loader">
                      <span className="left">
                        <span className="load"></span>
                      </span>
                      <span className="right">
                        <span className="load"></span>
                      </span>
                    </div>
                  </div>
                </div>
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
                      onClick={() => this.onClick("in")}
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
                      name="option2"
                      id="option2"
                      autoComplete="off"
                      onChange={(e) => e.target.value}
                      onClick={() => this.onClick("break")}
                    />
                    <input
                      type="radio"
                      className="btn-check"
                      name="option1d"
                      id="option1d"
                      autoComplete="off"
                      onChange={(e) => e.target.value}
                      onClick={() => this.onClick("endBreak")}
                    />
                    <label className="btn btn-secondary" htmlFor="option2">
                      BREAK
                    </label>
                    <label className="btn btn-secondary" htmlFor="option1d">
                      END BREAK
                    </label>
                    <div className="tooltip btn-outline-warning middle">
                      <span>END BREAK</span>
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
                      onClick={() => this.onClick("out")}
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
