import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_SERVER } from "../../config/constant";
import { Link } from "react-router-dom";

import "./setting.css";

const Setting = (props) => {
  const [contact, setContact] = useState({ role: "user", location: "" });
  const [submission, setSubmission] = useState(false);
  const [locations, setLocation] = useState([]);

  useEffect(() => {
    axios.get(API_SERVER + "category/location").then((res) => {
      setLocation(res.data);
    });
  }, []);

  const addUser = () => {
    if (contact.username && contact.password) {
      if (contact.role === "user" && !contact.location) {
        alert("Location is required for users with role 'User'");
        return;
      }
      setSubmission(true);
      axios
        .post(API_SERVER + "user", contact)
        .then((res) => {
          window.location.href = "/dashboard/setting";
        })
        .catch((res) => {
          setSubmission(false);
          alert(res.response.data.message);
        });
      return;
    }
    alert("Username and Password are mandatory");
    return;
  };
  return (
    <div className="setting">
      <div className="dashboard-body">
        <div className="app-container card">
          <div class="card-header">
            <h5 class="card-title">Add admin</h5>
            <Link
              to={"/dashboard/setting"}
              class="btn btn-secondary float-right btn-sm"
            >
              Users List
            </Link>
          </div>

          <div className="card-body col-sm-12">
            <div className="row update-form">
              <div className="col-sm-4">
                <label>User Name</label>
                <input
                  name="username"
                  placeholder="Username"
                  required="required"
                  onChange={(event) =>
                    setContact({
                      ...contact,
                      username: event.target.value
                        .toLocaleLowerCase()
                        .split(" ")
                        .join(""),
                    })
                  }
                  value={contact.username}
                />
              </div>
              <div className="col-sm-4">
                <label>Password</label>
                <input
                  name="password"
                  placeholder="Password"
                  required="required"
                  onChange={(event) =>
                    setContact({
                      ...contact,
                      password: event.target.value.split(" ").join(""),
                    })
                  }
                  value={contact.password}
                />
              </div>
              <div className="col-sm-4">
                <label>Role</label>
                <select
                  onChange={(e) =>
                    setContact({ ...contact, role: e.target.value })
                  }
                  value={contact.role || "user"}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User (location-based access)</option>
                </select>
              </div>
              <div className="col-sm-4">
                <label>Location</label>
                <select
                  onChange={(event) =>
                    setContact({ ...contact, location: event.target.value })
                  }
                  value={contact.location || ""}
                >
                  <option value="">Select One</option>
                  {locations.map((location) => (
                    <option value={location.name}>{location.name}</option>
                  ))}
                </select>
                {(contact.role || "user") === "user" && (
                  <small className="text-muted d-block">Required for User role</small>
                )}
              </div>
              <div className="col-sm-12 float-right mt-5">
                <button
                  className="btn btn-small btn-primary"
                  type="submit"
                  disabled={submission}
                  onClick={addUser}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
