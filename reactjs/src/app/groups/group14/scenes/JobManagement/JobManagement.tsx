import React from 'react';
import { Form, Col, Row, Card, Select, Button, Table, Tooltip, Modal, message } from 'antd';
import { inject, observer } from 'mobx-react';
import { FormComponentProps } from 'antd/lib/form';
import AppComponentBase from 'app/shared/components/AppComponentBase';
import FormItem from 'antd/lib/form/FormItem';
import Stores from 'app/shared/stores/storeIdentifier';
import RecruitmentUserStore from '../../stores/recruitmentUserStore';
import { FilterReUserDTO } from '../../services/dto/recruitmentUserDTO/filterReUserDTO';
import { ColumnProps } from 'antd/lib/table';
import Item from 'antd/lib/list/Item';
import { ExclamationCircleOutlined } from '@ant-design/icons/lib/icons';
//import { Redirect } from 'react-router-dom';

const { Option } = Select;

export interface IRecruitmentUserItemProps extends FormComponentProps {
  recruitmentUserStore: RecruitmentUserStore;
  history: any;
}

const provinceData = [
  'Hà Nội',
  'HCM',
  'An Giang',
  'Bà Rịa - Vũng Tàu',
  'Bạc Liêu',
  'Bắc Giang',
  'Bắc Kạn',
  'Bắc Ninh',
  'Bến Tre',
  'Bình Định',
  'Bình Dương',
  'Bình Phước',
  'Bình Thuận',
  'Cà Mau',
  'Cao Bằng',
  'Cần Thơ',
  'Đà Nẵng',
  'Hải Phòng',
  'Gia Lai',
  'Hòa Bình',
  'Hà Giang',
  'Hà Nam',
  'Hưng Yên',
  'Hải Dương',
  'Hà Tĩnh',
  'Điện Biên',
  'Hậu Giang',
  'Đắk Lắk',
  'Đắk Nông',
  'Đồng Nai',
  'Đồng Tháp',
  'Kiên Giang',
  'Khánh Hòa',
  'Lai Châu',
  'Kon Tum',
  'Long An',
  'Lâm Đồng',
  'Lào Cai',
  'Lạng Sơn',
  'Nghệ An',
  'Nam Định',
  'Ninh Bình',
  'Ninh Thuận',
  'Phú Thọ',
  'Phú Yên',
  'Quảng Bình',
  'Quảng Nam',
  'Quảng Ngãi',
  'Quảng Trị',
  'Quảng Ninh',
  'Sóc Trăng',
  'Thanh Hóa',
  'Sơn La',
  'Thái Bình',
  'Thừa Thiên - Huế',
  'Thái Nguyên',
  'Tiền Giang',
  'Trà Vinh',
  'Tuyên Quang',
  'Tây Ninh',
  'Vĩnh Long',
  'Vĩnh Phúc',
  'Yên Bái',
];

export interface IJobManagementItemState {
  idUser: number;
  data: any[];
  idRecruitmentData: any[];
  redirect: any;
  selectedRowKeys: any[];
  selectedCity: any;
  positionData: any[];
  salaryData: any[];
  requirementData: string[];
  wayOfWorkData: string[];
  maso: any;
  name: any;
  position: any;
  wayOfWork: any;
  salaryRange: any;
  state: any;
  status: any;
  requirement: any;
  reData: any[];
  isCancel: boolean;
  isSave: boolean;
}

@inject(Stores.recruitmentUserStore)
@observer
class JobManagement extends AppComponentBase<IRecruitmentUserItemProps, IJobManagementItemState> {
  constructor(props: any) {
    super(props);
    this.state = {
      idUser: 0,
      data: [],
      idRecruitmentData: [],
      positionData: [],
      salaryData: [],
      requirementData: [],
      wayOfWorkData: [],
      redirect: null,
      selectedRowKeys: [],
      selectedCity: '',
      maso: null,
      name: null,
      position: null,
      wayOfWork: null,
      salaryRange: null,
      state: null,
      status: null,
      requirement: null,
      reData: [],
      isCancel: false,
      isSave: false,
    };
  }

  async componentDidMount() {
    await this.getAccount();
    await this.getallRecruitmentUser();
    this.bindingData();
    this.setState({ idUser: this.props.recruitmentUserStore.account.id });
  }

  async getAccount() {
    await this.props.recruitmentUserStore.getAccount();
  }

  async getallRecruitmentUser() {
    await this.props.recruitmentUserStore.getallRecruitmentUser();
  }

  bindingData() {
    let list = [];
    let listIDRecruit = [];
    let listPosition = [];
    let listSalary = [];
    let listRequirement = [];
    let listWayOfWork = [];
    for (let i = 0; i < this.props.recruitmentUserStore.allRecruitmentUser.length; i++) {
      let tempState = '';
      if (this.props.recruitmentUserStore.allRecruitmentUser[i].status == 'DA LUU') {
        tempState = 'Đã lưu';
      } else if (this.props.recruitmentUserStore.allRecruitmentUser[i].status == 'THANH CONG') {
        tempState = 'Thành công';
      } else if (this.props.recruitmentUserStore.allRecruitmentUser[i].status == 'TU CHOI') {
        tempState = 'Từ chối';
      } else if (this.props.recruitmentUserStore.allRecruitmentUser[i].status == 'CHO PHONG VAN') {
        tempState = 'Chờ phỏng vấn';
      } else if (this.props.recruitmentUserStore.allRecruitmentUser[i].status == 'CHO CHOT LICH') {
        tempState = 'Chờ chốt lịch';
      } else if (this.props.recruitmentUserStore.allRecruitmentUser[i].status == 'CHO KET QUA') {
        tempState = 'Chờ kết quả';
      } else if (this.props.recruitmentUserStore.allRecruitmentUser[i].status == 'CHO PHAN HOI') {
        tempState = 'Chờ phản hồi';
      }
      list.push({
        stt: i,
        idRe: `${this.props.recruitmentUserStore.allRecruitmentUser[i].id}+${this.props.recruitmentUserStore.allRecruitmentUser[i].status}`,
        jobName: `${this.props.recruitmentUserStore.allRecruitmentUser[i].name}`,
        age: `${this.props.recruitmentUserStore.allRecruitmentUser[i].requirement}`,
        city: `${this.props.recruitmentUserStore.allRecruitmentUser[i].state}`,
        salary: `￥${this.props.recruitmentUserStore.allRecruitmentUser[i].salaryRange}.00`,
        jobType: `${this.props.recruitmentUserStore.allRecruitmentUser[i].wayOfWork}`,
        jobStatus: `${tempState}`,
        view: `${this.props.recruitmentUserStore.allRecruitmentUser[i].id}+${this.props.recruitmentUserStore.allRecruitmentUser[i].status}`,
      });
      listIDRecruit.push(this.props.recruitmentUserStore.allRecruitmentUser[i].id);
      listPosition.push(this.props.recruitmentUserStore.allRecruitmentUser[i].name);
      listSalary.push(this.props.recruitmentUserStore.allRecruitmentUser[i].salaryRange);
      listRequirement.push(this.props.recruitmentUserStore.allRecruitmentUser[i].requirement);
      listWayOfWork.push(this.props.recruitmentUserStore.allRecruitmentUser[i].wayOfWork);
    }
    listSalary = listSalary.filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    });
    listPosition = listPosition.filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    });
    listRequirement = listRequirement.filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    });
    listIDRecruit = listIDRecruit.filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    });
    listIDRecruit.sort((a, b) => a - b);
    listWayOfWork = listWayOfWork.filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    });
    //console.log(listRequirement);
    this.setState({
      data: list,
      idRecruitmentData: listIDRecruit,
      positionData: listPosition,
      salaryData: listSalary,
      wayOfWorkData: listWayOfWork,
      reData: listRequirement,
    });
  }

  start = () => {
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
      });
    }, 1000);
  };

  onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  checkUpdateStatus = () => {
    if (this.state.selectedRowKeys.length > 0)
    {
      return false;
    }
    return true;
  };

  checkSelectRow = () => {
    if (this.state.selectedRowKeys.length > 0) {
      let flag = true;
      for (let i = 0; i < this.state.selectedRowKeys.length; i++) {
        let s = this.state.selectedRowKeys[i].split('+');
        if (s[1] != 'DA LUU') flag = false;
      }
      if (flag == true) return false;
      else return true;
    }
    return true;
  };

  checkHuyUT = () => {
    if (this.state.selectedRowKeys.length > 0) {
      let flag = true;
      for (let i = 0; i < this.state.selectedRowKeys.length; i++) {
        let s = this.state.selectedRowKeys[i].split('+');
        if (s[1] != 'CHO PHAN HOI' && s[1] != 'CHO CHOT LICH' && s[1] != 'CHO PHONG VAN' && s[1] != 'CHO KET QUA') flag = false;
      }
      if (flag == true) return false;
      else return true;
    }
    return true;
  };

  checkViewStatus = () => {
    if (this.state.selectedRowKeys.length == 1) {
      return false;
    }
    return true;
  };

  filterReUser = async (e: any) => {
    e.preventDefault();
    let dto: FilterReUserDTO = {
      id: 0,
      maso: this.state.maso != '' ? this.state.maso : null,
      name: this.state.name != '' ? this.state.name : null,
      position: this.state.name != '' ? this.state.name : null,
      salary: this.state.salaryRange != '' ? this.state.salaryRange : null,
      wayOfWork: this.state.wayOfWork != '' ? this.state.wayOfWork : null,
      status: this.state.status != '' ? this.state.status : null,
      state: this.state.state != '' ? this.state.state : null,
      requirement: this.state.requirement != '' ? this.state.requirement : null,
    };

    await this.props.recruitmentUserStore.filterRecruitmentUser(dto);
    let list = [];
    for (let i = 0; i < this.props.recruitmentUserStore.allRecruitmentUser.length; i++) {
      let tempState = '';
      if (this.props.recruitmentUserStore.allRecruitmentUser[i].status == 'DA LUU') {
        tempState = 'Đã lưu';
      } else if (this.props.recruitmentUserStore.allRecruitmentUser[i].status == 'THANH CONG') {
        tempState = 'Thành công';
      } else if (this.props.recruitmentUserStore.allRecruitmentUser[i].status == 'TU CHOI') {
        tempState = 'Từ chối';
      } else if (this.props.recruitmentUserStore.allRecruitmentUser[i].status == 'CHO PHONG VAN') {
        tempState = 'Chờ phỏng vấn';
      } else if (this.props.recruitmentUserStore.allRecruitmentUser[i].status == 'CHO CHOT LICH') {
        tempState = 'Chờ chốt lịch';
      } else if (this.props.recruitmentUserStore.allRecruitmentUser[i].status == 'CHO KET QUA') {
        tempState = 'Chờ kết quả';
      } else if (this.props.recruitmentUserStore.allRecruitmentUser[i].status == 'CHO PHAN HOI') {
        tempState = 'Chờ phản hồi';
      }
      list.push({
        stt: i,
        idRe: `${this.props.recruitmentUserStore.allRecruitmentUser[i].id}+${this.props.recruitmentUserStore.allRecruitmentUser[i].status}`,
        jobName: `${this.props.recruitmentUserStore.allRecruitmentUser[i].name}`,
        age: `${this.props.recruitmentUserStore.allRecruitmentUser[i].requirement}`,
        city: `${this.props.recruitmentUserStore.allRecruitmentUser[i].state}`,
        salary: `￥${this.props.recruitmentUserStore.allRecruitmentUser[i].salaryRange}.00`,
        jobType: `${this.props.recruitmentUserStore.allRecruitmentUser[i].wayOfWork}`,
        jobStatus: `${tempState}`,
        view: `${this.props.recruitmentUserStore.allRecruitmentUser[i].id}+${this.props.recruitmentUserStore.allRecruitmentUser[i].status}`,
      });
    }
    this.setState({ data: list });
    this.setState({ selectedRowKeys: [] });
    this.checkSelectRow();
    this.checkHuyUT();
  };

  deleteSaveRecruitment = async (e: any) => {
    e.preventDefault();
    let listID = [];
    for (let i = 0; i < this.state.selectedRowKeys.length; i++) {
      let s = this.state.selectedRowKeys[i].split('+');
      if (s[1] == 'DA LUU') {
        listID.push(this.state.selectedRowKeys[i]);
      }
    }
    await this.props.recruitmentUserStore.deleteSavedRecruitment(listID);
    await this.getallRecruitmentUser();
    this.bindingData();
    this.setState({ selectedRowKeys: [], isSave: false });
    this.checkSelectRow();
    this.checkHuyUT();
    message.success('Bỏ lưu việc làm thành công');
  };

  cancelRecruitment = async (e: any) => {
    e.preventDefault();
    let listID = [];
    for (let i = 0; i < this.state.selectedRowKeys.length; i++) {
      let s = this.state.selectedRowKeys[i].split('+');
      if (s[1] == 'CHO PHAN HOI' || s[1] == 'CHO CHOT LICH' || s[1] == 'CHO PHONG VAN' || s[1] == 'CHO KET QUA') {
        listID.push(this.state.selectedRowKeys[i]);
      }
    }
    await this.props.recruitmentUserStore.cancelRecruitment(listID);
    await this.getallRecruitmentUser();
    this.bindingData();
    this.setState({ selectedRowKeys: [], isCancel: false });
    this.checkSelectRow();
    this.checkHuyUT();
    message.success('Hủy ứng tuyển thành công');
  };

  viewStatusDetail = async (e: any) => {
    e.preventDefault();
    let s = this.state.selectedRowKeys[0].split('+');
    if (s[1] == 'DA LUU') {
      this.props.history.push('/trang-thai-da-luu?idUser=' + this.state.idUser + '&idJob=' + s[0]);
    }
    if (s[1] == 'CHO PHAN HOI') {
      this.props.history.push('/trang-thai-cho-phan-hoi?idUser=' + this.state.idUser + '&idJob=' + s[0]);
    }
    if (s[1] == 'CHO CHOT LICH') {
      this.props.history.push('/trang-thai-cho-chot-lich??idUser=' + this.state.idUser + '&idJob=' + s[0]);
    }
    if (s[1] == 'CHO PHONG VAN') {
      this.props.history.push('/trang-thai-da-chot-lich?idUser=' + this.state.idUser + '&idJob=' + s[0]);
    }
    if (s[1] == 'CHO KET QUA') {
      this.props.history.push('/trang-thai-cho-ket-qua?idUser=' + this.state.idUser + '&idJob=' + s[0]);
    }
    if (s[1] == 'TU CHOI') {
      this.props.history.push('/trang-thai-tu-choi?idUser=' + this.state.idUser + '&idJob=' + s[0]);
    }
    if (s[1] == 'THANH CONG') {
      this.props.history.push('/trang-thai-thanh-cong?idUser=' + this.state.idUser + '&idJob=' + s[0]);
    }
  };

  view = (e: any) => {
    console.log(e);
    let s = e.split('+');
    if (s[1] == 'DA LUU') {
      this.props.history.push('/trang-thai-da-luu?idUser=' + this.state.idUser + '&idJob=' + s[0]);
    }
    if (s[1] == 'CHO PHAN HOI') {
      this.props.history.push('/trang-thai-cho-phan-hoi?idUser=' + this.state.idUser + '&idJob=' + s[0]);
    }
    if (s[1] == 'CHO CHOT LICH') {
      this.props.history.push('/trang-thai-cho-chot-lich?idUser=' + this.state.idUser + '&idJob=' + s[0]);
    }
    if (s[1] == 'CHO PHONG VAN') {
      this.props.history.push('/trang-thai-da-chot-lich?idUser=' + this.state.idUser + '&idJob=' + s[0]);
    }
    if (s[1] == 'CHO KET QUA') {
      this.props.history.push('/trang-thai-cho-ket-qua?idUser=' + this.state.idUser + '&idJob=' + s[0]);
    }
    if (s[1] == 'TU CHOI') {
      this.props.history.push('/trang-thai-tu-choi?idUser=' + this.state.idUser + '&idJob=' + s[0]);
    }
    if (s[1] == 'THANH CONG') {
      this.props.history.push('/trang-thai-thanh-cong?idUser=' + this.state.idUser + '&idJob=' + s[0]);
    }
  };

  public render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const columns: ColumnProps<Item>[] = [
      {
        title: 'STT',
        dataIndex: 'stt',
        width: '100px',
      },
      {
        title: 'Công việc',
        dataIndex: 'jobName',
      },
      {
        title: 'Hình thức làm việc',
        dataIndex: 'jobType',
      },
      {
        title: 'Khoảng lương',
        dataIndex: 'salary',
      },
      {
        title: 'Tỉnh thành',
        dataIndex: 'city',
      },
      {
        title: 'Yêu cầu',
        dataIndex: 'age',
        ellipsis: true,
        render: (re: {} | null | undefined) => (
          <Tooltip placement="topLeft" title={re}>
            {re}
          </Tooltip>
        ),
      },
      {
        title: 'Trạng thái',
        dataIndex: 'jobStatus',
      },
      {
        title: 'Action',
        dataIndex: 'view',
        key: 'operation',
        width: 130,
        fixed: 'right',
        render: (re: {} | null | undefined) => (
          <a
            onClick={() => {
              this.view(re);
            }}
          >
            Xem trạng thái
          </a>
        ),
      },
    ];

    return (
      <Col className="jobManagement">
        <Row style={{ marginTop: 10 }}>
          <Col>
            <Card>
              <div style={{ textAlign: 'left', fontSize: '24px' }}>
                <h1>Quản lý việc làm</h1>
              </div>
              <Form className="">
                <Row>
                  <Col span={4} style={{ marginRight: '10px' }}>
                    <FormItem label="Mã số tin tuyển dụng">
                      <Select
                        showSearch
                        placeholder="Tất cả"
                        optionFilterProp="children"
                        defaultValue="Tất cả"
                        size="large"
                        onChange={(e: any) => {
                          //console.log(e);
                          this.setState({ maso: e });
                        }}
                      >
                        <Option value="">Tất cả</Option>
                        {this.state.idRecruitmentData.map((id) => (
                          <Option key={id}>{id}</Option>
                        ))}
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span={4} style={{ marginRight: '10px' }}>
                    <FormItem label="Vị trí công việc">
                      <Select
                        showSearch
                        placeholder="Tất cả"
                        optionFilterProp="children"
                        defaultValue="Tất cả"
                        size="large"
                        onChange={(e: any) => {
                          this.setState({ name: e });
                        }}
                      >
                        <Option value="">Tất cả</Option>
                        {this.state.positionData.map((position) => (
                          <Option key={position}>{position}</Option>
                        ))}
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span={4} style={{ marginRight: '10px' }}>
                    <FormItem label="Hình thức làm việc">
                      <Select
                        showSearch
                        placeholder="Tất cả"
                        optionFilterProp="children"
                        defaultValue="Tất cả"
                        size="large"
                        onChange={(e: any) => {
                          this.setState({ wayOfWork: e });
                        }}
                      >
                        <Option value="">Tất cả</Option>
                        {this.state.wayOfWorkData.map((way) => (
                          <Option key={way}>{way}</Option>
                        ))}
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span={4} style={{ marginRight: '10px' }}>
                    <FormItem label="Lương">
                      <Select
                        showSearch
                        placeholder="Tất cả"
                        optionFilterProp="children"
                        defaultValue="Tất cả"
                        size="large"
                        onChange={(e: any) => {
                          this.setState({ salaryRange: e });
                        }}
                      >
                        <Option value="">Tất cả</Option>
                        {this.state.salaryData.map((salary) => (
                          <Option key={salary}>{salary}</Option>
                        ))}
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span={4} style={{ marginRight: '10px' }}></Col>
                </Row>
                <Row style={{ display: 'flex' }}>
                  <Col span={4} style={{ marginRight: '10px' }}>
                    <FormItem label="Tỉnh thành">
                      <Select
                        showSearch
                        placeholder="Tất cả"
                        optionFilterProp="children"
                        defaultValue="Tất cả"
                        size="large"
                        onChange={(e: any) => {
                          this.setState({ state: e });
                        }}
                      >
                        <Option value="">Tất cả</Option>
                        {provinceData.map((province) => (
                          <Option key={province}>{province}</Option>
                        ))}
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span={4} style={{ marginRight: '10px' }}>
                    <FormItem label="Yêu cầu">
                      <Select
                        showSearch
                        placeholder="Tất cả"
                        optionFilterProp="children"
                        defaultValue="Tất cả"
                        size="large"
                        onChange={(e: any) => {
                          this.setState({ requirement: e });
                        }}
                      >
                        <Option value="">Tất cả</Option>
                        {this.state.reData.map((salary) => (
                          <Option key={salary}>{salary}</Option>
                        ))}
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span={4} style={{ marginRight: '10px' }}>
                    <FormItem label="Trạng thái">
                      <Select
                        showSearch
                        placeholder="Tất cả"
                        optionFilterProp="children"
                        defaultValue="Tất cả"
                        size="large"
                        onChange={(e: any) => {
                          this.setState({ status: e });
                        }}
                      >
                        <Option value="">Tất cả</Option>
                        <Option value="DA LUU">Đã lưu</Option>
                        <Option value="CHO PHAN HOI">Chờ phản hồi</Option>
                        <Option value="CHO CHOT LICH">Chờ chốt lịch</Option>
                        <Option value="CHO PHONG VAN">Chờ phỏng vấn</Option>
                        <Option value="CHO KET QUA">Chờ kết quả</Option>
                        <Option value="THANH CONG">Thành công</Option>
                        <Option value="TU CHOI">Từ chối</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span={4} style={{ marginRight: '10px' }}>
                    <FormItem label="Sắp xếp theo">
                      <Select defaultValue="Đánh giá" size="large"></Select>
                    </FormItem>
                  </Col>
                  <Col span={4} style={{ flexDirection: 'column-reverse', display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
                    <Button type="primary" size="large" style={{ width: '150px' }} onClick={this.filterReUser}>
                      Lọc
                    </Button>
                  </Col>
                </Row>
              </Form>
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={this.state.data}
                rowKey="idRe"
                pagination={{
                  total: this.state.data?.length,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `Dòng ${range[0]} - ${range[1]} trên tổng số ${total} dòng`,
                }}
              />
              <Row style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="primary"
                  size="large"
                  disabled={this.checkHuyUT()}
                  style={{ marginRight: '20px' }}
                  onClick={() => {this.setState({isCancel: true})}}
                >
                  Hủy ứng tuyển
                </Button>
                <Button
                  type="primary"
                  size="large"
                  disabled={this.checkSelectRow()}
                  style={{ marginRight: '20px' }}
                  onClick={() => {this.setState({isSave: true})}}
                >
                  Bỏ lưu việc làm
                </Button>
                <Button type="primary" size="large" disabled={this.checkViewStatus()} style={{ marginRight: '20px' }} onClick={this.viewStatusDetail}>
                  Xem trạng thái
                </Button>
              </Row>
            </Card>
          </Col>
        </Row>
        <Modal visible={this.state.isCancel} onOk={this.cancelRecruitment} onCancel={()=>this.setState({isCancel: false})} okText="OK" cancelText="Hủy">
        <ExclamationCircleOutlined style={{color: "orange", fontSize: '20px'}}/>
        <span style={{fontSize: '20px', marginLeft: "10px"}}>Bạn có muốn hủy ứng tuyển không?</span>
        </Modal>
        <Modal visible={this.state.isSave} onOk={this.deleteSaveRecruitment} onCancel={()=>this.setState({isSave: false})} okText="OK" cancelText="Hủy">
        <ExclamationCircleOutlined style={{color: "orange", fontSize: '20px'}}/>
        <span style={{fontSize: '20px', marginLeft: "10px"}}>Bạn có muốn bỏ lưu việc làm này không?</span>
        </Modal>
      </Col>
    );
  }
}

export default Form.create()(JobManagement);
