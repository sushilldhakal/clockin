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
          type: "collapse",
          icon: "feather icon-box",
          children: [
            {
              id: "daily",
              title: "Daily Timesheet",
              type: "item",
              url: "/dashboard/timesheet",
            },
            {
              id: "weekly",
              title: "Weekly Timesheet",
              type: "item",
              url: "/dashboard/timesheet",
            },
          ],
        },
        {
          id: "employmentMain",
          title: "Employer",
          type: "collapse",
          icon: "feather icon-box",
          children: [
            {
              id: "employment",
              title: "Add Employer",
              type: "item",
              url: "/addemployer",
              icon: "feather icon-file-text",
            },
            {
              id: "allEmployment",
              title: "View Employer",
              type: "item",
              url: "/employer",
              icon: "feather icon-server",
            },
          ],
        },
        {
          id: "roleMain",
          title: "Job Role",
          type: "collapse",
          icon: "feather icon-box",
          children: [
            {
              id: "role",
              title: "Add Job Role",
              type: "item",
              url: "/addjobrole",
              icon: "feather icon-file-text",
            },
            {
              id: "allRole",
              title: "View Job Role",
              type: "item",
              url: "/jobrole",
              icon: "feather icon-server",
            },
          ],
        },
        {
          id: "locationMain",
          title: "Job Location",
          type: "collapse",
          icon: "feather icon-box",
          children: [
            {
              id: "addLocation",
              title: "Add Job Location",
              type: "item",
              url: "/addjlocation",
              icon: "feather icon-file-text",
            },
            {
              id: "alllocation",
              title: "View Job Location",
              type: "item",
              url: "/joblocation",
              icon: "feather icon-server",
            },
          ],
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
