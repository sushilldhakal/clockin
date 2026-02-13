import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_SERVER } from "../../config/constant";
import { Link } from "react-router-dom";
import "./setting.css";
const Setting = (props) => {
  const [contact, setContact] = useState({});
  const [submission, setSubmission] = useState(false);
  const [locations, setLocation] = useState([]);
  useEffect(() => {
    axios
      .get(API_SERVER + "users", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        const users = res.data.data || res.data || [];
        const user = Array.isArray(users)
          ? users.find((u) => u._id === props.match.params.user_id)
          : null;
        if (user) setContact(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios.get(API_SERVER + "category/location").then((res) => {
      setLocation(res.data);
    });
  }, []);
  const updateUser = () => {
    if (contact.username) {
      if (contact.role === "user" && !contact.location) {
        alert("Location is required for users with role 'User'");
        return;
      }
      setSubmission(true);
      axios
        .put(API_SERVER + "user/" + props.match.params.user_id, contact)
        .then((res) => {
          window.location.href = "/dashboard/setting";
        })
        .catch((res) => {
          setSubmission(false);
          alert(res.response.data.message);
        });
      return;
    }
    alert("Username and Location is mandatory");
  };
  return (
    <div className="setting">
      <div className="dashboard-body">
        <div className="app-container card">
          <div class="card-header">
            <h5 class="card-title">Update admin</h5>
            <Link
              to={"/dashboard/setting/add-user"}
              class="btn btn-primary float-right btn-sm"
            >
              Add new
            </Link>
          </div>

          <div className="card-body col-sm-12">
            <div className="row update-form">
              {contact.username && (
                <>
                  <div className="col-sm-4">
                    <label>User Name</label>
                    <input
                      name="username"
                      placeholder="Username"
                      required
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
                      <option value="">Select Location</option>
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
                      onClick={updateUser}
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
