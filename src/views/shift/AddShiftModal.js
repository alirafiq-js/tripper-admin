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
const { TextArea } = Input;

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

  console.log('add shift modal', props);

  useEffect(() => {
  }, []);

  console.log("===========>PROPS FROM TABLE", props);

  const onFormLayoutChange = ({drivers}) => {
    console.log('-------------drivers', drivers);
    // setComponentDisabled(disabled);
  };

  form.setFieldsValue({
    universityName: state.university ? state.university : '',
  });

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
        <Form.Item label="Chekbox" name="disabled" valuePropName="checked">
          <Checkbox>Checkbox</Checkbox>
        </Form.Item>
        <Form.Item
          label="Driver"
          name="drivers"
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
          name="drivers"
          rules={[
            {
              required: true,
              message: 'Please select driver'
            },
          ]}
          form={form}
        >
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Route"
          name="drivers"
          rules={[
            {
              required: true,
              message: 'Please select driver'
            },
          ]}
          form={form}
        >
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="RangePicker"
          name="drivers"
          rules={[
            {
              required: true,
              message: 'Please select driver'
            },
          ]}
          form={form}
        >
          <RangePicker />
        </Form.Item>
      </Form>
    </>
  )
}

export default AddShift;