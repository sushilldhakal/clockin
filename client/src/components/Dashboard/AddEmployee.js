import React from "react";

const AddEmployee = (props) => {
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
    getNewEmployee
  } = props;
  return (
    <React.Fragment>
      <form onSubmit={addNewEmployee}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={getNewEmployee}
          placeholder="Name"
        />
        <input
          type="text"
          name="role"
          value={role}
          onChange={getNewEmployee}
          placeholder="role"
        />
        <input
          type="text"
          name="hire"
          value={hire}
          onChange={getNewEmployee}
          placeholder="hire"
        />
        <input
          type="url"
          name="site"
          value={site}
          onChange={getNewEmployee}
          placeholder="site"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={getNewEmployee}
          placeholder="email"
        />
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={getNewEmployee}
          placeholder="phone"
        />
        <input
          type="number"
          maxLength="4"
          name="pin"
          value={pin}
          onChange={getNewEmployee}
          placeholder="pin"
        />
        <input
          type="date"
          name="dob"
          value={dob}
          onChange={getNewEmployee}
          placeholder="dob"
        />
        <button>{!edit ? "Add Employee" : "Edit Employee"}</button>
      </form>
    </React.Fragment>
  );
};

export default AddEmployee;
