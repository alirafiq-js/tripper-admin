import React from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'

const WidgetsDropdown = (props) => {
  console.log('props in dashboar widger',props);
  const { dashboardData } = props;

  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={dashboardData ? dashboardData.userCount : 0}
          text="Total users"
          style={{ height: 160 }}
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[65, 59, 84, 84, 51, 55, 40]}
              pointHoverBackgroundColor="primary"
              label="Total"
              labels="users"
            />
          }
        >
          {/* <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings"/>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown> */}
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={dashboardData ? dashboardData.onlineUserCount : 0}
          text="Online user"
          style={{ height: 160 }}
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{height: '70px'}}
              backgroundColor="#3867d6"
              label="Members"
              labels="months"
            />
          }
        >
          {/* <CDropdown>
            <CDropdownToggle caret={false} color="transparent">
              <CIcon name="cil-location-pin"/>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown> */}
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={dashboardData ? dashboardData.freeUser : 0}
          text="Free users"
          style={{ height: 160 }}
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{height: '70px'}}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[65, 59, 84, 84, 51, 55, 40]}
              options={{ elements: { line: { borderWidth: 2.5 }}}}
              pointHoverBackgroundColor="warning"
              label="Members"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header={dashboardData ? dashboardData.premiumUser : 0}
          text="Premium users"
          style={{ height: 160 }}
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{height: '70px'}}
              backgroundColor="rgb(250, 152, 152)"
              label="Members"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
