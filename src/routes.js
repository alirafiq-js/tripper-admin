import React from 'react';

const Toaster = React.lazy(() => import('./views/notifications_app/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));

const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Drivers = React.lazy(() => import('./views/drivers/Drivers'));
const Driver = React.lazy(() => import('./views/drivers/Driver'));
const Buses = React.lazy(() => import('./views/bus/Buses'));
const Bus = React.lazy(() => import('./views/bus/Bus'));
const Shifts = React.lazy(() => import('./views/shift/Shifts'));
const Shift = React.lazy(() => import('./views/shift/Shift'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications_app/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications_app/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications_app/modals/Modals'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Bookings = React.lazy(() => import('./views/booking/Bookings'));
const PassengerShift = React.lazy(() => import('./views/passengers/PassengerShift'));
// const Roles = React.lazy(() => import('./views/role/Roles'));
// const Role = React.lazy(() => import('./views/role/Role'));
// const BookingManagers = React.lazy(() => import('./views/bookingManagers/BookingManagers'));
// const BookingManager = React.lazy(() => import('./views/bookingManagers/BookingManager'));
// const SubAdmins = React.lazy(() => import('./views/subAdmin/SubAdmins'));
// const SubAdmin = React.lazy(() => import('./views/subAdmin/SubAdmin'));
// const Universities = React.lazy(() => import('./views/universities/Universities'));
// const University = React.lazy(() => import('./views/universities/University'));
// const Countries = React.lazy(() => import('./views/countries/Countries'));
// const Country = React.lazy(() => import('./views/countries/Country'));
// const languages = React.lazy(() => import('./views/languages/languages'));
// const language = React.lazy(() => import('./views/languages/language'));
// const Cities = React.lazy(() => import('./views/cities/Cities'));
// const City = React.lazy(() => import('./views/cities/City'));
// const StrengthCategories = React.lazy(() => import('./views/strengthCategory/StrengthCategories'));
// const StrengthCategory = React.lazy(() => import('./views/strengthCategory/StrengthCategory'));
// const Strengths = React.lazy(() => import('./views/strengths/Strengths'));
// const Strength = React.lazy(() => import('./views/strengths/Strengths'));
// const Notification = React.lazy(() => import('./views/notifications/Notification'));
// const Notifications = React.lazy(() => import('./views/notifications/Notifications'));
// const EmailSetting = React.lazy(() => import('./views/emailSettings/EmailSetting'));
// const EmailSettings = React.lazy(() => import('./views/emailSettings/EmailSettings'));
// const AppSettings = React.lazy(() => import('./views/appSettings/AppSettings'));
// const PeerGroup = React.lazy(() => import('./views/peerGroups/PeerGroup'));
// const PeerGroups = React.lazy(() => import('./views/peerGroups/PeerGroups'));
// const Invoices = React.lazy(() => import('./views/invoices/Invoices'));
// const InvoicePlans = React.lazy(() => import('./views/invoicePlans/InvoicePlans'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/drivers', exact: true,  name: 'Driver', component: Drivers },
  { path: '/drivers/:id', exact: true, name: 'Driver Details', component: Driver },
  { path: '/buses', exact: true,  name: 'Bus', component: Buses },
  { path: '/buses/:id', exact: true, name: 'Bus Details', component: Bus },
  { path: '/shifts', exact: true,  name: 'Shift', component: Shifts },
  { path: '/shifts/add', exact: true, name: 'Add Shift Details', component: Shift },
  { path: '/shifts/:id', exact: true, name: 'Shift Details', component: Shift },
  { path: '/shifts/details', exact: true, name: 'Details', component: Shift },
  { path: '/passenger/shift/list', exact: true, name: 'Passneger Shift List', component: PassengerShift },
  { path: '/bookings', exact: true,  name: 'Booking', component: Bookings },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications_app', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications_app/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications_app/badges', name: 'Badges', component: Badges },
  { path: '/notifications_app/modals', name: 'Modals', component: Modals },
  { path: '/notifications_app/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  // { path: '/roles', exact: true,  name: 'Roles', component: Roles },
  // { path: '/roles/:id', exact: true, name: 'Role Details', component: Role },
  // { path: '/subadmins', exact: true,  name: 'Sub Admins', component: SubAdmins },
  // { path: '/subadmins/:id', exact: true, name: 'Sub Admins Details', component: SubAdmin },
  // { path: '/bookingmanager', exact: true,  name: 'Booking Managers', component: BookingManagers },
  // { path: '/bookingmanager/:id', exact: true, name: 'Booking Manager Details', component: BookingManager },
  // { path: '/basiccode/universities', exact: true,  name: 'Universities', component: Universities },
  // { path: '/basiccode/universities/:id', exact: true, name: 'Univesity Details', component: University },
  // { path: '/basiccode/countries', exact: true,  name: 'Countries', component: Countries },
  // { path: '/basiccode/countries/:id', exact: true, name: 'Role Details', component: Country },
  // { path: '/basiccode/cities', exact: true,  name: 'Cities', component: Cities },
  // { path: '/basiccode/cities/:id', exact: true, name: 'City Details', component: City },
  // { path: '/basiccode/langauges', exact: true,  name: 'Languages', component: languages },
  // { path: '/basiccode/langauges/:id', exact: true, name: 'Languege Details', component: language },
  // { path: '/basiccode/strengthcategories', exact: true,  name: 'Strength Categories', component: StrengthCategories },
  // { path: '/basiccode/strengthcategories/:id', exact: true, name: 'Strength Category Details', component: StrengthCategory },
  // { path: '/basiccode/strengths', exact: true,  name: 'Strengths', component: Strengths },
  // { path: '/basiccode/strengths/:id', exact: true, name: 'Strength Details', component: Strength },
  // { path: '/notifications', exact: true,  name: 'Notifications', component: Notifications },
  // { path: '/notifications/:id', exact: true, name: 'Notifications Details', component: Notification },
  // { path: '/emailSetting/:id', exact: true, name: 'Email Template Details', component: EmailSetting },
  // { path: '/emailSettings', exact: true,  name: 'Email Template list', component: EmailSettings },
  // { path: '/appSettings', exact: true,  name: 'App Settings', component: AppSettings },
  // { path: '/peerGroups', exact: true,  name: 'Peer Groups', component: PeerGroups },
  // { path: '/peerGroup/:id', exact: true, name: 'Peer Groups Details', component: PeerGroup },
  // { path: '/invoices', exact: true,  name: 'Invoices', component: Invoices },
  // { path: '/invoicePlans', exact: true,  name: 'Invoice Plans', component: InvoicePlans },
];

export default routes;
