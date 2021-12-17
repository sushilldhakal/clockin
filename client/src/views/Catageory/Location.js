import React, { Component } from "react";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
} from "react-bootstrap";

import { v4 as uuidv4 } from "uuid";

const drawerWidth = 240;

export default class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: {
        value: "",
        id: "",
      },
      value: [],
      isEdit: false,
      editValue: "",
      editId: "",
    };
  }

  handleChange = (e) => {
    this.setState(
      {
        name: {
          value: e.target.value,
          id: uuidv4(),
        },
      },
      () => console.log(this.state.name.value)
    );
  };

  //submit function on value submit
  submit = () => {
    console.log("button");
    if (this.state.name.value === "") {
      alert("please add todo");
      return;
    }
    this.setState(
      {
        name: {
          value: "",
        },
        value: [...this.state.value, this.state.name],
      },
      () => console.log(this.state)
    );
  };

  //remove function to remove items from todo
  remove = (id) => {
    let value = this.state.value;
    const remove = value.filter((ele) => ele.id !== id);
    this.setState({
      value: remove,
    });
  };

  //edit function to edit todo item
  edit = (value, id) => {
    this.setState(
      {
        isEdit: true,
        editValue: value,
        editId: id,
      },
      () => console.log(id, value)
    );
  };

  //update function after edit to update item
  update = () => {
    let value = this.state.value;
    const item = value.filter((ele) =>
      ele.id === this.state.editId
        ? (ele.value = this.state.editValue)
        : ele.value
    );

    this.setState({ value: item, isEdit: false }, () => {
      console.log(this.state.value);
    });
  };

  render() {
    const { isEdit } = this.state;

    if (!isEdit) {
      return (
        <div className="catageory-body-page">
          <div className="dashboard-body">
            <Col md={4} xl={4}>
              <Card className="Recent-Users">
                <Card.Header>
                  <Card.Title as="h5">Location</Card.Title>
                </Card.Header>
                <Card.Body className="px-0 py-2">
                  <label>
                    <input
                      value={this.state.name.value}
                      onChange={this.handleChange}
                      placeholder="add your Location.."
                    />
                  </label>

                  <button onClick={this.submit}>Add Location</button>

                  <div>
                    {this.state.value &&
                      this.state.value.map((ele, index) => (
                        <div key={ele.id}>
                          <span>{ele.value}</span>
                          <button onClick={(e) => this.edit(ele.value, ele.id)}>
                            edit
                          </button>
                          <button onClick={() => this.remove(ele.id)}>
                            remove
                          </button>
                        </div>
                      ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </div>
        </div>
      );
    } else {
      return (
        <div className="catageory-body-page">
          <div className="dashboard-body">
            <Col md={4} xl={4}>
              <Card className="Recent-Users">
                <Card.Header>
                  <Card.Title as="h5">Edit Location</Card.Title>
                </Card.Header>
                <Card.Body className="px-0 py-2">
                  <div>Edit Location</div>
                  <input
                    value={this.state.editValue}
                    onChange={(e) => {
                      this.setState({ editValue: e.target.value });
                    }}
                  />
                  <button onClick={this.update}>update</button>

                  <button
                    onClick={() => {
                      this.setState({ isEdit: false });
                    }}
                  >
                    cancel
                  </button>
                </Card.Body>
              </Card>
            </Col>
          </div>
        </div>
      );
    }
  }
}
