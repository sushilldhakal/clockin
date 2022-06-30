import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { API_SERVER } from "../../config/constant";
import { Link } from "react-router-dom";

const Setting = (props) => {
  const [contact, setContact] = useState({})
  const [submission, setSubmission] = useState(false)
  const [locations, setLocation] = useState([])

  useEffect(()=>{
    axios.get(API_SERVER+ 'category/location').then(res=>{
      setLocation(res.data)
    })
  }, [])

  const addUser = () => {
    if (contact.username && contact.location && contact.password) {
      setSubmission(true)
      axios
        .post(API_SERVER + "user", contact)
        .then((res) => {
          window.location.href = '/dashboard/setting';
        })
        .catch((res) => {
        setSubmission(false)
          alert(res.response.data.message);
        });
      return
    }
    alert("All fields are mandatory")
    return

  }
  return (
    <div className="setting">
      <div className="dashboard-body">
        <div className="app-container card">
          <div class="card-header">
            <h5 class="card-title">Add admin</h5>
            <Link to={"/dashboard/setting"} class="btn btn-secondary float-right btn-sm">Users</Link>
          </div>

          <div className="card-body col-sm-12">
            <input name="username" placeholder="Username" required="required" onChange={event => setContact({ ...contact, username: event.target.value.toLocaleLowerCase().split(' ').join('') })} value={contact.username} />
            <input name="password" placeholder="Password" required="required" onChange={event => setContact({ ...contact, password: event.target.value.split(' ').join('') })} value={contact.password} />
            <select onChange={event => setContact({ ...contact, location: event.target.value })} value={contact.location}>
              {locations.map(location=><option value={location.name}>
                {location.name}
              </option>)}
            </select>
            <button type="submit" disabled={submission} onClick={addUser}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;