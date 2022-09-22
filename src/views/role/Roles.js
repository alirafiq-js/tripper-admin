import React, { useState, useEffect, lazy } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getAllRole, addRole, updateRoleStatus, updateRole } from '../../actions';
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

const getBadge = status => {
  switch (status) {
    case true: return 'success'
    case false: return 'danger'
    default: return 'primary'
  }
}


const Roles = (props) => {
  console.log('Props in User',props);
  const [form] = Form.useForm();
  const formRef = React.createRef();
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [limit, setLimit] = useState(10)
  const [searchText, setSearchText] = useState('')
  const [state, setState] = useState({
    openModal: false,
    roleName: '',
    editableRole: null
  });

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
    setPage(newPage);
    getRolesFunc(newPage);
  }

    useEffect(() => {
    // console.log('=======>props',props);
    currentPage !== page && setPage(currentPage);
    getRolesFunc(page);
  }, []);

  const getRolesFunc = async (_page) => {
    try {
      const data = {
        page: _page, limit, searchText
      }
      const response = await props.actions._getAllRoles(data);
      console.log('========> get all user repsonse',response);
    } catch (error) {
        console.log("Error in get list",error);
    }
  }

  const onFeildChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const showModal = () => {
    setState({
      ...state,
      openModal: true
    });
  }

  const handleOk = async () => {
    try {
      const addRoleData = {
        roleName: state.roleName,
      }

      await props.actions._addRole(addRoleData);

      getRolesFunc(currentPage);
      setState({
        ...state,
        openModal: false,
        roleName: '',
      });
    } catch (error) {
      console.log(error);
      notification['error']({
         message: (error.response && error.response.data) ?  error.response.data.message : 'something went wrong',
         placement:'bottomRight',
      });
      setState({
        ...state,
        openModal: false,
        roleName: '',
      });
    }
  }

  const saveRole = async () => {
    try {
      const updateRoleData = {
        roleName: state.roleName,
      }

      await props.actions._updateRole({ id: state.editableRole, data: updateRoleData });

      getRolesFunc(currentPage);
      setState({
        ...state,
        openModal: false,
        roleName: '',
        editableRole: null
      });
    } catch (error) {
      console.log(error);
      notification['error']({
         message: (error.response && error.response.data) ?  error.response.data.message : 'something went wrong',
         placement:'bottomRight',
      });
      setState({
        ...state,
        openModal: false,
        roleName: '',
        editableRole: null
      });
    }

  }


  const handleCancel = () => {
    setState({
      ...state,
      openModal: false,
      roleName: '',
    });
  }

  const openEditModal = (item) => {

    setState({
      ...state,
      roleName: item.roleName,
      editableRole: item._id,
      openModal: true,
    });
  }

  const onStatusChange = async (item, status) => {
    try {
      const updateStatusData = {
        isActive: status
      }

      await props.actions._updateRoleStatus({ id: item._id, data: updateStatusData });
      getRolesFunc(currentPage);
    } catch (error) {
      console.log("Eror on status change");
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

  form.setFieldsValue({
    roleName: state.roleName ? state.roleName : '',
  });

  const roleDataArray =  (props.allRoles && props.allRoles.data) ? props.allRoles.data : [];
  const totalPage = (props.allRoles && props.allRoles.pages) ? props.allRoles.pages : 1; 
  const itemsPerPage = (props.allRoles && props.allRoles.limit) ? props.allRoles.limit : 10; 
  console.log('========roleDataArray', roleDataArray, totalPage, itemsPerPage);
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
                      Roles
                    </Col>
                    <Col md={3}>
                      <Button key="submit" type="primary" ghost style={{ padding: '0px  20px', height: '30px' }} loading={props.isLoading} size="large" onClick={() => showModal()}>Add</Button>
                    </Col>
                  </Row>
                </CCardHeader>
                <CCardBody>
                  <CDataTable
                    loading={props.isLoading}
                    items={roleDataArray}
                    fields={[
                      { key: 'roleName', _classes: 'font-weight-bold' },
                      'created', { key: 'isActive', label: 'Active' },
                      { key: 'action', label: 'Actions' },
                    ]}
                    hover
                    striped
                    itemsPerPage={itemsPerPage}
                    activePage={page}
                    // clickableRows
                    // onRowClick={(item) => history.push(`/users/${item._id}`)}
                    scopedSlots={{
                      'isActive':
                        (item) => (
                          <td>
                            <CBadge color={getBadge(item.isActive)} style={{ padding: 5 }}>
                              {item.isActive ? 'True' : 'False'}
                            </CBadge>
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
            title="Role"
            onCancel={handleCancel}
            footer={[
              state.editableRole ?
                <Button disabled={!state.roleName} key="submit" type="primary" ghost loading={props.isLoading} size="large" onClick={saveRole}>Save</Button>
                :
                <Button disabled={!state.roleName} key="submit" type="primary" ghost loading={props.isLoading} size="large" onClick={handleOk}>Add</Button>
            ]}
          >
            <Form {...layout} form={form} ref={formRef} name="control-ref" onFinish={() => console.log("on Finish")}>
              <Form.Item
                name="roleName"
                rules={[
                  {
                    required: true,
                    message: 'Please role name'
                  },
                ]}
                form={form}
              >
                <Input onChange={(e) => onFeildChange(e)} name='roleName' placeholder='Enter role name' />
              </Form.Item>
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
        _getAllRoles: (data) => getAllRole(data),
        _addRole: (data) => addRole(data),
        _updateRoleStatus: (data) => updateRoleStatus(data),
        _updateRole: (data) => updateRole(data)
      }, dispatch)
  }
}

function mapStateToProps(state) {
  // console.log("==========> User",state);
  const { roles, loader } = state;
  return {
    allRoles: roles,
    isLoading: loader.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
