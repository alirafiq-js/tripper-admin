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
import { Button, Modal, Form, notification, Input, Select, Radio, TimePicker } from 'antd';
import ShiftDetails from './Shift';


const Shifts = (props) => {
  console.log('Props in Shift', props);
  const history = useHistory()
  const [form] = Form.useForm();
  const formRef = React.createRef();
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
    shiftSeats: '',
    openDetailModal: false,
    shiftId: null,
  });
  const [statePayload, setStatePayload] = useState({
    name: '',
    busId: null,
    routeId: null,
    driverId: null,
    startTime: null,
    shiftType: 'weekly',
    month: moment().format('MMMM'),
    days: []
  });

  const { Option } = Select;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/shifts?page=${newPage}`)
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
      openModal: false,
      openDetailModal: false,
    });
    setStatePayload({
      name: '',
      busId: null,
      routeId: null,
      driverId: null,
      startTime: null,
      shiftType: 'weekly',
      month: moment().format('MMMM'),
      days: []
    });
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

  const getDrivers = async (page) => {
    try {
      const data = {
        type: 'all',
        page
      }
      const response = await props.actions._getAllDrivers(data);

      console.log('========> get all driver repsonse', response);
    } catch (error) {
      console.log("Error in get list", error);
    }

  }

  const getBuses = async (page) => {
    try {
      const data = {
        type: 'all',
        page
      }
      const response = await props.actions._getAllBuses(data);
    } catch (error) {
      console.log("Error in get list", error);
    }

  }

  const getRoutes = async (page) => {
    try {
      const data = {
        type: 'all',
        page
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
    console.log('-----------item',item);
    setStatePayload({
      name: item.name,
      busId: item.busId._id,
      routeId: item.routeId._id,
      driverId: item.driverId._id,
      startTime: moment(item.startTime),
      shiftType: item.shiftType,
      month: item.month,
      days: item.days,
    })
    setState({
      openModal: true,
      editingShiftId: item._id,
      isEditingShift: true,
    });
    console.log('-------state payload',statePayload)
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

  const onDeleteShift = async (shift) => {
    try {
      const removeShift = await props.actions._deleteShift(shift._id);
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
        console.log('----------Payload state', statePayload)
        const addResponse = await props.actions._addShift(statePayload);
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

  const detailModalToggle = (toggle,shiftId) => {
    setState({
      ...state,
      shiftId,
      openDetailModal: toggle
    });
  }

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'October', 'November', 'December'];

  for (let i = 0; i < 7; i++) {
    weekdays.push(<Option key={i}>{weekdays[i]}</Option>);
  }

  for (let i = 0; i < 12; i++) {
    months.push(<Option key={i}>{months[i]}</Option>);
  }

const handleChange = (key,value) => {
  console.log(`selected ${key} ${value}`);
  setStatePayload({
    ...statePayload,
    key: value
  })
};

const handleChangeFields = (e) => {
  const { name, value } = e.target;
  console.log(`change field ${name} and ${value}`);
  setStatePayload({
    ...statePayload,
    [name]: value
  })
};
  

const shiftDataArray = (props.allShifts && props.allShifts.data) ? props.allShifts.data : [];
const totalPage = (props.allShifts && props.allShifts.pages) ? props.allShifts.pages : 1;
const itemsPerPage = (props.allShifts && props.allShifts.limit) ? props.allShifts.limit : 10;

const allDriverArray = (props.allDrivers && props.allDrivers.data) ? props.allDrivers.data : [];
const allBusArray = (props.allBuses && props.allBuses.data) ? props.allBuses.data : [];
const allRouteArray = (props.allRoutes && props.allRoutes.data) ? props.allRoutes.data : [];

console.log('-------state payload 2',statePayload)


  form.setFieldsValue({
    bus: statePayload.busId,
    name: statePayload.name,
    bus: statePayload.busId,
    route: statePayload.routeId,
    driver: statePayload.driverId,
    // startTime: statePayload.startTime,
    shiftType: statePayload.shiftType,
    month: statePayload.month,
    weekdays: statePayload.days
  });

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
                      { key: 'name', _classes: 'font-weight-bold', _style: { padding: '0px 30px' } },
                      { key: 'busId', label: 'Bus' },
                      { key: 'driverId', label: 'Driver' },
                      { key: 'routeId', label: 'Route' },
                      { key: 'shiftType', label: 'Shift Type' },
                      'month',
                      'days',
                      { key: 'startTime', label: 'Start time' },
                      // 'location',
                      // { key: 'signUpVerificationStatus', label: 'Status' },
                      // { key: 'selected_peer_group', label: 'Selected Peer Group', _style: { width: '250px' } },
                      { key: 'created', label: 'Created' },
                      'actions'
                    ]}
                    hover
                    striped
                    itemsPerPage={itemsPerPage}
                    activePage={page}
                    // clickableRows
                    // onRowClick={() => detailModalToggle(true)}
                    scopedSlots={{
                      'busId':
                      (item) => (
                        <td>
                          {item.busId.name}
                        </td>
                      ),
                      'driverId':
                      (item) => (
                        <td>
                          {item.driverId.name}
                        </td>
                      ),
                      'routeId':
                      (item) => (
                        <td>
                          {item.routeId.name}
                        </td>
                      ),
                      'month':
                      (item) => (
                        <td>
                          {moment().month(item.month).format("MMMM")}
                        </td>
                      ),
                      'days':
                      (item) => (
                        <td>
                          {item.days.map((_day) => <span style={{ marginRight: 5 }}>{moment().day(_day).format("dddd")}</span>)}
                        </td>
                      ),
                        'created':
                        (item) => (
                          <td>
                              {moment(item.created).format('Do MMM YYYY hh:mm a')}
                          </td>
                        ),
                        'actions':
                        (item) => (
                          <td disabled>
                            <div>
                              <Button type="primary" onClick={() => detailModalToggle(true, item._id)} ghost>Details</Button>
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
                destroyOnClose
                footer={[
                  state.isEditingShift ?
                    <Button key="submit" type="primary" ghost loading={props.isLoading} size="large" onClick={handleOk}>Update</Button>
                    :
                    <Button key="submit" type="primary" ghost loading={props.isLoading} size="large" onClick={handleOk}>Add</Button>
                ]}
              >
                {/* <AddShiftModal openModal={state.openModal} initState={initState} allDrivers={allDriverArray} allBuses={allBusArray} allRoutes={allRouteArray} /> */}
                <Form
                  labelCol={{
                    span: 4,
                  }}
                  wrapperCol={{
                    span: 14,
                  }}
                  form={form}
                  ref={formRef}
                  name="control-ref"
                  layout="horizontal"
                  // onValuesChange={onFormLayoutChange}
                  onFinish={(value) => console.log('---------------on Finsih', value)}
                >

                  <Form.Item


                    label="Name"
                    name='name'
                    valuePropName="checked"
                    rules={[
                      {
                        required: true,
                        message: 'Please type name'
                      },
                    ]}
                    form={form}
                  >
                    <Input name='name' value={statePayload.name} onChange={(e) => handleChangeFields(e)} placeholder="Name" />
                  </Form.Item>
                  <Form.Item
                    label="Days"
                    name="weekdays"
                    valuePropName="checked"
                    rules={[
                      {
                        required: true,
                        message: 'Please select days'
                      },
                    ]}
                    form={form}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      style={{
                        width: '100%',
                      }}
                      placeholder="Please select days"
                      defaultValue={statePayload.days}
                      onChange={(val) => setStatePayload({ ...statePayload, days: val })}
                    >
                      {weekdays}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Months"
                    name="month"
                    valuePropName="checked"
                    rules={[
                      {
                        required: true,
                        message: 'Please select days'
                      },
                    ]}
                    form={form}
                  >
                    <Select
                      allowClear
                      style={{
                        width: '100%',
                      }}
                      placeholder="Please select month"
                      defaultValue={statePayload.month}
                      onChange={(val) => setStatePayload({ ...statePayload, month: val })}
                    >
                      {months}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Shift Type"
                    name="shiftType"
                    rules={[
                      {
                        required: true,
                        message: 'Please select shift type'
                      },
                    ]}
                    form={form}
                  >
                    <Radio.Group name='shiftType' value={statePayload.shiftType} onChange={(e) => handleChangeFields(e)}>
                      <Radio value="weekly"> Weekly </Radio>
                      <Radio value="monthly"> Monthly </Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    label="Driver"
                    name="driver"
                    placeholder="Please select driver"
                    rules={[
                      {
                        required: true,
                        message: 'Please select driver'
                      },
                    ]}
                    form={form}
                  >
                    <Select defaultValue={statePayload.driverId} value={statePayload.driverId} onChange={(val) => setStatePayload({ ...statePayload, driverId: val })} >

                      {
                        allDriverArray.map((item, index) => (
                          <Select.Option value={item._id} key={index} >{item.name}</Select.Option>
                        ))
                      }
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Bus"
                    name="bus"
                    placeholder="Please select bus"
                    rules={[
                      {
                        required: true,
                        message: 'Please select bus'
                      },
                    ]}
                    form={form}
                  >
                    <Select defaultValue={statePayload.busId} value={statePayload.busId} onChange={(val) => setStatePayload({ ...statePayload, busId: val })} >
                      {
                      allBusArray.map((item, index) => (
                          <Select.Option value={item._id} key={index} >{item.name}</Select.Option>
                        ))
                      }
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Route"
                    name="route"
                    placeholder="Please select route"
                    rules={[
                      {
                        required: true,
                        message: 'Please select route'
                      },
                    ]}
                    form={form}
                  >
                    <Select defaultValue={statePayload.routeId} value={statePayload.routeId} onChange={(val) => setStatePayload({ ...statePayload, routeId: val })} >
                      {
                        allRouteArray.map((item, index) => (
                          <Select.Option value={item._id} key={index} >{item.name}</Select.Option>
                        ))
                      }
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Timing"
                    name="startTime"
                    rules={[
                      {
                        required: true,
                        message: 'Please select timing'
                      },
                    ]}
                    form={form}
                  >
                    {/* <RangePicker
            // defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
            format={dateFormat}
            onChange={(val) => console.log('-------- val', val)}
          /> */}
                    <TimePicker value={statePayload.startTime} onChange={(val) => setStatePayload({ ...statePayload, startTime: moment(val).format('HH:mm') })} format={'HH:mm'} />
                  </Form.Item>
                </Form>
              </Modal>
              <Modal
                visible={state.openDetailModal}
                title="Details"
                onCancel={initState}
                destroyOnClose
                width={1000}
                // footer={[
                //   state.isEditingShift ?
                //     <Button key="submit" type="primary" ghost loading={props.isLoading} size="large" onClick={handleOk}>Update</Button>
                //     :
                //     <Button key="submit" type="primary" ghost loading={props.isLoading} size="large" onClick={handleOk}>Add</Button>
                // ]}
              >
                <ShiftDetails detailModalToggle={detailModalToggle} shiftId={state.shiftId} />
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
