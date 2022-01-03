import React from "react";
import Timesheet from "./Timesheet";

export default function TimesheetList() {
  return (
    <div className="timesheet-body-page">
      <div className="dashboard-body">
        <Timesheet id="timesheet-list" />
      </div>
    </div>
  );
}
