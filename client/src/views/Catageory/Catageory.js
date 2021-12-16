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

const drawerWidth = 240;

export default class Catageory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      focused: false,
      input: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  handleInputChange(evt) {
    this.setState({ input: evt.target.value });
  }

  handleInputKeyDown(evt) {
    if (evt.keyCode === 13) {
      const { value } = evt.target;

      this.setState((state) => ({
        items: [...state.items, value],
        input: "",
      }));
    }

    if (
      this.state.items.length &&
      evt.keyCode === 8 &&
      !this.state.input.length
    ) {
      this.setState((state) => ({
        items: state.items.slice(0, state.items.length - 1),
      }));
    }
  }

  handleRemoveItem(index) {
    return () => {
      this.setState((state) => ({
        items: state.items.filter((item, i) => i !== index),
      }));
    };
  }
  render() {
    const styles = {
      container: {
        border: "1px solid #ddd",
        padding: "5px",
        borderRadius: "5px",
      },

      items: {
        display: "inline-block",
        padding: "2px",
        border: "1px solid blue",
        fontFamily: "Helvetica, sans-serif",
        borderRadius: "5px",
        marginRight: "5px",
        cursor: "pointer",
      },

      input: {
        outline: "none",
        border: "none",
        fontSize: "14px",
        fontFamily: "Helvetica, sans-serif",
      },
    };

    return (
      <div className="catageory-body-page">
        <div className="dashboard-body">
          <Card>
            <Card.Header>
              <Card.Title as="h5">ADD EMPLOYER</Card.Title>
            </Card.Header>
            <Card.Body>
              <Button className="btn btn-primary toggle-button">
                ADD EMPLOYER
              </Button>
              <label>
                <ul style={styles.container}>
                  {this.state.items.map((item, i) => (
                    <li
                      key={i}
                      style={styles.items}
                      onClick={this.handleRemoveItem(i)}
                    >
                      {item}
                      <span>(x)</span>
                    </li>
                  ))}
                  <input
                    style={styles.input}
                    value={this.state.input}
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleInputKeyDown}
                  />
                </ul>
              </label>
              <div className="float-right">
                <ul>
                  <li>Nova</li>
                  <li>DMX</li>
                  <li>VIK</li>
                </ul>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
              <Card.Title as="h5">ADD Job Role</Card.Title>
            </Card.Header>
            <Card.Body>
              <Button className="btn btn-primary toggle-button">
                ADD Role
              </Button>
              <label>
                <ul style={styles.container}>
                  {this.state.items.map((item, i) => (
                    <li
                      key={i}
                      style={styles.items}
                      onClick={this.handleRemoveItem(i)}
                    >
                      {item}
                      <span>(x)</span>
                    </li>
                  ))}
                  <input
                    style={styles.input}
                    value={this.state.input}
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleInputKeyDown}
                  />
                </ul>
              </label>
              <div className="float-right">
                <ul>
                  <li>Sorting</li>
                  <li>Operation</li>
                  <li>Customer</li>
                </ul>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title as="h5">ADD Location</Card.Title>
            </Card.Header>
            <Card.Body>
              <Button className="btn btn-primary toggle-button">
                ADD Location
              </Button>
              <label>
                <ul style={styles.container}>
                  {this.state.items.map((item, i) => (
                    <li
                      key={i}
                      style={styles.items}
                      onClick={this.handleRemoveItem(i)}
                    >
                      {item}
                      <span>(x)</span>
                    </li>
                  ))}
                  <input
                    style={styles.input}
                    value={this.state.input}
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleInputKeyDown}
                  />
                </ul>
              </label>
              <div className="float-right">
                <ul>
                  <li>Port Melbourne</li>
                  <li>Dandenong</li>
                  <li>Tullaramine</li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
