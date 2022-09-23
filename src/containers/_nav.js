import React from 'react'
import CIcon from '@coreui/icons-react'

const admin_nav =  [
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Dashboard',
  //   to: '/dashboard',
  //   icon: <CIcon name="cil-home" customClasses="c-sidebar-nav-icon"/>,
  // },
  {
    _tag: 'CSidebarNavItem',
    name: 'Role Management',
    to: '/roles',
    icon: <CIcon name="cil-file" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Sub Admin',
    to: '/subadmins',
    icon: <CIcon name="cil-user-follow" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Users',
    to: '/users',
    icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Peer Groups',
    to: '/peerGroups',
    icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Invoices',
    to: '/invoices',
    icon: <CIcon name="cil-dollar" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Invoice Plans',
    to: '/invoicePlans',
    icon: <CIcon name="cil-dollar" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Booking Manager',
    to: '/bookingmanager',
    icon: <CIcon name="cil-cart" customClasses="c-sidebar-nav-icon"/>,
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Subscription Manager',
  //   to: '/dashboard',
  //   icon: <CIcon name="cil-group" customClasses="c-sidebar-nav-icon"/>,
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Payment Manager',
  //   to: '/dashboard',
  //   icon: <CIcon name="cil-credit-card" customClasses="c-sidebar-nav-icon"/>,
  // },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Basic Codes',
    route: '/basiccode',
    icon: 'cil-speedometer',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Schools / Univesity',
        to: '/basiccode/universities',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Languages',
        to: '/basiccode/langauges',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Countries',
        to: '/basiccode/countries',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Cities',
        to: '/basiccode/cities',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Strength Category',
        to: '/basiccode/strengthcategories',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Strength Values',
        to: '/basiccode/strengths',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Notification',
    to: '/notifications',
    icon: <CIcon name="cil-bullhorn" customClasses="c-sidebar-nav-icon"/>,
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Static Page',
  //   to: '/dashboard',
  //   icon: <CIcon name="cil-file" customClasses="c-sidebar-nav-icon"/>,
  // },
  {
    _tag: 'CSidebarNavItem',
    name: 'App Settings',
    to: '/appSettings',
    icon: <CIcon name="cil-settings" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Email Settings',
    to: '/emailSettings',
    icon: <CIcon name="cil-envelope-closed" customClasses="c-sidebar-nav-icon"/>,
  }
];

const sub_admin_nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-home" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Drivers',
    to: '/drivers',
    icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Bus',
    to: '/buses',
    icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Shift',
    to: '/shifts',
    icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon"/>,
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Peer Groups',
  //   to: '/peerGroups',
  //   icon: <CIcon name="cis-bullhorn" customClasses="c-sidebar-nav-icon"/>,
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Booking Manager',
  //   to: '/bookingmanager',
  //   icon: <CIcon name="cil-cart" customClasses="c-sidebar-nav-icon"/>,
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Subscription Manager',
  //   to: '/dashboard',
  //   icon: <CIcon name="cil-group" customClasses="c-sidebar-nav-icon"/>,
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Payment Manager',
  //   to: '/dashboard',
  //   icon: <CIcon name="cil-credit-card" customClasses="c-sidebar-nav-icon"/>,
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Basic Codes',
  //   route: '/basiccode',
  //   icon: 'cil-speedometer',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Schools / Univesity',
  //       to: '/basiccode/universities',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Languages',
  //       to: '/basiccode/langauges',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Countries',
  //       to: '/basiccode/countries',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Cities',
  //       to: '/basiccode/cities',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Strength Category',
  //       to: '/basiccode/strengthcategories',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Strength Values',
  //       to: '/basiccode/strengths',
  //     },
  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Notification',
  //   to: '/notifications',
  //   icon: <CIcon name="cis-bell-ring" customClasses="c-sidebar-nav-icon"/>,
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Static Page',
  //   to: '/dashboard',
  //   icon: <CIcon name="cil-file" customClasses="c-sidebar-nav-icon"/>,
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'App Settings',
  //   to: '/appSettings',
  //   icon: <CIcon name="cil-settings" customClasses="c-sidebar-nav-icon"/>,
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Email Settings',
  //   to: '/emailSettings',
  //   icon: <CIcon name="cil-envelope-closed" customClasses="c-sidebar-nav-icon"/>,
  // }
];

export {
  admin_nav,
  sub_admin_nav
}
