import React, { useState, useEffect, lazy } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getCities } from '../../actions/basicCodes';
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
    currentPage !== newPage && history.push(`/basiccode/cities?page=${newPage}`)
    setPage(newPage);
    getData(newPage);
  }
    useEffect(() => {
    currentPage !== page && setPage(currentPage);
    getData(page);
  }, []);

  const getData = async (_page) => {
    try {
      const data = {
        page: _page, limit, searchText
      }
      const response = await props.actions._getCities(data);
      console.log('========> get all cities repsonse',response);
    } catch (error) {
        console.log("Error in get list",error);
    }
  }

  const cityDataArray =  (props.allCities && props.allCities.data) ? props.allCities.data : [];
  const totalPage = (props.allCities && props.allCities.pages) ? props.allCities.pages : 1; 
  const itemsPerPage = (props.allCities && props.allCities.limit) ? props.allCities.limit : 10; 
  console.log('========cityDataArray', cityDataArray, totalPage, itemsPerPage);
  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol xl={12}>
              <CCard>
                <CCardHeader>
                  City list
                </CCardHeader>
                <CCardBody>
                  <CDataTable
                    loading={props.isLoading}
                    items={cityDataArray}
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
          _getCities: (data) => getCities(data),
      }, dispatch)
  }
}

function mapStateToProps(state) {
  const { basicCodes,loader } = state;
  return {
    allCities: basicCodes.cities,
    isLoading: loader.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
