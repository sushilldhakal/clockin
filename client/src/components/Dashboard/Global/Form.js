import React, { Component } from "react";

class Form extends Component {
  state = {
    search: ""
  };

  getValue = (e) => {
    this.setState({ search: e.target.value });
  };

  setValue = () => {
    this.props.getSearch(this.state.search);
  };

  render() {
    return (
      <input
        type="text"
        name="search"
        onChange={this.getValue}
        onBlur={this.setValue}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            this.setValue();
          }
        }}
        placeholder="Search"
      />
    );
  }
}

export default Form;
