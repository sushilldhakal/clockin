import React, { useState } from "react";

import { Form } from "react-bootstrap";

const AddEmployee = (props) => {
  const {
    name,
    role,
    hire,
    site,
    email,
    phone,
    pin,
    dob,
    edit,
    addNewEmployee,
    getNewEmployee
  } = props;

  // const [role, setRole] = useState("Sorting");
  // const [hire, setEmployer] = useState("VIK");
  // const [site, setSite] = useState("Port Melbourne");



  return (
    <React.Fragment>
      <form className="add-employee-form" onSubmit={addNewEmployee}>
        <div className="container">

          <div className="col-sm-3">
            <input
              type="text"
              name="name"
              value={name}
              onChange={getNewEmployee}
              placeholder="Name"
            />
          </div>

          <div className="col-sm-3">
            <Form.Select aria-label="Select Employer"
              as="select"
              value={role}
              onChange={e => {
                console.log("e.target.value", e.target.value);
              }}
            >
              <option>Select Role</option>
              <option value="Sorting">Sorting</option>
              <option value="Operation">Operation</option>
              <option value="Customer Care">Customer Care</option>
            </Form.Select>
          </div>

          <div className="col-sm-3">
            <Form.Select aria-label="Select Employer"
              as="select"
              value={hire}
              onChange={e => {
                console.log("e.target.value", e.target.value);
              }}
            >
              <option>Select Employer</option>
              <option value="VIK">VIK</option>
              <option value="NOVA">NOVA</option>
              <option value="DMX">DMX</option>
            </Form.Select>
          </div>

          <div className="col-sm-3">
            <Form.Select aria-label="Select Site"
              as="select"
              value={site}
              onChange={e => {
                console.log("e.target.value", e.target.value);
              }}
            >

              <option>Select Site</option>
              <option value="Port Melbourne">Port Melbourne</option>
              <option value="Dandenong">Dandenong</option>
              <option value="Tulamarine">Tulamarine</option>
            </Form.Select>
          </div>

          <div className="col-sm-3">
            <input
              type="email"
              name="email"
              value={email}
              onChange={getNewEmployee}
              placeholder="email"
            />
          </div>

          <div className="col-sm-3">
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={getNewEmployee}
              placeholder="phone"
            />
          </div>

          <div className="col-sm-3">
            <input
              type="number"
              maxLength="4"
              name="pin"
              value={pin}
              onChange={getNewEmployee}
              placeholder="pin"
            />
          </div>
          <div className="col-sm-3">

            <input
              type="date"
              name="dob"
              value={dob}
              onChange={getNewEmployee}
              placeholder="dob"
            />
          </div>









          <button>{!edit ? "Add Employee" : "Edit Employee"}</button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default AddEmployee;
