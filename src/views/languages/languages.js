import React, { useState, useEffect, lazy } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getLangauges } from '../../actions/basicCodes';
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
    currentPage !== newPage && history.push(`/basiccode/languages?page=${newPage}`)
    setPage(newPage);
    getAllLanguages(newPage);
  }

    useEffect(() => {
    currentPage !== page && setPage(currentPage);
    getAllLanguages(page);
  }, []);

  const getAllLanguages = async (_page) => {
    try {
      const data = {
        page: _page, limit, searchText
      }
      const response = await props.actions._getLangauges(data);
      console.log('========> get all languages repsonse',response);
    } catch (error) {
        console.log("Error in get list",error);
    }
  }

  const langaugeDataArray =  (props.allLanguages && props.allLanguages.data) ? props.allLanguages.data : [];
  const totalPage = (props.allLanguages && props.allLanguages.pages) ? props.allLanguages.pages : 1; 
  const itemsPerPage = (props.allLanguages && props.allLanguages.limit) ? props.allLanguages.limit : 10; 
  console.log('========langaugeDataArray', langaugeDataArray, totalPage, itemsPerPage);
  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol xl={12}>
              <CCard>
                <CCardHeader>
                  Language list
                </CCardHeader>
                <CCardBody>
                  <CDataTable
                    loading={props.isLoading}
                    items={langaugeDataArray}
                    fields={[
                      { key: 'name', label:'Name' },
                      { key: 'isActive', label:'Status' },
                      { key: 'updated' },
                      'Actions'
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
          _getLangauges: (data) => getLangauges(data),
      }, dispatch)
  }
}

function mapStateToProps(state) {
  const { basicCodes, loader } = state;
  return {
    allLanguages: basicCodes.languages,
    isLoading: loader.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
