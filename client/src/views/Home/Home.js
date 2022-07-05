import React, { Component, useEffect } from "react";
import "./homeStyles.css";
import { WebcamCapture } from "../../components/Webcam/Webcam";
import axios from "axios";
import swal from "sweetalert";
import moment from "moment";

import { Tabs, Tab } from "react-bootstrap";

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
    isActive: "",
    tabLength: "",
    birthday: false,
    className: "hide tooltip",
  };

  onClick = (e) => {
    document.getElementById("webcam-btn").click();

    console.log(e);

    setTimeout(() => {
      axios
        .post(API_SERVER + "clock/" + e, {
          lat: this.state.lat.toString(),
          lng: this.state.lng.toString(),
          pin: localStorage.getItem("pin"),
          image: document.getElementById("screen-image").src,
        })
        .then((res) => {
          console.log(res);
          swal({
            title: "Clock " + e,
            text: "Your Clock " + e + " has been recorded",
            icon: "success",
          });
          setTimeout(() => {
            swal.close();
            localStorage.clear();
            this.props.history.push("/");
          }, 3000);
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
        navigator.geolocation.getCurrentPosition((position) => {
          this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            tabLength: res.data.timesheets.length,
          });
        });
      });

    const Month = moment(this.state.user.dob).format("MM");
    const Day = moment(this.state.user.dob).format("DD");
    const todayMonth = moment(new Date()).format("MM");
    const todayDay = moment(new Date()).format("DD");

    setTimeout(() => {
      console.log("birthday", this.state.user.dob);
      if (todayMonth === Month && todayDay === Day) {
        this.setState({ className: "firework" });
      }
    }, 6000);

    // setTimeout(() => {
    //   localStorage.removeItem("pin");
    //   this.props.history.push("/");
    // }, 14000);
  }

  render() {
    if (localStorage.getItem("pin") === null) {
      this.props.history.push("/");
    }

    let isActive = "end";

    if (this.state.tabLength === 0) {
      isActive = "start";
    }

    if ([1, 2].includes(this.state.tabLength)) {
      isActive = "break";
    }

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
                              {timesheet.type == "in" ? "Clocked In" : null}
                              {timesheet.type == "break" ? "On Break" : null}
                              {timesheet.type == "endBreak"
                                ? "Break End"
                                : null}
                              {timesheet.type == "out" ? "Clocked Out" : null}
                            </span>
                          </>
                        );
                      })}
                    </div>
                    <WebcamCapture id="webimage" />
                  </div>
                </div>
                <div className="col-lg-7 col-sm-12">
                  <div className="record-slider ">
                    <Tabs defaultActiveKey={isActive}>
                      <Tab
                        eventKey="start"
                        title="START"
                        disabled={
                          this.state.timesheets.length > 0 ? true : false
                        }
                      >
                        <div className="btn-outline-success left">
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
                      </Tab>
                      <Tab
                        eventKey="break"
                        title={
                          this.state.timesheets.length == 2
                            ? "END BREAK"
                            : "BREAK"
                        }
                        disabled={
                          this.state.timesheets.length > 2 ? true : false
                        }
                      >
                        <div
                          className={`btn-outline-warning middle ${
                            this.state.timesheets.length == 1
                              ? "not-active"
                              : "tooltip"
                          }`}
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

                        <div
                          className={`btn-outline-warning middle ${
                            this.state.timesheets.length == 2
                              ? "not-active"
                              : "tooltip"
                          }`}
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
                      </Tab>
                      <Tab
                        eventKey="end"
                        title="FINISH"
                        disabled={
                          this.state.timesheets.length > 3 ? true : false
                        }
                      >
                        <div className="btn-outline-danger right">
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
                      </Tab>
                    </Tabs>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className={this.state.className}>
                    <div className="wish">
                      Happy BirthDay {this.state.user.name}
                    </div>
                    <div className="pyro">
                      <div className="before"></div>
                      <div className="after"></div>
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
