import React, { Component } from "react";
import { WebcamCapture } from "../../components/Webcam/Webcam";
import axios from "axios";
import swal from "sweetalert";
import moment from "moment";

import ReactiveButton from "reactive-button";

import { Tabs, Tab } from "react-bootstrap";

import { API_SERVER } from "../../config/constant";
import "./homeStyles.css";
import "./bootstrap.css";

let timeKeeper;

class Home extends Component {
  state = {
    lat: "",
    lng: "",
    user: { name: "" },
    timesheets: [],
    timesheetLoaded: false,
    birthday: false,
    value: "idle",
    date: new Date(),
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
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
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

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

  tick = () => {
    this.setState({
      date: new Date(),
    });
  };

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
    } else {
      isActive = "";
    }

    let start = false,
      breakStart = false,
      endBreak = false,
      out = false;
    this.state.timesheets.map((timesheet) => {
      if (timesheet.type === "in") {
        start = true;
      }
      if (timesheet.type === "break") {
        breakStart = true;
      }
      if (timesheet.type === "endBreak") {
        endBreak = true;
      }
      if (timesheet.type === "out") {
        out = true;
      }
    });

    return (
      <div className="home-container">
        <div className="container-fluid">
          <div className="text white-text">
            <h2 id="todaysDate">
              {" "}
              {moment(this.state.date).format("hh:mm:ss A")}
            </h2>
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
                          disabled={!start ? false : true}
                          tabClassName="animated fadeIn"
                        >
                          <div className="tooltip-btn btn-outline-success left">
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
                          </div>
                        </Tab>
                        <Tab
                          eventKey="break"
                          title={!breakStart ? "BREAK" : "END BREAK"}
                          tabClassName="animated fadeIn"
                          disabled={endBreak && breakStart ? true : false}
                        >
                          <div
                            className={`tooltip-btn btn-outline-warning middle ${
                              !breakStart ? "not-active" : "tooltip"
                            }`}
                          >
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
                          </div>
                          <div
                            className={`tooltip-btn btn-outline-warning middle ${
                              !endBreak && breakStart ? "not-active" : "tooltip"
                            }`}
                          >
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
                          disabled={!out ? false : true}
                          tabClassName="animated fadeIn"
                        >
                          <div
                            className={
                              `awesome-btn tooltip-btn btn-outline-danger right ` +
                              this.state.class
                            }
                          >
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
                            {this.state.user.name}{" "}
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
