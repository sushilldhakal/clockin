import axios from "axios";
import React, { useState } from "react";
import { Card, Col, Form, Button } from "react-bootstrap";
import { API_SERVER } from "../../config/constant";
import swal from "sweetalert";

export default ({ user, role, location, employer, onUpdate }) => {
  const [employee, setUser] = useState(user);

  const updateEmployee = () => {
    if (
      !employee.pin ||
      !employee.email ||
      !employee.name ||
      !employee.role ||
      !employee.hire ||
      !employee.site ||
      !employee.phone ||
      !employee.dob
    ) {
      swal({
        title: "Error",
        text: "Please enter all the fields",
        icon: "error",
        button: "Go Back",
      });
      console.log(employee);
    } else {
      axios
        .post(API_SERVER + "employee/update/" + employee._id, employee)
        .then((res) => {
          swal({
            title: "Staff Detail Updated",
            text: "Staff details has been updated.",
            icon: "success",
            button: "OK",
          });
          onUpdate();
        });
    }
  };

  console.log(employee);

  return (
    <form className="add-employee-form">
      <div className="container-add-employee">
        <Col sm={12}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Full Name</Form.Label>
              <input
                id="formGridName"
                type="text"
                name="name"
                onChange={(e) => setUser({ ...employee, name: e.target.value })}
                value={employee.name}
                className="form-control"
                placeholder="Full Name"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPin" id="custom-pinGroup">
              <Form.Label>PIN</Form.Label>
              <input
                id="formGridPin"
                type="number"
                name="pin"
                onChange={(e) => setUser({ ...employee, pin: e.target.value })}
                value={employee.pin}
                className="form-control"
                placeholder="Pin"
                maxLength="4"
                minLength="4"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridRole">
              <Form.Label>Select Role</Form.Label>
              <Form.Control
                aria-label="Default select example"
                as="select"
                value={employee.role}
                onChange={(e) => setUser({ ...employee, role: e.target.value })}
              >
                <option>Select Role</option>
                {role.map((rolename) => (
                  <option key={rolename._id} value={rolename.name}>
                    {rolename.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridHire">
              <Form.Label>Select Employer</Form.Label>
              <Form.Control
                aria-label="Default select example"
                as="select"
                value={employee.hire}
                onChange={(e) => setUser({ ...employee, hire: e.target.value })}
              >
                <option>Select Employer</option>
                {employer.map((hire) => (
                  <option key={hire._id} value={hire.name}>
                    {hire.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridSite">
              <Form.Label>Select Job Location</Form.Label>
              <Form.Control
                aria-label="Default select example"
                as="select"
                value={employee.site}
                onChange={(e) => setUser({ ...employee, site: e.target.value })}
              >
                <option>Select Location</option>
                {location.map((site) => (
                  <option key={site._id} value={site.name}>
                    {site.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <input
                id="formGridEmail"
                type="email"
                name="email"
                onChange={(e) =>
                  setUser({ ...employee, email: e.target.value })
                }
                value={employee.email}
                className="form-control"
                placeholder="Email"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPhone">
              <Form.Label>Phone Number</Form.Label>
              <input
                id="formGridPhone"
                type="number"
                name="phone"
                onChange={(e) =>
                  setUser({ ...employee, phone: e.target.value })
                }
                value={employee.phone}
                className="form-control"
                placeholder="Phone Number"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridDob">
              <Form.Label>Date Of Birth</Form.Label>
              <input
                id="formGridDob"
                type="date"
                name="dob"
                onChange={(e) => setUser({ ...employee, dob: e.target.value })}
                value={employee.dob}
                className="form-control"
                placeholder="DOB"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridDob">
              <a className="btn btn-primary" href="#" onClick={updateEmployee}>
                Save Employee Details
              </a>
            </Form.Group>
          </Form.Row>
        </Col>
      </div>
    </form>
  );
};
