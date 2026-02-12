import React, { useState } from "react";
import axios from "axios";
import { API_SERVER } from "../../config/constant";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import "./setting.css";

const Setting = () => {
  const [contacts, setContacts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const fetchUsers = (p = page, l = limit) => {
    axios
      .get(API_SERVER + "users", {
        headers: { token: localStorage.getItem("token") },
        params: { page: p, limit: l },
      })
      .then((res) => {
        setContacts(res.data.data || res.data || []);
        setPagination(res.data.pagination || null);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    fetchUsers(page, limit);
  }, [page, limit]);

  const deleteUser = (id) => {
    if (!window.confirm("This action is not reversable. Are you sure?")) {
      return;
    }
    axios.delete(API_SERVER + "user/" + id).then((res) => {
      window.location.reload();
    });
  };

  return (
    <div className="setting">
      <div className="dashboard-body">
        <div className="row">
          <div className="app-container card  col-sm-12">
            <div class="card-header">
              <h5 class="card-title">Admin Directory</h5>
              <Link
                to={"/dashboard/setting/add-user"}
                class="btn btn-primary float-right btn-sm"
              >
                Add new
              </Link>
            </div>

            <div className="card-body">
              {pagination && (
                <Pagination
                  pagination={pagination}
                  onPageChange={setPage}
                  onLimitChange={(l) => {
                    setLimit(l);
                    setPage(1);
                  }}
                />
              )}
              {contacts.length > 0 && (
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th width="281px">Username</th>
                      <th width="281px">Location</th>
                      <th width="281px">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact.username}>
                        <td>{contact.username}</td>
                        <td>{contact.location}</td>
                        <td>
                          <Link
                            class="btn btn-default btn-sm text-primary"
                            to={"/dashboard/setting/update-user/" + contact._id}
                          >
                            Update
                          </Link>
                          <a
                            class="btn btn-default btn-sm text-danger"
                            href="#"
                            onClick={() => deleteUser(contact._id)}
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
