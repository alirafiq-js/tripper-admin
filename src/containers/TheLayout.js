import React, { useEffect } from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { checkSession, logout } from '../actions';

const TheLayout = (props) => {

  const history = useHistory();

  useEffect(() => {
    console.log('app layout effect');
    // checkUserSession();
  }, []);

  const checkUserSession = async () => {
    try {
      const sessionResponse = await props.actions._checkSession();
    } catch (error) {
      console.log("Eror in check session", error);
      if (error && error.status === 401) {
        localStorage.removeItem('auth');
        props.actions._logout();
        history.replace(`/login`);
      }
    }
  }

  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      _checkSession: (data) => checkSession(data),
      _logout: (data) => logout(data)
    }, dispatch)
  }
}

function mapStateToProps(state) {
  const { user, loader } = state;
  return {
    isLoading: loader.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheLayout);
