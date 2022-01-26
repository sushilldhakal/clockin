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
    id: "catageory",
    title: "Add/Edit Catageory",
    type: "item",
    url: "/dashboard/catageory",
    icon: "feather icon-box",
  },
  {
    id: "flag",
    title: "Flag",
    type: "item",
    url: "/dashboard/flag",
    icon: "feather icon-box",
  },
];
if (Boolean(localStorage.getItem("location"))) {
  children = children.filter((item) =>
    ["Dashboard", "Timesheet"].includes(item.title)
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
