import React from 'react'
import '../../styles.less'
import { inject, observer } from 'mobx-react';
import AppComponentBase from 'app/shared/components/AppComponentBase';
import Stores from 'app/shared/stores/storeIdentifier';
import StateApplicationStore from "../../stores/stateApplicationStore"
import { Typography, Button,Modal, DatePicker, TimePicker } from 'antd'
import {message} from "antd";
import picSaved from 'assets/images/saved dude.svg';
import picWaiting from 'assets/images/people waiting.svg';
import picSuccess from 'assets/images/2 people successfully dealing.svg';
import picLooking from 'assets/images/girl still looking.svg';
import picChangeAppointment from 'assets/images/2 people interviewing.svg';
import { Redirect } from 'react-router';
//Thy code
import ModalChangeAppointment from '../../Component/ModalChangeAppointment/ModalChangeAppointment'
import {Row,Col} from "antd";
import FormItem from 'antd/lib/form/FormItem';
//

import { GetStateApplicationByJSInput , UpdateStateApplicationInput} from '../../services/dto/stateApplicationDto/stateApplicationDto';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import  StateApplicantStore from "../../../group1/stores/StateApplicantStore"
import  {IStateApplicant, getState} from "../../../group1/stores/StateApplicantStore"
import moment from 'moment';
const { Title, Paragraph } = Typography;
const { confirm } = Modal;
  
interface IUpdateInterviewRequest {
    id : number,
    idInterview: number,
    interviewTime: string,
}
  
interface Interview {
    location : string;
    time : string;
    date : string;
    description : string;
}

export interface IStateApplicationListProps {
    stateApplicationStore: StateApplicationStore;
    StateApplicantStore:StateApplicantStore;
}

export interface IStateApplicationListState {
    state : string;
    idJobSeeker : number,
    idRecruitment : number,
    modalVisible: boolean;
    selectedID: number;
    isAnyItemClicked: boolean;
    isAddJobSeekerPopupOpen: boolean;
    jobSeekerName: string,
    jobSeekerDesc: string,
    isEditJobSeekerPopupOpen: boolean,
    isVerifyDeletePopupOpen: boolean,
    isPopupOpen:boolean,
    
    idApplication : number,
    infoInterview : Interview,
    redirect : string,
}

@inject(Stores.stateApplicationStore)
@inject(Stores.StateApplicantStore)

@observer
export default class SateApplication extends AppComponentBase<IStateApplicationListProps, IStateApplicationListState> {
    constructor(props: any) {
        super(props);
        this.state = {
            state : "",
            idJobSeeker : 1,
            idRecruitment : 1,
            idApplication : 1,
            modalVisible: false,
            selectedID: 1,
            isAnyItemClicked: false,
            isAddJobSeekerPopupOpen: false,
            jobSeekerName: "",
            jobSeekerDesc: "",
            isEditJobSeekerPopupOpen: false,
            isVerifyDeletePopupOpen: false,

            isPopupOpen: false,

            infoInterview : {
                location : "",
                time : "",
                date : "",
                description : "",
            },
            
            redirect : "",
        }

    }

    //Sanh code
    async componentDidMount() {
        const pathArray = window.location.pathname.split('/');
        const idJobSeeker : number = +pathArray[2];
        const idRecruitment : number = +pathArray[3];
        this.setState({idJobSeeker: idJobSeeker});
        this.setState({idRecruitment : idRecruitment});

        const input : GetStateApplicationByJSInput = {
            IDJobSeeker: idJobSeeker,
            IDRecruitment: idRecruitment,
        }
        await this.props.stateApplicationStore.getStateApplicationByJobSeekerRecuitment(input);
        this.setState({infoInterview : this.props.stateApplicationStore.interview});
            let input1 : getState = {
            idJobSeeker: idJobSeeker,
            idRecruitment: idRecruitment,
        }

        console.log(idJobSeeker + " - "+ idRecruitment);
        await this.props.StateApplicantStore.getStateApplicantByIDJobSeeker(input1);

        if (this.props.stateApplicationStore.stateApplication.State === "CHOT_LICH")
        {
            let today = new Date();
            if (today < this.props.stateApplicationStore.IDInterviewTime)
                this.changeStateApplication("CHO_KET_QUA");
            
        }

        console.log(this.props.stateApplicationStore.stateApplication.State);
    }

    async changeStateApplication(STATE : string) {
        const input : UpdateStateApplicationInput = {
            IDJobSeeker: this.state.idJobSeeker,
            IDRecruitment: this.state.idRecruitment,
            State: STATE,
            id: this.state.idApplication,
        }
        await this.props.stateApplicationStore.update(input);
        this.setState({state : STATE});

        if (STATE === "CHO_PHAN_HOI")
        {
            let input : IStateApplicant = {
                idJobSeeker: this.state.idJobSeeker,
                idRecruitment: this.state.idRecruitment,
                state: "CHO_PHAN_HOI",
                id: this.props.StateApplicantStore.StateApplicant.id,
            }
            this.props.StateApplicantStore.updateStateApplicant(input);
        }

        if (STATE === "CHO_KET_QUA")
        {
            let input : IStateApplicant = {
                idJobSeeker: this.state.idJobSeeker,
                idRecruitment: this.state.idRecruitment,
                state: "CHO_KET_QUA",
                id: this.props.StateApplicantStore.StateApplicant.id,
            }
            this.props.StateApplicantStore.updateStateApplicant(input);
        }

        if (STATE === "CHUA_UNG_TUYEN")
        {
            let input : IStateApplicant = {
                idJobSeeker: this.state.idJobSeeker,
                idRecruitment: this.state.idRecruitment,
                state: "THAT_BAI",
                id: this.props.StateApplicantStore.StateApplicant.id,
            }
            this.props.StateApplicantStore.updateStateApplicant(input);
        }

    }

    public render() {

        //#region init
    const formItemLayout = {
            labelCol: {  
                xs: { span: 8 },
                sm: { span:  8 },
                md: { span:  8 },
                lg: { span:  8 },
                xl: { span:  8 },
                xxl: { span:  8 },
            },
            wrapperCol: {
                xs: { span: 16 },
                sm: { span: 16 },
                md: { span: 16 },
                lg: { span: 16 },
                xl: { span: 16 },
                xxl: { span: 16 },
            },
        };

        if (this.state.redirect !== "")
            return <Redirect push to={this.state.redirect}/>;
        const {stateApplication} = this.props.stateApplicationStore;
        const {interview} = this.props.stateApplicationStore;
        const headerPosition : string = "Kỹ sư ReactJS - AngularJS - Vue - Functional Programming";
        const headerCompany : string = this.props.stateApplicationStore.nameCompany;
        if (interview === undefined)
            return (<div></div>)
        //#endregion
        //#region All pages
        //#region  render state
        const PageSateSaved = () => {
            return (
                <div style={{ margin: "auto", marginTop: "350px", width: "60%" }}>
                    <div className="whiteBackground" style={{alignItems: 'center'}}>
                        <Title style={{marginTop: 0, fontWeight:"bolder"}}>Trạng thái việc làm</Title>
                        <Title style={{textAlign: 'center', fontWeight:"bolder"}} level={4}>{headerPosition}</Title>
                        <Title style={{marginTop: 5, fontSize : 12, color: "GrayText"  }}>{headerCompany}</Title>
    
                        <img className="imageCenter" src={picSaved} alt="No"></img>
    
                        <Title style={{textAlign: 'center'}} level={3}>Đã lưu</Title>
                        <Title style={{textAlign: 'center', fontSize: 14, fontWeight:"initial"}} level={4}>
                            Bạn đã lưu công việc, hãy nộp CV ngay <br></br> 
                            để tham gia ứng tuyển.
                        </Title>
    
                        <Button className="buttonCenter" onClick={ () => {this.showDeleteConfirm(this);}}>Bỏ lưu</Button>
                        <Button className="buttonCenter" type="primary" 
                        onClick={ () => {this.setState({redirect :"/create-cv"}); this.showSubmitCV(this);}}>Nộp CV</Button>
                    </div>
                </div>
            );
        }

        const PageStateWaitingRespone = () => {
            return (
                <div style={{ margin: "auto", marginTop: "350px", width: "60%" }}>
                    <div className="whiteBackground" style={{alignItems: 'center'}}>
                        <Title style={{marginTop: 0, fontWeight:"bold"}}>Trạng thái việc làm</Title>
                        <Title style={{textAlign: 'center', fontWeight:"bolder"}} level={4}>{headerPosition}</Title>
                        <Title style={{marginTop: 5, fontSize : 12, color: "GrayText"  }}>{headerCompany}</Title>     <img className="imageCenter" src={picWaiting} alt="No"></img>
    
                        <Title style={{textAlign: 'center'}} level={3}>Chờ phản hồi</Title>
                        <Paragraph style={{textAlign: 'center', fontSize: 14, fontWeight:500}}>
                            CV của bạn đang được nhà tuyển dụng xem xét, <br></br>
                            chúng tôi sẽ gửi thông báo đến bạn khi có kết quả.
                        </Paragraph>
    
                        <Button className="buttonCenter" style={{fontWeight:800}} onClick = {() => {this.showCancelApplication(this);}}>Hủy ứng tuyển</Button>
                        <Button className="buttonCenter" style={{fontWeight:800}} type="primary" 
                            onClick ={() =>{this.showEditCV(this); this.setState({redirect :"/create-cv"});}}>Chỉnh sửa CV</Button>
                    </div>
                </div>
            );
        }


        const PageStateWaitingLatch = () => {
            var  info : Interview = interview;
            let dateRequest : string = "";
            let timeRequest : string = "";
            return (
                <div style={{ margin: "auto", marginTop: "350px", width: "60%" }}>
                    <div>
                        <div className="whiteBackgroundWaitingLatch" style={{alignItems: 'center' }}>
                            <Title style={{marginTop: 0}}><b>Trạng thái việc làm</b></Title>
                            <Title style={{textAlign: 'center', fontWeight:"bolder"}} level={4}>{headerPosition}</Title>
                        <Title style={{marginTop: 5, fontSize : 12, color: "GrayText"  }}>{headerCompany}</Title>    <img className="imageCenter" src={picSaved} alt="No"></img>
            
                            <Title style={{textAlign: 'center'}} level={3}>Chờ chốt lịch</Title>
                            <Title style={{textAlign: 'center', fontSize: 14, fontWeight:500}} level={4}>
                                Hãy sắp xếp để đến buổi phỏng vấn <br></br> tại <b>{info.location}</b> 
                                <br></br> vào lúc <b>{info.time} </b> ngày <b>{info.date}</b> 
                                <br></br>
                                <br></br>Nội dung phỏng vấn:                   
                            </Title>
                            <div className="description">
                                <Title style={{textAlign: 'center', fontSize: 14, fontWeight:500}} level={4}>
                                 {info.description}
                                </Title> 
                            </div>
            
                            <Button className="buttonCenter" onClick = {() => {this.showCancelApplication(this);}}>Hủy ứng tuyển</Button>
                            <Button className="buttonCenter" type="primary" onClick = {() => {this.changeLichPhongVan();}}>Thay đổi lịch hẹn</Button>
                            <ModalChangeAppointment className="Custom_Modal_Out_Layout1" style={{marginTop :30}} 
                            shadow={true}
                            type="custom"
                            title="Thay đổi lịch phỏng vấn"
                            open={this.state.isPopupOpen}
                
                            closeModal={() => { this.setState({ isPopupOpen: false }); }}
                        >
                        <div>
                        <Row>
                        <Col span={15}>
                        <FormItem className="Fontstyle1"   label={('Ngày phỏng vấn')}{...formItemLayout} style={{marginTop: 140}}  >
                            <DatePicker
                                    style={{display: 'block'}}
                                    format="DD/MM/YYYY"
                                    name="finishDate"
                                    onChange={(date, dateString) => {dateRequest = dateString; console.log(dateRequest);}}
                                />
                        </FormItem>
                        <FormItem className="Fontstyle1"    label={('Giờ phỏng vấn')}{...formItemLayout}  >
                         <TimePicker defaultOpenValue={moment('00:00', 'HH:mm')}  format = "HH:mm"
                                    onChange={(time,timeString) => {timeRequest =timeString; console.log(timeString); }}/>
                        </FormItem>
                        </Col>
                        <Col span={8}>
                            {/* <img className="imageCenter" src={picChangeAppointment} alt="No"></img> */}
                            <img src={picChangeAppointment} alt="No"></img>
                            <div style={{margin :20}} className="Custom_Modal_Footer1">
                                <div style={{ display: "flex"}  } >
                                        <button className="Simple_White_Button1" onClick={() => {  this.setState({ isPopupOpen: false }) }} >Hủy bỏ</button>
                                        <button className="Simple_Blue_Button1" onClick={() => {this.sendInterviewRequest(dateRequest,timeRequest); this.setState({ isPopupOpen: false })}}>Hoàn tất</button>
                                </div>
                            </div>
                        <Paragraph style={{textAlign: 'center', fontSize: 14, fontWeight:500}}>
                            Chúng tôi sẽ thông báo đến doanh nghiệp <br></br>
                            về thay đổi lịch phỏng vấn
                        </Paragraph>
                        </Col>
                            
                        </Row>
                        </div>
                        </ModalChangeAppointment>
                            <Title style={{textAlign: 'center', fontSize: 12, fontWeight:500, marginTop: 20}} level={4}>
                                Trong thời gian lịch chưa được chốt, bạn 
                                <br></br> có thể gửi yêu cầu thay đổi lịch phỏng vấn              
                            </Title>
                        </div>
                    </div>
                </div>
             );
        }

        const PageStateLatch = () => {
            var  info : Interview = interview;
    
            return (
                <div style={{ margin: "auto", marginTop: "350px", width: "60%" }}>
                     <div>
                        <div className="whiteBackgroundWaitingLatch" style={{alignItems: 'center' }}>
                            <Title style={{marginTop: 0}}><b>Trạng thái việc làm</b></Title>
                            <Title style={{textAlign: 'center', fontWeight:"bolder"}} level={4}>{headerPosition}</Title>
                            <Title style={{marginTop: 5, fontSize : 12, color: "GrayText"  }}>{headerCompany}</Title>   <img className="imageCenter" src={picSaved} alt="No"></img>
            
                            <Title style={{textAlign: 'center'}} level={3}>Chờ phỏng vấn</Title>
                            <Title style={{textAlign: 'center', fontSize: 14, fontWeight:500}} level={4}>
                                Lịch đã được chốt, hãy sắp xếp đến buổi phỏng vấn <br></br> tại <b>{info.location}</b> 
                                <br></br> vào lúc <b>{info.time} </b> ngày <b>{info.date}</b> 
                                <br></br>
                                <br></br>Nội dung phỏng vấn:                   
                            </Title>
                            <div className="description">
                                <Title style={{textAlign: 'center', fontSize: 14, fontWeight:500}} level={4}>
                                 {info.description}
                                </Title> 
                            </div>
            
                            <Button className="buttonCenter" onClick = {() => {this.showCancelApplication(this);}}>Hủy ứng tuyển</Button>
                        </div>
                    </div>               
                 </div>
             );
        }

        const PageStateWaitingResult = () => {
            return (
                <div style={{ margin: "auto", marginTop: "350px", width: "60%" }}>
                    <div className="whiteBackground" style={{alignItems: 'center'}}>
                        <Title style={{marginTop: 0}}>Trạng thái việc làm</Title>
                        <Title style={{textAlign: 'center', fontWeight:"bolder"}} level={4}>{headerPosition}</Title>
                        <Title style={{marginTop: 5, fontSize : 12, color: "GrayText"  }}>{headerCompany}</Title> <img className="imageCenter" src={picWaiting} alt="No"></img>
    
                        <Title style={{textAlign: 'center'}} level={3}>Chờ kết quả</Title>
                        <Paragraph style={{textAlign: 'center', fontSize: 14, fontWeight:500}}>
                            Kết quả buổi phỏng vấn đang được xem xét, <br></br>
                            chúng tôi sẽ gửi thông báo đến bạn khi có kết quả.
                        </Paragraph>
    
                        <Button className="buttonCenter" onClick = {() => {this.showCancelApplication(this);}}>Hủy ứng tuyển</Button>
                    </div>
                </div>
            );
        }

        const PageStateSuccessful = () => {
            return (
                <div style={{ margin: "auto", marginTop: "350px", width: "60%" }}>
                    <div className="whiteBackgroundSuccessful" style={{alignItems: 'center'}}>
                        <Title style={{marginTop: 0}}>Trạng thái việc làm</Title>
                        <Title style={{textAlign: 'center', fontWeight:"bolder"}} level={4}>{headerPosition}</Title>
                        <Title style={{marginTop: 5, fontSize : 12, color: "GrayText"  }}>{headerCompany}</Title> <img className="imageCenter" src={picSuccess} alt="No"></img>
    
                        <Title style={{textAlign: 'center', fontWeight:800}} level={3}>Thành công</Title>
                        <Paragraph style={{textAlign: 'center', fontSize: 14, fontWeight:600}}>
                            Hello work! Ứng tuyển thành công.
                        </Paragraph>
                    </div>
                </div>
            );
        }

        const PageStateRejected = () => {
            return (
                <div style={{ margin: "auto", marginTop: "350px", width: "60%" }}>
                    <div className="whiteBackgroundRejected" style={{alignItems: 'center'}}>
                        <Title style={{marginTop: 0}}>Trạng thái việc làm</Title>
                        <Title style={{textAlign: 'center', fontWeight:"bolder"}} level={4}>{headerPosition}</Title>
                        <Title style={{marginTop: 5, fontSize : 12, color: "GrayText"  }}>{headerCompany}</Title>    <img className="imageCenter" src={picLooking} alt="No"></img>
    
                        <Title style={{textAlign: 'center'}} level={3}>Từ chối</Title>
                        <Paragraph style={{textAlign: 'center', fontSize: 14, fontWeight:600}}>
                            Đơn ứng tuyển đã bị từ chối, hãy tiếp tục tìm kiếm.
                        </Paragraph>
    
                        <Button className="buttonCenter" type="primary"  onClick={ () => {this.setState({redirect :"/timkiemvieclam"})}} >Tìm việc làm</Button>
                        
                    </div>
                </div>
                
            );
        }
        //#endregion
        if (stateApplication === undefined) 
            return (<div></div >);
        if (stateApplication.State === "CHUA_UNG_TUYEN")
            return (<PageSateSaved></PageSateSaved>);
        if (stateApplication.State === "CHO_PHAN_HOI")
            return (<PageStateWaitingRespone></PageStateWaitingRespone>);
        if (stateApplication.State === "CHO_PHONG_VAN")
            return (<PageStateWaitingLatch></PageStateWaitingLatch>);
        if (stateApplication.State === "CHOT_LICH")
            return (<PageStateLatch></PageStateLatch>);
        if (stateApplication.State === "CHO_KET_QUA")
            return (<PageStateWaitingResult></PageStateWaitingResult>);
        if (stateApplication.State === "THANH_CONG")
            return (<PageStateSuccessful></PageStateSuccessful>)
        if (stateApplication.State === "THAT_BAI")
            return (<PageStateRejected></PageStateRejected>)
        return (
            <div>
                <p>Bạn chưa lưu thông tin tuyển dụng này</p>
            </div>
        );
    }
    
    sendInterviewRequest = (date : string, time : string) => {

        let temp : string = "";
        temp += date.substr(6,4) + "-" + date.substr(3,2) + "-" +date.substr(0,2);
        temp += "T" + time + ":39.788Z";
        let inputUpdate : IUpdateInterviewRequest = {
            id : this.props.stateApplicationStore.IDInterviewRequest,
            idInterview: this.props.stateApplicationStore.interviewRequest.idInterview,
            interviewTime: temp,
        }
        console.log(inputUpdate);
        this.props.stateApplicationStore.updateInterviewRequest(inputUpdate);
        message.success("Bạn đã gửi yêu cầu lịch hẹn mới thành công!");
    }

    //#endregion
    showDeleteConfirm = (props : any) => {
        confirm({
          title: 'Bạn có chắc muốn bỏ lưu thông tin tuyển dụng này chứ?',
          icon: <ExclamationCircleOutlined />,
          content: 'Sau khi bỏ lưu tin tuyển dụng này sẽ không còn lưu và hiển thị trong danh sách quản lý tuyển dụng của bạn nữa.',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            message.success('Bạn đã bỏ lưu tin tuyển dụng thành công');
            props.changeStateApplication("KHONG_LUU");
          },
          onCancel() {
            console.log('Không xóa');
          },
        });
    }

    showSubmitCV = (props : any) => {
        confirm({
          title: 'Bạn có chắc muốn nộp CV này cho công việc này chứ?',
          icon: <ExclamationCircleOutlined />,
          content: 'Sau khi nộp CV, bạn sẽ chờ phản hồi từ bên tuyển dụng!',
          okText: 'Tiếp tục nộp',
          okType: 'default',
          cancelText: 'Quay về',
          onOk() {
            message.success('Bạn đã nộp CV thành công! Hãy chờ phản hồi');
            props.changeStateApplication("CHO_PHAN_HOI");
          },
          onCancel() {
            message.warning('Bạn vẫn chưa nộp CV này');
          },
        });
    }

    showEditCV = (props : any) => {
        confirm({
          title: 'Bạn có chắc muốn nộp bản chỉnh sửa CV này cho công việc này chứ?',
          icon: <ExclamationCircleOutlined />,
          content: 'Sau khi nộp lại CV này, bạn vẫn sẽ chờ phản hồi từ bên tuyển dụng!',
          okText: 'Tiếp tục nộp',
          okType: 'default',
          cancelText: 'Quay về',
          onOk() {
            message.success('Bạn đã nộp CV thành công! Hãy chờ phản hồi');
            props.changeStateApplication("CHO_PHAN_HOI");
          },
          onCancel() {
            console.log('Không nộp');
          },
        });
    }

    showCancelApplication = (props : any) => {
        confirm({
          title: 'Bạn có chắc hủy ứng tuyển công việc này chứ?',
          icon: <ExclamationCircleOutlined />,
          content: 'Sau khi hủy ứng tuyển, Bạn sẽ không được nhận được thông tin phỏng vấn nữa!',
          okText: 'Tiếp tục hủy',
          okType: 'danger',
          cancelText: 'Quay về',
          onOk() {
            message.success('Bạn đã hủy ứng tuyển thành công');
            props.changeStateApplication("CHUA_UNG_TUYEN");
          },
          onCancel() {
            console.log('Không hủy');
          },
        });
    }

    changeLichPhongVan = () => {
        this.setState({isPopupOpen: true});
    }
}
