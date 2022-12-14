import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { useHistory, useLocation } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import { getShiftDetails } from '../../actions/shift';
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

const Shift = (props) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    console.log('---------location-----------',location.state)
    // _getShitfData(props.shiftId);
  }, []);

  const _getShitfData = async (id) => {
    try {

      const response = await props.actions._getShiftDetails(id);
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
                  // items={props.shiftDetails && props.shiftDetails.data ? props.shiftDetails.data : []}
                  items={dataArray}
                  fields={[
                    { key: 'name', label: 'Passenger', _classes: 'font-weight-bold' },
                    { key: 'pickup', label: "Pickup stop", _classes: 'font-weight-bold' },
                    { key: 'dropoff', label: "Dropoff stop", _classes: 'font-weight-bold' },
                    // { key: 'upPickupStopId', label: "Up Pickup stop", _classes: 'font-weight-bold' },
                    // { key: 'upDropoffStopId', label: "Up Dropoff stop", _classes: 'font-weight-bold' },
                    // { key: 'downPickupStopId', label: "Down Pickup stop", _classes: 'font-weight-bold' },
                    // { key: 'downDropoffStopId', label: "Down Dropoff stop", _classes: 'font-weight-bold' },

                  ]}
                  hover
                  striped
                  // itemsPerPage={10}
                  clickableRows
                  onRowClick={(row) => {
                    console.log('------------row',row)
                    props.history.push({
                      pathname: `/passenger/shift/list`,
                      search: `${row?.passenger?.id}`,
                      state: row
                    });
                  }}
                  // activePage={page}
                  scopedSlots={{
                    'name':
                      (item) => (
                        <td style={{ textTransform: 'capitalize' }}>
                          {item?.passenger?.phone}
                        </td>
                      ),
                    'pickup':
                      (item) => (
                        <td style={{ textTransform: 'capitalize' }}>
                          {item?.pickup?.name}
                        </td>
                      ),
                    'dropoff':
                      (item) => (
                        <td style={{ textTransform: 'capitalize' }}>
                          {item?.dropoff?.name}
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