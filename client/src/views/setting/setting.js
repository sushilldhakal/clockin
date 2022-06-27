import React, { useState, Fragment } from "react";
import data from "./mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

const Setting = () => {
  const [contacts, setContacts] = useState(data);

  const [addFormData, setAddFormData] = useState({
    email: "",
    password: "",
    location: "",
  });

  const [editFormData, setEditFormData] = useState({
    email: "",
    password: "",
    location: "",
  });

  const [editContactId, setEditContactId] = useState(null);
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  //submit handler
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      email: addFormData.email,
      password: addFormData.password,
      location: addFormData.location,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      email: editFormData.email,
      password: editFormData.password,
      location: editFormData.location,
    };

    const newContacts = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === editContactId);
    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();

    setEditContactId(contact.id);
    const formValues = {
      email: contact.email,
      password: contact.password,
      location: contact.location,
    };
    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === contactId);
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

  return (
    <div className="setting">
      <div className="dashboard-body">
        <div className="app-container card">
          <div class="card-header">
            <h5 class="card-title">Add Admin</h5>
          </div>

          <div className="card-body col-sm-12">
            <form class="add-table" onSubmit={handleAddFormSubmit}>
              <input
                type="text"
                name="email"
                required="required"
                placeholder="Enter a emal..."
                onChange={handleAddFormChange}
              />
              <input
                type="password"
                name="password"
                required="required"
                placeholder="Enter a password..."
                onChange={handleAddFormChange}
              />
              <input
                type="text"
                name="location"
                placeholder="Enter a location..."
                onChange={handleAddFormChange}
              />

              <button type="submit">Add</button>
            </form>
            <form class="view-table" onSubmit={handleEditFormSubmit}>
              <table>
                <thead>
                  <tr>
                    <th width="90px">ID</th>
                    <th width="281px">Email</th>
                    <th width="281px">Password</th>
                    <th width="281px">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <>
                      {editContactId === contact.id ? (
                        <EditableRow
                          editFormData={editFormData}
                          handleEditFormChange={handleEditFormChange}
                          handleCancelClick={handleCancelClick}
                        />
                      ) : (
                        <ReadOnlyRow
                          contact={contact}
                          handleEditClick={handleEditClick}
                          handleDeleteClick={handleDeleteClick}
                        />
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
