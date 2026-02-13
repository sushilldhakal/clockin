let children = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "item",
    url: "/dashboard",
    icon: "feather icon-home",
  },
  {
    id: "Staff",
    title: "Staff",
    type: "item",
    url: "/dashboard/staff",
    icon: "feather icon-user",
  },
  {
    id: "Timesheet",
    title: "Timesheet",
    type: "item",
    url: "/dashboard/timesheet",
    icon: "feather icon-clock",
  },
  {
    id: "category",
    title: "Add/Edit category",
    type: "item",
    url: "/dashboard/category",
    icon: "feather icon-box",
  },
  {
    id: "flag",
    title: "Flag",
    type: "item",
    url: "/dashboard/flag",
    icon: "feather icon-box",
  },
  {
    id: "setting",
    title: "Setting",
    type: "item",
    url: "/dashboard/setting",
    icon: "feather icon-settings",
  },
];
// Payable: exclude flag, setting, category (show Dashboard, Staff, Timesheet)
if (localStorage.getItem("user_id") === "payable") {
  children = children.filter(
    (item) => !["flag", "setting", "category"].includes(item.id)
  );
} else if (Boolean(localStorage.getItem("location"))) {
  // Role 'user' with location: restrict to Dashboard, Timesheet, Add/Edit category
  children = children.filter((item) =>
    ["Dashboard", "Timesheet", "Add/Edit category"].includes(item.title)
  );
}
let menuItems = {
  items: [
    {
      id: "navigation",
      title: "Navigation",
      type: "group",
      icon: "icon-navigation",
      children,
    },
  ],
};

export default menuItems;
