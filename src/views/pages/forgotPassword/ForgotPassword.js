import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { login, forgotPassword, resetPassword } from '../../../actions';
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
  });

  const [loginFailedError, showError] = useState(false);
  const [successResponse, setSuccessResponse] = useState(null);
    const [errorData, setError] = useState(null);

  const onTextChange = (e) => {
    showError(false);
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const onForgotPassword = async () => {
    showError(false);
    try {
      const data = {
        email: state.userEmail,
      };
      const repsonse = await props.actions._forgotPassword(data);
      console.log("=======Response forgot passwrod", repsonse);
      setSuccessResponse(repsonse);
      setState({userEmail:''});
    //   props.history.replace('/resetPassword');
      showError(false);
    } catch (error) {
      console.log('forgot passwrod error', error);
      setError(error.data ? error.data : error );
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
                  <CImg
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
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" onClick={onForgotPassword} className="px-4">Reset</CButton>
                      </CCol>
                    </CRow>
                    <CRow>
                       <CCol xs="12" className="">
                          <span style={{ display: 'inline-block', marginRight: '10px' }} >Already have an account?</span><CButton color="link" className="px-0" onClick={() => props.history.push('/login')}>Login</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                  {
                    loginFailedError &&
                    <CAlert style={{ marginTop: '10px' }} color="danger">
                      {errorData.message}
                  </CAlert>
                  }
            {
                successResponse &&
                <CAlert style={{ marginTop: '10px' }} color="success">
                    {successResponse.message}
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
          _forgotPassword: (data) => forgotPassword(data)
      }, dispatch)
  }
}

export default connect(null, mapDispatchToProp)(ForgotPassword);
