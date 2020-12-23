import React from "react";
import {Button, Col, Form, Icon, Input, message, notification, Row, Typography} from "antd";
import {Link} from "react-router-dom";
import rules from "../Login/index.validation";
import {L} from "../../../../shared/lib/abpUtility";
import logo from "../../../../assets/images/forgot-password.svg";

import './index.less';
import userService from "../../../../shared/services/user/userService";

const ForgetPassword = Form.create()(({form}: any) => {
    const {getFieldDecorator}: any = form;

    const handleSubmit = (e: any) => {
        e.preventDefault();

        form.validateFields((err: any, values: any) => {
            if (err) return;

            message.loading("Vui lòng chờ...");
            (async () => {
                const result = await userService.forgetPassword({
                    email: values.userNameOrEmailAddress
                });
                notification.success({
                    message: "Mật khẩu mới là: " + result
                });
            })();
        });
    };

    return (
        <div className="login-screen">
            <div className="signup-area">
                <Col className="name">
                    <Form className="" onSubmit={handleSubmit}>
                        <Row>
                            <Row style={{marginTop: 10}}>
                                <Col xs={12} style={{paddingRight: '5px'}}>
                                    <Typography.Title>Quên mật khẩu</Typography.Title>
                                    <Typography.Text strong><>Chưa có tài khoản? </><Link to="/register">Đăng ký</Link></Typography.Text>
                                    <br/><br/>
                                    <Typography.Paragraph>
                                        Nhập email liên kết với tài khoản đã được đăng ký, nếu email tồn tại, một đường dẫn đặt lại mật khẩu sẽ gửi đến email của bạn
                                    </Typography.Paragraph>
                                    <Form.Item label="Email">
                                        {getFieldDecorator('userNameOrEmailAddress', {rules: rules.userNameOrEmailAddress})(
                                            <Input placeholder="Địa chỉ email"
                                                   prefix={<Icon type="user"
                                                                 style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   size="large"/>
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        <Button htmlType={'submit'} size="large" type="primary" style={{width: "100%"}}>
                                            {L('Gửi')}
                                        </Button>
                                    </Form.Item>
                                </Col>
                                <Col xs={12}>
                                    <img src={logo} style={{margin: 'auto'}}/>
                                </Col>
                            </Row>
                        </Row>
                    </Form>
                </Col>
            </div>
        </div>
    )
});


export default ForgetPassword;
