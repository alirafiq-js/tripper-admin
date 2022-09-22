import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Select, List, notification, Modal } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import {
    CCard, CCardBody, CCardHeader, CCol, CRow, CDataTable
} from '@coreui/react';

const FormItem = Form.Item;
const { Option } = Select;

const Question = (props) => {
    const [form] = Form.useForm();
    const formRef = React.createRef();
    const [state, setState] = useState({
        selectedQuestionType: null,
        isEditingQuestion: false,
        editingQuestionId: null,
        openModal: false,
        question: '',
        option: '',
        optionList: []
    });

    useEffect(() => {
    }, []);

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };


    const onTypeChange = (value) => {
        console.log('selected qusetion type', value);
        setState({
            ...state,
            selectedQuestionType: value,
            question:'',
            option:'',
            optionList:[]
        });
    };

    const showModal = () => {
        setState({
            ...state,
            openModal: true
        });
    }

    const handleOk = async () => {
        try {

            if (state.isEditingQuestion) {

                const updateQuestionData = {
                    questionId: state.editingQuestionId,
                    question:state.question,
                    type:state.selectedQuestionType
                }

                if (state.selectedQuestionType && state.selectedQuestionType !== 'text') {
                    updateQuestionData.options = state.optionList
                }

                await props.updateQuestion(updateQuestionData);

                setState({
                    ...state,
                    openModal: false,
                    badge: '',
                    isEditingQuestion: false,
                    editingQuestionId: null
                });
            } else {

                const addQuestionData = {
                    question:state.question,
                    type: state.selectedQuestionType,
                    pgId: props.pgId
                }

                if (state.selectedQuestionType && state.selectedQuestionType !== 'text') {
                    addQuestionData.options = state.optionList
                }

                await props.addQuestion(addQuestionData);

                console.log("=============QUESTION DATA",addQuestionData);
                setState({
                    ...state,
                    openModal: false,
                    question: '',
                    option:'',
                    optionList:[]
                });
            }
        } catch (error) {
            console.log(error);
            notification['error']({
                 message: (error.response && error.response.data) ?  error.response.data.message : 'something went wrong',
                 placement:'bottomRight',
            });
            setState({
                ...state,
                openModal: false,
                question: '',
                option:'',
                optionList:[]
            });
        }

    }

    const onRemoveQuestion = async (question) => {
        try {

            const data = {
                questionId: question._id
            };
            const removeBadgeResponse = await props.deleteQuestion(data);
            setState({
                ...state,
                openModal: false,
                question: '',
                isEditingQuestion: false,
                editingQuestionId: null
            });
        } catch (error) {
            console.log(error);
            notification['error']({
                 message: (error.response && error.response.data) ?  error.response.data.message : 'something went wrong',
                 placement:'bottomRight',
            });
            setState({
                ...state,
                openModal: false,
                question: ''
            });
        }

    }

    const handleCancel = () => {
        setState({
            ...state,
            openModal: false,
            badge: '',
            isEditingQuestion: false,
            editingQuestionId: null,
            selectedQuestionType: null
        });
    }

    const onEdit = (item) => {
        setState({
            ...state,
            question: item.question,
            optionList: item.options,
            selectedQuestionType: item.type,
            editingQuestionId: item._id,
            isEditingQuestion: true,
            openModal: true,
        })
    }

    const showRemoveDialog = (item) => {
        try {
            Modal.confirm({
                title: 'Are you sure delete this question?',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk: () => onRemoveQuestion(item),
                onCancel() {
                    console.log('Cancel');
                },
            });

        } catch (error) {

        }
    };
    

    const addOption = () => {
        if (state.option) {
            setState({
                ...state,
                optionList: [...state.optionList, state.option],
                option:''
            });
        }
    }

    const removeOption = (option) => {
        console.log("remove option", option);
        if (option) {
            setState({
                ...state,
                optionList: state.optionList.filter((item)=> item !== option),
                option:''
            });
        }
    }

    form.setFieldsValue({
        badgeName: state.badge ? state.badge : '',
        option : state.option ? state.option : '',
        question: state.question ? state.question : '',
        questionType: state.selectedQuestionType ? state.selectedQuestionType : null
    });

    return (
        <>

            <CRow>
                <CCol lg={12} md={12} xs={12}>
                    <CCard>
                        <CCardBody>
                            <CRow>
                                <CCol lg={12} md={12}>
                                    <CCard>
                                        <CCardHeader>
                                            Questions
                                    </CCardHeader>
                                        <CCardBody>
                                            <Button type="primary" onClick={showModal} style={{ float: 'right', marginBottom: '18px' }} ghost>Add</Button>
                                            <CDataTable
                                                items={props.questionList}
                                                fields={[
                                                    { key: 'question' },
                                                    { key: 'options' },
                                                    { key: 'type' },
                                                    { key: 'updated', label: 'Created' },
                                                    'actions'
                                                ]}
                                                hover
                                                striped
                                                itemsPerPage={10}
                                                // activePage={page}
                                                scopedSlots={{
                                                    'question':
                                                        (item) => (
                                                            <td>
                                                                {item.question}
                                                            </td>
                                                        ),
                                                    'type':
                                                        (item) => (
                                                            <td style={{ textTransform: 'capitalize' }}>
                                                                {item.type}
                                                            </td>
                                                        ),
                                                    'updated':
                                                        (item) => (
                                                            <td>
                                                                {moment(item.created).format('Do MMM YYYY hh:mm a')}
                                                            </td>
                                                        ),
                                                    'actions':
                                                        (item) => (
                                                            <td>
                                                                <div>
                                                                    <Button type="primary" onClick={() => onEdit(item)} ghost>Edit</Button>
                                                                    <Button type="danger" onClick={() => showRemoveDialog(item)} style={{ marginLeft: '5px' }} ghost>Delete</Button>
                                                                </div>
                                                            </td>
                                                        ),
                                                }}
                                            />
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>



                    {/* Add and edit modal */}
                    <Modal
                        visible={state.openModal}
                        title="Question"
                        onCancel={handleCancel}
                        footer={[
                            state.isEditingQuestion ?
                                <Button key="submit" ghost type="primary" loading={props.isLoading} size="large" onClick={handleOk}>Update</Button>
                                :
                                <Button key="submit" ghost type="primary" loading={props.isLoading} size="large" onClick={handleOk}>Add</Button>
                        ]}
                    >
                        <Form {...layout} form={form} ref={formRef} name="control-ref" onFinish={() => console.log("on Finish")}>
                            <Form.Item
                                name="questionType"
                                //   label="Gender"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select a question type'
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select a question type"
                                    onChange={onTypeChange}
                                    allowClear
                                >
                                    <Option value="text">Text</Option>
                                    <Option value="radio">Radio Button</Option>
                                    <Option value="dropdown">Dropdown</Option>
                                </Select>
                            </Form.Item>
                            {
                                state.selectedQuestionType &&
                                <Form.Item
                                    name="question"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter a question'
                                        },
                                    ]}
                                    form={form}
                                >
                                    <Input onChange={(e) => setState({ ...state, question: e.target.value })} placeholder='Enter a question' />
                                </Form.Item>
                            }

                            {
                                state.selectedQuestionType && ['radio','dropdown'].includes(state.selectedQuestionType) &&
                                <>
                                <Form.Item
                                    name="option"
                                    form={form}
                                >
                                    <Input onChange={(e) => setState({ ...state, option: e.target.value })} placeholder='Enter a option' />
                                </Form.Item>
                                <Form.Item
                                    name="optiond"
                                    form={form}
                                >
                                    <Button type="primary" ghost onClick={addOption}>Add</Button>
                                </Form.Item>
                                {
                                    state.optionList.length > 0 &&
                                    <List
                                        header={<div>Options</div>}
                                        bordered
                                        dataSource={state.optionList}
                                        renderItem={item => (
                                            <List.Item actions={[<Button danger onClick={() => removeOption(item)} >Remove</Button>]}>
                                                {item}
                                            </List.Item>
                                        )}
                                    />
                                }
                                </>
                            }
                        </Form>
                    </Modal>
                </CCol>
            </CRow>
        </>
    )
}

export default Question;