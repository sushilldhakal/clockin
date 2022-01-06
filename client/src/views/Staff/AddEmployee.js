import axios from "axios";
import React, { useState } from "react";

import { Form, Col, Card, Row } from "react-bootstrap";

import { API_SERVER } from "../../config/constant";

import swal from "sweetalert";

import "./Staff";

const defaultEmployee = {
  name: "",
  pin: "",
  role: "",
  hire: "",
  site: "",
  email: "",
  phone: "",
  dob: "",
  category: [],
};

const val = Math.floor(1000 + Math.random() * 9000);

export const AddEmployee = (props) => {
  function setEmployeeDetails(obj) {
    setEmployee({
      ...employee,
      ...obj,
    });
  }

  const [numeroAleatorio, setNumeroAleatorio] = useState(0);
  const [employee, setEmployee] = useState(defaultEmployee);

  const [pin, setPin] = useState(defaultEmployee);

  const object = props;

  const gerarNumero = () => {
    const newNumber = Math.floor(1000 + Math.random() * 9000);
    setNumeroAleatorio(newNumber);
    setEmployeeDetails({ pin: newNumber });
  };

  const staffRole = object.retrieveRole.map((o) => o.name);
  const staffLocation = object.retrieveLocation.map((o) => o.name);
  const staffEmployer = object.retrieveEmployer.map((o) => o.name);
  const usersRoleCollection = [].concat(...staffRole);
  const usersLocationCollection = [].concat(...staffLocation);
  const usersEmployerCollection = [].concat(...staffEmployer);

  console.log(usersRoleCollection[0]);

  const add = (employee) => {
    axios
      .post(API_SERVER + "add-employee", employee)
      .then((res) => {
        swal(res.data.message);
        setEmployee(defaultEmployee);
        window.location.reload();
      })
      .catch((err) => {
        swal(err.response.data.message);
      });
  };

  console.log(employee);

  return (
    <form className="add-employee-form" onSubmit={() => add(employee)}>
      <div className="container-add-employee">
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add New Staff</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>Full Name</Form.Label>
                  <input
                    id="formGridName"
                    type="text"
                    name="name"
                    className="form-control"
                    value={employee.name}
                    onChange={(e) =>
                      setEmployeeDetails({ name: e.target.value })
                    }
                    placeholder="Full Name"
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="formGridPin"
                  id="custom-pinGroup"
                >
                  <Form.Label>PIN</Form.Label>
                  <a
                    href="#"
                    className="btn btn-default btn-rounded btn-small btn-custom"
                    onClick={gerarNumero}
                  >
                    Generate Pin
                  </a>
                  <input
                    id="formGridPin"
                    type="number"
                    name="pin"
                    className="form-control"
                    value={numeroAleatorio}
                    onChange={(e) =>
                      setEmployeeDetails({ pin: e.target.value })
                    }
                    placeholder="PIN"
                    maxLength="4"
                    minLength="4"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="exampleForm.formGridRole">
                  <Form.Label>Select Role</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) =>
                      setEmployeeDetails({ role: e.target.value })
                    }
                  >
                    <option>Select Role</option>
                    {usersRoleCollection.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="exampleForm.formGridHire">
                  <Form.Label>Select Employer</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) =>
                      setEmployeeDetails({ hire: e.target.value })
                    }
                  >
                    <option>Select Employer</option>
                    {usersEmployerCollection.map((employer) => (
                      <option key={employer} value={employer}>
                        {employer}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="exampleForm.formGridSite">
                  <Form.Label>Select Location</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) =>
                      setEmployeeDetails({ site: e.target.value })
                    }
                  >
                    <option>Select Location</option>
                    {usersLocationCollection.map((location) => (
                      <option key={location} value={location}>
                        {location}
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
                    value={employee.email}
                    className="form-control"
                    onChange={(e) =>
                      setEmployeeDetails({ email: e.target.value })
                    }
                    placeholder="Email"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <input
                    id="formGridPhone"
                    type="number"
                    name="phone"
                    className="form-control"
                    value={employee.phone}
                    onChange={(e) =>
                      setEmployeeDetails({ phone: e.target.value })
                    }
                    placeholder="Phone Number"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridDob">
                  <Form.Label>Date Of Birth</Form.Label>
                  <input
                    id="formGridDob"
                    type="date"
                    name="dob"
                    className="form-control"
                    value={employee.dob}
                    onChange={(e) =>
                      setEmployeeDetails({ dob: e.target.value })
                    }
                    placeholder="DOB"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridDob">
                  <a
                    className="btn btn-success"
                    href="#"
                    onClick={() => add(employee)}
                  >
                    Add Employee
                  </a>
                </Form.Group>
              </Form.Row>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </form>
  );
};
