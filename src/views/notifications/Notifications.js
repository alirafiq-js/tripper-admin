import React, { useState, useEffect, lazy } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getAllNotifications, sendNotification } from '../../actions/notification';
import { Upload, Form, Input, Button, Select, Row, Col, notification, Modal } from 'antd';
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

const { TextArea } = Input;
const { Option } = Select;

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
    userType: null,
    title: '',
    message: ''
  });

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
    setPage(newPage);
    getData(newPage);
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  useEffect(() => {
    // console.log('=======>props',props);
    currentPage !== page && setPage(currentPage);
    getData(page);
  }, []);

  const getData = async (_page) => {
    try {
      const data = {
        page: _page, limit, searchText
      }
      const response = await props.actions._getAllNotifications(data);
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


  const onTypeChange = (value) => {
    console.log('selected qusetion type', value);
    setState({
        ...state,
        userType: value,
    });
};

  const handleOk = async () => {
    try {
      const notificationData = {
        title: state.title,
        message: state.message,
        userType: state.userType,
      }

      await props.actions._sendNotification(notificationData);

      console.log("=============QUESTION DATA", notificationData);
      getData(currentPage);
      setState({
        ...state,
        openModal: false,
        userType: null,
        title: '',
        message: ''
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
        userType: null,
        title: '',
        message: ''
      });
    }

  }


  const handleCancel = () => {
    setState({
      ...state,
      openModal: false,
      userType: null,
      title: '',
      message: ''
    });
  }

  form.setFieldsValue({
    title: state.title ? state.title : '',
    message : state.message ? state.message : '',
    userType: state.userType ? state.userType : null
});


  const notificationDataArray = (props.allNotifications && props.allNotifications.data) ? props.allNotifications.data : [];
  const totalPage = (props.allNotifications && props.allNotifications.pages) ? props.allNotifications.pages : 1;
  const itemsPerPage = (props.allNotifications && props.allNotifications.limit) ? props.allNotifications.limit : 10;
  console.log('========notificationDataArray', notificationDataArray, totalPage, itemsPerPage);
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
                  Notification list
                    </Col>
                    <Col md={3}>
                      <Button key="submit" type="primary" ghost style={{ padding: '0px  20px', height:'30px'}} loading={props.isLoading} size="large" onClick={()=>showModal()}>Add</Button>
                    </Col>
                  </Row>
                </CCardHeader>
                <CCardBody>
                  <CDataTable
                    loading={props.isLoading}
                    items={notificationDataArray}
                    fields={[
                      { key: 'title', label: 'Title' },
                      { key: 'type', label: 'Type' },
                      { key: 'message', label: 'Notification Message' },
                      { key: 'updated', label: 'Send on' },
                    ]}
                    hover
                    striped
                    itemsPerPage={itemsPerPage}
                    activePage={page}
                    // clickableRows
                    // onRowClick={(item) => history.push(`/users/${item._id}`)}
                    scopedSlots={{
                      'updated':
                        (item) => (
                          <td>
                            {moment(item.updated).format('Do MMM YYYY hh:mm a')}
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
            title="Notification"
            onCancel={handleCancel}
            footer={[
              <Button key="submit" type="primary" ghost loading={props.isLoading} size="large" onClick={handleOk}>Send Notification</Button>
            ]}
          >
            <Form {...layout} form={form} ref={formRef} name="control-ref" onFinish={() => console.log("on Finish")}>
            <Form.Item
              name="userType"
              //   label="Gender"
              rules={[
                {
                  required: true,
                  message: 'Please select a user type'
                },
              ]}
            >
              <Select
                placeholder="Select a user type"
                onChange={onTypeChange}
                allowClear
              >
                <Option value="All">All Users</Option>
                <Option value="Free">Free Users</Option>
                <Option value="Premium">Premium Users</Option>
              </Select>
            </Form.Item>
              <Form.Item
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Please enter notification title'
                  },
                ]}
                form={form}
              >
                <Input onChange={(e) => setState({ ...state, title: e.target.value })} placeholder='Enter a notification title' />
              </Form.Item>
              <Form.Item
                name="message"
                rules={[
                  {
                    required: true,
                    message: 'Please enter notification message'
                  },
                ]}
                form={form}
              >
                <TextArea  rows={4} onChange={(e) => setState({ ...state, message: e.target.value })} placeholder='Enter notification message' />
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
      _getAllNotifications: (data) => getAllNotifications(data),
      _sendNotification: (data) => sendNotification(data),
    }, dispatch)
  }
}

function mapStateToProps(state) {
  const { notifications, loader } = state;
  return {
    allNotifications: notifications,
    isLoading: loader.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
