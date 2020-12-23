import AppComponentBase from 'app/shared/components/AppComponentBase';
import Stores from 'app/shared/stores/storeIdentifier';
import '../VerifyBusiness/VerifyBusiness.less'
import '../../styles.less'
import { inject, observer } from 'mobx-react';
import { SendMailDTO } from '../../services/dto/jobTypeDTO/sendMailDTO';
import SendMailStore from '../../stores/sendMailStore';
import React from 'react'
import { Col, Card, Row, Typography } from 'antd';

export interface ISendMaillistProps {
    sendMailStore: SendMailStore;
}

export interface ISendMaillistState {
    userName: string,
    emailAddress: string,
    password: string,
    isEmailConfirmed: boolean,
    emailConfirmationCode: string,
    id: number
}

@inject(Stores.sendMailStore)
@observer
export default class SendMailComponent extends AppComponentBase<ISendMaillistProps, ISendMaillistState>{

    constructor(props: any) {
        super(props);
        this.state = {
            userName: "",
            emailAddress: "",
            password: "",
            isEmailConfirmed: false,
            emailConfirmationCode: "",
            id: 0,
        }
    }
    async componentDidMount() {
        await this.getAccount();
        this.sendEmail();
    }
    async getAccount() {
        await this.props.sendMailStore.getAccount();
    }
    sendEmail() {
        if (this.props.sendMailStore.sendMail.id != 0) {
            let dto: SendMailDTO = {
                id: this.props.sendMailStore.sendMail.id
            }
            console.log(this.props.sendMailStore.sendMail.id)
            this.props.sendMailStore.sendMailCode(dto);
        }
    }

    public render() {
        const {Title} = Typography;
        return (
            <Row className='Center_El'>
                <Col span={16} className='Container'>
                        <Card style={{ textAlign: "center" }}>
                            <Title>Xác nhận email để hoàn tất</Title>
                            <div style={{marginTop: '2rem'}}>
                                <p>Chúng tôi đã gửi một liên kết xác nhận đến email</p>
                                <p style={{ fontWeight: 'bold' }}>{this.props.sendMailStore.sendMail?.emailAddress}</p>
                                <p>Vui lòng ấn vào liên kết để hoàn tất quá trình.</p>
                                <div style={{ marginTop: '2rem' }}>
                                    <p>Chưa nhận được mail? <a onClick={() => { this.sendEmail() }}>Gửi lại mail</a></p>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
        )
    }

}
