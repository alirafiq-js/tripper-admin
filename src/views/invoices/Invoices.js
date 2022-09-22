import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { getAllInvoices, getAllPeerGroups, addInvoice, editInvoice, statusInvoice, getPeerGroupInvoiceDetails, uploadMedia, emptyPeerGroup } from '../../actions';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'
import moment from 'moment';
import { Upload, Form, Input, Button, Select, Row, Col, notification, Modal, DatePicker, Table } from 'antd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import "./style.css";

const { TextArea } = Input;
const { Option } = Select;

const getBadge = status => {
  switch (status) {
    case true: return 'success'
    case false: return 'danger'
    default: return 'primary'
  }
}
const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 12 },
};

const Invoices = (props) => {
  console.log('Props in Invoices', props);
  const { invoiceDetails } = props;
  const [form] = Form.useForm();
  const formRef = React.createRef();
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [limit, setLimit] = useState(10)
  const [searchText, setSearchText] = useState('');
  const [state, setState] = useState({
    openModal: false,
    invoiceModal :false,
    amount: '',
    invoiceDate: null,
    invoiceDueDate: null,
    peerGroupId: null,
    editableInvoice: null,
    vat: '',
    discount: '',
    data: [
      {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
      },
  ],
    total: '',
    subTotal: '',
    costPerConnection: '',
    savedInvoice: null
  //   savedInvoice: {
  //     "_id" : "60845b3d4e8193069038a958",
  //     "isPaid" : false,
  //     "isDeleted" : false,
  //     "invoiceDate" : new Date("2021-04-29T17:52:17.058Z"),
  //     "invoiceDueDate" : new Date("2021-04-29T17:52:21.950Z"),
  //     "amount" : 151.5,
  //     "subTotal" : 150,
  //     "discount" : 2,
  //     "vat" : 3,
  //     "totalConnnectionsThisMonth" : 0,
  //     "costPerConnection" : 2,
  //     "peerGroupId" : "605cd17a7fcebbea72407561",
  //     "groupName" : "Akatsuki",
  //     "totalMembers" : 5,
  //     "invoicePlanId" : "6062f33c5341d430f3ff24ff",
  //     "invoiceId" : 22,
  //     "created" : new Date("2021-04-24T17:54:05.118Z"),
  //     "updated" : new Date("2021-04-24T17:54:17.573Z"),
  //     "__v" : 0,
  //     "invoiceUrl" : "https://slic-image.s3.us-west-2.amazonaws.com/file_user-id-2021-04-24T17%3A54%3A17.158Z.pdf"
  // }
  });

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
    setPage(newPage);
    getAllInvoice(newPage);
  }

  const initializeState = () => {
    setState({
      openModal: false,
      invoiceModal: false,
      amount: '',
      invoiceDate: null,
      invoiceDueDate: null,
      peerGroupId: null,
      editableInvoice: null,
      vat: '',
      discount: '',
      data: [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
      ],
      total: '',
      subTotal: '',
      costPerConnection: '',
      savedInvoice: null
    })
  }

  useEffect(() => {
    // console.log('=======>props',props);
    currentPage !== page && setPage(currentPage);
    getPeerGroupFunc(page);
    getAllInvoice(page);
    return async ()=>{
      console.log("un mount call");
      await props.actions._emptyPeerGroup();
    }
  }, []);

  const getAllInvoice = async (_page) => {
    try {
      const data = {
        page: _page, limit, searchText
      }
      const response = await props.actions._getAllInvoices(data);
      console.log('========> get invoice repsonse', response);
    } catch (error) {
      console.log("Error in get list", error);
    }
  }

  const getInvoiceDetails = async () => {
    try {
      const invoiceData = {
        pgId: state.peerGroupId,
        invoiceDate: state.invoiceDate
      }
      const response = await props.actions._getPeerGroupInvoiceDetails(invoiceData);
      const { data } = response;
      console.log('========> get invoice details repsonse', response, data);

      // let subTotal = data ? (data.totalConnnectionsThisMonth * data.invoicePlan.costPerConnection) : 0;
      let costPerConnection = data ? data.invoicePlan.costPerConnection : 0;

      // if (subTotal > data.invoicePlan.amount) {
      //   subTotal = data.invoicePlan.amount;
      //   costPerConnection = (data.invoicePlan.amount / data.totalConnnectionsThisMonth).toFixed(1);
      // }

      let subTotal = state.amount
      let total = subTotal;

      console.log('======> checkTotal', subTotal);
      console.log('====costPerConnection', costPerConnection);
  
      if (state.discount && parseInt(state.discount) > 0) {
        const discountAmount = (parseInt(state.discount) * subTotal) / 100;
        console.log("discountAmount",discountAmount);
        total -= discountAmount;
      }
      console.log("after discount",total);
      if (state.vat && parseInt(state.vat) > 0) {
        const vatAmount = (parseInt(state.vat) * subTotal) / 100;
        console.log("vatAmount",vatAmount)
        total += vatAmount;
      }
      console.log("after vat",total);

      console.log('total and subtotal', total, subTotal);

      const invoiceDateToSave = {
        invoiceDate: new Date(state.invoiceDate).toISOString(),
        invoiceDueDate: new Date(state.invoiceDueDate).toISOString(),
        amount: total,
        subTotal,
        discount: state.discount,
        vat: state.vat,
        totalConnnectionsThisMonth: data.totalConnnectionsThisMonth,
        costPerConnection: costPerConnection,
        peerGroupId: state.peerGroupId,
        groupName: data.peerGroup.name,
        totalMembers: data.peerGroup.members ? data.peerGroup.members.length : 0,
        invoicePlanId: data.invoicePlan._id
      };

      const saveInvoice = await props.actions._addInvoice(invoiceDateToSave);
      console.log("save invoioce=================",saveInvoice);

      setState({
        ...state,
        savedInvoice: {
          ...saveInvoice.data,
          invoicePlan: data.invoicePlan.invoicePlanNo
          // groupName: data.peerGroup.name,
          // totalMembers: data.peerGroup.members ? data.peerGroup.members.length : 0,
        },
        invoiceModal: true
      });

    } catch (error) {
      console.log("Error in get list", error);
    }
  }

  const getPeerGroupFunc = async (_page) => {
    try {
      const data = {
        page: _page, limit, searchText, status: 'approved', type: 'all'
      }
      const response = await props.actions._getAllPeerGroups(data);
      console.log('========> get peer group repsonse', response);
    } catch (error) {
      console.log("Error in get list", error);
      notification['error']({
        message: (error.response && error.response.data) ?  error.response.data.message : 'something went wrong',
        placement:'bottomRight'
      });
    }
  }

  const printDocument = async () => {
    const _input = document.getElementById('divToPrint');

    console.log("--------input",_input);
    console.log("===input", document.getElementById('khalid'));
    html2canvas(_input)
      .then(async (canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 1.0 );
        const pdf = new jsPDF();
        // const pdf = new jsPDF("l", "mm", "a4");
        console.log("=======>pdf", pdf);
        pdf.addImage(imgData, 'JPEG', 10, 10, 190, 160)
        // pdf.addImage(imgData, 'JPEG', 0, 0);
        console.log('=========PDF', pdf, pdf.output('blob'))
        const imageData = pdf.output('blob');

        const mediaUploadResponse = await props.actions._uploadMedia({ type: 'file', imageData });

        console.log("========mediaUploadResponse=========", mediaUploadResponse);
        const { data } = mediaUploadResponse;
        // pdf.output('dataurlnewwindow');
        pdf.save(`${state.savedInvoice.groupName}-${state.savedInvoice.invoiceDate}.pdf`);

        const updateInvoiceData = {
          invoiceUrl: data.Location
        };

      await props.actions._editInvoice({ id: state.savedInvoice._id, data: updateInvoiceData });

      getAllInvoice(currentPage);
      initializeState();

      });
  }

  const showModal = () => {
    setState({
      ...state,
      openModal: true
    });
  }


  const onChangePeerGroup = (value) => {
    console.log('selected peer group', value);
    setState({
      ...state,
      peerGroupId: value,
    });
  };

  const handleCancel = () => {
    initializeState();
  }

  form.setFieldsValue({
    invoiceDate: state.invoiceDate ? state.invoiceDate : '',
    invoiceDueDate: state.invoiceDueDate ? state.invoiceDueDate : '',
    amount: state.amount ? state.amount : '',
    vat: state.vat ? state.vat : '',
    discount: state.discount ? state.discount : '',
    peerGroupId: state.peerGroupId ? state.peerGroupId : null,
  });

  const onFeildChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const onDateChange = (e, name) => {
    console.log("==========+E", e);
    setState({ ...state, [name]: e })
  }

  // const openEditModal = (item) => {

  //   const userRole = peerGroupDataArray.filter((peer) => peer.roleName === item.userRole.roleName);

  //   setState({
  //     ...state,
  //     name: item.name,
  //     email: item.email,
  //     countryCode: item.countryCode,
  //     mobile: item.mobile,
  //     userRole: userRole[0]._id,
  //     editableInvoice: item._id,
  //     openModal: true,
  //   });
  // }

  const onRemoveInvoice = async (item, status) => {
    try {
      const deleteInvoiceData = {
        isDeleted: true
      }

      await props.actions._editInvoice({ id: item._id, data: deleteInvoiceData });
      getAllInvoice(currentPage);
    } catch (error) {
      console.log("Eror on status change");
    }
  }

  const showRemoveDialog = (item) => {
    try {
        Modal.confirm({
          title: 'Are you sure delete this invoice?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: () => onRemoveInvoice(item),
          onCancel() {
            console.log('Cancel');
          },
        });

    } catch (error) {

    }
  }

  const columns = [
    {
        key: 'invoiceId',
        title: 'ID',
        dataIndex: 'invoiceId',
        render: text => <span>{text}</span>,
    },
    {
        key: 'invoicePlan',
        title: 'Pricing',
        dataIndex: 'invoicePlan',
        render: text => <span>Tier {text}</span>,
    },
    {
        key: 'groupName',
        title: 'Group Name',
        dataIndex: 'groupName',
        render: text => <span>{text}</span>,
    },
    {
        key: 'totalMembers',
        title: 'Members',
        dataIndex: 'totalMembers',
        render: text => <span>{text}</span>,
    },
    {
        key: 'totalConnnectionsThisMonth',
        title: 'Connections',
        dataIndex: 'totalConnnectionsThisMonth',
        render: text => <span>{text}</span>,
    },
    {
        key: 'costPerConnection',
        title: 'Cost Per Connection',
        dataIndex: 'costPerConnection',
        render: text => <span>${text.toFixed(2)}</span>,
    },
    {
        key: 'subTotal',
        title: 'Total',
        dataIndex: 'subTotal',
        render: text => <span>${text.toFixed(2)}</span>,
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
];

  const invoiceDataArray = (props.allInvoices && props.allInvoices.data) ? props.allInvoices.data : [];
  const totalPage = (props.allInvoices && props.allInvoices.pages) ? props.allInvoices.pages : 1;
  const itemsPerPage = (props.allInvoices && props.allInvoices.limit) ? props.allInvoices.limit : 10;
  console.log('========invoiceDataArray', invoiceDataArray, totalPage, itemsPerPage);

  const peerGroupDataArray = (props.allPeerGroups && props.allPeerGroups.data) ? props.allPeerGroups.data : [];
  console.log("pglissssssssssssss",peerGroupDataArray)
  const { savedInvoice } = state;
  console.log("saved Invoice",savedInvoice);
  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol xl={12}>
              <CCard>
                <CCardHeader>
                  <Row>
                    <Col md={21} >
                      Invoices
                    </Col>
                    <Col md={3}>
                      <Button key="submit" type="primary" ghost style={{ padding: '0px  20px', height: '30px' }} loading={props.isLoading} size="large" onClick={() => showModal()}>Add</Button>
                    </Col>
                  </Row>
                </CCardHeader>
                <CCardBody>
                  <CDataTable
                    loading={props.isLoading}
                    items={invoiceDataArray}
                    fields={[
                      { key: 'invoiceId', label: 'Invoice Id' },
                      { key: 'groupName', label: 'Group Name' },
                      { key: 'amount', label: 'Amount' },
                      { key: 'invoiceDate', label: 'Invoice Date' },
                      { key: 'invoiceDueDate', label: 'Due Date' },
                      { key: 'action', label: 'Action' },
                    ]}
                    hover
                    striped
                    itemsPerPage={itemsPerPage}
                    activePage={page}
                    scopedSlots={{
                      'invoiceId':
                      (item) => (<td>
                        {item.invoiceId}
                      </td>
                      ),
                      'groupName':
                      (item) => (<td>
                        {item.groupName ? item.groupName : '---'}
                      </td>
                      ),
                      'amount':
                      (item) => (<td>
                        ${item.amount}
                      </td>
                      ),
                      'invoiceDate':
                        (item) => (
                          <td>
                            {moment(item.invoiceDate).format('Do MMM YYYY')}
                          </td>
                        ),
                        'invoiceDueDate':
                        (item) => (
                          <td>
                            {moment(item.invoiceDueDate).format('Do MMM YYYY')}
                          </td>
                        ),
                      'action':
                        (item) => (
                          <td>
                            {
                              <Button ghost style={{ width: '80px' }} type='danger' onClick={() => showRemoveDialog(item)}>Delete</Button>
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
          <Modal
            visible={state.openModal}
            title="Invoice"
            onCancel={handleCancel}
            footer={[
                <Button key="submit" type="primary" ghost loading={props.isLoading} size="large" onClick={getInvoiceDetails}>Generate</Button>
            ]}
          >
            <Form {...layout} form={form} ref={formRef} name="control-ref" onFinish={() => console.log("on Finish")}>
              <Form.Item
                name="invoiceDate"
                label="Invoice Date"
                rules={[
                  {
                    required: true,
                    message: 'Please enter invoice date'
                  },
                ]}
                form={form}
              >
                <DatePicker onChange={(e) => onDateChange(e, 'invoiceDate')} name='invoiceDate' picker="date" />
              </Form.Item>
              <Form.Item
                name="invoiceDueDate"
                label="Invoice Due Date"
                rules={[
                  {
                    required: true,
                    message: 'Please enter invoice due date'
                  },
                ]}
                form={form}
              >
                <DatePicker onChange={(e) => onDateChange(e, 'invoiceDueDate')} name='invoiceDueDate' picker="date" />
              </Form.Item>
              <Form.Item
                name="amount"
                label="Invoice amount"
                style={{}}
                rules={[
                  {
                    required: true,
                    message: 'Please enter invoice amount'
                  },
                ]}
                form={form}
              >
                <Input onChange={(e) => onFeildChange(e)} name='amount' placeholder='Enter invoice amount' />
              </Form.Item>
              <Form.Item
                name="discount"
                label="Discount %"
                style={{}}
                rules={[
                  {
                    required: true,
                    message: 'Please enter discount'
                  },
                ]}
                form={form}
              >
                <Input onChange={(e) => onFeildChange(e)} type='number' min={0} name='discount' placeholder='Enter discount' />
              </Form.Item>
              <Form.Item
                name="vat"
                label="HST/GST %"
                style={{}}
                rules={[
                  {
                    required: true,
                    message: 'Please enter HST/GST'
                  },
                ]}
                form={form}
              >
                <Input onChange={(e) => onFeildChange(e)} type='number' min={0} name='vat' placeholder='Enter HST/GST' />
              </Form.Item>
              <Form.Item
                name="peerGroupId"
                label="Peer Group"
                rules={[
                  {
                    required: true,
                    message: 'Please select peer group'
                  },
                ]}
                form={form}
              >
                <Select
                  placeholder="Select a peer group"
                  onChange={onChangePeerGroup}
                  allowClear
                >
                  {
                    peerGroupDataArray.map((peerGroup) => (
                      <Option key={peerGroup._id} value={peerGroup._id}>{peerGroup.name}</Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Form>
          </Modal>
          {/* invoice generate modal */}
          <Modal
            visible={state.invoiceModal}
            onCancel={handleCancel}
            width='70%'
            footer={[
                <Button key="submit" type="primary" ghost loading={props.isLoading} size="large" onClick={printDocument}>Upload</Button>
            ]}
          >
            <div id='divToPrint' style={{ padding: 15, width: '95%'}}>
              <div className="header">
                <h3>Invoice</h3>
                <h3>THE S.L.I.C. MOVEMENT INC.</h3>
                <span style={{ fontWeight: "bold" }}>Business Number:</span>{" "}
                <span>{(invoiceDetails && invoiceDetails.data)? invoiceDetails.data.bussinessNumber : "738850130BC0001" }</span>
                <div>
                  <span>{(invoiceDetails && invoiceDetails.data)? invoiceDetails.data.bussinessLocation : "Ottawa ,Canada" }</span>
                </div>
                <div>
                  <span>{(invoiceDetails && invoiceDetails.data)? invoiceDetails.data.infoEmail : "info@slicmovement.com" }</span>
                </div>
              </div>
              <div className="dateMainView">
                <div className="dateView">
                  <span style={{ fontWeight: 'bold' }} >Invoice Date: </span>
                  <span>{savedInvoice && savedInvoice.invoiceDate ? moment(savedInvoice.invoiceDate).format("MMMM Do YYYY") : ''}</span>
                </div>
                <div className="dateView">
                  <span style={{ fontWeight: 'bold' }}>Payable By: </span>
                  <span>{savedInvoice && savedInvoice.invoiceDueDate ? moment(savedInvoice.invoiceDueDate).format("MMMM Do YYYY") : ''}</span>
                </div>
              </div>
              <div>
                <Table columns={columns} pagination={false} size="small" dataSource={[state.savedInvoice ? state.savedInvoice : [] ]} />
              </div>
              <div className="dateMainView">
                <div className="dateView">
                  <span style={{ fontWeight: 'bold' }} >Sub-Total: </span>
                  <span>{savedInvoice && savedInvoice.subTotal ? savedInvoice.subTotal.toFixed(2) : ''}</span>
                </div>
                <div className="dateView">
                  <span style={{ fontWeight: 'bold' }}>Discount: </span>
                  <span>{savedInvoice && savedInvoice.discount ? savedInvoice.discount : '0' }%</span>
                </div>
                <div className="dateView">
                  <span style={{ fontWeight: 'bold' }}>HST/GST: </span>
                  <span>{savedInvoice && savedInvoice.vat ? savedInvoice.vat : '0' }%</span>
                </div>
                <div className="dateView">
                  <span style={{ fontWeight: 'bold', fontSize: '20px' }}>USD {savedInvoice && !_.isNil(savedInvoice.amount) ? savedInvoice.amount.toFixed(2) : '' }</span>
                </div>
              </div>
            </div>
          </Modal>
        </CCardBody>
      </CCard>
    </>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      _getAllInvoices: (data) => getAllInvoices(data),
      _getAllPeerGroups: (data) => getAllPeerGroups(data),
      _addInvoice: (data) => addInvoice(data),
      _editInvoice: (data) => editInvoice(data),
      _statusInvoice : (data) => statusInvoice(data),
      _getPeerGroupInvoiceDetails: (data) => getPeerGroupInvoiceDetails(data),
      _uploadMedia: (data) => uploadMedia(data),
      _emptyPeerGroup: (data) => emptyPeerGroup(data),
    }, dispatch)
  }
}

function mapStateToProps(state) {
  const { invoices, loader, peerGroups } = state;
  return {
    allInvoices: invoices,
    isLoading: loader.loading,
    allPeerGroups: peerGroups,
    invoiceDetails: peerGroups.invoiceDetails,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoices);