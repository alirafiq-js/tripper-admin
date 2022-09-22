import React, { useState, useEffect, lazy } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Button, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { getAllPeerGroups, getFilterPeerGroups, updateStatus, emptyPeerGroup, deletePeerGroup } from '../../actions/peerGroups';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CLabel,
  CSelect,
  CFormGroup,
  CButton
} from '@coreui/react'
import './style.css'


const getBadge = status => {
  switch (status) {
    case 'approved': return 'success'
    case 'pendind': return 'secondary'
    case 'rejected': return 'danger'
    default: return 'primary'
  }
}

const PeerGroups = (props) => {
  console.log('Props in User',props);
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [limit, setLimit] = useState(10)
  const [searchText, setSearchText] = useState('');
  const [filterPeerGroup, setFilterPeerGroup] = useState('pending');

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/peerGroups?page=${newPage}`)
    setPage(newPage);
    getData(newPage);
  }

    useEffect(() => {
    // console.log('=======>props',props);
    currentPage !== page && setPage(currentPage);
    getData(page);
    return async ()=>{
      console.log("un mount call");
      await props.actions._emptyPeerGroup();
    }
  }, []);

  const getData = async (_page) => {
    try {
      const data = {
        page: _page, limit, searchText,
        status: filterPeerGroup
      }
      const response = await props.actions._getAllPeerGroups(data);
      console.log('========> get all pg repsonse',response);
    } catch (error) {
        console.log("Error in get list",error);
    }
  }

  const filterPG = async (e) => {
    console.log("Selected filter",e,e.target.value)
    setFilterPeerGroup(e.target.value);
    const data = {
      page: page,
      limit,
      searchText,
      status: e.target.value
    }
    const response = await props.actions._getFilterPeerGroups(data);
  };

  const updateStatus = async (pgId, status) => {
    try {
      const data  = {
        pgId,
        status
      };
      await props.actions._updateStatus(data);
      getData(page);
      
    } catch (error) {
      console.log("=======+Error in update peer group status", error);
    }
  }

  const peerGroupsDataArray =  (props.allPeerGroups && props.allPeerGroups.data) ? props.allPeerGroups.data : [];
  const totalPage = (props.allPeerGroups && props.allPeerGroups.pages) ? props.allPeerGroups.pages : 1; 
  const itemsPerPage = (props.allPeerGroups && props.allPeerGroups.limit) ? props.allPeerGroups.limit : 10; 
  console.log('========peerGroupsDataArray', peerGroupsDataArray, totalPage, itemsPerPage);

  const showStatusButton = (item) => {
    switch (item.status) {
      case 'pending':
        return (
          <div>
            <Button ghost  style={{ width: '80px' }}  type='primary' onClick={() => updateStatus(item._id, 'approved')}>Approve</Button>
            <Button ghost  type='danger' style={{ marginLeft: '5px' }} onClick={() => updateStatus(item._id, 'rejected')}>Reject</Button>
          </div>
        )
      case 'approved':
        return (
          <div>
            <Button ghost disabled  type='primary'>Approved</Button>
          </div>
        )
      case 'rejected':
        return (
          <div>
            <Button ghost disabled  type='danger'>Rejected</Button>
          </div>
        )
      default:
        return (
          <div>
          </div>
        )
    }
  }

  const deletePeerGroup = async (_id) => {
    try {
      console.log('------id',_id)
     const resp = await props.actions._deletePeerGroup(_id);
     getData(page);
    } catch (error) {
      console.log('--------error in delete PG',error);
    }
  }

  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol xl={12}>
              <CCard>
                <CCardHeader>
                  Peer Groups
                </CCardHeader>
                <CCardBody>
                  <CFormGroup row>
                    <CCol xs="12" md="4">
                      <CLabel htmlFor="select">Peer Group Status</CLabel>
                      <CSelect custom onChange={filterPG} value={filterPeerGroup} name="androidForceUpdate" id="select">
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="deleted">Deleted</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                  <CDataTable
                    size='lg'
                    items={peerGroupsDataArray}
                    fields={[
                      { key: 'name', _style: { padding:'0px 30px'  }  },
                      { key: 'email' },
                      { key: 'purpose' },
                      { key: 'description' },
                      { key: 'contact' },
                      { key: 'creator' },
                      { key: 'created', label: 'Created', _style: { padding:'0px 70px' } },
                      'status',
                      { key: 'action', label: 'Action', _style: { padding:'0px 70px' } },
                      { key: '_id', label: 'Details'},
                      { key: 'delete', label: 'Delete'},
                    ]}
                    hover
                    striped
                    loading={props.isLoading}
                    itemsPerPage={itemsPerPage}
                    activePage={page}
                    // clickableRows
                    // onRowClick={(item) => history.push(`/peerGroup/${item._id}`)}
                    scopedSlots={{
                      'status':
                        (item) => (
                          <td className='spanStyle'>
                            {/* <CBadge color={getBadge(item.status)} style={{ padding: 5, textTransform: 'capitalize' }}> */}
                              {item.status}
                            {/* </CBadge> */}
                          </td>
                        ),
                        'purpose':
                        (item) => (
                          <td className='spanStyle'>
                              {item.purpose ? item.purpose : '-'}
                          </td>
                        ),
                        'description':
                        (item) => (
                          <td className='spanStyle'>
                            {item.description ? item.description : '-'}
                          </td>
                        ),
                        'contact':
                        (item) => (
                          <td className='spanStyle'>
                            {item.contact ? item.contact : '-'}
                          </td>
                        ),
                        'creator':
                        (item) => (
                          <td className='spanStyle'>
                            {item.creator ? item.creator.fullName : '-'}
                          </td>
                        ),
                        'created':
                        (item) => (
                          <td>
                              {moment(item.created).format('Do MMM YYYY hh:mm a')}
                          </td>
                        ),
                        '_id':
                        (item) => (
                          <td className='spanStyle'>
                            <Button ghost type='primary' onClick={() => history.push(`/peerGroup/${item._id}`)}>Details</Button>
                          </td>
                        ),
                        'delete':
                        (item) => (
                          <td className='spanStyle'>
                            <Button ghost type='danger' disabled={item.isDeleted} >
                              <Popconfirm title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={() => deletePeerGroup(item._id)}>
                                <a href="#">Delete</a>
                              </Popconfirm>
                              </Button>
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
        </CCardBody>
      </CCard>
    </>
  )
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators({
          _getAllPeerGroups: (data) => getAllPeerGroups(data),
          _getFilterPeerGroups: (data) => getFilterPeerGroups(data),
        _updateStatus: (data) => updateStatus(data),
        _emptyPeerGroup: (data) => emptyPeerGroup(data),
        _deletePeerGroup: (data) => deletePeerGroup(data),
      }, dispatch)
  }
}

function mapStateToProps(state) {
  const { peerGroups,loader } = state;
  return {
    allPeerGroups: peerGroups,
    isLoading: loader.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeerGroups);
