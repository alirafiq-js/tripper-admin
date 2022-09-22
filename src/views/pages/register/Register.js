import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { login } from '../../../actions/auth';
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

const ForgotPassword = (props) => {
  const [state, setState] = useState({
    userEmail: '',
    userPassword: ''
  });

  const [loginFailedError, showError] = useState(false)

  const onTextChange = (e) => {
    showError(false);
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const onLogin = async () => {
    showError(false);
    try {
      const data = {
        email: state.userEmail,
        password: state.userPassword
      };
      const repsonse = await props.actions._login(data);
      console.log("=======Response login", repsonse);
      props.history.replace('/dashboard');
      showError(false);
    } catch (error) {
      console.log('Login error', error);
      showError(true);
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="5">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  {/* <CImg
                    src={logo}
                    fluid
                    className="c-sidebar-brand-full"
                    style={{ width: '170px', height: '70px', padding: '5px 0px' }}
                  />
                  <CForm>
                    <p className="text-muted">Reset Password</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-envelope-closed" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="email" value={state.userEmail} onChange={onTextChange} name='userEmail' placeholder="Email" autoComplete="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" onChange={onTextChange} name='userPassword' value={state.userPassword} placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" onClick={onLogin} className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Already have an account?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                  {
                    loginFailedError &&
                    <CAlert style={{ marginTop: '10px' }} color="danger">
                      Invalid email or password
                  </CAlert>
                  } */}
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
          _login: (data) => login(data),
          // _forgotPassword: (data) => forgotPassword(data)
      }, dispatch)
  }
}

export default connect(null, mapDispatchToProp)(ForgotPassword);
