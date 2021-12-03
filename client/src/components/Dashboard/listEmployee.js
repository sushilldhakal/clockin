import React, { Component } from "react";
import Search from "./Search";
import List from "./List";
// import Form from '../Components/Form'
import AddEmployee from "./AddEmployee";
import uuidv1 from "uuid";

import { data } from "./data";

class ListEmployee extends Component {
  state = {
    data: data,
    id: uuidv1(),
    search: "",
    value: "",
    title: "Employee Search Filter",
    show: false,
    name: "",
    role: "",
    hire: "",
    site: "",
    pin: "",
    edit: false
  };

  // Get and Set value from form
  getFilterValue = (e) => {
    const search = e.target.value;
    const matches = search.match(/\d+/g);
    if (matches != null) {
      alert("Do not type numbers");
    } else {
      this.setState({ search });
    }
  };

  //Filter value from state
  getFilterData = () => {
    return this.state.data.filter(
      (item) =>
        item.name.toLowerCase().match(this.state.search.toLowerCase()) ||
        item.role.toLowerCase().match(this.state.search.toLowerCase()) ||
        item.hire.toLowerCase().match(this.state.search.toLowerCase()) ||
        item.site.toLowerCase().match(this.state.search.toLowerCase()) ||
        item.email.toLowerCase().match(this.state.search.toLowerCase()) ||
        item.phone.toLowerCase().match(this.state.search.toLowerCase())
    );
  };

  // getSearch = value => {
  // 	this.setState({ value })
  // }

  //Get value from input fields
  getNewEmployee = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  //Add value from state to data array
  addNewEmployee = (e) => {
    e.preventDefault();
    const { name, role, hire, site, email, phone, pin } = this.state;

    if (!name || !role || !hire || !site || !phone || !email || !pin) {
      alert("Fill the fields");
    } else {
      const newEmployee = {
        id: this.state.id,
        name,
        role,
        hire,
        site,
        email,
        phone,
        pin
      };
      this.setState({
        data: [...this.state.data, newEmployee],
        name: "",
        position: "",
        hire: "",
        site: "",
        email: "",
        phone: "",
        pin: "",
        id: uuidv1(),
        edit: false
      });
      alert("Employee Added");
    }
  };

  //Delete value from state to data array
  // deleteEmployee = (id) => {
  //   const { data } = this.state;
  //   if (data.length <= 2) {
  //     alert("Data is needed to filter");
  //   } else {
  //     const deleteEmployee = this.state.data.filter((item) => item.id !== id);
  //     this.setState({
  //       data: deleteEmployee
  //     });
  //   }
  // };

  //Edit value from state to data array
  editEmployee = (id) => {
    const editEmployee = this.state.data.find((item) => item.id === id);
    //const deleteEmployee = this.state.data.filter((item) => item.id !== id);
    console.log(editEmployee);
    this.setState({
      data: editEmployee.name,
      show: true,
      name: editEmployee.name,
      role: editEmployee.role,
      hire: editEmployee.hire,
      site: editEmployee.site,
      email: editEmployee.email,
      phone: editEmployee.phone,
      pin: editEmployee.pin,
      edit: true,
      id: editEmployee.id
    });
  };

  //Clear state from data array
  handleClearList = () => {
    this.setState({ search: "" });
  };

  //Show form
  handleShowForm = () => {
    this.setState({
      show: !this.state.show
    });
  };

  render() {
    return (
      <div className="App">
        <h1>{this.state.title}</h1>
        <button onClick={this.handleShowForm}>
          {!this.state.show ? "Add Employee" : "Close Form"}
        </button>
        <br />
        {this.state.show && (
          <AddEmployee
            name={this.state.name}
            role={this.state.role}
            hire={this.state.hire}
            site={this.state.site}
            email={this.state.email}
            phone={this.state.phone}
            pin={this.state.pin}
            edit={this.state.edit}
            getNewEmployee={this.getNewEmployee}
            addNewEmployee={this.addNewEmployee}
          />
        )}
        <Search
          search={this.state.search}
          getFilterValue={this.getFilterValue}
        />
        <List
          // deleteEmployee={this.deleteEmployee}
          editEmployee={this.editEmployee}
          handleClearList={this.handleClearList}
          getFilterData={this.getFilterData}
        />
      </div>
    );
  }
}

export default ListEmployee;
