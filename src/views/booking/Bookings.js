import React, { useState, useEffect, lazy } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getAllBookings, getFilterBooking, updateBooking, } from '../../actions';
import moment from 'moment';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CInput,
} from '@coreui/react';
import { Button, Modal, Form, notification, Input, Select, Radio, TimePicker } from 'antd';

const Bookings = (props) => {
  console.log('Props in Booking', props);
  const history = useHistory()
  const [form] = Form.useForm();
  const formRef = React.createRef();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [limit, setLimit] = useState(10)
  const [searchText, setSearchText] = useState(null);
  const [state, setState] = useState({
    isEditingBooking: false,
    editingBookingId: null,
    openModal: false,
    bookingName: '',
    bookingSeats: ''
  });

  const { Option } = Select;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/bookings?page=${newPage}`)
    setPage(newPage);
    getBookings(newPage);
  }
  
  useEffect(() => {
    currentPage !== page && setPage(currentPage);
    getBookings(page);
  }, []);


  const initState = () => {
    console.log("-============cloas call")
    setState({
      isEditingBooking: false,
      editingBookingId: null,
      openModal: false,
    });
  }
  const getBookings = async (_page) => {
    try {
      const data = {
        page: _page, limit, searchText,
      }
      const response = await props.actions._getAllBookings(data);

      console.log('========> get all booking repsonse', response);
    } catch (error) {
      console.log("Error in get list", error);
    }

  }

  // const _searchByText = async ()=>{
  //   const data = {
  //     page: page,
  //     limit,
  //     searchText,
  //   }
  //   const response = await props.actions._getFilterBooking(data);
  // }


  const showApproveDialog = (item) => {
    console.log('-------------clicked item',item);
    try {
        Modal.confirm({
          title: 'Are you sure approve this booking?',
          okText: 'Yes',
          okType: 'primary',
          cancelText: 'No',
          onOk: () => onApproveBooking(item),
          onCancel() {
            console.log('Cancel');
          },
        });

    } catch (error) {

    }
  }

  const onApproveBooking = async (booking) => {
    try {
      const approveBooking = await props.actions._updateBooking(booking);
      // getDrivers(currentPage);
      initState();
    } catch (error) {
      console.log(error);
      notification['error']({
         message: (error.response && error.response.data) ?  error.response.data.message : 'something went wrong',
         placement:'bottomRight',
      });
      initState();
    }

  }
  

const bookingDataArray = (props.allBookings && props.allBookings.data) ? props.allBookings.data : [];
const totalPage = (props.allBookings && props.allBookings.pages) ? props.allBookings.pages : 1;
const itemsPerPage = (props.allBookings && props.allBookings.limit) ? props.allBookings.limit : 10;


  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol xl={12}>
              <CCard>
                <CCardHeader>
                  Bookings
                </CCardHeader>
                <CCardBody>
                  {/* <CRow>
                    <CCol xs="12" md="6">
                      <CRow>
                        <CCol xs="12" md="6">
                        <CInput onChange={(e)=>setSearchText(e.target.value)} id="company" placeholder="Name" />
                        </CCol>
                        <CCol xs="12" md="6">
                          <Button ghost onClick={_searchByText}  type='primary'>Search</Button>
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol xs="12" md="6">
                      <Button type="primary" onClick={showModal} style={{ float: 'right', marginBottom: '18px' }} ghost>Add</Button>
                    </CCol>
                  </CRow> */}
                  <CDataTable
                    items={bookingDataArray}
                    loading={props.isLoading}
                    size='lg'
                    fields={[
                      // { key: 'name', _classes: 'font-weight-bold', _style: { padding: '0px 30px' } },
                      { key: 'passengerName', label: 'Passenger Name' },
                      { key: 'passengerPhone', label: 'Passenger Phone' },
                      { key: 'packageName', label: 'Package' },
                      { key: 'packagePrice', label: 'Package Price' },
                      { key: 'amount', label: 'Amount' },
                      { key: 'upShift', label: 'Up Shift' },
                      { key: 'downShift', label: 'Down Shift' },
                      { key: 'status', label: 'Status' },
                      'actions'
                    ]}
                    hover
                    striped
                    // itemsPerPage={itemsPerPage}
                    activePage={page}
                    // clickableRows
                    scopedSlots={{
                      'passengerName':
                      (item) => (
                        <td>
                          {item?.passenger?.name}
                        </td>
                      ),
                      'passengerPhone':
                      (item) => (
                        <td>
                          {item?.passenger?.phone}
                        </td>
                      ),
                      'packageName':
                      (item) => (
                        <td>
                          {item?.package_id?.name}
                        </td>
                      ),
                      'packagePrice':
                      (item) => (
                        <td>
                          Rs. {item?.package_id?.price}
                        </td>
                      ),
                      'amount':
                      (item) => (
                        <td>
                          Rs. {item?.amount}
                        </td>
                      ),
                      'upShift':
                      (item) => (
                        <td>
                          {item?.shift_name?.up_shift}
                        </td>
                      ),
                      'downShift':
                      (item) => (
                        <td>
                          {item?.shift_name?.down_shift}
                        </td>
                      ),
                        'created':
                        (item) => (
                          <td>
                              {moment(item?.created).format('Do MMM YYYY hh:mm a')}
                          </td>
                        ),
                        'actions':
                        (item) => (
                          <td>
                            <div>
                              {
                                item?.status === 'pending' ?
                                  <Button type="primary" onClick={() => showApproveDialog(item)} style={{ marginLeft: '5px' }} ghost>Approve</Button>
                                  :
                                  <Button type="primary" style={{ marginLeft: '5px' }} ghost>Approved</Button>

                              }
                            </div>
                          </td>
                        ),
                    }}
                  />
                  {/* <CPagination
                    activePage={page}
                    onActivePageChange={pageChange}
                    pages={totalPage}
                    doubleArrows={false}
                    align="center"
                  /> */}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      _getAllBookings: (data) => getAllBookings(data),
      _updateBooking: (data) => updateBooking(data),
      // _getFilterBookings: (data) => getFilterBookings(data),
    }, dispatch)
  }
}

function mapStateToProps(state) {
  console.log("==========> booking",state);
  const { bookings, loader } = state;
  return {
    allBookings: bookings.allBookings,
    isLoading: loader.loading,

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookings);
