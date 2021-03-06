import React, { useState, useEffect } from "react";
import { Card, Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_SERVER } from "../../config/constant";

export default ({ type }) => {
  let [value, setValue] = useState("");
  let [values, setValues] = useState([]);
  let [edit, setEdit] = useState("");

  const reload = () => {
    setValue("");
    axios
      .get(API_SERVER + "category/" + type.toLocaleLowerCase())
      .then((res) => {
        setValues(res.data);
      })
      .catch((res) => {
        alert(res.response.data.message);
      });
  };

  const add = (type, value) => {
    axios
      .post(API_SERVER + "category/" + type.toLocaleLowerCase(), {
        value,
      })
      .then((res) => {
        reload();
      })
      .catch((res) => {
        alert(res.response.data.message);
      });
  };

  const update = (value, id) => {
    axios
      .put(API_SERVER + "category/" + type.toLocaleLowerCase() + "/" + id, {
        value,
      })
      .then((res) => {
        reload();
        setEdit("");
      })
      .catch((res) => {
        alert(res.response.data.message);
        setEdit("");
      });
  };

  const removeList = (value, id) => {
    console.log(id);
    axios
      .delete(API_SERVER + "category/" + type.toLocaleLowerCase() + "/" + id)
      .then((res) => {
        reload();
        setEdit("");
      })
      .catch((res) => {
        alert(res.response.data.message);
      });
  };

  useEffect(reload, []);

  return (
    <div className="category-body-page">
      <div className="dashboard-body">
        <div>
          <Card className="Recent-Users mt-5">
            <Card.Header>
              <Card.Title as="h5">{type}</Card.Title>
            </Card.Header>
            <Card.Body className="px-0 py-2">
              {!edit && (
                <Col md={12} xl={12}>
                  <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <button
                    className="btn btn-warning"
                    onClick={(e) => add(type, value)}
                  >
                    Add
                  </button>
                </Col>
              )}
              {edit && (
                <Col md={12} xl={12}>
                  <input
                    value={edit.name}
                    onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                  />
                  <button onClick={(e) => update(edit.name, edit._id)}>
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-rounded btn-sm"
                    onClick={(e) => removeList(edit.name, edit._id)}
                  >
                    Delete
                  </button>
                </Col>
              )}
              <div>
                <ListGroup>
                  {values.map((value, id) => {
                    return (
                      <ListGroup.Item key={id}>
                        <button
                          className="btn btn-primary btn-rounded btn-sm"
                          onClick={() => setEdit(value)}
                        >
                          Edit
                        </button>
                        <span className="pr-2">{value.name}</span>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
