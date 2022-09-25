import React, { useState, useEffect, lazy } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getAllShift, getFilterShift, addShift, deleteShift, updateShift, getAllBus, getAllDrivers, getAllRoute } from '../../actions';
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
import { Button, Modal, Form, notification, Input } from 'antd';
import AddShiftModal from './AddShiftModal';


const Shifts = (props) => {
  console.log('Props in Shift', props);
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [limit, setLimit] = useState(10)
  const [searchText, setSearchText] = useState(null);
  const [state, setState] = useState({
    isEditingShift: false,
    editingShiftId: null,
    openModal: false,
    shiftName: '',
    shiftSeats: ''
  });

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/drivers?page=${newPage}`)
    setPage(newPage);
    getShifts(newPage);
  }
  
  useEffect(() => {
    currentPage !== page && setPage(currentPage);
    getShifts(page);
    getDrivers(page);
    getBuses(page);
    getRoutes(page);
  }, []);


  const initState = () => {
    setState({
      isEditingShift: false,
      editingShiftId: null,
      shiftName: '',
      shiftSeats: '',
      openModal: false,
    })
  }
  const getShifts = async (_page) => {
    try {
      const data = {
        page: _page, limit, searchText,
      }
      const response = await props.actions._getAllShift(data);

      console.log('========> get all shift repsonse', response);
    } catch (error) {
      console.log("Error in get list", error);
    }

  }

  const getDrivers = async (_page) => {
    try {
      const data = {
        page: _page, limit, searchText,
      }
      const response = await props.actions._getAllDrivers(data);

      console.log('========> get all driver repsonse', response);
    } catch (error) {
      console.log("Error in get list", error);
    }

  }

  const getBuses = async (_page) => {
    try {
      const data = {
        page: _page, limit, searchText,
      }
      const response = await props.actions._getAllBuses(data);
    } catch (error) {
      console.log("Error in get list", error);
    }

  }

  const getRoutes = async (_page) => {
    try {
      const data = {
        page: _page, limit, searchText,
      }
      const response = await props.actions._getAllRoutes(data);
    } catch (error) {
      console.log("Error in get list", error);
    }

  }

  const _searchByText = async ()=>{
    const data = {
      page: page,
      limit,
      searchText,
    }
    const response = await props.actions._getFilterShift(data);
  }

  const showModal = () => {
    setState({
      ...state,
      openModal: true
    });
  }

  const onEdit = (item) => {
    setState({
      ...state,
      shiftName: item.name,
      shiftSeats: item.seats,
      editingShiftId: item._id,
      isEditingShift: true,
      openModal: true,
    })
  }


  const showDeleteDialog = (item) => {
    try {
        Modal.confirm({
          title: 'Are you sure delete this shift?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: () => onDeleteShift(item),
          onCancel() {
            console.log('Cancel');
          },
        });

    } catch (error) {

    }
  }

  const onDeleteShift = async (driver) => {
    try {
      const removeShift = await props.actions._deleteShift(driver._id);
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

  const handleOk = async () => {
    try {

      if (state.isEditingShift) {
        const data = {
          name: state.shiftName,
          seats: state.shiftSeats,
        };
        const updateResponse = await props.actions._updateShift({ id: state.editingShiftId, data });
        getShifts(currentPage);
        initState();
      } else {
        
        const data = {
          name: state.shiftName,
          seats: state.shiftSeats
        };
        const addResponse  = await props.actions._addShift(data);
        getShifts(currentPage);
        initState();
      }
    } catch (error) {
      console.log(error);
      notification['error']({
         message: (error.response && error.response.data) ?  error.response.data.message : 'something went wrong',
         placement:'bottomRight',
      });
      initState();
    }

  }

  const shiftDataArray = (props.allShifts && props.allShifts.data) ? props.allShifts.data : [];
  const totalPage = (props.allShifts && props.allShifts.pages) ? props.allShifts.pages : 1;
  const itemsPerPage = (props.allShifts && props.allShifts.limit) ? props.allShifts.limit : 10;
  console.log('========shiftDataArray', shiftDataArray, totalPage, itemsPerPage);
  const allDriverArray = (props.allDrivers && props.allDrivers.data) ? props.allDrivers.data : [];
  const allBusArray = (props.allBuses && props.allBuses.data) ? props.allBuses.data : [];
  const allRouteArray = (props.allRoutes && props.allRoutes.data) ? props.allRoutes.data : [];
  

  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol xl={12}>
              <CCard>
                <CCardHeader>
                  Shift
                </CCardHeader>
                <CCardBody>
                  <CRow>
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
                  </CRow>
                  <CDataTable
                    items={shiftDataArray}
                    loading={props.isLoading}
                    size='lg'
                    fields={[
                      { key: 'name', _classes: 'font-weight-bold', _style: { padding: '0px 30px', width: '250px' } },
                      // 'email',
                      { key: 'seats', label: 'Seats' },
                      // 'location',
                      // { key: 'signUpVerificationStatus', label: 'Status' },
                      // { key: 'selected_peer_group', label: 'Selected Peer Group', _style: { width: '250px' } },
                      { key: 'created', label: 'Created', _style: { width: '300px' } },
                      'actions'
                    ]}
                    hover
                    striped
                    itemsPerPage={itemsPerPage}
                    activePage={page}
                    clickableRows
                    scopedSlots={{
                        'created':
                        (item) => (
                          <td>
                              {moment(item.created).format('Do MMM YYYY hh:mm a')}
                          </td>
                        ),
                        'actions':
                        (item) => (
                          <td>
                            <div>
                              <Button type="primary" onClick={() => onEdit(item)} ghost>Edit</Button>
                              <Button type="danger" onClick={() => showDeleteDialog(item)} style={{ marginLeft: '5px' }} ghost>Delete</Button>
                            </div>
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
              <Modal
                visible={state.openModal}
                title="Shift"
                onCancel={initState}
                footer={[
                  state.isEditingShift ?
                    <Button key="submit" type="primary" ghost loading={props.isLoading} size="large" onClick={handleOk}>Update</Button>
                    :
                    <Button key="submit" type="primary" ghost loading={props.isLoading} size="large" onClick={handleOk}>Add</Button>
                ]}
              >
                <AddShiftModal allDrivers={allDriverArray} allBuses={allBusArray}  allRoutes={allRouteArray} />
              </Modal>
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
      _getAllShift: (data) => getAllShift(data),
      _getFilterShift: (data) => getFilterShift(data),
      _addShift: (data) => addShift(data),
      _deleteShift: (data) => deleteShift(data),
      _updateShift: (data) => updateShift(data),
      _getAllDrivers: (data) => getAllDrivers(data),
      _getAllBuses: (data) => getAllBus(data),
      _getAllRoutes: (data) => getAllRoute(data),
    }, dispatch)
  }
}

function mapStateToProps(state) {
  console.log("==========> Shift",state);
  const { shifts, drivers, buses, loader, routes } = state;
  return {
    allShifts: shifts.allShifts,
    allDrivers: drivers.allDrivers,
    allBuses: buses.allBuses,
    allRoutes: routes.allRoutes,
    isLoading: loader.loading,

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shifts);
