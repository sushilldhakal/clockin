import React, { Component, useEffect } from "react";
import "./homeStyles.css";
import { WebcamCapture } from "../../components/Webcam/Webcam";
import axios from "axios";
import swal from "sweetalert";
import Tabs from "../../components/Tabs/Tabs";
import moment, { relativeTimeThreshold } from "moment";

import { API_SERVER } from "../../config/constant";

function doDate() {
  var str = "";
  var now = new Date();
  str = now.toDateString() + " " + now.toLocaleTimeString();
  var pinTime = moment(str).format("hh:mm:ss A");
  document.getElementById("todaysDate").innerHTML = pinTime;
}
setInterval(doDate, 1000);

class Home extends Component {
  state = {
    currentTime: moment().format("LT"),
    name: "",
    lat: "",
    lng: "",
    user: { name: "" },
    timesheets: [],
    isActive: false,
  };

  handleToggle = () => {
    //document.getElementById("active").setAttribute("id", "not-active");
    this.setState({ isActive: !this.state.isActive });
  };

  onClick = (e) => {
    document.getElementById("webcam-btn").click();

    console.log(e);

    // setTimeout(() => {
    axios
      .post(API_SERVER + "clock/" + e, {
        lat: this.state.lat.toString(),
        lng: this.state.lng.toString(),
        pin: localStorage.getItem("pin"),
        image: document.getElementById("screen-image").src,
      })
      .then((res) => {
        //console.log(res);
        // swal({
        //   title: "Clock " + e,
        //   text: "Your Clock " + e + " has been recorded",
        //   icon: "success",
        // });
        // setTimeout(() => {
        //   swal.close();
        //   localStorage.clear();
        //   this.props.history.push("/");
        // }, 3000);
      })
      .catch((err) => {
        swal("Error: Something went wrong.");
      });
    // }, 100);
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
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });

    // setTimeout(() => {
    //   localStorage.removeItem("pin");
    //   this.props.history.push("/");
    // }, 8000);
  }

  render() {
    console.log(this.state.timesheets);
    //console.log(this.state.timesheets.length);
    if (localStorage.getItem("pin") === null) {
      this.props.history.push("/");
    }

    const isActive = this.state.isActive;

    return (
      <div className="home-container">
        <div className="container-fluid">
          <div className="text white-text">
            <h2 id="todaysDate"> </h2>
            <div className="big-screen">
              <div className="row">
                <div className="col-lg-5 col-sm-12">
                  <div className="video-wrapper">
                    <div className="user-detail-login">
                      <h4 className="name">{this.state.user.name}</h4>
                      <h4 className="role">{this.state.user.role}</h4>
                    </div>
                    <div className="user-home-clocksheet">
                      {this.state.timesheets.map((timesheet, id) => {
                        return (
                          <>
                            <span key={id} className={timesheet.type}>
                              {moment(timesheet.time).format("LT")}
                            </span>
                            <span
                              className={`timesheet-type clock-${timesheet.type}`}
                            >
                              Clocked {timesheet.type}
                            </span>
                          </>
                        );
                      })}

                      <span
                        className={
                          !this.state.timesheets
                            ? "hide"
                            : "timesheet-type clock-out"
                        }
                      >
                        Not Clocked In
                      </span>
                    </div>
                    <WebcamCapture id="webimage" />
                    {/* <div className="css-loader">
                      <div className="loader">
                        <span className="left">
                          <span className="load"></span>
                        </span>
                        <span className="right">
                          <span className="load"></span>
                        </span>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="col-lg-7 col-sm-12">
                  <div className="record-slider ">
                    <Tabs>
                      <div className="record-slider-block sucess" label="START">
                        <div className="tooltip btn-outline-success left">
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
                          <label htmlFor="option1">Clock In</label>
                        </div>
                      </div>
                      <div label="BREAK">
                        After &apos;while, <em>Crocodile</em>!
                      </div>
                      <div label="FINISH">
                        <div className="tooltip btn-outline-danger right">
                          <label htmlFor="option3">Clock Out</label>
                          <input
                            type="radio"
                            className="btn-check"
                            name="options"
                            id="option3"
                            autoComplete="off"
                            onChange={(e) => e.target.value}
                            onClick={() => this.onClick("out")}
                          />
                        </div>
                      </div>
                    </Tabs>
                    <div
                      id={
                        this.state.timesheets.length == 0 || isActive
                          ? "active"
                          : "not-active"
                      }
                      className="record-slider-block sucess"
                      onClick={this.handleToggle}
                    >
                      <span className="btn btn-secondary">START</span>
                      <div className="tooltip btn-outline-success left">
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
                        <label htmlFor="option1">Clock In</label>
                      </div>
                    </div>

                    <div
                      id={
                        this.state.timesheets.length == 1 ||
                        this.state.timesheets.length == 2 ||
                        isActive
                          ? "active"
                          : "not-active"
                      }
                      onClick={this.handleToggle}
                      className="record-slider-block warning"
                    >
                      <span
                        id={
                          this.state.timesheets.length == 1
                            ? "active"
                            : "not-active-1"
                        }
                        className="btn btn-secondary"
                        htmlFor={
                          this.state.timesheets.length == 2
                            ? "option1d"
                            : "option2"
                        }
                      >
                        {this.state.timesheets.length == 2
                          ? "End Break"
                          : "Break"}
                      </span>
                      <div
                        id={
                          this.state.timesheets.length == 1
                            ? "active"
                            : "not-active-1"
                        }
                        className="tooltip btn-outline-warning middle"
                      >
                        <input
                          type="radio"
                          className="btn-check"
                          name="option2"
                          id="option2"
                          autoComplete="off"
                          onChange={(e) => e.target.value}
                          onClick={() => this.onClick("break")}
                        />
                        <label htmlFor="option2">START BREAK</label>
                      </div>
                      <span
                        id={
                          this.state.timesheets.length == 2
                            ? "active"
                            : "not-active-2"
                        }
                        className="btn btn-secondary"
                      >
                        END BREAK
                      </span>
                      <div
                        id={
                          this.state.timesheets.length == 2
                            ? "active"
                            : "not-active-2"
                        }
                        className="tooltip btn-outline-warning middle"
                      >
                        <label htmlFor="option1d">END BREAK</label>
                        <input
                          type="radio"
                          className="btn-check"
                          name="option1d"
                          id="option1d"
                          autoComplete="off"
                          onChange={(e) => e.target.value}
                          onClick={() => this.onClick("endBreak")}
                        />
                      </div>
                    </div>

                    <div
                      id={
                        this.state.timesheets.length == 3 || isActive
                          ? "active"
                          : "not-active"
                      }
                      onClick={this.handleToggle}
                      className="record-slider-block danger"
                    >
                      <span className="btn btn-secondary">FINISH</span>
                      <div className="tooltip btn-outline-danger right">
                        <label htmlFor="option3">Clock Out</label>
                        <input
                          type="radio"
                          className="btn-check"
                          name="options"
                          id="option3"
                          autoComplete="off"
                          onChange={(e) => e.target.value}
                          onClick={() => this.onClick("out")}
                        />
                      </div>
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
