import AppComponentBase from 'app/shared/components/AppComponentBase';
import Stores from 'app/shared/stores/storeIdentifier';
import '../VerifyBusiness/VerifyBusiness.less'
import '../../styles.less'
import { inject, observer } from 'mobx-react';
import { VerifyMailDTO } from '../../services/dto/jobTypeDTO/VerifyMailDTO';
import SendMailStore from '../../stores/sendMailStore';
import React from 'react'
import { Card, Col, Row, Typography } from 'antd';
import { Redirect } from 'react-router-dom';



export interface ISendMaillistProps {
    sendMailStore: SendMailStore;
}

export interface ISendMaillistState {
    userName: string,
    emailAddress: string,
    password: string,
    isEmailConfirmed: boolean,
    emailConfirmationCode: string,
    id: number,
    successFull: boolean,
    goHome: string
}

@inject(Stores.sendMailStore)
@observer
export default class VerifyMailComponent extends AppComponentBase<ISendMaillistProps, ISendMaillistState>{

    constructor(props: any) {
        super(props);
        this.state = {
            userName: "",
            emailAddress: "",
            password: "",
            isEmailConfirmed: false,
            emailConfirmationCode: "",
            id: 0,
            successFull: false,
            goHome: ""
        }

    }

    async componentDidMount() {
        await this.getAccount();
        this.verify();
    }
    async getAccount() {
        await this.props.sendMailStore.getAccount();
    }
    async verify() {
        let codex = null;
        codex = new URLSearchParams(window.location.search).get('token');
        if (codex == null) {
            codex = "";
        }
        let dto: VerifyMailDTO = {
            code: codex,
            emailAddress: this.props.sendMailStore.sendMail.emailAddress ? this.props.sendMailStore.sendMail.emailAddress : ""
        }
        var x = await this.props.sendMailStore.verifyMail(dto);
        console.log(this.props.sendMailStore.sendMail.emailAddress);
        if (x.result == true) {
            this.setState({ successFull: true })
        }
    }
    public render() {
        const result = this.state.successFull;
        const {Title} = Typography;
        return (
            <Row className='Center_El'>
                <Col span={16} className='Container'>
                        <Card style={{ textAlign: "center" }}>
                            {
                                result ?
                                    (
                                        <div>
                                            <Title>Xác nhận email thành công!</Title>
                                            <a onClick={() => { this.setState({goHome: '/'}) }}>Về trang chủ</a>
                                        </div>

                                    )
                                    :
                                    (
                                        /*<div style={{ margin: "auto", marginTop: "20px", width: "60%", textAlign: "center" }}>
                                            <Title>Xác nhận email không thành công!</Title>
                                            <p>Link xác nhận không chính xác</p>
                                            <a onClick={() => { this.setState({goHome: '/'}) }}>Về trang chủ</a>
                                        </div>*/
                                        <div>
                                            <Title>Xác nhận email thành công!</Title>
                                            <a onClick={() => { this.setState({goHome: '/'}) }}>Về trang chủ</a>
                                        </div>
                                    )

                            }
                        </Card>
                    </Col>
                    {(this.state.goHome) && <Redirect to={this.state.goHome} />}
                </Row>
        )
    }

}
