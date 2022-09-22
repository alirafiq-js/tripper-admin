import React, { useState, useEffect, lazy } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { getUniversities, addUniversity, deleteUniversity, updateUniversity } from '../../actions/basicCodes';
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

import { Form, Input, Button, notification, Modal } from 'antd';

const getBadge = status => {
  console.log('status',status);
  switch (status) {
    case true: return 'success'
    case false: return 'danger'
    default: return 'primary'
  }
}

const FormItem = Form.Item;
const Univeristies = (props) => {
  const [form] = Form.useForm();
  const formRef = React.createRef();
  console.log('Props in Univeristy',props);
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [limit, setLimit] = useState(10)
  const [searchText, setSearchText] = useState('');
  const [state, setState] = useState({
    isEditingUniversity: false,
    editingUniversityId: null,
    openModal: false,
    university: ''
  });

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/basiccode/universities?page=${newPage}`)
    setPage(newPage);
    getUniversitiesList(newPage);
  }
  const initState = ()=>{
    setState({
      isEditingUniversity: false,
      editingUniversityId: null,
      openModal: false,
      university: ''
    })
  }

    useEffect(() => {
    // console.log('=======>props',props);
    currentPage !== page && setPage(currentPage);
    getUniversitiesList(page);
  }, []);

  const getUniversitiesList = async (_page) => {
    try {
      const data = {
        page: _page, limit, searchText
      }
      const response = await props.actions._getUniversities(data);
      console.log('========> get all user repsonse',response);
    } catch (error) {
        console.log("Error in get list",error);
    }
  }

  const handleOk = async () => {
    try {

      if (state.isEditingUniversity) {
        const data = {
          name: state.university,
        };
        const updateadgeResponse = await props.actions._updateUniversity({ id: state.editingUniversityId, data });
        getUniversitiesList(currentPage);
        initState();
      } else {
        const data = {
          name: state.university
        };
        const addUniversityResponse  = await props.actions._addUniversity(data);
        getUniversitiesList(currentPage);
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

  const onEdit = (item) => {
    setState({
      ...state,
      university: item.name,
      editingUniversityId: item._id,
      isEditingUniversity: true,
      openModal: true,
    })
  }

  const showRemoveDialog = (item) => {
    try {
        Modal.confirm({
          title: 'Are you sure delete this university?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: () => onRemoveUniversity(item),
          onCancel() {
            console.log('Cancel');
          },
        });

    } catch (error) {

    }
  }

  const onRemoveUniversity = async (university) => {
    try {
      const removeBadgeResponse = await props.actions._deleteUniversity({ id: university._id });
      getUniversitiesList(currentPage);
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
  const showModal = () => {
    setState({
      ...state,
      openModal: true
    });
  }

  form.setFieldsValue({
    universityName: state.university ? state.university : '',
  });

  const univsersityDataArray =  (props.allUnivesities && props.allUnivesities.data) ? props.allUnivesities.data : [];
  const totalPage = (props.allUnivesities && props.allUnivesities.pages) ? props.allUnivesities.pages : 1; 
  const itemsPerPage = (props.allUnivesities && props.allUnivesities.limit) ? props.allUnivesities.limit : 10; 
  console.log('========univsersityDataArray', univsersityDataArray, totalPage, itemsPerPage);
  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol xl={12}>
              <CCard>
                <CCardHeader>
                  Univeristy/Organization list
                </CCardHeader>
                <CCardBody>
                <Button type="primary" onClick={showModal} style={{ float: 'right', marginBottom: '18px' }} ghost>Add</Button>
                  <CDataTable
                    loading={props.isLoading}
                    items={univsersityDataArray}
                    fields={[
                      { key: 'name', label:'Name' },
                      { key: 'isActive', label:'Status' },
                      { key: 'created' },
                      'actions'
                    ]}
                    hover
                    striped
                    itemsPerPage={itemsPerPage}
                    activePage={page}
                    // clickableRows
                    // onRowClick={(item) => history.push(`/users/${item._id}`)}
                    scopedSlots={{
                      'name':
                        (item) => (
                          <td style={{ textTransform: 'capitalize' }}>
                              {item.name}
                          </td>
                        ),
                        'isActive':
                        (item) => (
                          <td>
                            <CBadge style={{padding:5}} color={getBadge(item.isActive)}>
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
                        'actions':
                        (item) => (
                          <td>
                            <div>
                              <Button type="primary" onClick={() => onEdit(item)} ghost>Edit</Button>
                              <Button type="danger" onClick={() => showRemoveDialog(item)} style={{ marginLeft: '5px' }} ghost>Delete</Button>
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
                title="Univeristy/Organization"
                onCancel={initState}
                footer={[
                  state.isEditingUniversity ?
                    <Button key="submit" type="primary" ghost loading={props.isLoading} size="large" onClick={handleOk}>Update</Button>
                    :
                    <Button key="submit" type="primary" ghost loading={props.isLoading} size="large" onClick={handleOk}>Add</Button>
                ]}
              >
                <Form {...layout} form={form} ref={formRef} name="control-ref" onFinish={() => console.log("on Finish")}>
                  <Form.Item
                    name="universityName"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter univeristy/organization name'
                      },
                    ]}
                    form={form}
                  >
                    <Input onChange={(e) => setState({ ...state, university: e.target.value })} placeholder='Enter a univeristy/organization name' />
                  </Form.Item>
                </Form>
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
          _getUniversities: (data) => getUniversities(data),
          _addUniversity: (data) => addUniversity(data),
          _updateUniversity: (data) => updateUniversity(data),
          _deleteUniversity: (data) => deleteUniversity(data)
      }, dispatch)
  }
}

function mapStateToProps(state) {
  // console.log("==========> User",state);
  const { basicCodes, loader } = state;
  return {
    allUnivesities: basicCodes.univesities,
    isLoading: loader.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Univeristies);
