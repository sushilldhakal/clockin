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
          icon: "feather icon-box",
        },
        {
          id: "User",
          title: "User",
          type: "item",
          url: "/dashboard/user",
          icon: "feather icon-box",
        },
        {
          id: "Timesheet",
          title: "Timesheet",
          type: "item",
          url: "/dashboard/timesheet",
          icon: "feather icon-box",
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

    {
      id: "resources",
      title: "Resources",
      type: "group",
      icon: "icon-pages",
      children: [
        {
          id: "Setting",
          title: "Setting",
          type: "item",
          url: "/dashboard/button",
          icon: "feather icon-box",
        },
      ],
    },
  ],
};

export default menuItems;
