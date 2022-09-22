import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getAllSubAdmins, getAllRole, addSubAdmin, editSubAdmin, statusSubAdmin, getAllPeerGroups, emptyPeerGroup } from '../../actions';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'
import moment from 'moment';
import { Form, Input, Button, Select, Row, Col, notification, Modal } from 'antd';

const { Option } = Select;

const getBadge = status => {
  switch (status) {
    case true: return 'success'
    case false: return 'danger'
    default: return 'primary'
  }
}
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Users = (props) => {
  console.log('Props in User', props);
  const [form] = Form.useForm();
  const formRef = React.createRef();
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [limit, setLimit] = useState(10)
  const [searchText, setSearchText] = useState('');
  const [state, setState] = useState({
    openModal: false,
    name: '',
    email: '',
    password: '',
    countryCode: '',
    mobile: '',
    userRole: '',
    editableSubAdmin: null,
    selectedRole: null,
    selectedPeerGroup: null,
  });

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/subadmins?page=${newPage}`)
    setPage(newPage);
    getAllSubAdmin(newPage);
  }

  useEffect(() => {
    // console.log('=======>props',props);

    currentPage !== page && setPage(currentPage);
    getRolesFunc(page);
    getAllSubAdmin(page);
    getPeerGroupFunc()
    return async ()=>{
      console.log("un mount call");
      await props.actions._emptyPeerGroup();
    }
  }, []);

  const initState = ()=>{
    setState({
      openModal: false,
      name: '',
      email: '',
      password: '',
      countryCode: '',
      mobile: '',
      userRole: '',
      editableSubAdmin: null,
      selectedRole: null,
      selectedPeerGroup: null,
    })
  }

  const getAllSubAdmin = async (_page) => {
    try {
      const data = {
        page: _page, limit, searchText
      }
      const response = await props.actions._getAllSubAdmins(data);
      console.log('========> get all user repsonse', response);
    } catch (error) {
      console.log("Error in get list", error);
    }
  }


  const getRolesFunc = async (_page) => {
    try {
      const data = {
        page: _page, limit, searchText
      }
      const response = await props.actions._getAllRoles(data);
      console.log('========> get all user repsonse', response);
    } catch (error) {
      console.log("Error in get list", error);
    }
  }

  const showModal = () => {
    setState({
      ...state,
      openModal: true
    });
  }

  const getPeerGroupFunc = async () => {
    try {
      const data = {
        page: 1, limit: 10, searchText: '', status: 'approved', type: 'all'
      }
      const response = await props.actions._getAllPeerGroups(data);
      console.log('========> get peer group repsonse', response);
    } catch (error) {
      console.log("Error in get list", error);
      notification['error']({
        message: (error.response && error.response.data) ?  error.response.data.message : 'something went wrong',
        placement:'bottomRight',
      });
    }
  }


  const onChangeRole = (value) => {
    console.log('selected role type', value);
    const userRole = roleDataArray.filter((role) => role._id.toString() === value);
    console.log('user Role',userRole)
    setState({
      ...state,
      userRole: value,
      selectedRole : userRole[0],
    });
  };

  const onChangePeerGroup = (value) => {
    console.log('selected peer group', value);
    setState({
      ...state,
      selectedPeerGroup : value,
    });
  };

  const handleOk = async () => {
    try {
      const addSubAdmin = {
        name: state.name,
        email: state.email,
        // password: state.password,
        countryCode: state.countryCode,
        mobile: state.mobile,
        userRole: state.userRole,
      }

      if (state.selectedPeerGroup) {
        addSubAdmin.peerGroupId = state.selectedPeerGroup
      }


      await props.actions._addSubAdmin(addSubAdmin);

      console.log("============= addSubAdmin", addSubAdmin);
      getAllSubAdmin(currentPage);
      initState();
    } catch (error) {
      console.log(error,"=====================ERORO",error.response);
      notification['error']({
        message: (error.response && error.response.data) ?  error.response.data.message : 'something went wrong',
        placement:'bottomRight',
      });
      initState();
    }

  }

  const saveSubAdmin = async () => {
    try {
      const editSubAdmin = {
        name: state.name,
        email: state.email,
        countryCode: state.countryCode ? state.countryCode.toString() : '',
        mobile: state.mobile ? state.mobile.toString() : '',
        userRole: state.userRole,
      }

      // if (state.password) {
      //   editSubAdmin.password = state.password;
      // }

      await props.actions._editSubAdmin({ id: state.editableSubAdmin, data: editSubAdmin });

      console.log("============= editSubAdmin", editSubAdmin);
      getAllSubAdmin(currentPage);
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


  const handleCancel = () => {
    initState();
  }

  form.setFieldsValue({
    name: state.name ? state.name : '',
    email: state.email ? state.email : '',
    password: state.password ? state.password : '',
    countryCode: state.countryCode ? state.countryCode : '',
    mobile: state.mobile ? state.mobile : '',
    userRole: state.userRole ? state.userRole : null,
    peerGroup : state.selectedPeerGroup ? state.selectedPeerGroup : null
  });

  const onFeildChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const openEditModal = (item) => {
    console.log("=======> item",item);

    const userRole = roleDataArray.filter((role) => role.roleName === item.userRole.roleName);
    console.log('userRole',userRole);

    setState({
      ...state,
      name: item.name,
      email: item.email,
      countryCode: item.countryCode,
      mobile: item.mobile,
      userRole: userRole[0]._id,
      editableSubAdmin: item._id,
      openModal: true,
      selectedPeerGroup: item.peerGroupId ? item.peerGroupId : null,
      selectedRole : userRole[0]
    });
  }

  const onStatusChange = async (item, status) => {
    try {
      const updateStatusData = {
        isActive: status
      }

      await props.actions._statusSubAdmin({ id: item._id, data: updateStatusData });
      getAllSubAdmin(currentPage);
    } catch (error) {
      console.log("Eror on status change");
      notification['error']({
        message: (error.response && error.response.data) ?  error.response.data.message : 'something went wrong',
        placement:'bottomRight',
      });
    }
  }

  const showStatusButton = (item) => {

    if (item.isActive) {
      return (
        <div>
          <Button ghost style={{ width: '80px' }} type='primary' onClick={() => openEditModal(item)}>Edit</Button>
          <Button ghost type='danger' style={{ marginLeft: '5px' }} onClick={() => onStatusChange(item, false)}>Deactivate</Button>
        </div>
      )
    } else {
      return (
        <div>
          <Button ghost disabled={!item.isActive} style={{ width: '80px' }} type='primary' onClick={() => console.log('a')}>Edit</Button>
          <Button ghost type='primary' style={{ marginLeft: '5px' }} onClick={() => onStatusChange(item, true)}>Activate</Button>
        </div>
      )
    }
  }

  const subAdminsDataArray = (props.allSubAdmins && props.allSubAdmins.data) ? props.allSubAdmins.data : [];
  const totalPage = (props.allSubAdmins && props.allSubAdmins.pages) ? props.allSubAdmins.pages : 1;
  const itemsPerPage = (props.allSubAdmins && props.allSubAdmins.limit) ? props.allSubAdmins.limit : 10;
  console.log('========subAdminsDataArray', subAdminsDataArray, totalPage, itemsPerPage);

  const roleDataArray = (props.allRoles && props.allRoles.data) ? props.allRoles.data : [];
  const peerGroupDataArray = (props.allPeerGroups && props.allPeerGroups.data) ? props.allPeerGroups.data : [];

console.log("peerGroupDataArray",peerGroupDataArray);

  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol xl={12}>
              <CCard>
                <CCardHeader>
                  <Row>
                    <Col md={21} >
                      Sub Admins
                    </Col>
                    <Col md={3}>
                      <Button key="submit" type="primary" ghost style={{ padding: '0px  20px', height: '30px' }} loading={props.isLoading} size="large" onClick={() => showModal()}>Add</Button>
                    </Col>
                  </Row>
                </CCardHeader>
                <CCardBody>
                  <CDataTable
                    loading={props.isLoading}
                    items={subAdminsDataArray}
                    fields={[
                      { key: 'name' },
                      { key: 'email' },
                      { key: 'userRole', label: 'Role' },
                      { key: 'mobile' },
                      { key: 'isActive', label: 'Status' },
                      { key: 'action', label: 'Action' },
                    ]}
                    hover
                    striped
                    itemsPerPage={itemsPerPage}
                    activePage={page}
                    scopedSlots={{
                      'isActive':
                        (item) => (
                          <td>
                            <CBadge color={getBadge(item.isActive)} style={{ padding: 5 }}>
                              {item.isActive ? 'True' : 'False'}
                            </CBadge>
                          </td>
                        ),
                      'userRole':
                        (item) => (<td>
                          {item.userRole.roleName}
                        </td>
                        ),
                      'mobile':
                        (item) => (<td>
                          {item.countryCode}{item.mobile}
                        </td>
                        ),
                      'created':
                        (item) => (
                          <td>
                            {moment(item.created).format('Do MMM YYYY hh:mm a')}
                          </td>
                        ),
                      'action':
                        (item) => (
                          <td>
                            {
                              showStatusButton(item)
                            }
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
          <Modal
            visible={state.openModal}
            title="Sub admin"
            onCancel={handleCancel}
            footer={[
              state.editableSubAdmin ?
                <Button key="submit" type="primary" ghost loading={props.isLoading} size="large" onClick={saveSubAdmin}>Save</Button>
                :
                <Button key="submit" type="primary" ghost loading={props.isLoading} size="large" onClick={handleOk}>Add</Button>
            ]}
          >
            <Form {...layout} form={form} ref={formRef} name="control-ref" onFinish={() => console.log("on Finish")}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter name'
                  },
                ]}
                form={form}
              >
                <Input onChange={(e) => onFeildChange(e)} name='name' placeholder='Enter name' />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please enter email'
                  },
                ]}
                form={form}
              >
                <Input type='email' onChange={(e) => onFeildChange(e)} name='email' placeholder='Enter email' />
              </Form.Item>
              {/* <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please enter password'
                  },
                ]}
                form={form}
              >
                <Input onChange={(e) => onFeildChange(e)} name='password' placeholder='Enter password' />
              </Form.Item> */}
              <Form.Item
                name="countryCode"
                rules={[
                  {
                    required: true,
                    message: 'Please enter country code'
                  },
                ]}
                form={form}
              >
                <Input onChange={(e) => onFeildChange(e)} name="countryCode" placeholder='Enter country code' />
              </Form.Item>
              <Form.Item
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: 'Please enter mobile'
                  },
                ]}
                form={form}
              >
                <Input onChange={(e) => onFeildChange(e)} name='mobile' placeholder='Enter mobile' />
              </Form.Item>
              <Form.Item
                name="userRole"
                //   label="Gender"
                rules={[
                  {
                    required: true,
                    message: 'Please select user role'
                  },
                ]}
              >
                <Select
                  placeholder="Select a user role"
                  onChange={onChangeRole}
                  allowClear
                >
                  {
                    roleDataArray.map((role) => (
                      <Option key={role._id} value={role._id}>{role.roleName}</Option>
                    ))
                  }
                </Select>
              </Form.Item>
              {
                state.selectedRole && state.selectedRole.userRole === 5 &&
                <Form.Item
                  name="peerGroup"
                  //   label="Gender"
                  rules={[
                    {
                      required: true,
                      message: 'Please select peer group'
                    },
                  ]}
                >
                  <Select
                    placeholder="Select a peer group"
                    onChange={onChangePeerGroup}
                    allowClear
                  >
                    {
                      peerGroupDataArray.map((peerGroup) => (
                        <Option key={peerGroup._id} value={peerGroup._id}>{peerGroup.label}</Option>
                      ))
                    }
                  </Select>
                </Form.Item>
              }
            </Form>
          </Modal>
        </CCardBody>
      </CCard>
    </>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      _getAllSubAdmins: (data) => getAllSubAdmins(data),
      _getAllRoles: (data) => getAllRole(data),
      _addSubAdmin: (data) => addSubAdmin(data),
      _editSubAdmin: (data) => editSubAdmin(data),
      _statusSubAdmin : (data) => statusSubAdmin(data),
      _getAllPeerGroups: (data) => getAllPeerGroups(data),
      _emptyPeerGroup: (data) => emptyPeerGroup(data),
    }, dispatch)
  }
}

function mapStateToProps(state) {
  const { subAdmins, loader, roles, peerGroups } = state;
  return {
    allSubAdmins: subAdmins,
    isLoading: loader.loading,
    allRoles: roles,
    allPeerGroups: peerGroups,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);