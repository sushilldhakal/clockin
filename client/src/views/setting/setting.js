import React, { useState, Fragment } from "react";
import axios from "axios";
import { API_SERVER } from "../../config/constant";
import { Link } from "react-router-dom";

const Setting = () => {
  const [contacts, setContacts] = useState([]);

  React.useEffect(() => {
    axios
      .get(API_SERVER + "users", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteUser = (id) => {
    if (!window.confirm("This action is not reversable. Are you sure?")) {
      return;
    }
    axios.delete(API_SERVER + "user/" + id).then((res) => {
      window.location.reload();
    });
  };

  return (
    <div className="setting">
      <div className="dashboard-body">
        <div className="row">
          <div className="app-container card  col-sm-8">
            <div class="card-header">
              <h5 class="card-title">Admin Directory</h5>
              <Link
                to={"/dashboard/setting/add-user"}
                class="btn btn-primary float-right btn-sm"
              >
                Add new
              </Link>
            </div>

            <div className="card-body">
              {contacts.length > 0 && (
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th width="281px">Username</th>
                      <th width="281px">Location</th>
                      <th width="281px">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact.username}>
                        <td>{contact.username}</td>
                        <td>{contact.location}</td>
                        <td>
                          <Link
                            class="btn btn-default btn-sm text-primary"
                            to={"/dashboard/setting/update-user/" + contact._id}
                          >
                            Update
                          </Link>
                          <a
                            class="btn btn-default btn-sm text-danger"
                            href="#"
                            onClick={() => deleteUser(contact._id)}
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className="app-container card push-right col-sm-3">
            <div class="card-header">
              <h5 class="card-title">Bulk SMS</h5>
            </div>

            <div className="card-body">
              <form>
                <div className="fform-group">
                  <label className="form-label">ACCOUNT SID</label>
                  <input
                    placeholder="YOUR_ACCOUNT_SID"
                    className="form-control"
                    type="text"
                  />
                </div>
                <div className="fform-group">
                  <label className="form-label">AUTH TOKEN</label>
                  <input
                    placeholder="YOUR_AUTH_TOKEN"
                    className="form-control"
                    type="text"
                  />
                </div>
                <div className="fform-group">
                  <label className="form-label">PHONE NUMBER</label>
                  <input
                    placeholder="YOUR_PHONE_NUMBER"
                    className="form-control"
                    type="text"
                  />
                </div>
                <div className="fform-group">
                  <label className="form-label">Select Day to send sms</label>
                  <select>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
                  </select>
                  <input
                    id="appt-time"
                    type="time"
                    name="appt-time"
                    value="13:30"
                  ></input>
                </div>
                <button className="btn btn-small btn-primary">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
