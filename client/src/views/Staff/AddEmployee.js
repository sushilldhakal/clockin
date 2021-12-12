import React, { useState } from "react";

import { Form, Col, Card, Button } from "react-bootstrap";

import "./Staff";

export const AddEmployee = (props) => {
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
    getNewEmployee,
  } = props;

  return (
    <React.Fragment>
      <form className="add-employee-form" onSubmit={addNewEmployee}>
        <div className="container">
          <Col sm={12}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Add New Staff</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <div className="form-row">
                    <div className="form-group col">
                      <label className="form-label" for="formGridEmail">
                        Full Name
                      </label>
                      <input
                        placeholder="Enter Full Name"
                        type="name"
                        id="formGridName"
                        className="form-control"
                        value={name}
                        onChange={getNewEmployee}
                      />
                    </div>
                    <div className="form-group col">
                      <label className="form-label" for="formGridPin">
                        Pin
                      </label>
                      <input
                        placeholder="Pin"
                        id="formGridPin"
                        className="form-control"
                        type="number"
                        maxLength="4"
                        name="pin"
                        value={pin}
                        onChange={getNewEmployee}
                      />
                    </div>
                  </div>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridRole">
                      <Form.Label>Job Role</Form.Label>
                      <input
                        id="formGridRole"
                        type="text"
                        name="role"
                        className="form-control"
                        value={role}
                        onChange={getNewEmployee}
                        placeholder="Job Role"
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridHire">
                      <Form.Label>Employer</Form.Label>
                      <input
                        id="formGridHire"
                        type="text"
                        name="hire"
                        className="form-control"
                        value={hire}
                        onChange={getNewEmployee}
                        placeholder="Employer"
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridSite">
                      <Form.Label>Job Location</Form.Label>
                      <input
                        id="formGridSite"
                        type="text"
                        name="site"
                        className="form-control"
                        value={site}
                        onChange={getNewEmployee}
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
                        value={email}
                        className="form-control"
                        onChange={getNewEmployee}
                        placeholder="Email"
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPhone">
                      <Form.Label>Phone Number</Form.Label>
                      <input
                        id="formGridPhone"
                        type="text"
                        name="phone"
                        className="form-control"
                        value={phone}
                        onChange={getNewEmployee}
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
                        value={dob}
                        onChange={getNewEmployee}
                        placeholder="DOB"
                      />
                    </Form.Group>
                  </Form.Row>
                  <Button variant="primary">
                    {!edit ? "Add Employee" : "Edit Employee"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </div>
      </form>
    </React.Fragment>
  );
};
