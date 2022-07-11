import React, { Component } from "react";
import "./homeStyles.css";
import { WebcamCapture } from "../../components/Webcam/Webcam";
import axios from "axios";
import swal from "sweetalert";
import moment from "moment";

import ReactiveButton from "reactive-button";

import { Tabs, Tab } from "react-bootstrap";

import { API_SERVER } from "../../config/constant";

function doDate() {
  var str = "";
  var now = new Date();
  str = now.toDateString() + " " + now.toLocaleTimeString();
  var pinTime = moment(str).format("hh:mm:ss A");
  if (document.getElementById("todaysDate"))
    document.getElementById("todaysDate").innerHTML = pinTime;
}

setInterval(doDate, 1000);

let timeKeeper;

class Home extends Component {
  state = {
    currentTime: moment().format("LT"),
    name: "",
    lat: "",
    lng: "",
    user: { name: "" },
    timesheets: [],
    timesheetLoaded: false,
    isActive: "",
    birthday: false,
    className: "hide tooltip",
    class: "",
    value: "idle",
  };

  onClick = (e) => {
    document.getElementById("webcam-btn").click();

    this.setState({
      value: "loading",
    });

    setTimeout(() => {
      axios
        .post(API_SERVER + "clock/" + e, {
          lat: this.state.lat.toString(),
          lng: this.state.lng.toString(),
          pin: localStorage.getItem("pin"),
          image: document.getElementById("screen-image").src,
        })
        .then((res) => {
          this.setState({
            value: "success",
          });
          setTimeout(() => {
            localStorage.clear();
            this.props.history.push("/");
            timeKeeper && clearTimeout(timeKeeper);
          }, 1000);
        })
        .catch((err) => {
          swal("Error: Something went wrong.");
          this.setState({
            value: "error",
          });
        });
    }, 100);
  };

  componentDidMount() {
    axios
      .get(API_SERVER + "get-timesheets/" + localStorage.getItem("pin"))
      .then((res) => {
        this.setState({
          timesheetLoaded: true,
          timesheets: res.data.timesheets,
          user: res.data.user,
          birthday:
            moment(res.data.user.dob).format("MM-DD") ===
            moment(new Date()).format("MM-DD"),
        });
        navigator.geolocation.getCurrentPosition((position) => {
          this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      });

    timeKeeper = setTimeout(() => {
      localStorage.removeItem("pin");
      this.props.history.push("/");
    }, 14000);
  }

  render() {
    if (localStorage.getItem("pin") === null) {
      this.props.history.push("/");
    }

    let isActive = "";

    if (this.state.timesheets.length === 0) {
      isActive = "start";
    } else if ([1, 2].includes(this.state.timesheets.length)) {
      isActive = "break";
    } else if (this.state.timesheets.length === 3) {
      isActive = "end";
    }
    console.log(this.state.timesheets.length, isActive);
    console.log(this.state.timesheets);
    return (
      <div className="home-container">
        <div className="container-fluid">
          <div className="text white-text">
            <h2 id="todaysDate"> </h2>
            <div className="big-screen">
              <div className="row">
                <div className="col-lg-6 col-sm-12">
                  <div className="video-wrapper">
                    <div className="user-detail-login">
                      <h4 className="name">{this.state.user.name}</h4>
                      <h4 className="role">{this.state.user.role}</h4>
                    </div>

                    <div className="user-home-clocksheet">
                      {this.state.timesheets.map((timesheet, id) => {
                        return (
                          <div key={id}>
                            <span
                              key={id}
                              className={`timesheet-type-time ${timesheet.type}`}
                            >
                              {moment(timesheet.time).format("LT")}
                            </span>
                            <span
                              className={`timesheet-type clock-${timesheet.type}`}
                            >
                              {timesheet.type === "in" ? "Clocked In" : null}
                              {timesheet.type === "break" ? "On Break" : null}
                              {timesheet.type === "endBreak"
                                ? "Break End"
                                : null}
                              {timesheet.type === "out" ? "Clocked Out" : null}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <WebcamCapture id="webimage" />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12">
                  <div className="record-slider ">
                    {this.state.timesheetLoaded && (
                      <Tabs
                        defaultActiveKey={
                          this.state.timesheetLoaded ? isActive : undefined
                        }
                      >
                        <Tab
                          eventKey="start"
                          title="START"
                          disabled={
                            !this.state.timesheetLoaded ||
                            this.state.timesheets.length > 0
                              ? true
                              : false
                          }
                          tabClassName="animated fadeIn"
                        >
                          <div className="tooltip-btn btn-outline-success left">
                            {/* <input
                              type="radio"
                              className="btn-check"
                              name="options"
                              id="option1"
                              autoComplete="off"
                              checked
                              onChange={(e) => e.target.value}
                              onClick={() => this.onClick("in")}
                            /> */}
                            <ReactiveButton
                              buttonState={this.state.value}
                              onClick={() => this.onClick("in")}
                              idleText={"CLOCK IN"}
                              rounded={true}
                              size={"large"}
                              block={true}
                              height="60px"
                              style={{
                                backgroundColor: "#1a8754",
                              }}
                            />
                            {/* <label htmlFor="option1">Clock In</label> */}
                          </div>
                        </Tab>
                        <Tab
                          eventKey="break"
                          title={
                            this.state.timesheets.length === 2
                              ? "END BREAK"
                              : "BREAK"
                          }
                          tabClassName="animated fadeIn"
                          disabled={
                            !this.state.timesheetLoaded ||
                            this.state.timesheets.length > 2
                              ? true
                              : false
                          }
                        >
                          <div
                            className={`tooltip-btn btn-outline-warning middle ${
                              this.state.timesheets.length === 1 ||
                              this.state.timesheets.length === 0
                                ? "not-active"
                                : "tooltip"
                            }`}
                          >
                            {/* <input
                              type="radio"
                              className="btn-check"
                              name="option2"
                              id="option2"
                              autoComplete="off"
                              onChange={(e) => e.target.value}
                              onClick={() => this.onClick("break")}
                            /> */}
                            <ReactiveButton
                              buttonState={this.state.value}
                              onClick={() => this.onClick("break")}
                              idleText={"START BREAK"}
                              rounded={true}
                              size={"large"}
                              block={true}
                              height="60px"
                              style={{
                                backgroundColor: "#ff9503",
                              }}
                            />
                            {/* <label htmlFor="option2">START BREAK</label> */}
                          </div>

                          <div
                            className={`tooltip-btn btn-outline-warning middle ${
                              this.state.timesheets.length === 2
                                ? "not-active"
                                : "tooltip"
                            }`}
                          >
                            {/* <label htmlFor="option1d">END BREAK</label> */}
                            {/* <input
                              type="radio"
                              className="btn-check"
                              name="option1d"
                              id="option1d"
                              autoComplete="off"
                              onChange={(e) => e.target.value}
                              onClick={() => this.onClick("endBreak")}
                            /> */}
                            <ReactiveButton
                              buttonState={this.state.value}
                              onClick={() => this.onClick("endBreak")}
                              idleText={"END BREAK"}
                              rounded={true}
                              size={"large"}
                              block={true}
                              height="60px"
                              style={{
                                backgroundColor: "#ff9503",
                              }}
                            />
                          </div>
                        </Tab>
                        <Tab
                          eventKey="end"
                          title="FINISH"
                          disabled={
                            !this.state.timesheetLoaded ||
                            this.state.timesheets.length > 3
                              ? true
                              : false
                          }
                          tabClassName="animated fadeIn"
                        >
                          <div
                            className={
                              `awesome-btn tooltip-btn btn-outline-danger right ` +
                              this.state.class
                            }
                          >
                            {/* <label htmlFor="option3">Clock Out</label> */}
                            {/* <input
                              type="radio"
                              className="btn-check"
                              name="options"
                              id="option3"
                              autoComplete="off"
                              onChange={(e) => e.target.value}
                              onClick={() => this.onClick("out")}
                            /> */}
                            <ReactiveButton
                              buttonState={this.state.value}
                              onClick={() => this.onClick("out")}
                              idleText={"CLOCK OUT"}
                              rounded={true}
                              size={"large"}
                              block={true}
                              height="60px"
                              style={{
                                backgroundColor: "#eb5c59",
                              }}
                            />
                          </div>
                        </Tab>
                      </Tabs>
                    )}
                  </div>
                </div>

                {this.state.birthday && (
                  <div className="col-sm-12">
                    <div className="annimation-rib">
                      <div className="annimation-rib-piece"></div>
                      <div className="annimation-rib-piece"></div>
                      <div className="annimation-rib-piece"></div>
                      <div className="annimation-rib-piece"></div>
                      <div className="annimation-rib-piece"></div>
                      <div className="annimation-rib-piece"></div>
                      <div className="annimation-rib-piece"></div>
                      <div className="annimation-rib-piece"></div>
                      <div className="annimation-rib-piece"></div>
                      <div className="annimation-rib-piece"></div>
                      <div className="annimation-rib-piece"></div>
                      <div className="annimation-rib-piece"></div>
                      <div className="annimation-rib-piece"></div>
                    </div>
                    <div className="fireworks">
                      <div className="wish">
                        <center>
                          <h2>
                            Hope all your birthday wishes come true. Happy
                            Birthday {this.state.user.name}
                          </h2>
                        </center>
                      </div>
                      <div className="pyro">
                        <div className="before"></div>
                        <div className="after"></div>
                        <div className="before1"></div>
                        <div className="after1"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
