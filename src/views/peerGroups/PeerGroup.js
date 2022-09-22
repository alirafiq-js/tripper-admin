import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'; 
import { Upload, Form, Input, Button, Select, Row, Col, notification, Modal, Checkbox } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import _ from 'lodash';
import moment from 'moment';
import { uploadMedia, getPeerGroupDetails, updatePeerGroup, addBadge, updateBadge, removeBadge, setDefaultBadge, addQuestion, removeQuestion, updateQuestion } from '../../actions';
import {
  CCard, CCardBody, CCardHeader, CCol, CRow,
  CImg,
  CDataTable
} from '@coreui/react'
import Question from '../pgQuestions/Question';

import style from './style.css'
const FormItem = Form.Item;
const { Option } = Select;

const PeerGroup = (props) => {
  const [form] = Form.useForm();
  const formRef = React.createRef();
  const history = useHistory();
  const [isEditable, setEditable] = useState(false);
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
    imageData: null,
    isEditingBadge: false,
    editingBadgeId: null,
    openModal: false,
    badge: '',
    
  });
  console.log('peerGroupDetails', props.peerGroupDetails);

  const { TextArea } = Input;

  useEffect(() => {
    _getpeerGroupData();
  }, []);

  const _getpeerGroupData = async () => {
    try {

      const response = await props.actions._getPeerGroupDetails(props.match.params.id);
      console.log('========> get user repsonse', response);
    } catch (error) {
      console.log("Error in get list", error);
    }

  }

  const peerGroupData = props.peerGroupDetails.data;

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState({
      ...state,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  const { fileList } = state;
  
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const handleChange = async ({ fileList, file }) => {
    await setState({ ...state, fileList, imageData: file });
  };


  const onGenderChange = (value) => {
    switch (value) {
      case 'male':
        formRef.current.setFieldsValue({
          note: 'Hi, man!',
        });
        return;

      case 'female':
        formRef.current.setFieldsValue({
          note: 'Hi, lady!',
        });
        return;

      case 'other':
        formRef.current.setFieldsValue({
          note: 'Hi there!',
        });
    }
  };

  const onSelectLocation = async (event) => {
    const updatedPeerGroupObj = {
      isLocationRequired: event.target.checked
    };
    console.log("================event.target.value",event.target.checked)
    try {
      const updateResponse = await props.actions._updatePeerGroup({ pgId: props.match.params.id, updatedPeerGroupObj });

    } catch (error) {
      notification['error']({
        message: (error.response && error.response.data) ? error.response.data.message : 'something went wrong',
        placement: 'bottomRight',
      });
    }
  };
  const onFinish = async (values) => {
    try {
      
      console.log("On finsih================",values);
      console.log("image data ---comp", state.imageData);
      
      const updatedPeerGroupObj = {
        description: values.description,
        email: values.email,
        name: values.fullName,
        mobile: values.mobile,
        purpose: values.purpose,
        // isLocationRequired: values.isLocationRequired,
      }

      if (state.imageData && !_.isEmpty(state.imageData)) {
        console.log("===> state.imageData",state.imageData);
        const POJO = { ...state.imageData };

        console.log("POJO ", POJO);
        const imageData = { ...POJO };

        console.log("image Data ====>",imageData.originFileObj);

        const mediaUploadResponse = await props.actions._uploadMedia({ type: 'image', imageData, name: props.match.params.id, isCompress: true });
        console.log("media upload response", mediaUploadResponse);

        if (mediaUploadResponse && mediaUploadResponse.code === 200) {
          updatedPeerGroupObj.images = [mediaUploadResponse.data.Key]
        }
      }

      const updateResponse = await props.actions._updatePeerGroup({ pgId: props.match.params.id, updatedPeerGroupObj });

      setEditable(false);
      console.log("update obj",updatedPeerGroupObj);
    } catch (error) {
    console.log("eror in submuit",error);
    
    }

  };

  const beforeUpload = (file) => {
    notification['error']({
      message: 'Notification Title',
    });
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/webp';
    if (!isJpgOrPng) {
      console.log('file',file,'isJpgOrPng',isJpgOrPng);
      // setLoader(false);
      notification['error']({
        message: 'Invalid Image Format',
        placement:'bottomRight',
      });
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (isLt2M) {
      // setLoader(true);
      return isJpgOrPng && isLt2M;
    } else {
      // setLoader(false);
      notification['error']({
        message: 'Image must smaller than 2MB!',
        placement:'bottomRight'
      });
      return false;
    }
  }

  form.setFieldsValue({
    fullName: (peerGroupData && peerGroupData.name) ? peerGroupData.name : '',
    email: (peerGroupData && peerGroupData.email) ? peerGroupData.email : '',
    mobile: (peerGroupData && peerGroupData.contact) ? peerGroupData.contact : '',
    status: (peerGroupData && peerGroupData.status) ? peerGroupData.status : '',
    purpose: (peerGroupData && peerGroupData.purpose) ? peerGroupData.purpose : '',
    description: (peerGroupData && peerGroupData.description) ? peerGroupData.description : '',
    // isLocationRequired: (peerGroupData && peerGroupData.isLocationRequired) ? peerGroupData.isLocationRequired : false,
    creator: (peerGroupData && peerGroupData.creator && peerGroupData.creator.fullName) ? peerGroupData.creator.fullName : '',
    created: (peerGroupData && peerGroupData.created) ? moment(peerGroupData.created).format('Do MMM YYYY a') : '',
    badgeName: state.badge ? state.badge : '',
  });



  const showModal = () => {
    setState({
      ...state,
      openModal: true
    });
  }

  const handleOk = async () => {
    try {

      if (state.isEditingBadge) {
        const data = {
          name: state.badge,
          badgeId: state.editingBadgeId
        };
        const updateadgeResponse  = await props.actions._updateBadge(data);
        _getpeerGroupData();
        setState({
          ...state,
          openModal: false,
          badge:'',
          isEditingBadge:false,
          editingBadgeId: null
        });
      } else {
        const data = {
          name: state.badge,
          pgId: props.match.params.id
        };
        const addBadgeResponse  = await props.actions._addBadge(data);
        _getpeerGroupData();
        setState({
          ...state,
          openModal: false,
          badge:''
        });
      }
    } catch (error) {
      console.log(error);
      notification['error']({
         message: (error.response && error.response.data) ?  error.response.data.message : 'something went wrong',
         placement:'bottomRight',
      });
      setState({
        ...state,
        openModal: false,
        badge:''
      });
    }

  }

  const onRemoveBadge = async (badge) => {
    try {

      const data = {
        badgeId: badge._id
      };
      const removeBadgeResponse  = await props.actions._removeBadge(data);
      _getpeerGroupData();
      setState({
        ...state,
        openModal: false,
        badge:'',
        isEditingBadge:false,
        editingBadgeId: null
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
        badge:''
      });
    }

  }

  const handleCancel = () => {
    setState({
      ...state,
      openModal: false,
      badge:'',
      isEditingBadge:false,
      editingBadgeId: null
    });
  }

  const onEdit = (item) => {
    setState({
      ...state,
      badge: item.name,
      editingBadgeId: item._id,
      isEditingBadge: true,
      openModal: true,
    })
  }

  const showRemoveDialog = (item) => {
    try {
        Modal.confirm({
          title: 'Are you sure delete this badge?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: () => onRemoveBadge(item),
          onCancel() {
            console.log('Cancel');
          },
        });

    } catch (error) {

    }
  }

  const addQuestion = async (data)=>{
    try {
      const addedQuestionResponse = await props.actions._addQuestion(data);
      _getpeerGroupData();
    } catch (error) {
      console.log("eror inn add question",error);
    }
  }

  const removeQuestion = async (data)=>{
    try {
      const removedQuestionResponse = await props.actions._removeQuestion(data);
      _getpeerGroupData();
    } catch (error) {
      console.log("eror inn remove question",error);
    }
  }

  const updateQuestion = async (data)=>{
    try {
      const updatedQuestionResponse = await props.actions._updateQuestion(data);
      _getpeerGroupData();
    } catch (error) {
      console.log("eror inn update question",error);
    }
  }

  const onSelectDefaultBadge = async (e, badge) => {
    try {

      const data = {
        badgeId: badge._id,
        pgId: badge.peer_group_id,
        default: e.target.checked
      };
      const defaultBadgeResponse  = await props.actions._setDefaultBadge(data);
      _getpeerGroupData();
      setState({
        ...state,
        openModal: false,
        badge:'',
        isEditingBadge:false,
        editingBadgeId: null
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
        badge:''
      });
    }

  }

  return (
    <>

      <CRow>
        <CCol lg={12} md={12} xs={12}>
          <CCard>
            <CCardHeader>
              Peer Group Details
          </CCardHeader>
            <CCardBody>
              <Form {...layout} form={form} ref={formRef} name="control-ref" onFinish={onFinish}>
                <Row>
                  <Col xs={12} md={3}>
                    {
                      isEditable ?
                        <Upload
                        style={{height:'300px'}}
                          action="https://slicdev.xyz/settings/mock"
                          listType="picture-card"
                          fileList={fileList}
                          onPreview={handlePreview}
                          onChange={handleChange}
                          beforeUpload={beforeUpload}
                        >
                          {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                        :
                        <CImg
                          src={(peerGroupData && !_.isEmpty(peerGroupData.images)) ? `https://peers-image.s3.amazonaws.com/${peerGroupData.images[0]}` : "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png"}
                          style={{ width: 104, height: 104, marginBottom: 20 }}
                        />
                    }
                  </Col>
                    <Col md={3} offset={18}>
                    <Form.Item >
                      {
                        isEditable ?
                          <Button onClick={() => setEditable(false)} ghost type="primary">
                            Cancel
                          </Button>
                          :
                          <Button onClick={() => setEditable(true)} ghost type="primary">
                            Edit
                          </Button>
                      }
                      </Form.Item>
                    </Col>
                </Row>

                <Row>
                  <Col xs={12} md={6}>
                    <Form.Item
                      name="fullName"
                      label="Name"
                      rules={[
                        {
                          required: true,
                          message: 'Please input peer group name' 
                        },
                      ]}
                      form={form}
                    >
                      <Input disabled={!isEditable} />
                    </Form.Item>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Item
                      name="mobile"
                      label="Contact"
                      rules={[
                        {
                          required: true,
                          message: 'Please input contact' 
                        },
                      ]}
                    >
                      <Input disabled={!isEditable} />
                    </Form.Item>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Item
                      name="status"
                      label="Status"
                      rules={[
                        {
                          required: true,
                          message: 'Please select status' 
                        },
                      ]}
                    >
                      <Select
                      disabled
                        placeholder="Select status"
                        onChange={onGenderChange}
                        allowClear
                        disabled={!isEditable || peerGroupData.isDeleted}
                      >
                        <Option value="pending">Pending</Option>
                        <Option value="approved">Approved</Option>
                        <Option value="rejected">Rejected</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Item
                      name="purpose"
                      label="Tagline"
                      rules={[
                        {
                          required: true,
                          message: 'Please input peer group tagline'
                        },
                      ]}
                    >
                      <Input disabled={!isEditable} />
                    </Form.Item>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Item
                      name="creator"
                      label="Creator"
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Item
                      name="created"
                      label="Created"
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  {/* <Col xs={12} md={6}>
                    <Form.Item
                      name="isLocationRequired"
                      label="Location"
                      rules={[
                        {
                          message: 'Please check this field' 
                        },
                      ]}
                    >
                      <Checkbox disabled={!isEditable} ></Checkbox>
                    </Form.Item>
                  </Col> */}
                </Row>
                <Row>
                  <Col xs={12} md={8}>
                    <Form.Item
                      name="description"
                      label="Description"
                      rules={[
                        {
                          required: true,
                          message: 'Please input peer group description' 
                        },
                      ]}
                    >
                      <TextArea disabled={!isEditable} />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                >
                  {({ getFieldValue }) =>
                    getFieldValue('gender') === 'other' ? (
                      <Form.Item
                        name="customizeGender"
                        label="Customize Gender"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input disabled={!isEditable} />
                      </Form.Item>
                    ) : null
                  }
                </Form.Item>
                {
                  isEditable &&
                  <Form.Item >
                    <Button ghost type="primary" htmlType="submit">
                      Update
                  </Button>
                  </Form.Item>
                }
              </Form>
              <CRow>
                <CCol lg={12} md={12}>
                  <CCard>
                    <CCardHeader>
                      User Location
                    </CCardHeader>
                    <CCardBody>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ display: 'block' }}>Is user location required for this peer group?</span>
                        <Checkbox checked={peerGroupData?.isLocationRequired || false} onChange={(e) => onSelectLocation(e)}></Checkbox>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              <CRow>
                <CCol lg={12} md={12}>
                  <CCard>
                    <CCardHeader>
                      Badges
                    </CCardHeader>
                    <CCardBody>
                      <Button type="primary" onClick={showModal} style={{ float: 'right', marginBottom: '18px' }} ghost>Add</Button>
                      <CDataTable
                        items={peerGroupData && peerGroupData.badges ? peerGroupData.badges : []}
                        fields={[
                          { key: 'name', _classes: 'font-weight-bold' },
                          { key: 'updated', label: 'Created' },
                          'actions',
                          'default'
                        ]}
                        hover
                        striped
                        itemsPerPage={10}
                        // activePage={page}
                        scopedSlots={{
                          'name':
                            (item) => (
                              <td>
                                {item.name}
                              </td>
                            ),
                          'updated':
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
                                  <Button type="danger" onClick={() => showRemoveDialog(item)} style={{ marginLeft: '5px' }} ghost>Delete</Button>
                                </div>
                              </td>
                            ),
                            'default':
                            (item) => (
                              <td>
                                <Checkbox checked={item.isDefault} onChange={(e) => onSelectDefaultBadge(e, item)}></Checkbox>
                              </td>
                            ),
                        }}
                      />
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              <CRow>
                <CCol lg={12} md={12}>
                  <CCard>
                    <CCardHeader>
                      Members
                    </CCardHeader>
                    <CCardBody>
                      <CDataTable
                        clickableRows
                        onRowClick={(item) => history.push(`/users/${item._id}`)}
                        items={peerGroupData && peerGroupData.members ? peerGroupData.members : []}
                        fields={[
                          { key: 'fullName', _classes: 'font-weight-bold' },
                          { key: 'formattedMobile', label: 'Mobile' },
                          { key: 'strength', label: 'Strength' },
                          'created'
                        ]}
                        hover
                        striped
                        itemsPerPage={10}
                        // activePage={page}
                        scopedSlots={{
                          'fullName':
                            (item) => (
                              <td>
                                {item.fullName}
                              </td>
                            ),
                          'formattedMobile':
                            (item) => (
                              <td>
                                {item.formattedMobile}
                              </td>
                            ),
                          'strength':
                            (item) => (
                              <td style={{ textTransform: 'capitalize' }}>
                                {item.userStrengths[0] ? item.userStrengths[0].name : ''}
                              </td>
                            ),
                          'created':
                            (item) => (
                              <td>
                                {moment(item.created).format('Do MMM YYYY hh:mm a')}
                              </td>
                            )
                        }}
                      />
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
          <Question addQuestion={addQuestion} updateQuestion={updateQuestion} deleteQuestion={removeQuestion} pgId={props.match.params.id} questionList={peerGroupData && peerGroupData.questions ? peerGroupData.questions : []} />

          {/* Add and edit modal */}
          <Modal
            visible={state.openModal}
            title="Badge"
            onCancel={handleCancel}
            footer={[
              state.isEditingBadge ?
                <Button key="submit" type="primary" ghost loading={props.isLoading} size="large" onClick={handleOk}>Update</Button>
                :
                <Button key="submit" type="primary" ghost loading={props.isLoading} size="large" onClick={handleOk}>Add</Button>
            ]}
          >
            <Form {...layout} form={form} ref={formRef} name="control-ref" onFinish={() => console.log("on Finish")}>
              <Form.Item
                name="badgeName"
                rules={[
                  {
                    required: true,
                    message: 'Please enter badge name'
                  },
                ]}
                form={form}
              >
                <Input onChange={(e) => setState({ ...state, badge: e.target.value })} placeholder='Enter a badge name' />
              </Form.Item>
            </Form>
          </Modal>
          {/* Remove modal */}
        </CCol>
      </CRow>
    </>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      _getPeerGroupDetails: (data) => getPeerGroupDetails(data),
      _uploadMedia: (data) => uploadMedia(data),
      _updatePeerGroup: (data) => updatePeerGroup(data),
      _addBadge: (data) => addBadge(data),
      _updateBadge: (data) => updateBadge(data),
      _removeBadge: (data) => removeBadge(data),
      _addQuestion: (data) => addQuestion(data),
      _removeQuestion: (data) => removeQuestion(data),
      _updateQuestion: (data) => updateQuestion(data),
      _setDefaultBadge: (data) => setDefaultBadge(data),
    }, dispatch)
  }
}

function mapStateToProps(state) {
  const { peerGroups, loader } = state;
  return {
    peerGroupDetails: peerGroups.details,
    isLoading: loader.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeerGroup);