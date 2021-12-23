import React, { useState, useEffect } from "react";
import { Card, Col } from "react-bootstrap";
import axios from "axios";
import { API_SERVER } from "../../config/constant";

export default ({ type }) => {
  let [value, setValue] = useState("");
  let [values, setValues] = useState([]);
  let [edit, setEdit] = useState("");
  let [remove, setRemove] = useState("");

  const reload = () => {
    setValue("");
    axios
      .get(API_SERVER + "category/" + type.toLocaleLowerCase())
      .then((res) => {
        setValues(res.data);
      })
      .catch((res) => {
        alert("Something went wrong");
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
        alert("Something went wrong");
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
        alert("Something went wrong");
      });
  };

  const del = (value, id) => {
    console.log(id);
  };

  useEffect(reload, []);

  return (
    <div className="catageory-body-page">
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
                  <button onClick={(e) => add(type, value)}>Add</button>
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
                </Col>
              )}
              <div>
                <ul>
                  {values.map((value) => {
                    return (
                      <li>
                        {value.name}{" "}
                        <button
                          class="btn btn-primary btn-rounded btn-sm"
                          onClick={() => setEdit(value)}
                        >
                          Edit
                        </button>{" "}
                        <button onClick={(e) => del(value.name, value.id)}>
                          Remove
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
