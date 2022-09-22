import React, { useState, useEffect, lazy } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getAppSettings, onChangeAppSettings, updateAppSettings } from '../../actions/settings';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CButton,
  CRow,
  CLabel,
  CSelect,
  CFormGroup,
  CInput
} from '@coreui/react'

const getBadge = status => {
  switch (status) {
    case true: return 'success'
    case false: return 'danger'
    default: return 'primary'
  }
}

const Users = (props) => {
  console.log('Props in App Settings',props);
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
    console.log('=======>props  in app seting use effect',props);
    currentPage !== page && setPage(currentPage);
    getData(page);
  }, []);

  const getData = async (_page) => {
    try {
      const data = {
        page: _page, limit, searchText
      }
      const response = await props.actions._getAppSettings(data);
      console.log('========> get all app repsonse',response);
    } catch (error) {
        console.log("Error in get list",error);
    }
  }

  const onChangeField = (e) => {
    props.actions._onChangeAppSettings({ [e.target.name]: e.target.value })
  };

  const updateAppSettings = async () => {
    try {
      let updateData = { ...props.appSettings.data };
      delete updateData._id;
      delete updateData.id;
      delete updateData.defaultStrength;
      delete updateData.updated;
      console.log("=====> update setting data",updateData);

      updateData = {
        ...updateData,
        iosForceUpdate: updateData.iosForceUpdate === '0' ? false : updateData.iosForceUpdate === '1' ? true : updateData.iosForceUpdate,
        androidForceUpdate: updateData.androidForceUpdate === '0' ? false : updateData.androidForceUpdate === '1' ? true : updateData.androidForceUpdate
      }

      const updateResponse = await props.actions._onUpdateAppSettings(updateData);
    } catch (error) {
      console.log("update setting error", error);
    }
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol xl={12}>
              <CCard>
                <CCardHeader>
                  App Settings
                </CCardHeader>
                <CCardBody>
                <CFormGroup row>
                  <CCol xs="12" md="4">
                    <CLabel htmlFor="select">IOS Force Update</CLabel>
                    <CSelect custom name="iosForceUpdate" value={props.appSettings.data ? props.appSettings.data.iosForceUpdate : '0' } onChange={onChangeField} id="select">
                      <option value="0">False</option>
                      <option value="1">True</option>
                    </CSelect>
                  </CCol>
                  <CCol xs="12" md="4">
                    <CLabel htmlFor="select">IOS Version</CLabel>
                    <CInput onChange={onChangeField} value={props.appSettings.data ? props.appSettings.data.iosUpdateAvail : '' } name="iosUpdateAvail" placeholder="App version" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol xs="12" md="4">
                    <CLabel htmlFor="select">Android Force Update</CLabel>
                    <CSelect custom name="androidForceUpdate" value={props.appSettings.data ? props.appSettings.data.androidForceUpdate : '0' }  onChange={onChangeField} id="select">
                        <option value="0">False</option>
                        <option value="1">True</option>
                    </CSelect>
                  </CCol>
                  <CCol xs="12" md="4">
                    <CLabel htmlFor="select">Android Version</CLabel>
                    <CInput name="androidUpdateAvail" value={props.appSettings.data ? props.appSettings.data.androidUpdateAvail : '' } onChange={onChangeField} placeholder="App version" />
                  </CCol>
                </CFormGroup>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            <CCol xl={12}>
              <CCard>
                <CCardHeader>
                System Emails & Default Settings
                </CCardHeader>
                <CCardBody>
                <CFormGroup row>
                  <CCol xs="12" md="4">
                    <CLabel htmlFor="select">Sender Email</CLabel>
                      <CInput id="sender-email" value={props.appSettings.data ? props.appSettings.data.senderEmail : '' } onChange={onChangeField} name="senderEmail" placeholder="Sender Email" />
                  </CCol>
                  <CCol xs="12" md="4">
                    <CLabel htmlFor="select">Receiver Email</CLabel>
                    <CInput id="receiver-email" value={props.appSettings.data ? props.appSettings.data.receiverEmail : '' } onChange={onChangeField} name="receiverEmail" placeholder="Receiver Email" />
                  </CCol>
                  <CCol xs="12" md="4">
                    <CLabel htmlFor="select">Maintenance Mode</CLabel>
                    <CSelect custom name="select" value={props.appSettings.data ? props.appSettings.data.androidForceUpdate : '0' }  onChange={onChangeField} id="select">
                      <option value="1">False</option>
                      <option value="2">True</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CButton type="submit" onClick={updateAppSettings} size="sm" color="primary">Submit</CButton>
        </CCardBody>
      </CCard>
    </>
  )
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators({
          _getAppSettings: (data) => getAppSettings(data),
        _onChangeAppSettings: (data) => onChangeAppSettings(data),
        _onUpdateAppSettings: (data) => updateAppSettings(data),
      }, dispatch)
  }
}

function mapStateToProps(state) {
  // console.log("==========> User",state);
  const { settings } = state;
  return {
    appSettings: settings.appSettings
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
