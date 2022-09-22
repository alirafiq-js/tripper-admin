import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { resetPassword } from '../../../actions/auth';
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import logo from '../../../assets/Logoblue.png';
import { notification } from 'antd';

const ResetPassword = (props) => {
  console.log(props,'props===========');
  const [state, setState] = useState({
    password: '',
    confirmPassword: ''
  });

  const [loginFailedError, showError] = useState(null);
  const [passwordMisMatch, setPasswordError] = useState(null);

  const onTextChange = (e) => {
    showError(null);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    setPasswordError(null);
  }

  const onResetPassword = async () => {
    showError(null);
    try {

      let query = props.location.search;

      console.log("query",query);

      if (!query) {
        console.log("1-----------------",query)
        return notification['error']({
          message: 'Invalid link',
          description: 'You opened invalid link.',
          duration: 3,
          placement:'bottomRight'
        });
        // return props.history.replace('/login');
      }

      query = query.substring(1).split("=");

      if (query.length > 2 || query[0] !== 'recoveryToken') {
        console.log("2-----------------",query)
        return notification['error']({
          message: 'Invalid link',
          description: 'You opened invalid link.',
          duration: 3,
          placement:'bottomRight'
        });
        // return props.history.replace('/login');
      }

      console.log("query==========?",query);
      const data = {
        password: state.password,
        recoveryToken : query[1]
      };

      if (state.password !== state.confirmPassword) {
        return setPasswordError('Confirm password & new password must match');
      }
      if(!passRegex){
        return setPasswordError('Password must contain eight characters, at least one letter, one number and one special character');
      }

      const repsonse = await props.actions._resetPassword(data);
      
      console.log("=======Response password", repsonse);
      
      notification['success']({
        message: 'Password Reset',
        description: 'Your password has been reset please login.',
        duration: 3,
      });

      props.history.replace('/login');

      showError(null);
    } catch (error) {
      console.log('reset error', error);
      showError(error.data ? error.data.message : error);
    }
  }

  const passRegex = () => {
    const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
    if(state.password.match(regex)){
      console.log("passowrd validate");
      return true;
    }else{
      console.log("failed");
      return false;
    }
  }

  const disableButton = () => {
    console.log(state);
    if (state.password !== state.confirmPassword) {
      return true;
    }
    return false;
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="5">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CImg
                    src={logo}
                    fluid
                    className="c-sidebar-brand-full"
                    style={{ width: '170px', height: '70px', padding: '5px 0px' }}
                  />
                  <CForm>
                    <p className="text-muted">Reset Password</p>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" onChange={onTextChange} name='password' value={state.userPassword} placeholder="New Password" autoComplete="current-password" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" onChange={onTextChange} name='confirmPassword' value={state.userPassword} placeholder="Confirm Password" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" onClick={onResetPassword} className="px-4"   disabled={disableButton()}>Reset Password</CButton>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="12">
                        <span style={{fontSize:'11px',color:'gray'}}>Password must contain eight characters, at least one letter, one number and one special character</span>
                      </CCol>
                    </CRow>
                  </CForm>
                  {
                    loginFailedError &&
                    <CAlert style={{ marginTop: '10px' }} color="danger">
                      {loginFailedError}
                  </CAlert>
                  }
                  {
                    passwordMisMatch &&
                    <CAlert style={{ marginTop: '10px' }} color="danger">
                      {passwordMisMatch}
                  </CAlert>
                  }
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

function mapDispatchToProp(dispatch) {
  return {
      actions: bindActionCreators({
          _resetPassword: (data) => resetPassword(data),
          // _forgotPassword: (data) => forgotPassword(data)
      }, dispatch)
  }
}

export default connect(null, mapDispatchToProp)(ResetPassword);
