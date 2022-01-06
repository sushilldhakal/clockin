import axios from "axios";
import React, { useState } from "react";
import { Card, Col, Form, Button } from "react-bootstrap";
import { API_SERVER } from "../../config/constant";
import swal from "sweetalert";

export default ({ user, onUpdate }) => {
  console.log(user);

  const [employee, setUser] = useState(user);

  const updateEmployee = () => {
    axios
      .post(API_SERVER + "employee/update/" + employee._id, employee)
      .then((res) => {
        swal("User updated successfully");
        onUpdate();
      });
  };

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

            <Form.Group as={Col} controlId="formGridPin">
              <Form.Label>PIN</Form.Label>
              <input
                id="formGridPin"
                type="number"
                name="pin"
                value={employee.pin}
                disabled
                className="form-control"
                placeholder="Pin"
                maxLength="4"
                minLength="4"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridRole">
              <Form.Label>Job Role</Form.Label>
              <input
                id="formGridRole"
                type="text"
                name="role"
                onChange={(e) => setUser({ ...employee, role: e.target.value })}
                value={employee.role}
                className="form-control"
                placeholder="Job Role"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridHire">
              <Form.Label>Employer</Form.Label>
              <input
                id="formGridHire"
                type="text"
                name="hire"
                onChange={(e) => setUser({ ...employee, hire: e.target.value })}
                value={employee.hire}
                className="form-control"
                placeholder="Employer"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridSite">
              <Form.Label>Job Location</Form.Label>
              <input
                id="formGridSite"
                type="text"
                name="site"
                onChange={(e) => setUser({ ...employee, site: e.target.value })}
                value={employee.site}
                className="form-control"
                placeholder="Job Location"
              />
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
