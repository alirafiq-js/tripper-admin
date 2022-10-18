import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { useHistory, useLocation } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import { getPassengerDetails } from '../../actions';
import { Button, notification, Modal } from 'antd';
import {
  CCard, CCardBody, CCol, CRow, CLabel,
  CSelect,
  CFormGroup,
  CInput,
  CSpinner,
  CImg,
  CButton,
  CDataTable,
  CTooltip,
  CCardHeader
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import style from './style.css'

const Passenger = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { search} = location;
  useEffect(() => {
    console.log('---------location-----------',location)
    _getPassengerData(search.split('?')[1]);
  }, []);

  const _getPassengerData = async (id) => {
    try {

      const response = await props.actions._getPassengerDetails(id);
      console.log('========> get passenger repsonse', response);
    } catch (error) {
      console.log("Error in get list", error);
    }

  }

  const onDeleteDriver = async (user) => {
    try {

      const data = {
        user_id: user._id
      };
      const deleteDriverResponse = await props.actions._deleteDriver(data);
      notification['success']({
        message: 'User deleted successfully',
      });
      history.push(`/drivers`);
    } catch (error) {
      console.log(error);
      notification['error']({
        message: (error.response && error.response.data) ? error.response.data.message : 'something went wrong',
        placement: 'bottomRight',
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

  // const userData = props.userDetails.data;
  const userData = {};

const dataArray = (location.state && location.state.customers) ? location.state.customers : [];


  return (
    <CRow>
      <CCol lg={12} md={12} xs={12}>
        <CCardBody style={{ padding: 0 }}>
          {props.isLoading ?
            <CSpinner
              style={{ width: '40px', height: '40px', margin: '0 auto', display: 'flex' }}
              color="info"
              variant="grow"
            />
            :
            <CRow>
              <CCol lg={12} md={12}>
                <CDataTable
                  items={props.passengerDetails && props.passengerDetails.data ? props.passengerDetails.data : []}
                  fields={[
                    { key: 'name', label: 'Passenger name', _classes: 'font-weight-bold' },
                    { key: 'phone', label: 'Passenger phone', _classes: 'font-weight-bold' },
                    { key: 'email', label: 'Passenger email', _classes: 'font-weight-bold' },
                    { key: 'amount', label: "Amount", _classes: 'font-weight-bold' },
                    { key: 'upShift', label: "Up shift", _classes: 'font-weight-bold' },
                    { key: 'downShift', label: "Down shift", _classes: 'font-weight-bold' },
                    { key: 'plan', label: "Plan", _classes: 'font-weight-bold' },
                    { key: 'status', label: "Status", _classes: 'font-weight-bold' },
                    { key: 'created', label: "Created", _classes: 'font-weight-bold' },
                    // { key: 'upPickupStopId', label: "Up Pickup stop", _classes: 'font-weight-bold' },
                    // { key: 'upDropoffStopId', label: "Up Dropoff stop", _classes: 'font-weight-bold' },
                    // { key: 'downPickupStopId', label: "Down Pickup stop", _classes: 'font-weight-bold' },
                    // { key: 'downDropoffStopId', label: "Down Dropoff stop", _classes: 'font-weight-bold' },

                  ]}
                  hover
                  striped
                  // itemsPerPage={10}
                  // activePage={page}
                  scopedSlots={{
                    'name':
                      (item) => (
                        <td style={{ textTransform: 'capitalize' }}>
                          {item?.passenger?.name}
                        </td>
                      ),
                      'phone':
                      (item) => (
                        <td style={{ textTransform: 'capitalize' }}>
                          {item?.passenger?.phone}
                        </td>
                      ),
                      'email':
                      (item) => (
                        <td style={{ textTransform: 'capitalize' }}>
                          {item?.passenger?.email}
                        </td>
                      ),
                    'upShift':
                      (item) => (
                        <td style={{ textTransform: 'capitalize' }}>
                          {item?.shift_name?.up_shift}
                        </td>
                      ),
                      'downShift':
                      (item) => (
                        <td style={{ textTransform: 'capitalize' }}>
                          {item?.shift_name?.down_shift}
                        </td>
                      ),
                    'plan':
                      (item) => (
                        <td style={{ textTransform: 'capitalize' }}>
                          {item?.plan?.name}
                        </td>
                      ),
                      'status':
                      (item) => (
                        <td style={{ textTransform: 'capitalize' }}>
                          {item?.status === 'Completed' ? 'Paid' : item?.status}
                        </td>
                      ),
                      'created':
                      (item) => (
                        <td>
                            {moment(item.created).format('Do MMM YYYY hh:mm a')}
                        </td>
                      ),
                    // 'upPickupStopId':
                    //   (item) => (
                    //     <td style={{ textTransform: 'capitalize' }}>
                    //       {item?.downDropoffStopId?.name}
                    //     </td>
                    //   ),
                    // 'upDropoffStopId':
                    //   (item) => (
                    //     <td style={{ textTransform: 'capitalize' }}>
                    //       {item?.upDropoffStopId?.name}
                    //     </td>
                    //   ),
                    // 'downPickupStopId':
                    //   (item) => (
                    //     <td style={{ textTransform: 'capitalize' }}>
                    //       {item?.downPickupStopId?.name}
                    //     </td>
                    //   ),
                    // 'downDropoffStopId':
                    //   (item) => (
                    //     <td style={{ textTransform: 'capitalize' }}>
                    //       {item?.downDropoffStopId?.name}
                    //     </td>
                    //   ),
                  }}
                />

              </CCol>
            </CRow>
          }
        </CCardBody>
      </CCol>
    </CRow>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      _getPassengerDetails: (data) => getPassengerDetails(data),
    }, dispatch)
  }
}

function mapStateToProps(state) {
  // console.log("==========> User",state);
  const { passengers, loader } = state;
  return {
    passengerDetails: passengers.details,
    isLoading: loader.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Passenger);