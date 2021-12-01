import React, { Component } from "react";
import "./homeStyles.css";
import { WebcamCapture } from "../Webcam/Webcam";
import axios from "axios";
import moment from "moment";

class Home extends Component {

  state = {
    currentTime: moment().format('HH:mm:ss'),
  }

  onClick = (e) => {
    if (!document.getElementById('screen-image')) {
      document.getElementById('webcam-btn').click()
    }

    setTimeout(() => {
      axios.post("http://localhost:4000/api/clock/" + e, {
        pin: localStorage.getItem("pin"),
        image: document.getElementById('screen-image').src
      }).then(res => {
        console.log(res)
        alert(res.data.message);
      }).catch(err => {
        alert('Error: Something went wrong.')
      })
    }, 1000)
  };

  render() {
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
                <WebcamCapture id="webimage" />
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
                      onClick={() => this.onClick('in')}
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
                      onClick={() => this.onClick('break')}

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
                      onClick={() => this.onClick('out')}
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
