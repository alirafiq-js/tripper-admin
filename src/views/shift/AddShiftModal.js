import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';

import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
  TimePicker
} from 'antd';

const { Option } = Select;

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
  const [statePayload, setStatePayload] = useState({
    name: '',
    busId: null,
    routeId: null,
    driverId: null,
    startTime: false,
    shiftType: '',
    month: 0,
    days: []
  });

  const { Option } = Select;

  console.log('add shift modal', props);

  useEffect(() => {
  }, []);

  form.setFieldsValue({
    universityName: state.university ? state.university : '',
  });

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'October', 'November', 'December'];

  for (let i = 0; i < 7; i++) {
    weekdays.push(<Option key={i}>{weekdays[i]}</Option>);
  }

  for (let i = 0; i < 12; i++) {
    months.push(<Option key={i}>{months[i]}</Option>);
  }

const handleChange = (key,value) => {
  console.log(`selected ${key} ${value}`);
  setStatePayload({
    ...statePayload,
    key: value
  })
};

const handleChangeMonth = (key,value) => {
  console.log(`selected ${value}`);
  setStatePayload({
    ...statePayload,
    key: value
  })
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
        onFinish={(value)=>console.log('---------------on Finsih',value)}
      >

        <Form.Item


          label="Name"
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: 'Please type name'
            },
          ]}
          form={form}
        >
          <Input onChange={(e)=>handleChange(e.target.name,e.target.value)} placeholder="Name" />
        </Form.Item>
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
          label="Months"
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
            allowClear
            style={{
              width: '100%',
            }}
            placeholder="Please select month"
            defaultValue={[]}
            onChange={handleChangeMonth}
          >
            {months}
          </Select>
        </Form.Item>
        <Form.Item
          label="Shift Type"
          rules={[
            {
              required: true,
              message: 'Please select shift type'
            },
          ]}
          form={form}
        >
          <Radio.Group onChange={(e) => console.log('----------e', e)}>
            <Radio value="weekly"> Weekly </Radio>
            <Radio value="monthly"> Monthly </Radio>
          </Radio.Group>
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
          {/* <RangePicker
            // defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
            format={dateFormat}
            onChange={(val) => console.log('-------- val', val)}
          /> */}
          <TimePicker onChange={(val) => console.log('-------- val', val)} format={'HH:mm'} />
        </Form.Item>
      </Form>
    </>
  )
}

export default AddShift;