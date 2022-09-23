import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import { getShiftDetails } from '../../actions/shift';
import { Button, notification, Modal } from 'antd';
import {
  CCard, CCardBody, CCardHeader, CCol, CRow, CLabel,
  CSelect,
  CFormGroup,
  CInput,
  CSpinner,
  CImg,
  CButton,
  CDataTable,
  CTooltip
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import style from './style.css'

const Shift = (props) => {
  const history = useHistory();

  console.log('userDetails', props.userDetails);

  useEffect(() => {
    _getUserData(props.match.params.id);
  }, []);

  const _getUserData = async (id) => {
    try {

      const response = await props.actions._getUserDetails(id);
      console.log('========> get user repsonse', response);
    } catch (error) {
      console.log("Error in get list", error);
    }

  }

  const onDeleteDriver = async (user) => {
    try {

      const data = {
        user_id: user._id
      };
      const deleteDriverResponse  = await props.actions._deleteDriver(data);
      notification['success']({
        message: 'User deleted successfully',
      });
      history.push(`/drivers`);
    } catch (error) {
      console.log(error);
      notification['error']({
         message: (error.response && error.response.data) ?  error.response.data.message : 'something went wrong',
         placement:'bottomRight',
      });
    }

  }

  const showDeleteDriverDialog = (item) => {
    try {
        Modal.confirm({
          title: 'Are you sure delete this user?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: () => onDeleteDriver(item),
          onCancel() {
            console.log('Cancel');
          },
        });

    } catch (error) {

    }
  }

  console.log("===========>PROPS FROM TABLE", props);

  const userData = props.userDetails.data;

  return (
    <CRow>
      <CCol lg={12} md={12} xs={12}>
        <CCard>
          <CCardHeader>
            Shift Details
          </CCardHeader>
          <CCardBody>
            {props.isLoading ?
              <CSpinner
                style={{ width: '40px', height: '40px', margin: '0 auto', display: 'flex' }}
                color="info"
                variant="grow"
              />
              :

              <div>
                <CFormGroup row>
                  <CCol xs="12" md="10">
                    <CImg
                      src={(userData && !_.isEmpty(userData.image) && !_.isNil(userData.image)) ? `https://peers-image.s3.amazonaws.com/${userData.image}` : "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png"}
                      style={{ width: 115, height: 115 }}
                    />
                  </CCol>
                  <CCol xs="12" md="2">
                    <Button  onClick={() => showDeleteDriverDialog(userData)} ghost type="danger">
                      Delete
                    </Button>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol xs="12" md="3">
                    <CLabel className='labelStyle' htmlFor="select">Name:</CLabel>
                    <span className='span'>{userData && userData.fullName}</span>
                  </CCol>
                  <CCol xs="12" md="3">
                    <CLabel className='labelStyle' htmlFor="select">Email:</CLabel>
                    <span className='span'>{userData && userData.email}</span>
                  </CCol>
                  <CCol xs="12" md="3">
                    <CLabel className='labelStyle' htmlFor="select">Phone:</CLabel>
                    <span className='span'>{userData && userData.formattedMobile}</span>
                  </CCol>
                  <CCol xs="12" md="3">
                    <CLabel className='labelStyle' htmlFor="select">Verification Status:</CLabel>
                    <span className='span'>{userData && userData.signUpVerificationStatus}</span>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol xs="12" md="3">
                    <CLabel className='labelStyle' htmlFor="select">Selected Peer Group:</CLabel>
                    <CTooltip content="Peer Group Details"><span className='span'>
                      <CButton onClick={() => history.push(`/peerGroup/${userData.selected_peer_group._id}`)}>{userData && userData.selected_peer_group && userData.selected_peer_group.name}
                      </CButton>
                    </span>
                    </CTooltip>
                  </CCol>
                  <CCol xs="12" md="3">
                    <CLabel className='labelStyle' htmlFor="select">School/University:</CLabel>
                    <span className='span'>{userData && userData.schoolUniversity && userData.schoolUniversity.name}</span>
                  </CCol>
                  <CCol xs="12" md="3">
                    <CLabel className='labelStyle' htmlFor="select">Connected User:</CLabel>
                    <span className='span'>{userData && userData.learnrequests_updated && userData.learnrequests_updated.length}</span>
                  </CCol>
                  <CCol xs="12" md="3">
                    <CLabel className='labelStyle' htmlFor="select">Created:</CLabel>
                    <span className='span'>{userData && moment(userData.created).format('Do MMM YYYY')}</span>
                  </CCol>
                </CFormGroup>
              </div>
            }
            <CRow>
            <CCol lg={3} md={3}>
                <CCard>
                  <CCardHeader>
                    User Strengths
              </CCardHeader>
                  <CCardBody>
                    <CDataTable
                      items={userData && userData.userStrengths ? userData.userStrengths : []}
                      fields={[
                        { key: 'name', _classes: 'font-weight-bold' },
                      ]}
                      hover
                      striped
                      itemsPerPage={10}
                      // activePage={page}
                      scopedSlots={{
                        'name':
                        (item) => (
                          <td style={{ textTransform: 'capitalize' }}>
                              {item.name}
                          </td>
                        )
                      }}
                    />
                  </CCardBody>
                </CCard>
                </CCol>
                <CCol lg={3} md={3}>
                <CCard>
                  <CCardHeader>
                    Peer Groups
              </CCardHeader>
                  <CCardBody>
                    <CDataTable
                      items={userData && userData.peerGroups ? userData.peerGroups : []}
                      fields={[
                        { key: 'name', _classes: 'font-weight-bold' },
                      ]}
                      hover
                      striped
                      itemsPerPage={10}
                      // activePage={page}
                      clickableRows
                      onRowClick={(item) => history.push(`/peerGroup/${item._id}`)}
                      scopedSlots={{
                        'name':
                        (item) => (
                          <td style={{ textTransform: 'capitalize' }}>
                              {item.label}
                          </td>
                        )
                      }}
                    />
                  </CCardBody>
                </CCard>
                </CCol>
              <CCol lg={6} md={6}>
            <CCard>
              <CCardHeader>
                Connected Users
          </CCardHeader>
              <CCardBody>

                <CDataTable
                  items={userData && userData.learnrequests_updated ? userData.learnrequests_updated : []}
                      // clickableRows
                      // onRowClick={(item) => _getUserData(item._id)}
                  fields={[
                    { key: 'fullName', _classes: 'font-weight-bold' },
                    { key: 'formattedMobile', label: 'Mobile' },
                    { key: 'strength', label: 'Strength' },
                    'created'
                  ]}
                  hover
                  striped
                  itemsPerPage={10}
                  // activePage={page}
                  scopedSlots={{
                    'fullName':
                    (item) => (
                      <td>
                          {item.requestedUserId.fullName}
                      </td>
                    ),
                    'formattedMobile':
                    (item) => (
                      <td>
                          {item.requestedUserId.formattedMobile}
                      </td>
                    ),
                    'strength':
                    (item) => (
                      <td style={{ textTransform: 'capitalize' }}>
                          {item.requestedStrengthId[0].name}
                      </td>
                    ),
                    'created':
                    (item) => (
                      <td>
                          {moment(item.created).format('Do MMM YYYY hh:mm a')}
                      </td>
                    )
                  }}
                />
              </CCardBody>
            </CCard>
            </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      _getShiftDetails: (data) => getShiftDetails(data),
    }, dispatch)
  }
}

function mapStateToProps(state) {
  // console.log("==========> User",state);
  const { shifts, loader } = state;
  return {
    shiftDetails: shifts.details,
    isLoading: loader.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shift);