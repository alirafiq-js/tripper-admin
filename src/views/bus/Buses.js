import React, { useState, useEffect, lazy } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getAllBus, getFilterBus, addBus, deleteBus, updateBus } from '../../actions/';
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


const Buses = (props) => {
  const [form] = Form.useForm();
  const formRef = React.createRef();
  console.log('Props in Bus', props);
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [limit, setLimit] = useState(10)
  const [searchText, setSearchText] = useState(null);
  const [state, setState] = useState({
    isEditingBus: false,
    editingBusId: null,
    openModal: false,
    busName: '',
    busSeats: ''
  });

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/drivers?page=${newPage}`)
    setPage(newPage);
    getBuses(newPage);
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
    getBuses(page);
  }, []);


  const initState = () => {
    setState({
      isEditingBus: false,
      editingBusId: null,
      busName: '',
      busSeats: '',
      openModal: false,
    })
  }
  const getBuses = async (_page) => {
    try {
      const data = {
        page: _page, limit, searchText,
      }
      const response = await props.actions._getAllBus(data);

      console.log('========> get all bus repsonse', response);
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
    const response = await props.actions._getFilterBus(data);
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
      busName: item.name,
      busSeats: item.seats,
      editingBusId: item._id,
      isEditingBus: true,
      openModal: true,
    })
  }


  const showDeleteDialog = (item) => {
    try {
        Modal.confirm({
          title: 'Are you sure delete this bus?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: () => onDeleteBus(item),
          onCancel() {
            console.log('Cancel');
          },
        });

    } catch (error) {

    }
  }

  const onDeleteBus = async (driver) => {
    try {
      const removeBus = await props.actions._deleteBus(driver._id);
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

      if (state.isEditingBus) {
        const data = {
          name: state.busName,
          seats: state.busSeats,
        };
        const updateResponse = await props.actions._updateBus({ id: state.editingBusId, data });
        getBuses(currentPage);
        initState();
      } else {
        
        const data = {
          name: state.busName,
          seats: state.busSeats
        };
        const addResponse  = await props.actions._addBus(data);
        getBuses(currentPage);
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

  const userDataArray = (props.allBuses && props.allBuses.data) ? props.allBuses.data : [];
  const totalPage = (props.allBuses && props.allBuses.pages) ? props.allBuses.pages : 1;
  const itemsPerPage = (props.allBuses && props.allBuses.limit) ? props.allBuses.limit : 10;
  console.log('========userDataArray', userDataArray, totalPage, itemsPerPage);

  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol xl={12}>
              <CCard>
                <CCardHeader>
                  Bus
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
                title="Bus"
                onCancel={initState}
                footer={[
                  state.isEditingBus ?
                    <Button key="submit" type="primary" ghost loading={props.isLoading} size="large" onClick={handleOk}>Update</Button>
                    :
                    <Button key="submit" type="primary" ghost loading={props.isLoading} size="large" onClick={handleOk}>Add</Button>
                ]}
              >
                <CRow>
                  <CCol xs="12" md="6">
                    <CRow>
                      <CCol xs="12" md="12">
                        <CInput style={{ marginBottom: '20px' }} value={state.busName} name='busName' onChange={(e) => setState({ ...state, busName: e.target.value })} placeholder='Enter bus name' />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="12" md="12">
                      <CInput value={state.busSeats} type='number' name='busSeats' onChange={(e) => setState({ ...state, busSeats: e.target.value })} placeholder='Enter seats count' />
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
      _getAllBus: (data) => getAllBus(data),
      _getFilterBus: (data) => getFilterBus(data),
      _addBus: (data) => addBus(data),
      _deleteBus: (data) => deleteBus(data),
      _updateBus: (data) => updateBus(data),
    }, dispatch)
  }
}

function mapStateToProps(state) {
  console.log("==========> Bus",state);
  const { buses, loader } = state;
  return {
    allBuses: buses.allBuses,
    isLoading: loader.loading

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buses);
