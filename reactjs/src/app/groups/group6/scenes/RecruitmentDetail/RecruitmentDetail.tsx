import '../../styles.less';
import './RecruitmentDetail.less';
import Stores from 'app/shared/stores/storeIdentifier';
import { inject, observer } from 'mobx-react';
import RecruitmentsStore from '../../stores/recruitmentsStore';
import ExpertisesStore from '../../stores/expertisesStore';
import { IRecruitmentsGet, ISavedRecruitment } from '../../models/recruitments';
import React from 'react';
import AppComponentBase from 'app/shared/components/AppComponentBase';
import { Row, Col, Avatar, Tag, Button, Modal, Icon } from 'antd';
import moment from 'moment';
import { isGranted } from 'shared/lib/abpUtility';
import SessionStore from 'shared/stores/sessionStore';

export interface IRecruitmentsProps {
  recruitmentsStore: RecruitmentsStore,
  expertisesStore: ExpertisesStore,
  sessionStore: SessionStore,
  history: any;
  location: any;
}

export interface IRecruitmentsState {
  recruitment: IRecruitmentsGet,
}

@inject(Stores.recruitmentsStore)
@inject(Stores.expertisesStore)
@inject(Stores.SessionStore)
@observer
export default class RecruitmentDetail extends AppComponentBase<IRecruitmentsProps, IRecruitmentsState> {
  constructor(props: any) {
    super(props);
    this.state = {
        recruitment: {
            id: '30',
            name: '',
            finishDate: '2020-11-20T00:00:00',
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
            contactEmail: '',
            state: 'nhap',
            creationTime: '2020-11-20T00:00:00',
            creatorUserId: 0
        }
    }
  }

  idRecruitment = '1';
  isEmployer = false;
  linkName = '';

  async componentDidMount() {
    const pathArray = window.location.pathname.split('/');
    this.linkName = pathArray[pathArray.length - 1];
    const pathLast = pathArray[pathArray.length - 1].split('-');
    this.idRecruitment = pathLast[pathLast.length - 1];
    await this.props.recruitmentsStore.getRecruitmentById(this.idRecruitment);
    await this.props.recruitmentsStore.getInfoRecruiter(this.props.recruitmentsStore.recruitment.creatorUserId);
    if (this.props.sessionStore.currentLogin.user !== null) {
      if (this.props.recruitmentsStore.recruitment.creatorUserId === this.props.sessionStore.currentLogin.user.id) {
        this.isEmployer = true;
      }
    }

    this.setState({
        recruitment: this.props.recruitmentsStore.recruitment
    });
  }

  editRecruitment() {
    window.location.href = '/tin-tuyen-dung/cap-nhat/' + this.linkName;
  }

  daysRemaining (finishDate: string) {
    var eventdate = moment(finishDate);
    var todaysdate = moment();
    if (eventdate.diff(todaysdate, 'days') > 0) {
      return eventdate.diff(todaysdate, 'days');
    } else {
      return 0;
    }
  }

  getSalaryRange (value: string) {
    switch (value) {
      case 'thuongluong':
        return 'Thương lượng';
      case '<1m':
        return 'Dưới 1 triệu'
      case '1-5m':
        return '1 - 5 triệu'
      case '5-10m':
        return '5 - 10 triệu'
      case '10-20m':
        return '10 - 20 triệu'
      case '20-50m':
        return '20 - 50 triệu'
      case '50-100m':
        return '50 - 100 triệu'
      case '>100m':
        return 'Trên 100 triệu'
      default:
        return 'Thương lượng'
    }
  }

  createMarkup(html: string) {
    return {__html: html};
  }

  submitCV() {
    const { confirm } = Modal;
    if (isGranted('Pages.Users')) {
      this.props.history.push({
        pathname: `/cv-management/${this.props.recruitmentsStore.recruitment?.id}/nop-cv`,
        state: { from: this.props.location }
      });
    } else {
      confirm({
        title: 'Chưa đăng nhập',
        okText: 'Đăng nhập',
        cancelText: 'Hủy bỏ',
        centered: true,
        content: 'Vui lòng đăng nhập để nộp CV của bạn',
        icon: <Icon type="exclamation-circle"/>,
        onOk: () => {
          this.props.history.push({
            pathname: '/login',
            state: { from: this.props.location }
          });
        },
        onCancel() {},
      });
    }
  }

  saveRecruitment() {
    const { confirm } = Modal;
    if (isGranted('Pages.Users')) {
      const dataSave: ISavedRecruitment = {
        recruitmentId: parseInt(this.props.recruitmentsStore.recruitment.id),
        creatorUserId: this.props.sessionStore.currentLogin.user.id
      }
      this.props.recruitmentsStore.saveRecruitment(dataSave);
    } else {
      confirm({
        title: 'Chưa đăng nhập',
        okText: 'Đăng nhập',
        cancelText: 'Hủy bỏ',
        centered: true,
        content: 'Vui lòng đăng nhập để nộp CV của bạn',
        icon: <Icon type="exclamation-circle"/>,
        onOk: () => {
          this.props.history.push({
            pathname: '/login',
            state: { from: this.props.location }
          });
        },
        onCancel() {},
      });
    }
  }

  render() {
    const { recruitment } = this.props.recruitmentsStore;
    if (recruitment === undefined) return (<div></div >)
    return(
      <section>
        <div className="container-center">
          <Row type="flex" align="middle">
            <Col xs={{span: 7}} sm={{span: 5}} md={{span: 4}} lg={{span: 3}}>
            <Avatar size={90} icon="user"/>
            </Col>
            <Col xs={{span: 17}} sm={{span: 19}} md={{span: 20}} lg={{span: 21}}>
              <b style={{fontSize: '18px', color: '#518FF5'}}>
                <a href={`/trang-ca-nhan-cong-ty/xem/id=${this.props.recruitmentsStore.recruitment?.creatorUserId}`}>
                  {this.props.recruitmentsStore.recruiterInfo?.items[this.props.recruitmentsStore.recruiterInfo?.items.findIndex(p => p.key == 'CompanyName')].value}
                </a>
              </b>
              <div className="name-recruitment" style={{color: '#3D3D3D'}}><b>{this.props.recruitmentsStore.recruitment?.name}</b></div>
              <div style={{fontSize: '16px', color: '#3D3D3D'}}>Làm việc tại {this.props.recruitmentsStore.recruiterInfo?.items[this.props.recruitmentsStore.recruiterInfo?.items.findIndex(p => p.key == 'AddressDetail')].value}</div>
            </Col>
          </Row>
          <Row type="flex" style={{margin: '30px 0px 30px'}}>
            <Col xs={{span: 24}} md={{span: 11}}>
              <div className="label">Ngày đăng tuyển</div>
              <div className="info"><b>{moment(this.props.recruitmentsStore.recruitment?.creationTime).format("DD/MM/YYYY")}</b></div>
              <div className="label">Ngày kết thúc</div>
              <div className="info">
                <b>{moment(this.props.recruitmentsStore.recruitment?.finishDate).format("DD/MM/YYYY")}</b>
                <i style={{paddingLeft: '6px'}}>(Còn {this.daysRemaining(this.props.recruitmentsStore.recruitment?.finishDate)} ngày nữa)</i>
              </div>
              <div className="label">Hình thức công việc</div>
              <div className="info qcont">{this.props.recruitmentsStore.recruitment?.wayOfWork}</div>
              <div className="label">Khoảng lương</div>
              <div className="info"><b>{this.getSalaryRange(this.props.recruitmentsStore.recruitment?.salaryRange)}</b></div>
              <div className="label">Mảng chuyên môn</div>
              <div style={{marginBottom: '20px'}}>
              {this.props.recruitmentsStore.recruitment?.expertises.map((value) => {
                return <Tag color="#518FF5">{value.name}</Tag>
              })}
              </div>
            </Col>
            <Col xs={{span: 24}} md={{span: 13}}>
              <div className="label">Mô tả công viêc *</div>
              <p className="info-16" dangerouslySetInnerHTML={this.createMarkup(this.props.recruitmentsStore.recruitment?.description)}></p>
              <div className="label">Yêu cầu công viêc</div>
              <p className="info-16" dangerouslySetInnerHTML={this.createMarkup(this.props.recruitmentsStore.recruitment?.requirement)}></p>
              {isGranted('Pages.Group0.Demos.Update') && 
                <div style={{display: this.isEmployer ? 'block' : 'none'}}>
                  <div className="label">Email liên hệ *</div>
                  <p className="info">{this.props.recruitmentsStore.recruitment?.contactEmail}</p>
                </div>
              }
            </Col>
          </Row>
          {!isGranted('Pages.Group0.Demos.Update') &&
            <Row type="flex" justify="center" style={{display: this.isEmployer ? 'none' : 'flex'}}>
              <Button onClick={(e: any) => this.submitCV()} className="button-w" style={{margin: '0px 10px'}} type="primary"><b>Nộp CV</b></Button>
              <Button onClick={(e: any) => this.saveRecruitment()} className="button-w" style={{background: 'rgb(245, 245, 245)', margin: '0px 10px'}}><b>Lưu công việc</b></Button>
            </Row>
          }
          {isGranted('Pages.Group0.Demos.Update') &&
            <Row type="flex" justify="center" style={{display: this.isEmployer ? 'flex' : 'none'}}>
              <Button onClick={(e: any) => this.editRecruitment()} style={{margin: '0px 10px', width: '180px'}} type="primary">
                <Icon type="edit" theme="filled" style={{marginRight: '10px'}}/>
                <b>Sửa tin tuyển dụng</b>
              </Button>
            </Row>
          }
        </div>
      </section>
    )
  }
}