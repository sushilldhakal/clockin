const menuItems = {
  items: [
    {
      id: "navigation",
      title: "Navigation",
      type: "group",
      icon: "icon-navigation",
      children: [
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
      ],
    },
  ],
};

export default menuItems;
