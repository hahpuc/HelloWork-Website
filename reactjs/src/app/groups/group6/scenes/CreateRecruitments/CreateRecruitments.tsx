import '../../styles.less';
import './CreateRecruitments.less';
import { inject, observer } from 'mobx-react';
import AppComponentBase from 'app/shared/components/AppComponentBase';
import Stores from 'app/shared/stores/storeIdentifier';
import RecruitmentsStore from '../../stores/recruitmentsStore';
import { IRecruitmentsGet } from '../../models/recruitments';

import React from 'react';
import { Col, Row, Form, Input, Select, Button, DatePicker, Typography, Modal } from 'antd';
import moment from 'moment';
import ExpertisesStore from '../../stores/expertisesStore';
import rules from './CreateRecruitments.validation';
import { FormComponentProps } from 'antd/lib/form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IExpertise } from '../../models/expertises';
import SessionStore from 'shared/stores/sessionStore'
import { Redirect } from 'react-router-dom';

export interface IRecruitmentsProps extends FormComponentProps {
    recruitmentsStore: RecruitmentsStore,
    expertisesStore: ExpertisesStore,
    sessionStore: SessionStore
    history: any;
    location: any;
}



export interface IRecruitmentsState {
    recruitment: IRecruitmentsGet
    descriptionClass: string
}
@inject(Stores.recruitmentsStore)
@inject(Stores.expertisesStore)
@inject(Stores.SessionStore)
@observer
class CreateRecruitment extends AppComponentBase<IRecruitmentsProps, IRecruitmentsState> {



    constructor(props: any) {
        super(props);
        this.state = {
            recruitment: {
                id: '',
                name: '',
                finishDate: moment(new Date).format("YYYY-MM-DD"),
                wayOfWork: 'fulltime',
                salaryRange: 'thuongluong',
                expertises: [
                    { id: 1, name: '' },
                    { id: 1, name: '' },
                    { id: 1, name: '' },
                    { id: 1, name: '' }
                ],
                urgentLevel: 'normal',
                description: '',
                requirement: '',
                contactEmail: this.props.sessionStore.currentLogin.user.emailAddress,
                state: 'temp',
                creatorUserId: 1,
                creationTime: ''
            },
            descriptionClass: 'description'
        }

    }

    descriptionLength = 0;
    errorDescription = true;
    errorValidate = true;
    errorExpertise = true;
    idReuse = '';
    isReuseError = false;

    async componentDidMount() {
        await this.props.sessionStore.getCurrentLoginInformations();
        await this.props.expertisesStore.getExpertiseAll();
        
        const pathArray = window.location.pathname.split('/');
        const pathLast =pathArray[pathArray.length - 1].split('-');
        this.idReuse = pathLast[pathLast.length - 1];
        if (this.idReuse !== '') {
            this.descriptionLength = 100;
            this.errorDescription = false;
            this.errorValidate = false;
            this.errorExpertise = false;
            await this.props.recruitmentsStore.getRecruitmentById(this.idReuse);
            if (this.props.recruitmentsStore.recruitment.creatorUserId !== this.props.sessionStore.currentLogin.user.id) {
                this.isReuseError = true;
            }
            this.setState({
                recruitment: this.props.recruitmentsStore.recruitment
            });
            for (let i = this.state.recruitment.expertises.length; i < 4; i++) {
                const expertiseNull = { id: 1, name: '' }
                this.state.recruitment.expertises.push(expertiseNull);
            }
    
            for (let i = 0; i < this.state.recruitment.expertises.length; i++) {
                if(this.state.recruitment.expertises[i].id === 1) {
                    this.state.recruitment.expertises.splice(i, 1);
                }
            }
        } else {
            await this.props.recruitmentsStore.getRecruitmentNull();
            this.setState({
                recruitment: this.props.recruitmentsStore.recruitment
            });
            let recruitmentClone = this.state.recruitment;
            recruitmentClone = JSON.parse(JSON.stringify(recruitmentClone));
            recruitmentClone.contactEmail = this.props.sessionStore.currentLogin.user.emailAddress;
            recruitmentClone.creatorUserId = this.props.sessionStore.currentLogin.user.id;
            this.setState({
                recruitment: recruitmentClone,
            });
            for (let i = this.state.recruitment.expertises.length; i < 4; i++) {
                const expertiseNull = { id: 1, name: '' }
                this.state.recruitment.expertises.push(expertiseNull);
            }
        }
    }

    handleChangeInput = (event: any) => {
        const { target: { name, value } } = event
        let items = this.state.recruitment;
        items = JSON.parse(JSON.stringify(items));
        items[`${name}`] = value;
        this.setState({
            recruitment: items,
        });
    }

    handleChangeDescription = (value: any, delta: any, source: any, editor: any) => {
        this.descriptionLength = editor.getLength();
        if (editor.getLength() < 100) {
            this.errorDescription = true;
        } else {
            this.errorDescription = false;
            this.props.form.setFields({
                description: {
                    errors: null,
                },
            });
            
            this.setState({
                descriptionClass: 'description'
            })
        }
        let items = this.state.recruitment;
        items = JSON.parse(JSON.stringify(items));
        items['description'] = value;
        this.setState({
            recruitment: items,
        });
    }

    handleBlurDescription = (previousRange: any, source: any, editor: any) => {
        if (editor.getLength() < 100) {
            this.props.form.setFields({
                description: {
                    errors: [new Error('Mô tả công việc phải nhiều hơn 100 kí tự')],
                },
            });
            this.setState({
                descriptionClass: 'description error-textarea'
            })
        }
    }

    handleChangeRequirement = (value: any) => {
        let items = this.state.recruitment;
        items = JSON.parse(JSON.stringify(items));
        items['requirement'] = value;
        this.setState({
            recruitment: items,
        });
    }

    handleChangeSelect = (name: string, event: any) => {
        let items = this.state.recruitment;
        items = JSON.parse(JSON.stringify(items));
        items[`${name}`] = event;
        this.setState({
            recruitment: items,
        });
    }

    handleChangeExpertises = (id: number, event: any) => {
        let items = this.state.recruitment;
        items = JSON.parse(JSON.stringify(items));
        items.expertises[id].id = event;
        this.setState({
            recruitment: items,
        });
        this.errorExpertise = !this.checkSelectedOneExpertise(items.expertises);
        if (this.errorExpertise) {
            this.props.form.setFields({
                expertises: {
                  errors: [new Error('Vui lòng chọn ít nhất một chuyên môn')],
                },
            });
        } else {
            this.props.form.setFields({
                expertises: {
                  errors: null,
                },
            });
        }
    }

    handleChangeDate = (date: any, dateString: string) => {
        const name = 'finishDate';
        let items = this.state.recruitment;
        items = JSON.parse(JSON.stringify(items));
        items[`${name}`] = moment(dateString, 'DD/MM/YYYY').format('YYYY-MM-DD');
        this.setState({
            recruitment: items,
        });
    }

    checkSelectedOneExpertise = (expertises: IExpertise[]) => {
        for (const expertise of expertises) {
            if (expertise.id !== 1 && expertise.id !== 24) {
                return true;
            }
        }
        return false;
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        if (this.descriptionLength < 100) {
            this.props.form.setFields({
                description: {
                    errors: [new Error('Mô tả công việc phải nhiều hơn 100 kí tự')],
                },
            });
            this.setState({
                descriptionClass: 'description error-textarea'
            })
        }
        e.preventDefault();
        this.props.form.validateFields( (err: any, values: any) => {
            if (err === null && !this.errorDescription && !this.errorExpertise) {
                this.createRecruitment();
            }
        });
    };

    createRecruitment = async () => {
        let clone = JSON.parse(JSON.stringify(this.state.recruitment));
        delete clone.creationTime;
        delete clone.id;
        this.props.recruitmentsStore.createRecruitment(clone);
    }

    disabledDate(current: any) {
        return current && current < moment().add(-1,'days');
    }

    cancel() {
        const { confirm } = Modal;
        confirm({
        title: 'Bạn có thực sử muốn thoát',
        okText: 'Thoát',
        cancelText: 'Hủy bỏ',
        centered: true,
        onOk() {
            window.location.href = '/recruimentPosts';
        },
        onCancel() {},
        });
    }

    render() {
        const { expertises } = this.props.expertisesStore;
        if (expertises === undefined) return (<div></div>)
        const { recruitment } = this.props.recruitmentsStore;
        if (recruitment === undefined) return (<div></div>)
        
        const { Option } = Select;
        const { Title, Text } = Typography;
        const { getFieldDecorator, isFieldTouched, getFieldError } = this.props.form;
        const formats = [
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'color',
            'list', 'bullet', 'indent',
            'link', 'image'
        ]

        const modules = {
            toolbar: [
                [{ 'header': []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'color': ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color']}],
                [{'list': 'ordered'}, {'list': 'bullet'}, 
                {'indent': '-1'}, {'indent': '+1'}, 'image', 'link']
            ],
            clipboard: {
              matchVisual: false,
            }
        }
        
        if (this.idReuse === '') {
            this.errorValidate = (!!isFieldTouched('name') && !!getFieldError('name') || isFieldTouched('name') === undefined);
        }

        if (this.isReuseError) {
            return <Redirect
                to={{
                    pathname: '/exception?type=401',
                    state: { from: this.props.location }
                }}
            />;
        } else {

            return (
                <div className="container-center">
                    <Form layout='horizontal' onSubmit={this.handleSubmit}>
                        <Title className="title-text">Thêm tin tuyển dụng</Title>
                        <div className="slot-recruitment" style={{marginBottom: '0.7rem'}}>Bạn còn <Text type="warning" style={{fontWeight: 700}}>10</Text> lượt đăng tin tuyển dụng</div>
                        <Row type="flex" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Col xs={{span: 24}} lg={{span: 12}} className="p-form-left">
                                <Form.Item label='Vị trí công việc'>
                                    {getFieldDecorator('name', {initialValue: this.props.recruitmentsStore.recruitment?.name, rules: rules.name, validateTrigger: 'onBlur' })(
                                        <Input placeholder='Tên vị trí' name="name" onChange={this.handleChangeInput}/>
                                    )}
                                </Form.Item>
                                <Form.Item label='Ngày kết thúc'>
                                    <DatePicker
                                        style={{display: 'block'}}
                                        format="DD/MM/YYYY"
                                        disabledDate={this.disabledDate}
                                        name="finishDate"
                                        onChange={this.handleChangeDate}
                                    />
                                </Form.Item>
                                <Form.Item label='Hình thức công việc'>
                                    <Select defaultValue={this.props.recruitmentsStore.recruitment?.wayOfWork} onChange={(e: any) => this.handleChangeSelect('wayOfWork', e)}>
                                        <Option value='fulltime'>Fulltime</Option>
                                        <Option value='parttime'>Part time</Option>
                                        <Option value='intern'>Intern</Option>
                                        <Option value='remote'>Remote</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label='Khoảng lương'>
                                    <Select defaultValue={this.props.recruitmentsStore.recruitment?.salaryRange} onChange={(e: any) => this.handleChangeSelect('salaryRange', e)}>
                                        <Option value='thuongluong'>Thương lượng</Option>
                                        <Option value='<1m'>Dưới 1 triệu</Option>
                                        <Option value='1-5m'>1 - 5 triệu</Option>
                                        <Option value='5-10m'>5 - 10 triệu</Option>
                                        <Option value='10-20m'>10 - 20 triệu</Option>
                                        <Option value='20-50m'>20 - 50 triệu</Option>
                                        <Option value='50-100m'>50 - 100 triệu</Option>
                                        <Option value='>100m'>Trên 100 triệu</Option>

                                    </Select>
                                </Form.Item>
                                <Form.Item className='ant-form-item-required' label='Mảng chuyên môn'>
                                    <Row>
                                        <Col xs={{span: 24}} md={{span: 12}} className="p-form--select-right">
                                            {getFieldDecorator('expertises')(
                                                <Select style={{ display: "none" }}></Select>
                                            )}
                                            <Select
                                                placeholder='Chọn chuyên môn'
                                                defaultValue={this.props.recruitmentsStore.recruitment.expertises[0]?.id}
                                                onChange={(e: any) => this.handleChangeExpertises(0, e)}
                                            >
                                                {this.props.expertisesStore?.expertises.items.map((value) => {
                                                    return <Option value={value.id}>{value.name}</Option>
                                                })}
                                                <Option value={1}>Bỏ chọn chuyên môn</Option>
                                            </Select>
                                        </Col>
                                        <Col xs={{span: 24}} md={{span: 12}} className="p-form--select-left">
                                            <Select
                                                placeholder='Chọn chuyên môn'
                                                defaultValue={this.props.recruitmentsStore.recruitment.expertises[1]?.id}
                                                onChange={(e: any) => this.handleChangeExpertises(1, e)}
                                            >
                                                {this.props.expertisesStore?.expertises.items.map((value) => {
                                                    return <Option value={value.id}>{value.name}</Option>
                                                })}
                                                <Option value={1}>Bỏ chọn chuyên môn</Option>
                                            </Select>
                                        </Col>
                                        <Col xs={{span: 24}} md={{span: 12}} className="p-form--select-right">
                                            <Select
                                                placeholder='Chọn chuyên môn'
                                                defaultValue={this.props.recruitmentsStore.recruitment.expertises[2]?.id}
                                                onChange={(e: any) => this.handleChangeExpertises(2, e)}
                                            >
                                                {this.props.expertisesStore?.expertises.items.map((value) => {
                                                    return <Option value={value.id}>{value.name}</Option>
                                                })}
                                                <Option value={1}>Bỏ chọn chuyên môn</Option>
                                            </Select>
                                        </Col>
                                        <Col xs={{span: 24}} md={{span: 12}} className="p-form--select-left">
                                            <Select
                                                placeholder='Chọn chuyên môn'
                                                defaultValue={this.props.recruitmentsStore.recruitment.expertises[3]?.id}
                                                onChange={(e: any) => this.handleChangeExpertises(3, e)}
                                            >
                                                {this.props.expertisesStore?.expertises.items.map((value) => {
                                                    return <Option value={value.id}>{value.name}</Option>
                                                })}
                                                <Option value={1}>Bỏ chọn chuyên môn</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                </Form.Item>
                                <Form.Item label='Email liên hệ'>
                                    <Input placeholder='Email liên hệ' name="contactEmail" disabled
                                        defaultValue={this.props.sessionStore.currentLogin.user.emailAddress}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={{span: 24}} lg={{span: 12}} className="p-form-right">
                                <Form.Item className='ant-form-item-required' label='Mô tả công việc'>
                                    {getFieldDecorator('description')(
                                        <Input name="description" style={{ display: "none" }} />
                                    )}
                                    <ReactQuill theme="snow"
                                        className={this.state.descriptionClass}
                                        formats={formats} modules={modules}
                                        defaultValue={this.props.recruitmentsStore.recruitment?.description}
                                        onChange={this.handleChangeDescription}
                                        onBlur={this.handleBlurDescription}
                                    />
                                </Form.Item>
                                <Form.Item label='Yêu cầu công việc'>
                                <ReactQuill theme="snow" className="requirement" formats={formats} modules={modules}
                                    onChange={this.handleChangeRequirement}
                                    defaultValue={this.props.recruitmentsStore.recruitment?.requirement}
                                />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row type="flex" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                            <Col xs={{span: 24}} lg={{span: 12}} style={{marginBottom: '20px'}} className="p-form-left">
                                <Button style={{ width: '150px' }} type="primary" >Mua thêm gói</Button>
                            </Col>
                            <Col xs={{span: 24}} lg={{span: 12}} className="p-form-right">
                                <Row style={{ display: 'flex' }} justify="center">
                                    <Col xs={{span: 8}} md={{span: 10}} style={{ marginRight: 'auto' }}>
                                        <Select
                                            defaultValue={this.props.recruitmentsStore.recruitment?.state}
                                            onChange={(e: any) => this.handleChangeSelect('state', e)}
                                        >
                                            <Option value='temp'>Bản nháp</Option>
                                            <Option value='activate'>Đang hoạt động</Option>
                                            <Option value='done'>Kết thúc</Option>
                                        </Select>
                                    </Col>
                                    <Col xs={{span: 16}} md={{span: 14}} style={{ textAlign: 'end' }}>
                                        <Button onClick={(e: any) => this.cancel()} className="button-w-submit" style={{background: 'rgb(245, 245, 245)', marginRight: '20px'}}>Hủy</Button>
                                        <Button
                                            className={(this.errorValidate || this.errorDescription || this.errorExpertise) ? 'not-validate button-w-submit' : 'button-w-submit'}
                                            type="primary"
                                            htmlType={'submit'}
                                        >Lưu</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </div>
            )
        }
    }
}

export default Form.create()(CreateRecruitment);