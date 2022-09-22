import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import { useHistory, useLocation } from 'react-router-dom';
import CIcon from '@coreui/icons-react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { logout } from '../actions';


const TheHeaderDropdown = (props) => {
  const history = useHistory();


  const logoutSession = async () => {

    await props.actions._logout();
    history.replace('/login');

  }

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'avatars/6.jpg'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Change Password
        </CDropdownItem>
        <CDropdownItem divider /> */}
        <CDropdownItem onClick={() => logoutSession()}>
          <CIcon name="cil-account-logout" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators({
        _logout: (data) => logout(data)
      }, dispatch)
  }
}

function mapStateToProps(state) {
  // console.log("==========> User",state);
  const { roles, loader } = state;
  return {
    allRoles: roles,
    isLoading: loader.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheHeaderDropdown);
