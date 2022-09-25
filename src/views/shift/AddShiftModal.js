import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
// import { Button, notification, Modal } from 'antd';
import {
  CCard, CCardBody, CCardHeader, CCol, CRow, CLabel,
  CSelect,
  CFormGroup,
  CInput,
  CSpinner,
  CImg,
  CButton,
  CDataTable,
  CTooltip
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import style from './style.css'
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
} from 'antd';

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';

const AddShift = (props) => {
  console.log('----------props add modal',props)
  const history = useHistory();
  const [form] = Form.useForm();
  const formRef = React.createRef();
  const [state, setState] = useState({
    isEditingShift: false,
    editingShiftId: null,
    openModal: false,
    shiftName: '',
    shiftSeats: ''
  });

  const { Option } = Select;

  console.log('add shift modal', props);

  useEffect(() => {
  }, []);

  form.setFieldsValue({
    universityName: state.university ? state.university : '',
  });

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  for (let i = 0; i < 7; i++) {
    weekdays.push(<Option key={i}>{weekdays[i]}</Option>);
  }

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        form={form}
        ref={formRef}
        name="control-ref"
        layout="horizontal"
        // onValuesChange={onFormLayoutChange}
      >
        <Form.Item
          label="Days"
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: 'Please select days'
            },
          ]}
          form={form}
        >
          <Select
            mode="multiple"
            allowClear
            style={{
              width: '100%',
            }}
            placeholder="Please select days"
            defaultValue={[]}
            onChange={handleChange}
          >
            {weekdays}
          </Select>
        </Form.Item>
        <Form.Item
          label="Driver"
          name="driver"
          placeholder="Please select driver"
          rules={[
            {
              required: true,
              message: 'Please select driver'
            },
          ]}
          form={form}
        >
          <Select>

            {
              props?.allDrivers.map((item, index) => (
                <Select.Option value={item.name} key={index} >{item.name}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item
          label="Bus"
          name="bus"
          placeholder="Please select bus"
          rules={[
            {
              required: true,
              message: 'Please select bus'
            },
          ]}
          form={form}
        >
          <Select>
            {
              props?.allBuses.map((item, index) => (
                <Select.Option value={item.name} key={index} >{item.name}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item
          label="Route"
          name="route"
          placeholder="Please select route"
          rules={[
            {
              required: true,
              message: 'Please select route'
            },
          ]}
          form={form}
        >
          <Select>
          {
              props?.allRoutes.map((item, index) => (
                <Select.Option value={item.name} key={index} >{item.name}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item
          label="Timing"
          name="datetime"
          rules={[
            {
              required: true,
              message: 'Please select timing'
            },
          ]}
          form={form}
        >
          <RangePicker
            // defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
            format={dateFormat}
            onChange={(val) => console.log('-------- val', val)}
          />
        </Form.Item>
      </Form>
    </>
  )
}

export default AddShift;