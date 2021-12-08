import React, { Component } from "react";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faTrashAlt, faUser, faLock);

class Login extends Component {
  render() {
    return (
      <div className="login-page">
        <div className="pd-40"></div>
        <div className="container">
          <div className="form-box">
            <div className="header-form">
              <h4 className="text-primary text-center">
                <FontAwesomeIcon name="user" icon={faUser} />
                4th Dimension Transport Login
              </h4>
              <div className="image"></div>
            </div>
            <div className="body-form">
              <form>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon name="user" icon={faUser} />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon name="user" icon={faLock} />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <button type="button" className="btn btn-secondary btn-block">
                  LOGIN
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="pd-40"></div>
      </div>
    );
  }
}
export default Login;
