import React, { useState, useEffect, lazy } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getAllDrivers, getFilterDriver, addDriver, deleteDriver, updateDriver } from '../../actions/drivers';
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


const getBadge = status => {
  switch (status) {
    case 'Verified': return 'success'
    case 'Unverified': return 'warning'
    default: return 'primary'
  }
}

const Drivers = (props) => {
  const [form] = Form.useForm();
  const formRef = React.createRef();
  console.log('Props in User', props);
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [limit, setLimit] = useState(10)
  const [searchText, setSearchText] = useState(null);
  const [state, setState] = useState({
    isEditingDriver: false,
    editingDriverId: null,
    openModal: false,
    driverName: '',
    driverPhone: ''
  });

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/drivers?page=${newPage}`)
    setPage(newPage);
    getDrivers(newPage);
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
    getDrivers(page);
  }, []);


  const initState = () => {
    setState({
      isEditingDriver: false,
      editingDriverId: null,
      driverName: '',
      driverPhone: '',
      openModal: false,
    })
  }
  const getDrivers = async (_page) => {
    try {
      const data = {
        page: _page, limit, searchText,
      }
      const response = await props.actions._getAllDrivers(data);

      console.log('========> get all user repsonse', response);
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
    const response = await props.actions._getFilterDriver(data);
  }

  const showModal = () => {
    setState({
      ...state,
      openModal: true
    });
  }

  const onEdit = (item) => {
    console.log('---------item',item);
    setState({
      ...state,
      driverName: item.name,
      driverPhone: item.phone,
      editingDriverId: item._id,
      isEditingDriver: true,
      openModal: true,
    })
  }


  const showDeleteDialog = (item) => {
    try {
        Modal.confirm({
          title: 'Are you sure delete this driver?',
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

  const onDeleteDriver = async (driver) => {
    try {
      const removeDriver = await props.actions._deleteDriver(driver._id);
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

      if (state.isEditingDriver) {
        const data = {
          name: state.driverName,
          phone: state.driverPhone,
        };
        const updateResponse = await props.actions._updateDriver({ id: state.editingDriverId, data });
        getDrivers(currentPage);
        initState();
      } else {
        
        const data = {
          name: state.driverName,
          phone: `92${state.driverPhone.slice(1)}`
        };
        const addStrengthResponse  = await props.actions._addDriver(data);
        getDrivers(currentPage);
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

  const userDataArray = (props.allDrivers && props.allDrivers.data) ? props.allDrivers.data : [];
  const totalPage = (props.allDrivers && props.allDrivers.pages) ? props.allDrivers.pages : 1;
  const itemsPerPage = (props.allDrivers && props.allDrivers.limit) ? props.allDrivers.limit : 10;
  console.log('========userDataArray', userDataArray, totalPage, itemsPerPage);

  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol xl={12}>
              <CCard>
                <CCardHeader>
                  Drivers
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs="12" md="6">
                      <CRow>
                        <CCol xs="12" md="6">
                        <CInput onChange={(e)=>setSearchText(e.target.value)} id="company" placeholder="Name/Phone" />
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
                    items={userDataArray}
                    loading={props.isLoading}
                    size='lg'
                    fields={[
                      { key: 'name', _classes: 'font-weight-bold', _style: { padding: '0px 30px', width: '250px' } },
                      // 'email',
                      { key: 'phone', label: 'Number' },
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
                title="Driver"
                onCancel={initState}
                footer={[
                  state.isEditingDriver ?
                    <Button key="submit" type="primary" ghost loading={props.isLoading} size="large" onClick={handleOk}>Update</Button>
                    :
                    <Button key="submit" type="primary" ghost loading={props.isLoading} size="large" onClick={handleOk}>Add</Button>
                ]}
              >
                <CRow>
                  <CCol xs="12" md="6">
                    <CRow>
                      <CCol xs="12" md="12">
                        <CInput style={{ marginBottom: '20px' }} value={state.driverName} name='driverName' onChange={(e) => setState({ ...state, driverName: e.target.value })} placeholder='Enter a driver name' />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="12" md="12">
                      <CInput value={state.driverPhone} name='driverPhone' onChange={(e) => setState({ ...state, driverPhone: e.target.value })} placeholder='Enter a driver phone' />
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
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
      _getAllDrivers: (data) => getAllDrivers(data),
      _getFilterDriver: (data) => getFilterDriver(data),
      _addDriver: (data) => addDriver(data),
      _deleteDriver: (data) => deleteDriver(data),
      _updateDriver: (data) => updateDriver(data),
    }, dispatch)
  }
}

function mapStateToProps(state) {
  console.log("==========> Driver",state);
  const { drivers, basicCodes, peerGroups, loader } = state;
  return {
    allDrivers: drivers.allDrivers,
    allUnivesities: basicCodes.univesities,
    allPeerGroups: peerGroups,
    allCountries: basicCodes.countries,
    isLoading: loader.loading

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drivers);
