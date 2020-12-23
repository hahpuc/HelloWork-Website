/* tslint:disable */

import AppComponentBase from 'app/shared/components/AppComponentBase';
import Stores from 'app/shared/stores/storeIdentifier';
import { inject, observer } from 'mobx-react';
import VerifyBusinessStore from '../../stores/verifyBusinessStore';
import React from 'react';
import { Button, Card, Col, Form, Input, List, Row, Upload, Typography, Modal } from 'antd';
import './VerifyBusiness.less';
import FormItem from 'antd/lib/form/FormItem';
import { RcFile } from 'antd/lib/upload';
import { withRouter } from 'react-router-dom';
import { VerifySubmitDTO } from '../../services/dto/verifyBusinessDTO/verifySubmitDTO';

export interface IVerifyBusinesslistProps {
  verifyBusinessStore: VerifyBusinessStore;
  history: any;
  location: any;
  match: any;
}

export interface IVerifyBusinesslistState {
  status: any;
  fileList: RcFile[];
  file: any;
  isModal: boolean;
}

@inject(Stores.verifyBusinessStore)
@observer
class VerifyBusiness extends AppComponentBase<IVerifyBusinesslistProps, IVerifyBusinesslistState> {
  constructor(props: any) {
    super(props);
    this.state = {
      status: '',
      fileList: [],
      file: null,
      isModal: false,
    };
  }

  handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(this.state.fileList);
    let verifyDTO: VerifySubmitDTO = {
      input: this.state.fileList,
    };
    let result = await this.props.verifyBusinessStore.verifySubmit(verifyDTO);
    if (result) {
      this.props.history.push('/send-email');
    }
  };

  async componentDidMount() {
    await this.props.verifyBusinessStore.getAccount();
    this.setState({
      status: await this.props.verifyBusinessStore.getStatus(),
    });
  }

  public render() {
    const { Title } = Typography;
    const props = {
      onRemove: (file: any) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      onView: (event: RcFile) => {
        this.setState({
          file: URL.createObjectURL(event),
          isModal: true,
        });
      },
      beforeUpload: (file: RcFile, fileList: RcFile[]) => {
        //console.log(file);
        this.setState((state) => {
          const newFileList = state.fileList;
          newFileList.push(file);
          return {
            fileList: newFileList,
          };
        });

        return false;
      },
    };
    const handleOk = () => {
      this.setState({ isModal: false });
    };

    const handleCancel = () => {
      this.setState({ isModal: false });
    };
    return (
      <Row className="Center_El">
        <Col span={16} className="Container">
          <Card>
            <a
              style={{ padding: '2rem', fontWeight: 'bold' }}
              onClick={() => {
                this.props.history.goBack();
              }}
            >
              Về trang trước
            </a>
            <Row
              style={{
                display: 'flex',
              }}
            >
              <Col span={12} style={{ padding: '2rem' }}>
                <Title>Xác minh doanh nghiệp</Title>
                <p>Bạn cần xác minh thông tin doanh nghiệp trước khi có thể sử dụng các dịch vụ của doanh nghiệp</p>
                <Form>
                  <span style={{ fontWeight: 'bold' }}>Trạng thái xác minh</span>
                  <FormItem>
                    <Input value={this.state.status} disabled></Input>
                  </FormItem>
                  <span style={{ fontWeight: 'bold' }}>Tải tệp lên</span>
                  <p>Cung cấp các giấy tờ để chứng minh vai trò pháp lý trong công ty, doanh nghiệp.</p>
                  <Upload onRemove={props.onRemove} beforeUpload={props.beforeUpload} showUploadList={false}>
                    <Button type="primary">Tải tệp lên</Button>
                  </Upload>
                </Form>
              </Col>
              <Col span={12} style={{ padding: '2rem' }}>
                <p style={{ fontWeight: 'bold' }}>Danh sách các tệp</p>
                <List
                  itemLayout="horizontal"
                  dataSource={this.state.fileList}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <a
                          key="delete"
                          onClick={() => {
                            props.onRemove(item);
                          }}
                        >
                          Xóa
                        </a>,
                        <a
                          key="view"
                          onClick={() => {
                            props.onView(item);
                          }}
                        >
                          Xem
                        </a>,
                      ]}
                    >
                      <List.Item.Meta title={item.name} description={(item.size / 1024).toFixed(1) + 'KB'} />
                    </List.Item>
                  )}
                />
                <Button type="primary" block onClick={this.handleSubmit}>
                  Hoàn tất
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>

        <Modal width={900} visible={this.state.isModal} onOk={handleOk} onCancel={handleCancel} footer={null}>
          <img width={700} src={this.state.file} />
        </Modal>
      </Row>
    );
  }
}

export default withRouter(VerifyBusiness);
