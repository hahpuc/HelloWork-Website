import React from 'react'
import { Typography, Button,message,Modal, DatePicker,Row,Input,Col,TimePicker,Form } from 'antd'
import FormItem from 'antd/lib/form/FormItem';
import moment from 'moment';
import picSaved from 'assets/images/saved dude.svg';
import picWaiting from 'assets/images/submit guy.svg';
import picSuccess from 'assets/images/2 people successfully dealing.svg';
import picCancel from 'assets/images/canceled couple.svg';
import AppComponentBase from 'app/shared/components/AppComponentBase';
import '../../styles.less'
import '../../components/ModalChangeAppointment/ModalChangeAppointment.less'
import { inject, observer } from 'mobx-react';
import {EntityDto} from 'shared/services/dto/entityDto';
import jobSeekerStore from '../../../group5/stores/jobSeekerStore'
import recruitmentsStore from "../../../group6/stores/recruitmentsStore"
import StateApplicantStore, { getState,IStateApplicant } from '../../stores/StateApplicantStore'
import Stores from 'app/shared/stores/storeIdentifier';
import ModalChangeAppointment from '../../components/ModalChangeAppointment/ModalChangeAppointment';
import '../../components/ModalChangeAppointment/ModalChangeAppointment.less';
import InterviewStore,{GetInterview,Iinterview} from '../../stores/InterviewStore'
import stateApplicationStore from "../../../group5/stores/stateApplicationStore"
import {UpdateStateApplicationInput,GetStateApplicationByJSInput} from "../../../group5/services/dto/stateApplicationDto/stateApplicationDto"
import picChangeAppointment from 'assets/images/2 people interviewing.svg';
import {Redirect} from 'react-router'
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Title,Paragraph } = Typography;
const confirm=Modal.confirm;

export interface IJobSeekerListProps {
    jobSeekerStore: jobSeekerStore;
    recruitmentsStore:recruitmentsStore;
    StateApplicantStore:StateApplicantStore;
    InterviewStore:InterviewStore;
    stateApplicationStore:stateApplicationStore;
}


export interface IInterviewItem {
    location : string;
    time : string;
    idate : string;
    description : string;
}
export interface IStateApplicantListState {
    stateAPP : string;
    isEditOpen: boolean;
    isApprovedOpen:boolean;
    selectedID: number;
    IinterviewCreate:any;
    isAnyItemClicked: boolean;
    isAddJobSeekerPopupOpen: boolean;
    jobSeekerName: string,
    jobSeekerDesc: string,
    isEditJobSeekerPopupOpen: boolean,
    isVerifyDeletePopupOpen: boolean,
    isPopupOpen:boolean,
    stateApplicantID:number,
    infoInterview:IInterviewItem,
    redirect:string;
    changedTimed:Date;
}

@inject(Stores.recruitmentsStore)
@inject(Stores.jobSeekerStore)
@inject(Stores.StateApplicantStore)
@inject(Stores.InterviewStore)
@inject(Stores.stateApplicationStore)
@observer
export default class StateApplicant extends AppComponentBase<IJobSeekerListProps, IStateApplicantListState> {
    formRef:any;
    constructor(props: any) {
        super(props);
        this.state = {
            isApprovedOpen:false,
            isPopupOpen:false,
            stateAPP : "",
           
            isEditOpen: false,
            stateApplicantID:1,
            IinterviewCreate:{
                location: '',
                interviewTime: new Date(),
                description: '',
            },
            selectedID: 1,
            isAnyItemClicked: false,
            isAddJobSeekerPopupOpen: false,
            jobSeekerName: "",
            jobSeekerDesc: "",
            isEditJobSeekerPopupOpen: false,
            isVerifyDeletePopupOpen: false,
            infoInterview : {
                location : "",
                time : moment(new Date).format('HH:mm'),
                idate : moment(new Date).format('YYYY-MM-DD'),
                description : "",
            },
            redirect:"",
            changedTimed:new Date(),
        }

    }
    idJobSeeker = 0;
    idRecruitment = 0;
    async getDataFromPath()
    {
        const pathArray = window.location.pathname.split('/');
        const pathAnd = pathArray[pathArray.length - 1].split('&');
        const pathRecruitment = pathAnd[pathAnd.length - 1].split('=');
        const pathJobseeker = pathAnd[pathAnd.length - 2].split('=');
        this.idJobSeeker =  Number(pathJobseeker[pathJobseeker.length - 1]);
        this.idRecruitment =  Number(pathRecruitment[pathRecruitment.length - 1]);
        console.log(this.idJobSeeker);
        console.log(this.idRecruitment);
    }
    async updateStateApplication(state:string)
    {
       
        let idtemp:number=this.props.stateApplicationStore.stateApplication.id;
        let dto:UpdateStateApplicationInput={
            IDJobSeeker:this.idJobSeeker,
            IDRecruitment:this.idRecruitment,
            State:state,
            id:idtemp,
        }
        await this.props.stateApplicationStore.update(dto);
    }
    async updateStateApplicant(stateInput:string)
    {
        let dto:IStateApplicant={
            idJobSeeker:this.idJobSeeker,
            idRecruitment:this.idRecruitment,
            state:stateInput,
            id:this.state.stateApplicantID,
        }
        await this.props.StateApplicantStore.updateStateApplicant(dto);
    }
    async getInterView()
    {
        let dto:GetInterview={
            idJobSeeker:this.idJobSeeker,
            idRecruitment:this.idRecruitment,
        }
        await this.props.InterviewStore.getInterviewByIDJS(dto);
        let temp:any=this.props.InterviewStore.interview;
        this.setState({infoInterview:{
            location:temp.location,
            description:temp.description,
            time : moment(temp.interviewTime).format('HH:mm'),
            idate : moment(temp.interviewTime).format('YYYY-MM-DD'),
        }})  
    }
    async getJobSeeker()
    {
        let dto:EntityDto={
            id:1,
        }
        await this.props.jobSeekerStore.getJobSeekerByID(dto);
    }
    async getRecruitment()
    {
        await this.props.recruitmentsStore.getRecruitmentById(this.idRecruitment.toString());
    }
    async getApplication()
    {
        let dto1:GetStateApplicationByJSInput={
            IDJobSeeker:this.idJobSeeker,
            IDRecruitment:this.idRecruitment,
        }
        await this.props.stateApplicationStore.getStateApplicationByJobSeekerRecuitment(dto1);
    }

    async getStateApplicant()
    {
        
        let dto:getState={
            idJobSeeker:this.idJobSeeker,
            idRecruitment:this.idRecruitment,
        }
        await this.props.StateApplicantStore.getStateApplicantByIDJobSeeker(dto);
        this.setState({stateApplicantID:this.props.StateApplicantStore.StateApplicant.id})
    }
    async DeleteInterview(a:number){
        let dto:EntityDto={
            id: a,
        }
        await this.props.InterviewStore.deleteInterview(dto);
    }
    ApplicantFail=async()=>{
        this.updateStateApplicant("THAT_BAI");
        await this.updateStateApplication("THAT_BAI");
        if (this.props.StateApplicantStore.StateApplicant.state=="THAT_BAI")
        message.success("Hủy tuyển dụng thành công")
        else message.error("Hủy tuyển dụng không thành công");
        let x:number=this.props.InterviewStore.interview.id;
        await this.DeleteInterview(x);
        
    }
    delete=(props:any) =>{
        
        confirm({
          title: 'Bạn có muốn hủy lưu ứng viên này?',
          okText: 'Đồng ý',
          cancelText: 'Hủy bỏ',
          onOk() {
            props.UnSaved();
            props.setState({redirect:"/timkiemungvien"})
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
    async getJobSeekerInfoByID() {
        let dto: EntityDto =
        {
            id: this.state.selectedID,
        }
        
        this.props.jobSeekerStore.getJobSeekerByID(dto);
        
    }
    saveFormRef = (formRef: any) => {
        this.formRef = formRef;
    };
    async UpdateModalOpen() 
    {
        await this.props.InterviewStore.createInterviewBegin(this.idJobSeeker,this.idRecruitment);
    }
    UnSaved=async()=>
    {
        await this.updateStateApplicant("KHONG_LUU");
        if (this.props.StateApplicantStore.StateApplicant.state=="KHONG_LUU")
        message.success("Đã bỏ lưu thành công")
        else message.error("Bỏ lưu không thành công");
    }
     handleCreate=async ()=> {
        
        let dto1:Iinterview =
        {
            idRecruitment:this.idRecruitment,
            interviewTime:new Date(this.state.infoInterview.idate+"T"+this.state.infoInterview.time+":00.00Z"),
            location:this.state.infoInterview.location,
            description:this.state.infoInterview.description,
            id:this.props.InterviewStore.interview.id,
            idJobSeeker:this.idJobSeeker,
        }
       
        await this.props.InterviewStore.createInterview(dto1);
        
        this.setState({ isPopupOpen: false });
        
        await this.updateStateApplicant("CHO_CHOT_LICH");
        await this.updateStateApplication("CHO_PHONG_VAN");
        if (this.props.StateApplicantStore.StateApplicant.state=="CHO_CHOT_LICH")
            message.success("Đã mời phỏng vấn")
        else message.error("Mời phỏng vấn không thành công");


    };
    handleApproved=async ()=> {
        let dto1:Iinterview =
        {
            idRecruitment:this.idRecruitment,
            interviewTime:this.state.changedTimed,
            location:this.state.infoInterview.location,
            description:this.state.infoInterview.description,
            id:this.props.InterviewStore.interview.id,
            idJobSeeker:this.idJobSeeker,
        }
        await this.props.InterviewStore.updateInterview(dto1);
        
        this.setState({ isApprovedOpen: false });
        
        //await this.updateStateApplicant("CHO_CHOT_LICH");
        //await this.updateStateApplication("CHO_PHONG_VAN");
            message.success("Đã chấp nhận yêu cầu dời lịch");


    };
    approved=(props:any)=> {
        confirm({
          title: 'Bạn có muốn chấp nhận yêu cầu dời lịch của ứng viên?',
          okText: 'Đồng ý',
          cancelText: 'Hủy bỏ',
          onOk() {
            props.handleApproved();
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };
    deleteApplicant=(props:any)=> {
        confirm({
          title: 'Bạn có muốn hủy tuyển dụng?',
          okText: 'Đồng ý',
          cancelText: 'Hủy bỏ',
          onOk() {
            props.ApplicantFail();
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };

    Fail=(props:any) =>{
        
        confirm({
          title: 'Bạn có muốn từ chối ứng viên này?',
          okText: 'Đồng ý',
          cancelText: 'Hủy bỏ',
          onOk() {
            props.ApplicantFail();
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
      accept=(props:any)=> {
        confirm({
          title: 'Bạn có muốn nhận ứng viên này?',
          okText: 'Đồng ý',
          cancelText: 'Hủy bỏ',
          onOk() {
            props.ApplicantPass();
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }
    lock=(props:any)=> {
        confirm({
          title: 'Bạn có muốn chốt lịch phỏng vấn?',
          icon: <ExclamationCircleOutlined />,
          content: 'Sau khi chốt lịch sẽ không thể thay đổi nữa.',
          okType: 'danger',
          okText: 'Đồng ý',
          cancelText: 'Hủy bỏ',
          onOk() {
            props.LockRequest();
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }
    async ApplicantPass(){

        await this.updateStateApplicant("THANH_CONG");
        await this.updateStateApplication("THANH_CONG");
        if (this.props.StateApplicantStore.StateApplicant.state=="THANH_CONG")
        message.success("Tuyển dụng thành công")
        else message.error("Tuyển dụng không thành công");
        let x:number=this.props.InterviewStore.interview.id;
        await this.DeleteInterview(x);
        
    }
    Modal=()=>{
        this.setState({isEditOpen:!this.state.isEditOpen});
    }
    LockRequest= async ()=>{

        await this.updateStateApplicant("CHO_PHONG_VAN");
        await this.updateStateApplication("CHOT_LICH");
        if (this.props.StateApplicantStore.StateApplicant.state=="CHO_PHONG_VAN")
        message.success("Chốt lịch thành công")
        else message.error("Chốt lịch không thành công");
    }
    async componentDidMount() {
        await this.getDataFromPath();
        await this.getJobSeeker();
        await this.getRecruitment();
        await this.getStateApplicant();
        await this.getInterView();  
        await this.getApplication();
    }
    async componentDidUpdate() {
            
    }
    
    disabledDate(current: any) {
        return current && current < moment().add(-1,'days');
    }
    handleChangeDate =(date: any, dateString: string)=> {
        const name = 'idate';
        let items = this.state.infoInterview;
        items = JSON.parse(JSON.stringify(items));
        items[`${name}`] = moment(dateString, 'DD-MM-YYYY').format('YYYY-MM-DD');
        console.log(items);
         this.setState({
            infoInterview: items,
        });
        console.log(this.state.infoInterview);
    }
    disabledTime(current: any) {
        return current && current < moment().add(-1,'minutes');
    }
     handleChangeTime= (time: any, dateString: string)=>{
        const name = 'time';
        let items = this.state.infoInterview;
        items = JSON.parse(JSON.stringify(items));
        items[`${name}`] = moment(dateString,"HH:mm").format('HH:mm');
        console.log(items);
         this.setState({
            infoInterview: items,
        });
        console.log(this.state.infoInterview);
    }
    public render() {

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

        const {StateApplicant} = this.props.StateApplicantStore;
        const {jobSeeker}=this.props.jobSeekerStore;
        const {recruitment}=this.props.recruitmentsStore;
        const {interview}=this.props.InterviewStore;
        const {interviewRequest}=this.props.stateApplicationStore; 
        
        if (StateApplicant===undefined|| jobSeeker === undefined || recruitment === undefined)
            return(<div>Ứng viên này không có trạng thái</div>)
        else
        if (StateApplicant.state==="CHO_CHOT_LICH" || StateApplicant.state=== "CHO_PHONG_VAN")
            {
                if (interview===undefined)
                return(<h1> Error Waiting Latch</h1>)
                if (interviewRequest===undefined && this.state.isApprovedOpen)
                return(<h1>Không có yêu cầu thay đổi</h1>)       
            }
            
        const ApprovedChanged=(props:any)=>{
            
            return(
                        <ModalChangeAppointment className="Custom_Modal_Out_Layout1" style={{marginTop :30}} 
                                shadow={true}
                                type="custom"
                                title="Thay đổi lịch hẹn phỏng vấn"
                                open={this.state.isApprovedOpen}
                                closeModal={() => { this.setState({ isApprovedOpen: false }); }}
                            >
                            <Form>
                            <Row>
                            <Col span={15}>
                            <FormItem className="Fontstyle1"   label={('Ứng viên')}{...formItemLayout}   >
                            <Input placeholder={jobSeeker.name}
                                    disabled={true}
                                            />
                        </FormItem>
                        <FormItem className="Fontstyle1"   label={('Công việc')}{...formItemLayout}   >
                            <Input placeholder={recruitment.name}
                                    disabled={true}
                                            />
                        </FormItem>
                        <FormItem className="Fontstyle1"   label={('Ngày phỏng vấn')}{...formItemLayout}  >
                            <Input 
                                    defaultValue={moment(this.state.changedTimed).format("DD-MM-YYYY")} 
                                    disabled={true}
                                            />
                        </FormItem>
                        <FormItem className="Fontstyle1"    label={('Giờ phỏng vấn')}{...formItemLayout}  >
                                <Input 
                                    defaultValue={moment(this.state.changedTimed).format("HH:mm")} 
                                       disabled={true}
                                            />
                        </FormItem>
                        <FormItem className="Fontstyle1"    label={('Địa chỉ phỏng vấn')}{...formItemLayout}  >
                                <Input 
                                    defaultValue={this.state.infoInterview.location} 
                                       disabled={true}
                                            />
                        </FormItem>
                        <FormItem className="Fontstyle1"    label={('Nội dung phỏng vấn')}{...formItemLayout}  >
                                <Input
                                defaultValue={this.state.infoInterview.description }
                                disabled={true} />
                        </FormItem>
                            </Col>
                            <Col span={8}>
                                {/* <img className="imageCenter" src={picChangeAppointment} alt="No"></img> */}
                                <img src={picChangeAppointment} alt="No"></img>
                                <div style={{margin :20}} className="Custom_Modal_Footer1">
                                    <div style={{ display: "flex"}  } >
                                            <button className="Simple_White_Button1" onClick={() => {  this.setState({ isApprovedOpen: false }) }} >Hủy bỏ</button>
                                            <button className="Simple_Blue_Button1" onClick={()=>this.approved(this)}>Hoàn tất</button>
                                    </div>
                                </div>
                            <Paragraph style={{textAlign: 'center', fontSize: 14, fontWeight:500}}>
                               Lịch phỏng đang được ứng viên <br></br>
                               yêu cầu thay đổi
                            </Paragraph>
                            </Col>
                                
                            </Row>
                            </Form>
                        </ModalChangeAppointment>
                    )
        }
        const ModalInvite=(props:any)=>{
            return(
                    <ModalChangeAppointment className="Custom_Modal_Out_Layout1" style={{marginTop :30}} 
                            shadow={true}
                            type="custom"
                            title="Lịch hẹn phỏng vấn"
                            open={this.state.isPopupOpen}
                
                            closeModal={() => { this.setState({ isPopupOpen: false }); }}
                        >
                        <Form>
                        <Row>
                        <Col span={15}>
                        <FormItem className="Fontstyle1"   label={('Ứng viên')}{...formItemLayout}   >
                            <Input placeholder={jobSeeker.name}
                                    disabled={true}
                                            />
                        </FormItem>
                        <FormItem className="Fontstyle1"   label={('Công việc')}{...formItemLayout}   >
                            <Input placeholder={recruitment.name}
                                    disabled={true}
                                            />
                        </FormItem>
                        <FormItem className="Fontstyle1"   label={('Ngày phỏng vấn')}{...formItemLayout}  >
                                <DatePicker
                                    placeholder={this.state.infoInterview.idate}
                                    format="DD/MM/YYYY"
                                    disabledDate={this.disabledDate}
                                    name="idate"
                                    onChange={this.handleChangeDate}
                                />
                        </FormItem>
                        <FormItem className="Fontstyle1"    label={('Giờ phỏng vấn')}{...formItemLayout}  >
                                <TimePicker
                                    placeholder={this.state.infoInterview.time}
                                     format="HH:mm"
                                     onChange={this.handleChangeTime}
                                />
                        </FormItem>
                        <FormItem className="Fontstyle1"    label={('Địa chỉ phỏng vấn')}{...formItemLayout}  >
                                <Input placeholder="Nhập địa chỉ phỏng vấn"
                                    defaultValue={this.state.infoInterview.location} 
                                        onChange={(e) => {            
                                            this.setState({infoInterview : {...this.state.infoInterview, location : e.target.value}});
                                            }}
                                            />
                        </FormItem>
                        <FormItem className="Fontstyle1"    label={('Nội dung phỏng vấn')}{...formItemLayout}  >
                                <Input placeholder="Nhập nội dung phỏng vấn"
                                defaultValue={this.state.infoInterview.description }
                                value={this.state.infoInterview.description}
                                onChange={(e) => {
                                            this.setState({infoInterview : {...this.state.infoInterview, description : e.target.value}});
                                            }} />
                        </FormItem>
                        </Col>
                        <Col span={8}>
                            {/* <img className="imageCenter" src={picChangeAppointment} alt="No"></img> */}
                            <img src={picChangeAppointment} alt="No"></img>
                            <div style={{margin :20}} className="Custom_Modal_Footer1">
                                <div style={{ display: "flex"}  } >
                                        <button className="Simple_White_Button1" onClick={() => {  this.setState({ isPopupOpen: false }) }} >Hủy bỏ</button>
                                        <button className="Simple_Blue_Button1" onClick={this.handleCreate}>Hoàn tất</button>
                                </div>
                            </div>
                        <Paragraph style={{textAlign: 'center', fontSize: 14, fontWeight:500}}>
                           Lịch phỏng vấn cần được chốt ở trang cập nhật <br></br>
                           trạng thái ứng viên trước khi có hiệu lực
                        </Paragraph>
                        </Col>
                            
                        </Row>
                        </Form>
                    </ModalChangeAppointment>
                )
        }
        const ModalLATCH=(props:any)=>{  
            return(
                <ModalChangeAppointment className="Custom_Modal_Out_Layout1" style={{marginTop :30}} 
                            shadow={true}
                            type="custom"
                            title="Chốt lịch phỏng vấn"
                            open={this.state.isEditOpen}
                
                            closeModal={() => this.setState({isEditOpen:false})}
                        >
                        <Form>
                        <Row>
                        <Col span={15}>
                        <FormItem className="Fontstyle1"   label={('Ứng viên')}{...formItemLayout}   >
                            <Input placeholder={jobSeeker.name}
                                    disabled={true}
                                            />
                        </FormItem>
                        <FormItem className="Fontstyle1"   label={('Công việc')}{...formItemLayout}   >
                            <Input placeholder={recruitment.name}
                                    disabled={true}
                                            />
                        </FormItem>
                        <FormItem className="Fontstyle1"   label={('Ngày phỏng vấn')}{...formItemLayout}  >
                            <Input 
                                    defaultValue={this.state.infoInterview.idate} 
                                    disabled={true}
                                            />
                        </FormItem>
                        <FormItem className="Fontstyle1"    label={('Giờ phỏng vấn')}{...formItemLayout}  >
                                <Input 
                                    defaultValue={this.state.infoInterview.time} 
                                       disabled={true}
                                            />
                        </FormItem>
                        <FormItem className="Fontstyle1"    label={('Địa chỉ phỏng vấn')}{...formItemLayout}  >
                                <Input 
                                    defaultValue={this.state.infoInterview.location} 
                                       disabled={true}
                                            />
                        </FormItem>
                        <FormItem className="Fontstyle1"    label={('Nội dung phỏng vấn')}{...formItemLayout}  >
                                <Input
                                defaultValue={this.state.infoInterview.description }
                                disabled={true} />
                        </FormItem>
                        </Col>
                        <Col span={8}>
                            
                            <img src={picChangeAppointment} alt="No"></img>
                            <div style={{margin :20}} className="Custom_Modal_Footer1">
                                <div style={{ display: "flex"}  } >
                                        <button className="Simple_White_Button1" onClick={  this.Modal } >Thoát</button>
                                        <button className="Simple_Blue_Button1" onClick={()=>this.lock(this)}>Chốt</button>
                                </div>
                            </div>
                        <Paragraph style={{textAlign: 'center', fontSize: 14, fontWeight:500}}>
                           Lịch phỏng vấn sau khi chốt sẽ <br></br>
                           không thể thay đổi
                        </Paragraph>
                        </Col>
                            
                        </Row>
                        </Form>
                        </ModalChangeAppointment> 
            )
        }
        const PageStateSaved = (props:any) => {
            if (this.state.redirect !== "")
            return <Redirect push to={this.state.redirect}/>;
            return (
                <div style={{ margin: "auto", marginTop: "350px", width: "60%" }}>
                    <div className="whiteBackground" style={{alignItems: 'center'}}>
                        
                        <Title style={{marginTop: 0, fontWeight:"bolder"}}>Trạng thái ứng viên</Title>
                        <Title style={{textAlign: 'center', fontWeight:"bolder"}} level={4}>{jobSeeker.name}    </Title>
                        <img className="imageCenter" src={picSaved} alt="No"></img>
    
                        <Title style={{textAlign: 'center'}} level={3}>Đã lưu</Title>
                        <Title style={{textAlign: 'center', fontSize: 14, fontWeight:"initial"}} level={4}>
                            Có vị trí cho <b>{props.name}?</b> Mời làm việc ngay
                        </Title>
    
                        <Button className="buttonCenter" style={{backgroundColor:"#F5F5F5 "}} onClick={()=>this.delete(this)}>Bỏ lưu</Button>
                       
                        <Button className="buttonCenter" type="primary" onClick={()=>{this.UpdateModalOpen();this.setState({isPopupOpen:true});}}>Mời phỏng vấn</Button>
                        <ModalInvite/>
                        
                    </div>
                </div>
            );
        }

        const PageStateWaitingRespone = () => {
            if (this.state.redirect !== "")
            return <Redirect push to={this.state.redirect}/>;
            return (
            
                <div style={{ margin: "auto", marginTop: "350px", width: "60%" }}>
                    <div className="whiteBackground" style={{alignItems: 'center'}}>
                        <Title style={{marginTop: 0}}><b>Trạng thái ứng viên</b></Title>
                        <Title style={{textAlign: 'center'}} level={4}>{jobSeeker.name}</Title>
                        <Title style={{marginTop: 5, fontSize : 14, color: "GrayText"  }}>
                            {recruitment.name}
                        </Title>
                        <img className="imageCenter" src={picWaiting} alt="No"></img>
    
                        <Title style={{textAlign: 'center'}} level={3}>Chờ phản hồi</Title>
                        <Paragraph style={{textAlign: 'center', fontSize: 14, fontWeight:500}}>
                            <b>{jobSeeker.name}</b> đã nộp hồ sơ xin việc, hãy xem và phản hồi 
                        </Paragraph>
    
                        
                        <Button className="buttonCenter" type="primary" onClick={()=>this.setState({redirect:"/list-cv/get/"+jobSeeker.id.toString()})} >Xem hồ sơ</Button>
                    </div>
                </div>
            );
        }

        const PageStateWaitingLatch = () => {
            if (interview===undefined)
                return(<div/>)
            
            const interviewHours= moment(interview.interviewTime).format('HH:mm A');
            const interviewDate=moment(interview.interviewTime, 'YYYY-MM-DD').format('DD-MM-YYYY');
            return (
                <div style={{ margin: "auto", marginTop: "350px", width: "60%" }}>
                     <div>
                <div className="whiteBackgroundWaitingLatch" style={{alignItems: 'center' }}>
                    <Title style={{marginTop: 0}}><b>Trạng thái ứng viên</b></Title>
                    <Title style={{textAlign: 'center'}} level={4}>{jobSeeker.name}</Title>
                    <Title style={{marginTop: 5, fontSize : 14, color: "GrayText"  }}>
                        {recruitment.name}
                    </Title>
                    <img className="imageCenter" src={picSaved} alt="No"></img>
    
                    <Title style={{textAlign: 'center'}} level={3}>Chờ chốt lịch</Title>
                    <Title style={{textAlign: 'center', fontSize: 14, fontWeight:500}} level={4}>
                        Buổi phỏng vấn sẽ diễn ra tại <br></br> tại <b>{interview.location}</b> 
                        <br></br> vào lúc <b>{interviewHours} </b> ngày <b>{interviewDate}</b> 
                        <br></br>Nội dung phỏng vấn:                   
                    </Title>
                    <div className="description">
                        <Title style={{textAlign: 'center', fontSize: 14, fontWeight:500}} level={4}>
                         {interview.description}
                        </Title> 
                    </div>
                    <Button className="buttonAccept" style={{backgroundColor:"#39BD5A",color:"white"}} onClick={()=>this.setState({isApprovedOpen:true,changedTimed:interviewRequest.interviewTime})}>Duyệt yêu cầu dời lịch</Button>
                    <br></br>
                    <Button className="buttonCenter"style={{backgroundColor:"#F5F5F5 "}} onClick={()=>this.Fail(this)}>Hủy tuyển dụng</Button>
                    <Button className="buttonCenter" type="primary" onClick={this.Modal}>Chốt lịch hẹn</Button>
                    <ApprovedChanged/>
                    <ModalLATCH/>
                    <Title style={{textAlign: 'center', fontSize: 12, fontWeight:500, marginTop: 20,color:"#518FF5"}} level={4}>
                        Lịch phỏng vấn chỉ có hiệu lực khi bạn đã chốt            
                    </Title>
                </div>
            </div>            </div>
             );
        }

        const PageStateLatch = () => {
            if (interview===undefined)
            return(<div/>)
        const interviewHours= moment(interview.interviewTime).format('HH:mm A');
        const interviewDate=moment(interview.interviewTime, 'YYYY-MM-DD').format('DD-MM-YYYY');
        const now=new Date();
        if (new Date(interview.interviewTime)<now)
                {
                     this.updateStateApplication("CHO_KET_QUA");  
                     this.updateStateApplicant("CHO_KET_QUA");
                     return(<div>Updating</div>)
                }
          return (
                <div style={{ margin: "auto", marginTop: "350px", width: "60%" }}>
                    <div>
                    <div className="whiteBackgroundWaitingLatch" style={{alignItems: 'center' }}>
                        <Title style={{marginTop: 0}}><b>Trạng thái ứng viên</b></Title>
                        <Title style={{textAlign: 'center'}} level={4}>{jobSeeker.name}</Title>
                        <Title style={{marginTop: 5, fontSize : 14, color: "GrayText"  }}>
                            {recruitment.name}
                        </Title>
                        <img className="imageCenter" src={picSaved} alt="No"></img>
    
                        <Title style={{textAlign: 'center'}} level={3}>Chờ phỏng vấn</Title>
                        <Title style={{textAlign: 'center', fontSize: 14, fontWeight:500}} level={4}>
                            Buổi phỏng vấn sẽ diễn ra <br></br> tại <b>{interview.location}</b> 
                            <br></br> vào lúc <b>{interviewHours} </b> ngày <b>{interviewDate}</b>
                            <br></br>Nội dung phỏng vấn:                   
                        </Title>
                        <div className="description">
                            <Title style={{textAlign: 'center', fontSize: 14, fontWeight:500}} level={4}>
                            {interview.description}
                            </Title> 
                        </div>
    
                        <Button className="buttonCenter" style={{backgroundColor:"#F5F5F5 "}} onClick={()=>this.Fail(this)}>Hủy tuyển dụng</Button>
                    </div>
                </div>
                </div>
             );
        }

        const PageStateWaitingResult = () => {
            return (
                <div style={{ margin: "auto", marginTop: "350px", width: "60%" }}>
                    <div className="whiteBackground" style={{alignItems: 'center'}}>
                        <Title style={{marginTop: 0}}><b>Trạng thái ứng viên</b></Title>
                        <Title style={{textAlign: 'center'}} level={4}>{jobSeeker.name}</Title>
                        <Title style={{marginTop: 5, fontSize : 14, color: "GrayText"  }}>
                            {recruitment.name} 
                         </Title>
                        <img className="imageCenter" src={picWaiting} alt="No"></img>
    
                        <Title style={{textAlign: 'center'}} level={3}>Chờ kết quả</Title>
                        <Paragraph style={{textAlign: 'center', fontSize: 14, fontWeight:500}}>
                            Hãy cho <b>{jobSeeker.name}</b> biết kết quả sau buổi phỏng vấn 
                        </Paragraph>
    
                        <Button className="buttonCenter" style={{backgroundColor:"#F5F5F5 "}} onClick={()=>this.Fail(this)}>Từ chối</Button>
                        <Button className="buttonCenter" type="primary" onClick={()=>this.accept(this)}>Nhận vào làm</Button>
                    </div>
                </div>
            );
        }

        const PageStateSuccessful = () => {
            return (
                <div style={{ margin: "auto", marginTop: "350px", width: "60%" }}>
                    <div className="whiteBackgroundSuccessful" style={{alignItems: 'center'}}>
                        <Title style={{marginTop: 0}}>Trạng thái việc làm</Title>
                        <Title style={{textAlign: 'center'}} level={4}>{jobSeeker.name}</Title>
                        <Title style={{marginTop: 5, fontSize : 14, color: "GrayText"  }}>
                            {recruitment.name} 
                        </Title>
                        <img className="imageCenter" src={picSuccess} alt="No"></img>
    
                        <Title style={{textAlign: 'center', fontWeight:800}} level={3}>Đã nhận việc</Title>
                        <Paragraph style={{textAlign: 'center', fontSize: 14, fontWeight:400}}>
                            Tuyển dụng thành công, hãy chào đón <b>{jobSeeker.name}</b> <br/> đến với danh nghiệp của bạn
                        </Paragraph>
                    </div>
                </div>
            );
        }

        const PageStateRejected = () => {
            if (this.state.redirect !== "")
             return <Redirect push to={this.state.redirect}/>;
            return (
                <div style={{ margin: "auto", marginTop: "350px", width: "60%" }}>
                    <div className="whiteBackgroundRejected" style={{alignItems: 'center'}}>
                        <Title style={{marginTop: 0}}>Trạng thái ứng viên</Title>
                        <Title style={{textAlign: 'center'}} level={4}>{jobSeeker.name}</Title>
                        <Title style={{marginTop: 5, fontSize : 14, color: "GrayText"  }}>
                            {recruitment.name}
                        </Title>
                        <img className="imageCenter" src={picCancel} alt="No"></img>
    
                        <Title style={{textAlign: 'center'}} level={3}>Đã hủy</Title>
                        <Paragraph style={{textAlign: 'center', fontSize: 14, fontWeight:600}}>
                            Đơn ứng tuyển đã bị hủy
                        </Paragraph>
    
                        <Button className="buttonCenter" type="primary" onClick={()=>this.setState({redirect:"/timkiemungvien"})}>Tìm ứng viên</Button>
                    </div>
                </div>
            );
        }
        
        if (StateApplicant === undefined) 
            return (<div></div >);
           
        if (StateApplicant.state === "DA_LUU")
            return (<PageStateSaved
                    ></PageStateSaved>);
        
        if (StateApplicant.state === "CHO_PHAN_HOI")
            return (<PageStateWaitingRespone></PageStateWaitingRespone>);
       
        if (StateApplicant.state === "CHO_CHOT_LICH")
            return (<PageStateWaitingLatch></PageStateWaitingLatch>);
                
            
        if (StateApplicant.state === "CHO_PHONG_VAN")
            return (<PageStateLatch></PageStateLatch>); 
        
        if (StateApplicant.state === "CHO_KET_QUA")
            return (<PageStateWaitingResult></PageStateWaitingResult>);
   
        if (StateApplicant.state === "THANH_CONG")
            return (<PageStateSuccessful></PageStateSuccessful>);

        if (StateApplicant.state === "THAT_BAI")
            return (<PageStateRejected></PageStateRejected>);
        return (
            <div>
                <p>Không có trạng thái</p>
            </div>
        );
    }
}
