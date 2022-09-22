import React, { useState, useEffect, lazy } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getAllEmailSettings } from '../../actions/settings';
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

const getBadge = status => {
  switch (status) {
    case true: return 'success'
    case false: return 'danger'
    default: return 'primary'
  }
}

const Users = (props) => {
  console.log('Props in User',props);
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [limit, setLimit] = useState(10)
  const [searchText, setSearchText] = useState('')

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
    setPage(newPage);
    getData(newPage);
  }

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
      const response = await props.actions._getAllEmailSettings(data);
      console.log('========> get all email repsonse',response);
    } catch (error) {
        console.log("Error in get list",error);
    }
  }

  const emailTemplateDataArray =  (props.allEmailSettings && props.allEmailSettings.data) ? props.allEmailSettings.data : [];
  const totalPage = (props.allEmailSettings && props.allEmailSettings.pages) ? props.allEmailSettings.pages : 1; 
  const itemsPerPage = (props.allEmailSettings && props.allEmailSettings.limit) ? props.allEmailSettings.limit : 10; 
  console.log('========emailTemplateDataArray', emailTemplateDataArray, totalPage, itemsPerPage);
  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol xl={12}>
              <CCard>
                <CCardHeader>
                  Email Template list
                </CCardHeader>
                <CCardBody>
                  <CDataTable
                    loading={props.isLoading}
                    items={emailTemplateDataArray}
                    fields={[
                      { key: 'welcomeTemplate', label:'Welcome Email' },
                      { key: 'suspendedTemplate', label:'Suspendid Email' },
                      { key: 'updated',label:'Created on' },
                      { key: 'isActive', label:'Status' },
                      { key: 'activeTemplate', label:'Mark Active' },
                      'Action',
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
                            <CBadge color={getBadge(item.isActive)}>
                            {item.isActive ? 'True' : 'False'}
                            </CBadge>
                          </td>
                        ),
                        'updated':
                        (item) => (
                          <td>
                              {moment(item.created).format('Do MMM YYYY hh:mm a')}
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
          _getAllEmailSettings: (data) => getAllEmailSettings(data),
      }, dispatch)
  }
}

function mapStateToProps(state) {
  // console.log("==========> User",state);
  const { settings, loader } = state;
  return {
    allEmailSettings: settings.emailSettings,
    isLoading: loader.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
