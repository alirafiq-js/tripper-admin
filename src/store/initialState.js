let initialState = {

  auth: {
    user: null
  },
  dashboard: {
    data:null,
    minimizeSideBar: false
  },
  loader: {
    requestInProgress: 0,
    loading: false
  },
  drivers: {
    details: {
      data: null
    },
    allDrivers: {
      data: []
    },
    bookingManagers: {
      data: []
    },
    onlineUser: 0
  },
  buses: {
    details: {
      data: null
    },
    allBuses: {
      data: []
    },
  },
  shifts: {
    details: {
      data: null
    },
    allShifts: {
      data: []
    },
  },
  allRoles: {
    data: []
  },
  peerGroups: {
    details: {
      data: null
    },
    invoiceDetails: {
      data: null
    },
    data: []
  },
  settings: {
    emailSettings: {
      data: []
    },
    appSettings:{
      data: null
    }
  },
  notifications: {
    data: []
  },
  basicCodes: {
    univesities: {
      data: []
    },
    languages: {
      data: []
    },
    countries: {
      data: []
    },
    cities: {
      data: []
    },
    strengthCategories: {
      data: []
    },
    strengths: {
      data: []
    },
  },
  subAdmins: {
    data: []
  },
  events: [
    {
      _id: 1,
      name: "Event",
      location: "Karachi,Pakistan",
      details: "Admin",
      active: true,
    },
    {
      _id: 2,
      name: "Event 2",
      location: "Karachi,Pakistan",
      details: "Admin",
      active: true,
    },
    {
      _id: 3,
      name: "Event 3",
      location: "Karachi,Pakistan",
      details: "Admin",
      active: true,
    },
    {
      _id: 4,
      name: "Event 4",
      location: "Karachi,Pakistan",
      details: "Admin",
      active: false,
    },
    {
      _id: 5,
      name: "Event 5",
      location: "Karachi,Pakistan",
      details: "Admin",
      active: false,
    },
    {
      _id: 6,
      name: "Event 6",
      location: "Karachi,Pakistan",
      details: "Admin",
      active: false,
    },
    {
      _id: 7,
      name: "Event 7",
      location: "Karachi,Pakistan",
      details: "Admin",
      active: false,
    },
    {
      _id: 8,
      name: "Event 8",
      location: "Karachi,Pakistan",
      details: "Admin",
      active: false,
    },
  ],
  emails: [],
  invoices: {
    data: []
  },

};

export default initialState;
