import React, { useState, useEffect, lazy } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getAllBookingManagers } from '../../actions/drivers';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react';
import moment from 'moment';


const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const BookingManagers = (props) => {
  console.log('Props in User',props);
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [limit, setLimit] = useState(10)
  const [searchText, setSearchText] = useState('')

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
    setPage(newPage);
    getAllBookings(newPage);
  }

  // useEffect(() => {
  //   // console.log('=======>props',props);
  //   currentPage !== page && setPage(currentPage);
  //   getAllBookings();
  // }, [currentPage, page]);
    useEffect(() => {
    // console.log('=======>props',props);
    currentPage !== page && setPage(currentPage);
    getAllBookings(page);
  }, []);

  const getAllBookings = async (_page) => {
    try {
      const data = {
        page: _page, limit, searchText
      }
      const response = await props.actions._getAllBookingManagers(data);
      console.log('========> get all bookings repsonse',response);
    } catch (error) {
        console.log("Error in get booking list",error);
    }
  }

  const bookingsDataArray =  (props.allBookings && props.allBookings.data) ? props.allBookings.data : [];
  const totalPage = (props.allBookings && props.allBookings.pages) ? props.allBookings.pages : 1; 
  const itemsPerPage = (props.allBookings && props.allBookings.limit) ? props.allBookings.limit : 10; 
  console.log('========bookingsDataArray', bookingsDataArray, totalPage, itemsPerPage);
  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol xl={12}>
              <CCard>
                <CCardHeader>
                  Booking Managing List
                </CCardHeader>
                <CCardBody>
                  <CDataTable
                    loading={props.isLoading}
                    items={bookingsDataArray}
                    fields={[
                      { key: 'lname', label:'Learner Name' },
                      { key: 'sname', label: 'Sharer Name' },
                      { key: 'strength', label: 'Strength Name' },
                      { key: 'status', label: 'Status' },
                      { key: 'amount', label: 'Amount' },
                      { key: 'time_slot_start', label: 'Start Time' },
                      { key: 'time_slot_end', label: 'End Time' },
                      'created'
                    ]}
                    hover
                    striped
                    itemsPerPage={itemsPerPage}
                    activePage={page}
                    clickableRows
                    size='sm'
                    onRowClick={(item) => history.push(`/users/${item._id}`)}
                    scopedSlots={{
                      'status':
                        (item) => (
                          <td>
                            <CBadge color={getBadge(item.status)}>
                              {item.status}
                            </CBadge>
                          </td>
                        ),
                        'time_slot_start':
                        (item) => (
                          <td>
                              {moment(item.time_slot_start).format('Do MMM YYYY hh:mm a')}
                          </td>
                        ),
                        'time_slot_end':
                        (item) => (
                          <td>
                              {moment(item.time_slot_end).format('Do MMM YYYY hh:mm a')}
                          </td>
                        ),
                        'created':
                        (item) => (
                          <td>
                              {moment(item.created).format('Do MMM YYYY hh:mm a')}
                          </td>
                        ),
                    }}
                  />
                  <CPagination
                    activePage={page}
                    onActivePageChange={pageChange}
                    pages={totalPage}
                    doubleArrows={false}
                    align="center"
                  />
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
          _getAllBookingManagers: (data) => getAllBookingManagers(data),
      }, dispatch)
  }
}

function mapStateToProps(state) {
  // console.log("==========> User",state);
  const { users, loader } = state;
  return {
    allBookings: users.bookingManagers,
    isLoading: loader.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingManagers);
