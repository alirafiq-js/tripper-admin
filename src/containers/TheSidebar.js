import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg
} from '@coreui/react';

import { connect } from "react-redux";

import CIcon from '@coreui/icons-react'
import logo from '../assets/logo.png';
import logoBanner from '../assets/logoBanner.png';

// sidebar nav config
import { sub_admin_nav, admin_nav } from './_nav'
import { minimizeSideBar } from '../actions'

const TheSidebar = (props) => {
  console.log('props sidebare',props);
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow);
  
  const navToShow = (props.user && [1, 5].includes(props.user.userRole)) ? admin_nav : sub_admin_nav;

  return (
    <CSidebar
      minimize={props.minimizeSideBarValue}
      show={show}
      onMinimizeChange={(val) => props.actions._minimizeSideBar(val)}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        {/* <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        /> */}
        <CImg
          src={logo}
          fluid
          className="c-sidebar-brand-full"
          style={{ width: '170px', height: '70px', padding: '5px 0px' }}
        />
        {/* <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        /> */}
        <CImg
          src={logoBanner}
          fluid
          className="c-sidebar-brand-minimized"
          style={{ width: '70px', height: '50px' }}
        />
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navToShow}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      _minimizeSideBar: (data) => minimizeSideBar(data),
    }, dispatch)
  }
}

function mapStateToProps(state) {
  const { auth, dashboard } = state;
  console.log("==========> AUTH ",dashboard.minimizeSideBar);
  return {
    user: auth.user,
    minimizeSideBarValue: dashboard.minimizeSideBar
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(TheSidebar));
