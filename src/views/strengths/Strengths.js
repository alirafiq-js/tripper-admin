import React, { useState, useEffect, lazy } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getStrengths, addStrength, updateStrength, deleteStrength } from '../../actions/basicCodes';
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
  CLabel
} from '@coreui/react';
import { Form, Input, Button, notification, Modal } from 'antd';
import moment from 'moment';


const getBadge = status => {
  switch (status) {
    case true: return 'success'
    case false: return 'danger'
    default: return 'primary'
  }
}

const FormItem = Form.Item;
const Users = (props) => {
  const [form] = Form.useForm();
  const formRef = React.createRef();
  console.log('Props in User',props);
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [limit, setLimit] = useState(10)
  const [searchText, setSearchText] = useState('');
  const [state, setState] = useState({
    isEditingStrength: false,
    editingStrengthId: null,
    openModal: false,
    strength: ''
  });

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/basiccode/strengths?page=${newPage}`)
    setPage(newPage);
    getData(newPage);
  }

    useEffect(() => {
    // console.log('=======>props',props);
    currentPage !== page && setPage(currentPage);
    getData(page);
  }, []);

const initState = ()=>{
  setState({
    isEditingStrength: false,
    editingStrengthId: null,
    openModal: false,
    strength: ''
  })
}

  const getData = async (_page) => {
    try {
      const data = {
        page: _page, limit, searchText
      }
      const response = await props.actions._getStrengths(data);
      console.log('========> get all strength repsonse',response);
    } catch (error) {
        console.log("Error in get list",error);
    }
  }

  const handleOk = async () => {
    try {

      if (state.isEditingStrength) {
        const data = {
          name: state.strength,
        };
        const updateadgeResponse = await props.actions._updateStrength({ id: state.editingStrengthId, data });
        getData(currentPage);
        initState();
      } else {
        const data = {
          name: state.strength
        };
        const addStrengthResponse  = await props.actions._addStrength(data);
        getData(currentPage);
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
      strength: item.name,
      editingStrengthId: item._id,
      isEditingStrength: true,
      openModal: true,
    })
  }

  const showRemoveDialog = (item) => {
    try {
        Modal.confirm({
          title: 'Are you sure delete this strength?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: () => onRemoveStrength(item),
          onCancel() {
            console.log('Cancel');
          },
        });

    } catch (error) {

    }
  }

  const onRemoveStrength = async (strength) => {
    try {
      const removeBadgeResponse = await props.actions._deleteStrength({ id: strength._id });
      getData(currentPage);
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

  const onSearchStrength = () => {
    getData(1);
  }

  form.setFieldsValue({
    strengthName: state.strength ? state.strength : '',
  });

  const strengthsDataArray =  (props.allStrengths && props.allStrengths.data) ? props.allStrengths.data : [];
  const totalPage = (props.allStrengths && props.allStrengths.pages) ? props.allStrengths.pages : 1; 
  const itemsPerPage = (props.allStrengths && props.allStrengths.limit) ? props.allStrengths.limit : 10; 
  // console.log('========strengthsDataArray', strengthsDataArray, totalPage, itemsPerPage);
  console.log('searchText',searchText)
  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol xl={12}>
              <CCard>
                <CCardHeader>
                  Strength list
                </CCardHeader>
                <CCardBody>
                  <CRow>

                    <CCol xs="12" md="6">
                      <CRow>
                        <CCol xs="12" md="6">
                          <CInput name="androidUpdateAvail" value={searchText ? searchText : ''} onChange={(e) => setSearchText(e.target.value)} placeholder="Search Strength" />
                        </CCol>
                        <CCol xs="12" md="6">
                          <Button type="primary" onClick={onSearchStrength} style={{ float: 'left', marginBottom: '18px' }} ghost>Search</Button>
                        </CCol>
                      </CRow>
                  </CCol>
                  <CCol xs="12" md="6">
                  <Button type="primary" onClick={showModal} style={{ float: 'right', marginBottom: '18px' }} ghost>Add</Button>
                  </CCol>
                  </CRow>
                  <CDataTable
                    loading={props.isLoading}
                    items={strengthsDataArray}
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
                title="Strength"
                onCancel={initState}
                footer={[
                  state.isEditingStrength ?
                    <Button key="submit" type="primary" ghost loading={props.isLoading} size="large" onClick={handleOk}>Update</Button>
                    :
                    <Button key="submit" type="primary" ghost loading={props.isLoading} size="large" onClick={handleOk}>Add</Button>
                ]}
              >
                <Form {...layout} form={form} ref={formRef} name="control-ref" onFinish={() => console.log("on Finish")}>
                  <Form.Item
                    name="strengthName"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter strength name'
                      },
                    ]}
                    form={form}
                  >
                    <Input onChange={(e) => setState({ ...state, strength: e.target.value })} placeholder='Enter a strength name' />
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
          _getStrengths: (data) => getStrengths(data),
          _addStrength: (data) => addStrength(data),
          _updateStrength: (data) => updateStrength(data),
          _deleteStrength: (data) => deleteStrength(data),
      }, dispatch)
  }
}

function mapStateToProps(state) {
  const { basicCodes, loader } = state;
  return {
    allStrengths: basicCodes.strengths,
    isLoading: loader.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
