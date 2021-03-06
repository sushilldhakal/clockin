import React from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const List = (props) => {
  const { getFilterData } = props;
  const [loading, setLoading] = React.useState(true);

  const data = getFilterData();

  const columns = [
    {
      name: "Name",
      selector: (row) => row["name"],
      sortable: true,
      cell: (d) => <Link to={"/dashboard/each-staff/" + d._id}>{d.name}</Link>,
    },
    {
      name: "Role",
      selector: (row) => row["role"],
      sortable: true,
    },
    {
      name: "Pin",
      selector: (row) => row["pin"],
      sortable: true,
    },
    {
      name: "Employe",
      selector: (row) => row["hire"],
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row["site"],
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row["email"],
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row["phone"],
      sortable: true,
    },
  ];

  const tableData = {
    columns,
    data,
  };

  React.useEffect(() => {
    setLoading(false);
  }, []);

  const paginationComponentOptions = {
    selectAllRowsItem: true,
  };

  return (
    <React.Fragment>
      <div className="col-sm-12">
        {/* {this.getFilterData().length !== 0 ? this.displayData() : <p>No terms</p>} */}

        {/* Count return element from array. If equals to 0 show message*/}
        {getFilterData().length === 0 ? (
          <div>
            <p className="c-msg">Employee Not Found</p>
          </div>
        ) : (
          <div>
            <DataTableExtensions
              print={true}
              exportHeaders={true}
              export={true}
              filterPlaceholder="Search"
              {...tableData}
            >
              <DataTable
                columns={columns}
                data={data}
                progressPending={loading}
                noHeader
                defaultSortField="id"
                defaultSortAsc={false}
                pagination
                paginationPerPage="30"
                paginationComponentOptions={paginationComponentOptions}
                highlightOnHover
              />
            </DataTableExtensions>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default List;
