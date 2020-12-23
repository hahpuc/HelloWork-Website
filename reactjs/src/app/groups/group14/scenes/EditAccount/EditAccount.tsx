import React from 'react'

import { Col, Row, Card, Form, Input, Button } from 'antd';
import { inject, observer } from 'mobx-react';
import { FormComponentProps } from 'antd/lib/form';

import AppComponentBase from 'app/shared/components/AppComponentBase';
import Stores from 'app/shared/stores/storeIdentifier';
import AccountStore14 from '../../stores/accountStore14';
import rules from './index.validation';
import { UpdateAccounInputtDTO } from '../../services/dto/accountDTO/UpdateAccountDTO';
import { Redirect } from 'react-router-dom';

const FormItem = Form.Item;

export interface IAccountItemProps extends FormComponentProps {
    accountStore14: AccountStore14;
}

export interface IAccountItemState {
    userName: string,
    currentPassword: string,
    newPassword: string,
    emailAddress: string,
    personId: string,
    redirect: any
}

@inject(Stores.accountStore14)
@observer
class EditAccount extends AppComponentBase<IAccountItemProps, IAccountItemState> {

    constructor(props: any) {
        super(props);
        this.state = {
            userName: "",
            currentPassword: "",
            newPassword: "",
            emailAddress: "",
            personId: "",
            redirect: null
        }
    }

    async componentDidMount() {
        await this.getAccount();
        this.bindingData();

    }

    async getAccount() {
        await this.props.accountStore14.getAccount();
    }

    bindingData() {
        const { name, email, personId } = this.props.accountStore14.account;
        this.props.form.setFieldsValue({
            accountName: name,
            email: email,
            personId: personId
        });
    }

    handleUpdateAccountSubmit = async (e: any) => {
        e.preventDefault();
        const { id, name, email, personId } = this.props.accountStore14.account;
        await this.props.form.validateFields(async (err: any, values: any) => {
            if (!err) {
                let dto: UpdateAccounInputtDTO = {
                    id: id,
                    userName: this.state.userName != "" ? this.state.userName : name,
                    emailAddress: this.state.emailAddress != "" ? this.state.emailAddress : email,
                    currentPassword: this.state.currentPassword.trim(),
                    newPassword: this.state.newPassword.trim(),
                    personId: this.state.personId != "" ? this.state.personId : personId
                };

                await this.props.accountStore14.updateAccount(dto);

                this.setState({
                    redirect: '/send-email'
                });
            }
        });
    }

    public render() {
        const { getFieldDecorator } = this.props.form;

        if (this.state.redirect) return <Redirect to={this.state.redirect} />;
        return (
            <Col className="name">
                <Form className="" onSubmit={this.handleUpdateAccountSubmit}>
                    <Row style={{ marginTop: 10 }}>
                        <Col span={8} offset={8}>
                            <Card>
                                <div style={{ textAlign: 'center' }}>
                                    <h1>Sửa thông tin đăng nhập</h1>
                                </div>
                                <FormItem
                                    label="Tên tài khoản">
                                    {getFieldDecorator('accountName', { rules: rules.accountName })(
                                        <Input placeholder={"user account"} size="large" disabled
                                            onChange={(e) => this.setState({ userName: e.target.value })} />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="Mật khẩu cũ">
                                    {getFieldDecorator('currentPassword', { rules: rules.currentPassword })(
                                        <Input placeholder={"old password"} size="large" type="password"
                                            onChange={(e) => this.setState({ currentPassword: e.target.value })} />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="Mật khẩu mới">
                                    {getFieldDecorator('newPassword', { rules: rules.newPassword })(
                                        <Input placeholder={"new password"} size="large" type="password"
                                            onChange={(e) => this.setState({ newPassword: e.target.value })} />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="Nhập lại mật khẩu mới">
                                    {getFieldDecorator('confirmPassword', {
                                        rules: [
                                            {
                                                validator: (rule: any, value: string, callback: any) => {
                                                    if (value && value !== this.props.form.getFieldValue('newPassword')) {
                                                        callback("The two passwords that you entered do not match!");
                                                    } else {
                                                        callback();
                                                    }
                                                }
                                            },
                                        ]
                                    })(
                                        <Input placeholder={"confirm password"} size="large" type="password" />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="Email">
                                    {getFieldDecorator('email', { rules: rules.email })(
                                        <Input placeholder={"user account"} size="large"
                                            onChange={(e) => this.setState({ emailAddress: e.target.value })} />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="Số CMND">
                                    {getFieldDecorator('personId', { rules: rules.personId })(
                                        <Input placeholder={"user account"} size="large"
                                            onChange={(e) => this.setState({ personId: e.target.value })} />
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button block type="primary" htmlType="submit" className="login-form-button">
                                        Lưu thay đổi
                                    </Button>
                                </FormItem>

                            </Card>
                        </Col>
                    </Row>
                </Form>
            </Col>
        );
    }
}

export default Form.create()(EditAccount)