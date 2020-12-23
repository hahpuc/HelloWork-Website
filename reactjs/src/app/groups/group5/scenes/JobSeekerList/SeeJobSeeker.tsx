//#region Import
import React  from 'react'
import '../../styles.less'
import './JobSeekerList.less'
import { inject, observer } from 'mobx-react';
import AppComponentBase from 'app/shared/components/AppComponentBase';
import Stores from 'app/shared/stores/storeIdentifier';
import JobSeekerStore from '../../stores/jobSeekerStore'
import ReviewStore from '../../stores/reviewStore';
import ExperienceStore, { IExperienceItem } from '../../stores/experienceStore';
import EducationStore, { IEducationItem } from '../../stores/educationStore'
import SkillStore, { ISkillItem } from '../../stores/skillStore';
import OrientationStore, {IOrientationItem} from '../../stores/orientationStore';
import AchievementStore, { IAchievementItem } from '../../stores/achievementStore';
import { EntityDto } from 'shared/services/dto/entityDto';
import fbPicture from 'assets/images/Facebook.png';
import TwPicture from 'assets/images/Twitter.png';
import LkPicture from 'assets/images/LinkedIn.png';
import IconBag from 'assets/images/IconBag.png';
import picLocation from 'assets/images/LocationIcon.png';
import picPerson from 'assets/images/IconPerson.png';
import {Button, Avatar, Rate,Input , Modal, message,Form, Col, Row } from "antd";
//import { EditFilled } from "@ant-design/icons";
import FormItem from 'antd/lib/form/FormItem';
import CustomModal from '../../Component/CustomModal/CustomModal'
import ModalAchievement from '../../Component/ModalAchievement/ModalAchievement'
import ModalEducation from '../../Component/ModalEducation/ModalEducation'
import { UpdateJobSeekerInput } from '../../services/dto/jobSeekerDto/JobSeekerDto';

import { CreateEducationInput, UpdateEducationInput } from "../../services/dto/jobSeekerDto/educationDto";
import { CreateExperienceInput, UpdateExperienceInput } from "../../services/dto/jobSeekerDto/experienceDto";
import { CreateSkillInput, UpdateSkillInput } from "../../services/dto/jobSeekerDto/skillDto";
import { CreateOrientationInput, UpdateOrientationInput } from "../../services/dto/jobSeekerDto/orientationDto";
import { CreateAchievementInput, UpdateAchievementInput } from "../../services/dto/jobSeekerDto/achievementDto";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router';

const { confirm } = Modal;
//#endregion

export interface IJobSeekerListProps {
    jobSeekerStore: JobSeekerStore;
    reviewStore : ReviewStore;
    educationStore : EducationStore;
    experienceStore : ExperienceStore;
    skillStore : SkillStore;
    orientationStore : OrientationStore;
    achievementStore : AchievementStore;
}

export interface IJobSeekerListState {
    Actor : string; // "Chủ tài khoản" , "Khách", "Nhà tuyển dụng"
    UpdatejobSeeker: UpdateJobSeekerInput,
    modalVisible: boolean;
    selectedID: number;
    isAnyItemClicked: boolean;
    isAddJobSeekerPopupOpen: boolean;
    jobSeekerName: string,
    jobSeekerDesc: string,
    isEditJobSeekerPopupOpen: boolean,
    isVerifyDeletePopupOpen: boolean,

    isUpdateOrientationPopupOpen: boolean

    isSeeAllEducation : boolean,
    isSeeAllExperience : boolean,
    isSeeAllSkill : boolean,
    isSeeAllOrientation : boolean,
    isSeeAllAchievement : boolean,

    isEditingEducation : boolean,
    isEditingWorkExperience : boolean,
    isEditingSkill : boolean,
    isEditingOrientation : boolean,
    isEditingAchievement : boolean,

    sectionSelectedDelete : string,
    idItemSelectedDelete : number, 
    isUpdateAchievementPopupOpen: boolean,
    isUpdateEducationPopupOpen: boolean,
    isUpdateSkillPopupOpen:boolean,
    isUpdateExperiencePopupOpen:boolean,
    isAddEducationPopupOpen:boolean,
    isAddOrientationPopupOpen:boolean,
    isAddAchievementPopupOpen:boolean,
    isAddSkillPopupOpen:boolean,
    isAddExperiencePopupOpen:boolean,

    selectedEducation: UpdateEducationInput,
    selectedExperience: UpdateExperienceInput,
    selectedSkill: UpdateSkillInput,
    selectedOrientation: UpdateOrientationInput,
    selectedAchievement: UpdateAchievementInput,

    Error : string;
    redirect : string;
}

@inject(Stores.jobSeekerStore)
@inject(Stores.reviewStore)
@inject(Stores.educationStore)
@inject(Stores.experienceStore)
@inject(Stores.skillStore)
@inject(Stores.orientationStore)
@inject(Stores.achievementStore)

@observer
export default class SeeJobSeeker extends AppComponentBase<IJobSeekerListProps, IJobSeekerListState> {
    formRef: any;
    constructor(props: any) {
        super(props);
        this.state = {
            Error : "",
            Actor :"Khách",
            modalVisible: false,
            selectedID: 1,
            isAnyItemClicked: false,
            isAddJobSeekerPopupOpen: false,
            jobSeekerName: "",
            jobSeekerDesc: "",
            isEditJobSeekerPopupOpen: false,
            isVerifyDeletePopupOpen: false,
            isUpdateOrientationPopupOpen:false,
            isUpdateAchievementPopupOpen: false,
            isUpdateEducationPopupOpen: false,
            isUpdateSkillPopupOpen:false,
            isUpdateExperiencePopupOpen:false,
            isAddEducationPopupOpen:false,
            isAddOrientationPopupOpen:false,
            isAddAchievementPopupOpen: false,
            isAddSkillPopupOpen: false,
            isAddExperiencePopupOpen:false,
            UpdatejobSeeker :{
                id: 1,
                name: '',
                birthday: '',
                description: '',
                workLocation: '',
                address: '',
                email: '',
                phoneNumber: '',
                expertise: '',
                facebook: '',
                github: '',
                twitter: '',
                image: '',
                field: '',
                sex : '',
            },
            isSeeAllEducation : false,
            isSeeAllExperience : false,
            isSeeAllSkill : false,
            isSeeAllOrientation : false,
            isSeeAllAchievement : false,

            isEditingEducation: false,
            isEditingWorkExperience: false,
            isEditingSkill: false,
            isEditingOrientation: false,
            isEditingAchievement: false,

            sectionSelectedDelete : "",
            idItemSelectedDelete : 1,

            selectedEducation: {
                id: 1,
                name: '',
                school: '',
                startYear: new Date(),
                endYear: new Date(),
                majors: '',
                idJobSeeker: 1,
            },

            selectedExperience: {
                id: 1,
                company: '',
                startYear: 0,
                endYear: 0,
                role: '',
                description: '',
                idJobSeeker: 0,
                grantedPermissions: [
                    ''
                ]
            },

            selectedSkill: {
                id: 1,
                skillName: '',
                idJobSeeker: 0,
                grantedPermissions: [
                    ''
                ]
            },

            selectedOrientation: {
                id: 1,
                orientationName: '',
                idJobSeeker: 0,
                grantedPermissions: [
                    ''
                ]
            },

            selectedAchievement: {
                id: 1,
                achievementName: '',
                idJobSeeker: 0,
                year: 0,
                organization: '',
                note: '',
                grantedPermissions: [
                    ''
                ]
            },

            redirect : "",
        }

    }

    //Moi phong van
    InviteInterview = () => {
        message.success("Đã gửi lời mời phỏng vấn thành công");
    }
    //#region  Tien Rang Buoc 
    deleteError = () => {
        this.setState({Error : ""});
    }
    showError = (props : any) => {
        confirm({
          title: 'Thông tin nhập chưa chính xác! Vui lòng kiểm tra lại!',
          icon: <ExclamationCircleOutlined />,
          content: props.state.Error,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {  
            props.deleteError();
          },
          onCancel() {
            props.deleteError();
          },
        });
    }
    checkUpdateJobSeeker = () => {
        // check in state updateJobSeeker
       const  {UpdatejobSeeker} = this.state;
       if (UpdatejobSeeker.name === "")
        {
            this.setState({Error: "Bạn phải nhập cho trường tên"});
            this.showError(this);
            return;
        }

        if (UpdatejobSeeker.birthday === "")
        {
            this.setState({Error: "Bạn phải nhập cho trường ngầy sinh"});
            this.showError(this);
            return;
        }
    }
    //#endregion
    //#region Function init
    //Sanh code
    async componentDidMount() {
        const pathArray = window.location.pathname.split('/');
        const id : number = +pathArray[2];
        this.setState({selectedID : id});
        await this.getJobSeekerByID(id);
        await this.getReviewByID(this.props.jobSeekerStore.jobSeeker.id);
        await this.getEducationsByID(this.props.jobSeekerStore.jobSeeker.id);
        await this.getAllExperiencesByID(this.props.jobSeekerStore.jobSeeker.id);
        await this.getAllSkillsByID(this.props.jobSeekerStore.jobSeeker.id);
        await this.getAllOrientationsByID(this.props.jobSeekerStore.jobSeeker.id);
        await this.getAllAchievementByID(this.props.jobSeekerStore.jobSeeker.id);
      
        const {jobSeeker} = this.props.jobSeekerStore;
        if (jobSeeker === undefined) return;

        this.setState({
            UpdatejobSeeker :{
                id: jobSeeker.id,
                name: jobSeeker.name,
                birthday: jobSeeker.birthday,
                description: jobSeeker.description,
                workLocation: jobSeeker.workLocation,
                address: jobSeeker.address,
                email: jobSeeker.email,
                phoneNumber: jobSeeker.phoneNumber,
                expertise: jobSeeker.expertise,
                facebook: jobSeeker.facebook,
                github: jobSeeker.github,
                twitter: jobSeeker.twitter,
                image: jobSeeker.image,
                field: jobSeeker.field,
                sex : jobSeeker.sex,
            },
        });

    }

    handleEdit = () => {
        this.setState({ isEditJobSeekerPopupOpen: true })
    }

    handleItemClicked = (id: number) => {
        let all_item = document.getElementsByClassName("custom-table-line-activated");

        for (let i = 0; i < all_item.length; i++) {
            all_item[i].className = "custom-table-line";
        }

        let selected_item: any = document.getElementById("job-type-list-item-" + id);
        selected_item.className = "custom-table-line-activated";

        this.setState({
            isAnyItemClicked: true, selectedID: id
        });
    }

    UpdateJobSeekerInput = async () => {
        //check
        this.checkUpdateJobSeeker();
        if (this.state.Error !== "") return;
        await this.props.jobSeekerStore.update(this.state.UpdatejobSeeker);
        message.success("Chỉnh sửa thông tin cá nhân thành công");
    }

    //#region  add function
    addEducation = () => {
        this.setState({isAddEducationPopupOpen: true});
    }
    addWorkExperience = () => {
        this.setState({isAddExperiencePopupOpen:true});
    }
    addSkill = () => {
        this.setState({isAddSkillPopupOpen:true});
    }
    addOrientation = () => {
         this.setState({isAddOrientationPopupOpen: true});
    }
    addAchievement = () => {
        this.setState({isAddAchievementPopupOpen:true});
    }
    //#endregion
    //#region function edit
    editEducation = (selectedItem : IEducationItem) => {
        this.setState({isUpdateEducationPopupOpen: true});

        this.setState({
            selectedEducation: {
                id: selectedItem.id,
                name: selectedItem.name,
                school: selectedItem.school,
                startYear: new Date(selectedItem.startYear),
                endYear: new Date(selectedItem.endYear),
                majors: selectedItem.majors,
                idJobSeeker: selectedItem.idJobSeeker,
            }
        });
    }
    editWorkExperience = (selectedItem : IExperienceItem) => {
        this.setState({isUpdateExperiencePopupOpen:true});

        this.setState({
            selectedExperience: {
                id: selectedItem.id,
                company: selectedItem.company,
                startYear: selectedItem.startYear,
                endYear: selectedItem.endYear,
                role: selectedItem.role,
                description: selectedItem.description,
                idJobSeeker: selectedItem.idJobSeeker,
                grantedPermissions: ['']
            }
        });
    }
    editSkill = (selectedItem : ISkillItem) => {
        this.setState({isUpdateSkillPopupOpen:true});

        this.setState({
            selectedSkill: {
                id: selectedItem.id,
                skillName: selectedItem.skillName,
                idJobSeeker: selectedItem.idJobSeeker,
                grantedPermissions: ['']
            }
        });
    }
    editOrientation = (selectedItem : IOrientationItem) => {
        this.setState({isUpdateOrientationPopupOpen: true});

        this.setState({
            selectedOrientation: {
                id: selectedItem.id,
                orientationName: selectedItem.orientationName,
                idJobSeeker: selectedItem.idJobSeeker,
                grantedPermissions: ['']
            }
        });
    }
    editAchievement = (selectedItem : IAchievementItem) => {
        this.setState({isUpdateAchievementPopupOpen:true});

        this.setState({
            selectedAchievement: {
                id: selectedItem.id,
                achievementName: selectedItem.achievementName,
                idJobSeeker: selectedItem.idJobSeeker,
                year: selectedItem.year,
                organization: selectedItem.organization,
                note: selectedItem.note,
                grantedPermissions: ['']
            }
        });
    }
    //#endregion
    // delete
    showDeleteConfirm = (props : any) => {
        confirm({
          title: 'Bạn có chắc muốn xóa thông tin này không?',
          icon: <ExclamationCircleOutlined />,
          content: 'Sau khi xóa trang cá nhân sẽ không còn lưu và hiển thị thông tin này nữa.',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
              if (props.state.sectionSelectedDelete === "Học vấn")
                props.deleteEducation();
              if (props.state.sectionSelectedDelete === "Kinh nghiệm")
                {
                console.log("xóa kinh nghiệm");
                props.deleteWorkExperience();
                }
              if (props.state.sectionSelectedDelete === "Kỹ năng")
                props.deleteSkill();
              if (props.state.sectionSelectedDelete === "Định hướng")
                props.deleteOrientation();
              if (props.state.sectionSelectedDelete === "Thành tựu")
                props.deleteAchievement();
          },
          onCancel() {
            console.log('Không xóa');
          },
        });
    }

    //#region function delelte
    deleteEducation = () => {
        this.deleteEducationsByID(this.state.idItemSelectedDelete);
        message.success('Bạn đã xóa thành công một thông tin học vấn');
    }

    deleteWorkExperience = () => {
       this.deleteExperiencesByID(this.state.idItemSelectedDelete);
       message.success('Bạn đã xóa thành công một thông tin kinh nghiệm làm việc');
    }
    deleteSkill = () => {
        this.deleteSkillsByID(this.state.idItemSelectedDelete);
        message.success('Bạn đã xóa thành công một thông tin kỹ năng');
    }
    deleteOrientation = () => {
        this.deleteOrientationsByID(this.state.idItemSelectedDelete);
        message.success('Bạn đã xóa thành công một thông tin định hướng công việc');
    }
    deleteAchievement = () => {
        this.deleteAchievementByID(this.state.idItemSelectedDelete);
        message.success('Bạn đã xóa thành công một thông tin thành tựu');
    }

    //#endregion
    // edit avatar
    editAvatar = () => {
        console.log("edit ava");
    }
//#endregion

    public render() {
        //#region redirect
        if (this.state.redirect !== "")
            return <Redirect push to= {this.state.redirect}/>;
        //#endregion
        //#region initStore
        const {jobSeeker} = this.props.jobSeekerStore;
        const {review} = this.props.reviewStore;
        const {educations} = this.props.educationStore;
        const {experiences} = this.props.experienceStore;
        const {skills} = this.props.skillStore;
        const {orientations} = this.props.orientationStore;
        const {achievements} = this.props.achievementStore;
        //#endregion
        //thêm
        //#region Init layout style Modal
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
        //#endregion
        
        //#region init info dection variables
        if (jobSeeker === undefined || educations === undefined || experiences === undefined 
            || skills === undefined || orientations === undefined || achievements === undefined) 
            return (<div></div >)
        
        let numberofReview = 0;
        var rating : number = 0;
        let school : string = "";
        if (educations.items[0] === undefined) 
            school = "Chưa có";
        else 
        {
            school = educations.items[0].school.substring(0,32);
            if (educations.items[0].school.length > 32)
                school += "...";
        }

        const hpbd = jobSeeker.birthday.substr(8,2) + "/" + jobSeeker.birthday.substr(5,2) + "/" + jobSeeker.birthday.substr(0,4);
        
        let description : string = "";
        if (experiences.items[0] === undefined)
            description = "Chưa có";
        else
        {
            description = experiences.items[0].role.substring(0,32);
            if (experiences.items[0].role.length > 32) 
                description += "...";
        }

        let company : string = "";
        if (experiences.items[0] === undefined)
            company = "Chưa có";
        else
        {
            company = experiences.items[0].company.substring(0,32);
            if (experiences.items[0].company.length > 32) 
                company += "...";
        }

        if (review !== undefined)
            {
                numberofReview = review.numberOfReview;
                rating = +review.ratingStar;
            }
        
        let orientaion : string = "Chưa có";
        if (orientations.items[0] !== undefined)
        {
            orientaion = orientations.items[0].orientationName.substring(0,25);
            if (orientations.items[0].orientationName.length > 25)
                orientaion += "...";
        }
        
        const RateSection = () =>
            {
                return(
                    <div style={{marginBottom:30}}>
                        <Rate disabled={true} count={5} allowHalf={true} defaultValue={rating}></Rate>
                    </div>
                );
            }

        //#endregion
        
        //#region Section
        const EducationItems = educations.items.map((value : IEducationItem, index : number) => 
        {
            const yearstart = value.startYear.substr(0,4);
            const yearend = value.endYear.substr(0,4);
            if (index >= 3 && !this.state.isSeeAllEducation) return;
            return (                
                <div style={{margin :30}}  className="row-margin-frames">
                    <div className="study-area" style={{borderStyle:"none",backgroundColor:"whitesmoke"}}>
                        <div>
                            <h3 style={{fontSize:18}}><b>{value.school}</b></h3>
                            <h6 style={{fontSize:12, color:"GrayText"}}>{yearstart} - {yearend}</h6>
                            <h6 style={{fontSize:16}}><b>{value.majors}</b></h6>
                        </div>
                    </div>
                 </div>
            );
        })

        const SectionEducation = () => {
            let content = "Xem tất cả";
            if (this.state.isSeeAllEducation)
                content = "Xem ít hơn";
            
            const ButtonSeeAllEducation = () => {
                if (EducationItems.length <= 3)
                    return (<div></div>);
                return(
                    <div style={{justifyContent:"center", display:'flex'}}>
                        <Button className="btnXemTatCa"
                        onClick = {() => {this.setState({isSeeAllEducation : !this.state.isSeeAllEducation})}}>{content} 
                        </Button>
                    </div>
                );
            }
            return(
                <div className="section">
                    <h2 style={{height:40}}></h2>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <h2  style={{marginLeft :30,fontWeight:900, fontSize:25}} ><b>Học vấn</b></h2>
                    </div>
                    <ul>{EducationItems}</ul>
                    <ButtonSeeAllEducation></ButtonSeeAllEducation>
                    
                    <h2 style={{height:40}}></h2>
                </div>
            );
        }

        const ExperienceItems = experiences.items.map((value : IExperienceItem, index : number) => 
        {
            const yearstart = value.startYear;
            const yearend = value.endYear;
            if (index >= 3 && !this.state.isSeeAllExperience) return;
            return (                
                <div style={{margin :30}}  className="row-margin-frames">
                    <div className="study-area" style={{borderStyle:"none",backgroundColor:"whitesmoke"}}>
                        <div style={{maxWidth: "90%"}}>
                            <h3 style={{fontSize:18}}><b>{value.company}</b></h3>
                            <h6 style={{fontSize:12, color:"GrayText"}}>{yearstart} - {yearend}</h6>
                            <h6 style={{fontSize:16}}><b>{value.role}</b></h6>
                            <h6 style={{fontSize:16}}>{value.description}</h6>
                        </div>
                    </div>
                </div>
            );
        })

        const SectionWork = () => {
            let content : string = "Xem tất cả";
            if (this.state.isSeeAllExperience)
                content = "Xem ít hơn";
            
            const ButtonSeeAllWork = () => {
                if (ExperienceItems.length <= 3)
                    return (<div></div>);
                return(
                    <div style={{justifyContent:"center", display:'flex'}}>
                    <Button className="btnXemTatCa"
                    onClick = {() => {this.setState({isSeeAllExperience : !this.state.isSeeAllExperience})}}
                    >{content}</Button>
                </div>
                );
            }
            return(
                <div className="section">
                <h2 style={{height:40}}></h2>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <h2  style={{marginLeft :30,fontWeight:900, fontSize:25}} ><b>Kinh nghiệm</b></h2>
                </div>
                <ul>{ExperienceItems}</ul>
                <ButtonSeeAllWork></ButtonSeeAllWork>
                <h2 style={{height:40}}></h2>
            </div>
            );
        }

        const SkillItems = skills.items.map((value : ISkillItem, index : number) => 
        {
            if (index >= 3 && !this.state.isSeeAllSkill) return;
            return (                
                <div style={{margin :30}}  className="row-margin-frames">
                    <div className="study-area" style={{borderStyle:"none",backgroundColor:"whitesmoke"}}>
                        <div style={{maxWidth: "90%"}}>
                            <h3 style={{fontSize:18}}><b>{value.skillName}</b></h3>
                        </div>
                    </div>
                </div>
            );
        })

        const SectionSkill = () => {
            let content : string = "Xem tất cả";
            if (this.state.isSeeAllSkill)
                content = "Xem ít hơn";

            const ButtonSeeAllSkill = () => {
                if (SkillItems.length <= 3)
                    return (<div></div>);
                return (
                    <div style={{justifyContent:"center", display:'flex'}}>
                    <Button className="btnXemTatCa"
                    onClick = {() => {this.setState({isSeeAllSkill : !this.state.isSeeAllSkill})}}
                    >{content}</Button>
                </div>
                );
            }
            return(
                <div className="section">
                <h2 style={{height:40}}></h2>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <h2  style={{marginLeft :30,fontWeight:900, fontSize:25}} ><b>Kỹ năng</b></h2>
                </div>
                
                <ul>{SkillItems}</ul>
                <ButtonSeeAllSkill></ButtonSeeAllSkill>
                <h2 style={{height:40}}></h2>
            </div>
            );
        }   

        const OrientationItems = orientations.items.map((value : IOrientationItem, index : number) => 
        {
            if (index >= 3 && !this.state.isSeeAllOrientation) return;
            return (                
                <div style={{margin :30}}  className="row-margin-frames">
                    <div className="study-area" style={{borderStyle:"none",backgroundColor:"whitesmoke"}}>
                        <div style={{maxWidth: "90%"}}>
                            <h3 style={{fontSize:18}}><b>{value.orientationName}</b></h3>
                        </div>
                    </div>
                 </div>
            );
        })
        const SectionOriention = () => {
            let content : string = "Xem tất cả";
            if (this.state.isSeeAllOrientation)
                content = "Xem ít hơn";
            
            const ButtonSeeAllOriention = () => {
                if (OrientationItems.length <= 3)
                    return (<div></div>);
                return (
                    <div style={{justifyContent:"center", display:'flex'}}>
                        <Button className="btnXemTatCa"
                        onClick = {() => {this.setState({isSeeAllOrientation : !this.state.isSeeAllOrientation})}}
                        >{content}</Button>
                    </div>
                );
            }
            return(
                <div className="section">

                {/* <h2 style={{height:40}}></h2>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <h2  style={{marginLeft :30,fontWeight:900, fontSize:25}} ><b>Định hướng công việc</b></h2>
                    <div style={{marginRight: 16}}>
                        <Button className="btnUpdate" type={"default"} icon="edit" onClick={() => this.handleUpdateOrientation()} >Chỉnh sửa</Button>
                        <Button className="btnUpdate" type={"primary"} icon="plus">Thêm mới</Button> */}
                    <h2 style={{height:40}}></h2>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <h2  style={{marginLeft :30,fontWeight:900, fontSize:25}} ><b>Định hướng công việc</b></h2>
                    </div>
                    <ul>{OrientationItems}</ul>
                    <ButtonSeeAllOriention></ButtonSeeAllOriention>
                    <h2 style={{height:40}}></h2>
                </div>
                // </div>
            );
        }   

        const AchievementItems = achievements.items.map((value : IAchievementItem, index : number) => 
        {
            if (index >= 3 && !this.state.isSeeAllAchievement) return;
            return (                
                <div style={{margin :30}}  className="row-margin-frames">
                    <div className="study-area" style={{borderStyle:"none",backgroundColor:"whitesmoke"}}>
                        <div style={{maxWidth: "90%"}}>
                            <h3 style={{fontSize:18}}><b>{value.achievementName}</b></h3>
                            <h6 style={{fontSize:12, color:"GrayText"}}>{value.year}</h6>
                            <h6 style={{fontSize:16}}><b>{value.organization}</b></h6>
                            <h6 style={{fontSize:16}}>{value.note}</h6>
                        </div>
                    </div>
                </div>
            );
        })

        const SectionAchievement = () => {
            let content : string = "Xem tất cả";
            if (this.state.isSeeAllAchievement)
                content = "Xem ít hơn";
            const ButtonSeeAllAchievement = () => {
                if (AchievementItems.length <= 3)
                    return (<div></div>);
                return (
                    <div style={{justifyContent:"center", display:'flex'}}>
                    <Button className="btnXemTatCa"
                    onClick = {() => {this.setState({isSeeAllAchievement : !this.state.isSeeAllAchievement})}}
                    >{content}</Button>
                </div>
                );
            }
            return(
                 <div className="section">
                <h2 style={{height:40}}></h2>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <h2  style={{marginLeft :30,fontWeight:900, fontSize:25}} ><b>Thành tựu chứng nhận</b></h2>
                </div>
                <ul>{AchievementItems}</ul>
                <ButtonSeeAllAchievement></ButtonSeeAllAchievement>
                
                <h2 style={{height:40}}></h2>
            </div>
            );
        }   

        const InfoButton = () =>        
        {
            if (this.state.Actor === "Chủ tài khoản")
                return (<div></div>)
            return(
                <div className="column-button-info">
                    <div className="button-info">
                        <button className="button btn-invite">Mời nhận việc</button>
                        <button className="button btn-save">Lưu</button>
                        <button style={{marginRight :30}} className="button btn-message">Nhắn tin</button>
                    </div>
                </div>
            )
        }

        const SectionInfoShare = () => {
            return(
            <div>
            <footer className="row share-info row-padding">
                <div className="column-share">
                    <div className="column-link-info">
                        <h6  style={{margin :30}} >Chia sẻ trang</h6>
                          <Button shape="circle" style={{ outline: 'none'}}>
                             <Avatar style={{ height: 40, width: 40 }} shape="circle" alt={'profile'} src={fbPicture} />
                          </Button>
                          <Button style={ {marginLeft: 10, outline: 'none'} } shape="circle" >
                             <Avatar style={{ height: 40, width: 40 }} shape="circle" alt={'profile'} src={TwPicture} />
                          </Button>
                          <Button shape="circle" style={ {marginLeft: 10, outline: 'none'} }>
                             <Avatar style={{ height: 40, width: 40 }} shape="circle" alt={'profile'} src={LkPicture} />
                          </Button>
                    </div>
                <InfoButton></InfoButton>
                </div>
            </footer>
        </div>
    );
}  
    //#endregion
          
    const url_background = "https://images5.alphacoders.com/783/783174.jpg";
    let url_avata : string = "https://file.tintuckpop.net/resize/600x-/tintuckpop/2020/03/03/20200303112318-42d6-da71-8903.jpg"
    if (jobSeeker.image.length >= 10)
        url_avata = jobSeeker.image;
       
        return (
            <div style={{ margin: "auto", marginTop: "20px", width: "60%", minWidth:900 }}>
                {/* info   */}
                <div >
                    <div className="blueHeader" style={{ justifyContent:"flex-end",display:"flex", backgroundImage:"url(" + url_background  + ")"}}>
                    </div>
                    
                    <div className="whiteHeader">
                        {/* <img className="imageHeader" src={pic} alt="No"></img> */}
                        {/* <Avatar className="imageHeader" size="large" src={pic}></Avatar> */}
                        <div className="avatarJobSeeker">
                            <img className="imageHeader" src={url_avata} alt="No"></img>
                        </div>
                        <div>
                            <div className="banner" style={{marginLeft:220,marginTop:-50}}>
                                <div style={{flexDirection:"row", display:"flex", color:"GrayText", fontWeight:800, marginBottom:10, marginTop:30, justifyContent:"center"}}>
                                <img src={picLocation}
                                            alt="" style={{width:30, height:30, marginTop:-10}}/>
                                <h6 style={{fontSize:12, marginRight:15}}>
                                    <b>{jobSeeker.workLocation}</b>
                                </h6>

                                <img src={picPerson}
                                            alt="" style={{width:30, height:30, marginTop:-10}}/>
                                <h6 style={{fontSize:12, marginRight:15}}>
                                     <b>{jobSeeker.sex} 
                                  
                                     </b>
                                </h6>

                                <img src={"https://www.materialui.co/materialIcons/social/cake_grey_192x192.png"}
                                            alt="" style={{width:30, height:30, marginTop:-10}}/>
                                <h6 style={{fontSize:12, marginRight:15}}>
                                    <b>{hpbd}</b>
                                </h6>

                                </div>
                                <div> 
                                <h2 style={{fontSize:20}}>{jobSeeker.name}</h2>
                                </div>
                                <div>
                                    <h6 style={{fontSize:14}}>"{jobSeeker.description}"
                                    </h6>
                                </div>
                            </div>

                            <div style = {{justifyContent:"flex-end", display:"flex"}}>
                            <button className="buttonEditHeader" onClick={()=>{this.InviteInterview()}} style={{marginRight: 50, height:40, width:200, backgroundColor:"#39bd5a", color:"white"}}>Mời phỏng vấn</button>
                            </div>
                        </div>
                        <div className="row-padding info-form" style={{marginTop:50, marginLeft:50}}>
                            <div className="column-info-form1">
                                <div className="column">
                                    <h2>Thông tin cá nhân</h2>
                                    <div style={{fontSize:16}}> 
                                    <p>Địa chỉ: {jobSeeker.address}</p>
                                    <p>Email: {jobSeeker.email}</p>
                                    <p>Số điện thoại: {jobSeeker.phoneNumber}</p>
                                    <p>Chuyên môn: {jobSeeker.expertise}</p>
                                    <p>Lĩnh vực hoạt động: {jobSeeker.field}</p>
                                    <p>
                                        <span style={{marginRight:20}}>Facebook: <span><u><b>{jobSeeker.facebook}</b></u></span></span>
                                        <span style={{marginRight:20}}>Github: <span><u><b>{jobSeeker.github}</b></u></span></span>
                                        <span>Twitter: <span><u><b>{jobSeeker.twitter}</b></u></span></span>
                                    </p>
                                    </div>
                                </div>
                            </div>
                            <div className="column-info-form2">
                                <div className="column">
                                    <div className="rating">
                                        <h6 style={{fontSize:12, color:"GrayText"}}>{numberofReview} lượt đánh giá</h6>
                                        <h3 style={{fontSize:25, fontWeight:"bold"}}>{rating}</h3>
                                        <RateSection></RateSection>
                                        <Button className="btnUpdate" type={"primary"} style={{marginLeft : 40}} onClick={()=>{this.setState({redirect : "/comment/comment-Jobseeker/:1/:1"})}}>Viết bình luận</Button> 
                                    </div>
                                </div>
                            </div>
                            <div className="row-padding current-work-form">
                                <div className="current-form" style={{marginTop:30, marginRight:10}}>
                                    <div className="current" style={{height:80,width:150, alignItems:"center", fontSize:16,marginRight:20}}>
                                        <p className="current-content1">
                                            <img src="https://yourfaithrs.com/wp-content/uploads/2019/06/education-icon-white-png.png" 
                                            alt="" style={{width:70, marginLeft:20, marginRight:-20}}/>
                                        </p>
                        
                                        <div className="current-content2"  style={{fontSize:14, marginLeft:30}}>
                                            <h4>Học tập tại</h4>
                                            <h5 style={{fontWeight:"lighter"}}>{school}</h5>
                                        </div>
                                    </div>
                                    <div className="current" style={{height:80,width:150, alignItems:"center", fontSize:16, marginRight:20}}>
                                        <p className="current-content1">
                                            <img src={IconBag}
                                            alt="" style={{width:80, marginLeft:20, marginRight:-20}}/>
                                        </p>
                        
                                        <div className="current-content2"  style={{fontSize:14, marginLeft: 30}}>
                                            <h4>{description}</h4>
                                            <h5 style={{fontWeight:"lighter"}}>{company}</h5>
                                        </div>
                                    </div>
                                    <div className="current">
                                    <div className="current" style={{height:60,width:150, alignItems:"center", fontSize:16}}>
                                        <p className="current-content1">
                                        <img src="https://www.pngkey.com/png/full/297-2975139_conscious-aging-challenge-white-icon.png" 
                                            alt="" style={{width:60, marginLeft:20, marginRight:-20, marginTop:10}}/>
                                        </p>
                        
                                        <div className="current-content2"  style={{fontSize:14, alignContent:"center", marginTop:20, marginLeft:30}}>
                                            <h4>{orientaion}</h4>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SectionEducation></SectionEducation>
            
                {/* work */}
                <SectionWork></SectionWork>

                {/* skill */}
                <SectionSkill></SectionSkill>
                
                {/* oriented */}
                <SectionOriention></SectionOriention>

                {/* achievement */}
                <SectionAchievement></SectionAchievement>

                {/* infoshare */}
                <SectionInfoShare></SectionInfoShare>
                {/* Modal chỉnh sửa thông tin cá nhân */}
                 <CustomModal className="Custom_Modal_Out_Layout" style={{margin :10}} 
                    shadow={true}
                    type="custom"
                    title="Chỉnh sửa thông tin"
                    open={this.state.isEditJobSeekerPopupOpen}
                    closeModal={() => { this.setState({ isEditJobSeekerPopupOpen: false }); }}
                >
                <FormItem className="Fontstyle" style={{margin :20}}  label={('Họ và tên')}{...formItemLayout} >
                    <Input defaultValue={this.state.UpdatejobSeeker.name} 
                    onChange={(e) => {
                        let temp_name : string  = e.target.value;
                        this.setState({UpdatejobSeeker : {...this.state.UpdatejobSeeker, name : temp_name}});
                        }}/>
                </FormItem>
                <FormItem className="Fontstyle"  style={{margin :20}}  label={('Ngày sinh')} {...formItemLayout}>
                    <Input defaultValue={jobSeeker.birthday.substr(8,2) + "/" + jobSeeker.birthday.substr(5,2) + "/" + jobSeeker.birthday.substr(0,4)} 
                    onChange={(e) => {
                        let date : string = e.target.value;
                        let temp_birthday : string = "";
                        temp_birthday += date.substr(6,4) + "-" + date.substr(3,2) + "-" + date.substr(0,2) + "T06:26:15.053" ;
                        this.setState({UpdatejobSeeker : {...this.state.UpdatejobSeeker, birthday : temp_birthday}});
                        }}/>
                </FormItem>
                <FormItem className="Fontstyle"  style={{margin :20}}  label={('Giới tính')} {...formItemLayout}>
                    <select style={{paddingLeft: 7}} className="styleSelect" defaultValue={jobSeeker.sex} 
                    onChange={(e) => {
                        let temp_sex : string  = e.target.value;
                        this.setState({UpdatejobSeeker : {...this.state.UpdatejobSeeker, sex : temp_sex}});
                        }}
                    >
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                </FormItem>
                <FormItem className="Fontstyle"  style={{margin :15}}  label={('Nơi làm việc')} {...formItemLayout}>
                    <Input defaultValue={jobSeeker.workLocation}
                    onChange={(e) => {
                        let tempworkLocation : string  = e.target.value;
                        this.setState({UpdatejobSeeker : {...this.state.UpdatejobSeeker, workLocation : tempworkLocation}});
                        }}/>
                </FormItem>
                <FormItem className="Fontstyle" style={{margin :15}}  label={('Dòng giới thiệu')} {...formItemLayout}>
                    <Input  defaultValue={jobSeeker.description} 
                    onChange={(e) => {
                        let tempdescription : string  = e.target.value;
                        this.setState({UpdatejobSeeker : {...this.state.UpdatejobSeeker, description : tempdescription}});
                        }}/>
                </FormItem>
                <FormItem className="Fontstyle"  style={{margin :15}}  label={('Địa chỉ')} {...formItemLayout}>
                    <Input defaultValue={jobSeeker.address} 
                    onChange={(e) => {
                        let temp_address : string  = e.target.value;
                        this.setState({UpdatejobSeeker : {...this.state.UpdatejobSeeker, address : temp_address}});
                        }}/>
                </FormItem>
                <FormItem className="Fontstyle"  style={{margin :15}}  label={('Email liên hệ')} {...formItemLayout}>
                    <Input defaultValue={jobSeeker.email}
                    onChange={(e) => {
                        let temp_email : string  = e.target.value;
                        this.setState({UpdatejobSeeker : {...this.state.UpdatejobSeeker, email : temp_email}});
                        }}/>
                </FormItem>
                <FormItem className="Fontstyle"  style={{margin :15}}  label={('Số điện thoại')} {...formItemLayout}>
                    <Input defaultValue={jobSeeker.phoneNumber} 
                    onChange={(e) => {
                        let temp_phoneNumber : string  = e.target.value;
                        this.setState({UpdatejobSeeker : {...this.state.UpdatejobSeeker, phoneNumber : temp_phoneNumber}});
                        }}/>
                </FormItem>
                <FormItem className="Fontstyle"  style={{margin :15}}  label={('Chuyên môn')} {...formItemLayout}>
                    <Input defaultValue={jobSeeker.expertise}  
                    onChange={(e) => {
                        let temp_expertise : string  = e.target.value;
                        this.setState({UpdatejobSeeker : {...this.state.UpdatejobSeeker, expertise : temp_expertise}});
                        }} />
                </FormItem>
                <FormItem  className="Fontstyle" style={{margin :15}}  label={('Lĩnh vực hoạt động')} {...formItemLayout}>
                    <Input defaultValue={jobSeeker.field}   
                    onChange={(e) => {
                        let temp_field : string  = e.target.value;
                        this.setState({UpdatejobSeeker : {...this.state.UpdatejobSeeker, field : temp_field}});
                        }} />
                </FormItem>
                <FormItem className="Fontstyle"  style={{margin :15, alignContent:'left'}}  label={('Facebook')} {...formItemLayout}>
                    <Input  defaultValue={jobSeeker.facebook} 
                     onChange={(e) => {
                        let temp_facebook : string  = e.target.value;
                        this.setState({UpdatejobSeeker : {...this.state.UpdatejobSeeker, facebook : temp_facebook}});
                        }}/>
                </FormItem>
                <FormItem className="Fontstyle"  style={{margin :15, alignContent:'left'}}  label={('Github')} {...formItemLayout}>
                    <Input  defaultValue={jobSeeker.github}  
                    onChange={(e) => {
                        let temp_github : string  = e.target.value;
                        this.setState({UpdatejobSeeker : {...this.state.UpdatejobSeeker, github : temp_github}});
                        }}/>
                </FormItem>
                <FormItem className="Fontstyle"  style={{margin :15}}  label={('Twitter')} {...formItemLayout}>
                    <Input defaultValue={jobSeeker.twitter} 
                     onChange={(e) => {
                        let temp_twitter : string  = e.target.value;
                        this.setState({UpdatejobSeeker : {...this.state.UpdatejobSeeker, twitter : temp_twitter}});
                        }}/>
                </FormItem>
                    <div style={{margin :15}}  className="Custom_Modal_Footer">
                        <div style={{ display: "flex"}  } >
                                <button style={{margin :20}}  className="Simple_White_Button"  onClick={() => {  this.setState({ isEditJobSeekerPopupOpen: false }) }} >Hủy thay đổi</button>
                                <button style={{margin :20}}  className="Simple_Blue_Button" 
                                    
                                    onClick={() => {
                                        this.UpdateJobSeekerInput(); 
                                        if (this.state.Error === "")
                                        this.setState({ isEditJobSeekerPopupOpen: false })}}>Lưu thay đổi</button>
                        </div>
                    </div>
            </CustomModal>

            {/* Modal chỉnh sửa học vấn */}
            <ModalEducation className="Custom_Modal_Out_Layout3" style={{margin :10}} 
                    shadow={true}
                    type="custom"
                    title="Chỉnh sửa học vấn"
                    open={this.state.isUpdateEducationPopupOpen}
                    closeModal={() => { this.setState({ isUpdateEducationPopupOpen: false }); }}
                >
                <Form.Item className="Fontstyle3" style={{margin :20}}  label={('Trường')} >
                    <Input defaultValue={this.state.selectedEducation.school}
                     onChange={(e) => {
                        let temp : string  = e.target.value;
                        this.setState({selectedEducation : {...this.state.selectedEducation, school: temp}});
                        }}/>
                </Form.Item> 
                <Row>
                    <Col span={12}>
                        <Form.Item className="Fontstyle3" style={{margin :20}}  label={('Năm bắt đầu')} >
                            <Input defaultValue={this.state.selectedEducation.startYear.toISOString().substr(0,4)}
                                                 onChange={(e) => {
                                                    let temp : string  = e.target.value;
                                                    if (temp.length === 4)
                                                    this.setState({selectedEducation : {...this.state.selectedEducation, startYear: new Date(temp + "-12-09T13:30:30.432")}});
                                                    }}/>
                        </Form.Item>  
                    </Col>
                    <Col span={12}>
                        <Form.Item className="Fontstyle3"  style={{margin :20}}  label={('Năm kết thúc')} >
                            <Input defaultValue={this.state.selectedEducation.endYear.toISOString().substr(0,4)}
                                                                             onChange={(e) => {
                                                                                let temp : string  = e.target.value;
                                                                                if (temp.length === 4)
                                                                                this.setState({selectedEducation : {...this.state.selectedEducation, startYear: new Date(temp + "-12-09T13:30:30.432")}});
                                                                                }}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item className="Fontstyle3"  style={{margin :20}}  label={('Ngành')} >
                    <Input defaultValue={this.state.selectedEducation.majors}
                                                                     onChange={(e) => {
                                                                        let temp : string  = e.target.value;
                                                                        this.setState({selectedEducation : {...this.state.selectedEducation, majors: temp}});
                                                                        }}/>
                </Form.Item>
                 <div style={{margin :20}}  className="Custom_Modal_Footer3">
                        <div style={{ display: "flex"}  } >
                                <button style={{margin :20}}  className="Simple_White_Button3"  onClick={() => {  this.setState({ isUpdateEducationPopupOpen: false }) }} >Hủy bỏ</button>
                                <button style={{margin :20}}  className="Simple_Blue_Button3" onClick={() => {this.UpdateEducation(); this.setState({ isUpdateEducationPopupOpen: false })}}>Hoàn tất</button>
                        </div>
                    </div>
            </ModalEducation>

            {/* Modal chỉnh sửa kinh nghiệm */}
            <ModalAchievement className="Custom_Modal_Out_Layout1" style={{margin :10}} 
                    shadow={true}
                    type="custom"
                    title="Chỉnh sửa kinh nghiệm"
                    open={this.state.isUpdateExperiencePopupOpen}
                    closeModal={() => { this.setState({ isUpdateExperiencePopupOpen: false }); }}
                >
                <Row>
                    <Col span={12}>
                        <Form.Item className="Fontstyle1" style={{margin :20}}  label={('Tên công ty')} >
                            <Input defaultValue={this.state.selectedExperience.company}
                                                 onChange={(e) => {
                                                    let temp : string  = e.target.value;
                                                    this.setState({selectedExperience : {...this.state.selectedExperience, company: temp}});
                                                    }}/>
                        </Form.Item> 
                        <Row>
                            <Col span={12}>
                                <Form.Item className="Fontstyle1" style={{margin :20}}  label={('Năm bắt đầu')} >
                                    <Input defaultValue={this.state.selectedExperience.startYear}
                                                         onChange={(e) => {
                                                            let temp : string  = e.target.value;
                                                            this.setState({selectedExperience : {...this.state.selectedExperience, startYear: +temp}});
                                                            }}/>
                                </Form.Item> 
                            </Col>
                            <Col span={12}>
                                <Form.Item className="Fontstyle1" style={{margin :20}}  label={('Năm kết thúc')} >
                                    <Input defaultValue={this.state.selectedExperience.endYear} onChange={(e) => {
                                                            let temp : string  = e.target.value;
                                                            this.setState({selectedExperience : {...this.state.selectedExperience, endYear: +temp}});
                                                            }}/>
                                </Form.Item> 
                            </Col>
                        </Row>
                        <Form.Item className="Fontstyle1" style={{margin :20}}  label={('Vị trí')} >
                            <Input defaultValue={this.state.selectedExperience.role} onChange={(e) => {
                                                            let temp : string  = e.target.value;
                                                            this.setState({selectedExperience : {...this.state.selectedExperience, role: temp}});
                                                            }}/>
                        </Form.Item>  
                    </Col>
                    <Col span={12}>
                        <Form.Item className="Fontstyle1" style={{margin :20}}  label={('Mô tả')} >
                            <Input className="Input4" defaultValue={this.state.selectedExperience.description}
                            onChange={(e) => {
                                let temp : string  = e.target.value;
                                this.setState({selectedExperience : {...this.state.selectedExperience, description: temp}});
                                }}/>
                        </Form.Item>
                    </Col>
                </Row>
    
                 <div style={{margin :20}}  className="Custom_Modal_Footer2">
                        <div style={{ display: "flex"}  } >
                                <button  className="Simple_White_Button2" onClick={() => {  this.setState({ isUpdateExperiencePopupOpen: false }) }} >Hủy bỏ</button>
                                <button  className="Simple_Blue_Button2" onClick={() => {this.UpdateExperience(); this.setState({ isUpdateExperiencePopupOpen: false })}}>Hoàn tất</button>
                        </div>
                    </div>
            </ModalAchievement>

            {/* Modal chỉnh sửa định hướng công việc */}
            <ModalEducation className="Custom_Modal_Out_Layout3" style={{margin :10}} 
                    shadow={true}
                    type="custom"
                    title="Chỉnh sửa định hướng công việc"
                    open={this.state.isUpdateOrientationPopupOpen}
                    closeModal={() => { this.setState({ isUpdateOrientationPopupOpen: false }); }}
                >
                <Form.Item className="Fontstyle3" style={{margin :20}}  label={('Định hướng công việc')} >
                    <Input defaultValue={this.state.selectedOrientation.orientationName}
                      onChange={(e) => {
                        let temp : string  = e.target.value;
                        this.setState({selectedOrientation : {...this.state.selectedOrientation, orientationName: temp}});
                        }}/>
                </Form.Item> 

                {/* <Form.Item className="Fontstyle1"  style={{margin :20}}  label={('Mô tả')} >
                    <Input className="Input" /> 
                </Form.Item> */}
                 <div style={{margin :20}}  className="Custom_Modal_Footer3">
                        <div style={{ display: "flex"}  } >
                                <button   className="Simple_White_Button3"  onClick={() => {  this.setState({ isUpdateOrientationPopupOpen: false }) }} >Hủy bỏ</button>
                                <button className="Simple_Blue_Button3" onClick={() => {this.UpdateOrientation();this.setState({ isUpdateOrientationPopupOpen: false })}}>Hoàn tất</button>
                        </div>
                    </div>
            </ModalEducation>
            {/* Modal chỉnh sửa kỹ năng */}
            <ModalEducation className="Custom_Modal_Out_Layout3" style={{margin :10}} 
                    shadow={true}
                    type="custom"
                    title="Chỉnh sửa kỹ năng"
                    open={this.state.isUpdateSkillPopupOpen}
                    closeModal={() => { this.setState({ isUpdateSkillPopupOpen: false }); }}
                >
                <Form.Item className="Fontstyle3"  style={{margin :20}}  label={('Kỹ năng')} >
                    <Input defaultValue={this.state.selectedSkill.skillName}
                      onChange={(e) => {
                        let temp : string  = e.target.value;
                        this.setState({selectedSkill : {...this.state.selectedSkill, skillName: temp}});
                        }}/>
                </Form.Item>
                 <div style={{margin :20}} className="Custom_Modal_Footer3">
                        <div style={{ display: "flex"}  } >
                                <button className="Simple_White_Button3" onClick={() => {  this.setState({ isUpdateSkillPopupOpen: false }) }} >Hủy bỏ</button>
                                <button className="Simple_Blue_Button3" onClick={() => {this.UpdateSkill(); this.setState({ isUpdateSkillPopupOpen: false })}}>Hoàn tất</button>
                        </div>
                    </div>
            </ModalEducation>

            {/* Modal chỉnh sửa thành tựu */}
            <ModalAchievement className="Custom_Modal_Out_Layout2" style={{margin :10}} 
                    shadow={true}
                    type="custom"
                    title="Chỉnh sửa thành tựu, chứng nhận"
                    open={this.state.isUpdateAchievementPopupOpen}
                    closeModal={() => { this.setState({ isUpdateAchievementPopupOpen: false }); }}
                >
                <Row>
                    <Col span={12}>
                        <Form.Item className="Fontstyle2" style={{margin :20}}  label={('Tên thành tự, chứng nhận')} >
                            <Input defaultValue={this.state.selectedAchievement.achievementName}
                              onChange={(e) => {
                                let temp : string  = e.target.value;
                                this.setState({selectedAchievement : {...this.state.selectedAchievement, achievementName: temp}});
                                }}/>
                        </Form.Item> 

                        <Form.Item className="Fontstyle2" style={{margin :20}}  label={('Tổ chức')} >
                            <Input defaultValue={this.state.selectedAchievement.organization}                              
                                onChange={(e) => {
                                let temp : string  = e.target.value;
                                this.setState({selectedAchievement : {...this.state.selectedAchievement, organization : temp}});
                                }}/>
                        </Form.Item>
                        <Form.Item className="Fontstyle2" style={{margin :20}}  label={('Thời điểm đạt được')} >
                            <Input defaultValue={this.state.selectedAchievement.year}
                                                            onChange={(e) => {
                                                                let temp : string  = e.target.value;
                                                                this.setState({selectedAchievement : {...this.state.selectedAchievement, year : +temp}});
                                                                }}/>
                        </Form.Item>  
                    </Col>
                    <Col span={12}>
                        <Form.Item className="Fontstyle2"  style={{margin :20}}  label={('Mô tả')} >
                            <Input className="Input2" defaultValue={this.state.selectedAchievement.note}
                                                            onChange={(e) => {
                                                                let temp : string  = e.target.value;
                                                                this.setState({selectedAchievement : {...this.state.selectedAchievement, note : temp}});
                                                                }}/> 
                        </Form.Item>
                    </Col>
                </Row>
    
                 <div style={{margin :20}}  className="Custom_Modal_Footer2">
                        <div style={{ display: "flex"}  } >
                            {/* <button className="Simple_Blue_Button margin_right_5px" onClick={() => this.handlerAddjobSeekerConfirmation()}>OK</button> */}
                             
                                {/* <button className="Simple_White_Button" onClick={() => { this.setState({ isAddjobSeekerPopupOpen: false }) }}>Cancel</button> */}
                                 <button style={{margin :20}}  className="Simple_White_Button2"  onClick={() => {  this.setState({ isUpdateAchievementPopupOpen: false }) }} >Hủy bỏ</button>
                                <button style={{margin :20}}  className="Simple_Blue_Button2" onClick={() => {this.UpdateAchievement(); this.setState({ isUpdateAchievementPopupOpen: false })}}>Hoàn tất</button>
                        </div>
                    </div>
            </ModalAchievement>
            <ModalEducation className="Custom_Modal_Out_Layout3" style={{margin :10}} 
                    shadow={true}
                    type="custom"
                    title="Thêm học vấn"
                    open={this.state.isAddEducationPopupOpen}
                    closeModal={() => { this.setState({ isAddEducationPopupOpen: false }); }}
                >
                <Form.Item className="Fontstyle3"  label={('Trường')} >
                    <Input  onChange={(e) => {
                                                    let temp : string  = e.target.value;
                                                    this.setState({selectedEducation : {...this.state.selectedEducation, school: temp}});
                                                    }}/>
                </Form.Item> 
                <Row>
                    <Col span={12}>
                        <Form.Item className="Fontstyle3"  label={('Năm bắt đầu')} >
                            <Input  onChange={(e) => {
                                                    let temp : string  = e.target.value;
                                                    if (temp.length === 4)
                                                    this.setState({selectedEducation : {...this.state.selectedEducation, startYear: new Date(temp + "-12-09T13:30:30.432")}});
                                                    }}/>
                        </Form.Item>  
                    </Col>
                    <Col span={12}>
                        <Form.Item className="Fontstyle3"  label={('Năm kết thúc')} >
                            <Input  onChange={(e) => {
                                                    let temp : string  = e.target.value;
                                                    if (temp.length === 4)
                                                    this.setState({selectedEducation : {...this.state.selectedEducation, endYear: new Date(temp + "-12-09T13:30:30.432")}});
                                                    }}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item className="Fontstyle3"  label={('Ngành')} >
                    <Input  onChange={(e) => {
                                                    let temp : string  = e.target.value;
                                                    this.setState({selectedEducation : {...this.state.selectedEducation, majors: temp}});
                                                    }}/>
                </Form.Item>
                 <div style={{margin :20}}  className="Custom_Modal_Footer3">
                        <div style={{ display: "flex"}  } >
                                <button style={{margin :20}}  className="Simple_White_Button3"  onClick={() => {  this.setState({ isAddEducationPopupOpen: false }) }} >Hủy bỏ</button>
                                <button style={{margin :20}}  className="Simple_Blue_Button3" onClick={() => {this.AddEducation(); this.setState({ isAddEducationPopupOpen: false })}}>Hoàn tất</button>
                        </div>
                    </div>
            </ModalEducation>

            {/* Modal chỉnh sửa kinh nghiệm */}
            <ModalAchievement className="Custom_Modal_Out_Layout2" style={{margin :10}} 
                    shadow={true}
                    type="custom"
                    title="Thêm kinh nghiệm"
                    open={this.state.isAddExperiencePopupOpen}
                    closeModal={() => { this.setState({ isAddExperiencePopupOpen: false }); }}
                >
                <Row>
                    <Col span={12}>
                        <Form.Item className="Fontstyle2" style={{margin :20}}  label={('Tên công ty')} >
                            <Input onChange={(e) => {
                                                    let temp : string  = e.target.value;
                                                    this.setState({selectedExperience : {...this.state.selectedExperience, company: temp}});
                                                    }}/>
                        </Form.Item> 
                        <Row>
                            <Col span={12}>
                                <Form.Item className="Fontstyle2" style={{margin :20}}  label={('Năm bắt đầu')} >
                                    <Input onChange={(e) => {
                                                    let temp : string  = e.target.value;
                                                    this.setState({selectedExperience : {...this.state.selectedExperience, startYear: +temp}});
                                                    }}/>
                                </Form.Item> 
                            </Col>
                            <Col span={12}>
                                <Form.Item className="Fontstyle2" style={{margin :20}}  label={('Năm kết thúc')} >
                                    <Input onChange={(e) => {
                                                    let temp : string  = e.target.value;
                                                    this.setState({selectedExperience : {...this.state.selectedExperience, endYear: +temp}});
                                                    }}/>
                                </Form.Item> 
                            </Col>
                        </Row>
                        <Form.Item className="Fontstyle2" style={{margin :20}}  label={('Vị trí')} >
                            <Input onChange={(e) => {
                                                    let temp : string  = e.target.value;
                                                    this.setState({selectedExperience : {...this.state.selectedExperience, role: temp}});
                                                    }}/>
                        </Form.Item>  
                    </Col>
                    <Col span={12}>
                        <Form.Item className="Fontstyle2"  style={{margin :20}}  label={('Mô tả')} >
                            <Input className="Input4" onChange={(e) => {
                                                    let temp : string  = e.target.value;
                                                    this.setState({selectedExperience : {...this.state.selectedExperience, description: temp}});
                                                    }}/>
                        </Form.Item>
                    </Col>
                </Row>
    
                 <div style={{margin :20}}  className="Custom_Modal_Footer2">
                        <div style={{ display: "flex"}  } >
                                <button   className="Simple_White_Button2"  onClick={() => {  this.setState({ isAddExperiencePopupOpen: false }) }} >Hủy bỏ</button>
                                <button  className="Simple_Blue_Button2" onClick={() => {this.AddExperience(); this.setState({ isAddExperiencePopupOpen: false })}}>Hoàn tất</button>
                        </div>
                    </div>
            </ModalAchievement>

            <ModalEducation className="Custom_Modal_Out_Layout3" style={{margin :10}} 
                    shadow={true}
                    type="custom"
                    title="Thêm kỹ năng"
                    open={this.state.isAddSkillPopupOpen}
                    closeModal={() => { this.setState({ isAddSkillPopupOpen: false }); }}
                >
                <Form.Item className="Fontstyle3"  style={{margin :20}}  label={('Kỹ năng')} >
                    <Input onChange={(e) => {
                                                    let temp : string  = e.target.value;
                                                    this.setState({selectedSkill : {...this.state.selectedSkill, skillName: temp}});
                                                    }}/>
                </Form.Item>
                 <div style={{margin :20}}  className="Custom_Modal_Footer3">
                        <div style={{ display: "flex"}  } >
                                <button style={{margin :20}}  className="Simple_White_Button3"  onClick={() => {  this.setState({ isAddSkillPopupOpen: false }) }} >Hủy bỏ</button>
                                <button style={{margin :20}}  className="Simple_Blue_Button3" onClick={() => {this.AddSkill(); this.setState({ isAddSkillPopupOpen: false })}}>Hoàn tất</button>
                        </div>
                    </div>
            </ModalEducation>

            <ModalEducation className="Custom_Modal_Out_Layout3" style={{margin :10}} 
                    shadow={true}
                    type="custom"
                    title="Thêm định hướng công việc"
                    open={this.state.isAddOrientationPopupOpen}
                    closeModal={() => { this.setState({ isAddOrientationPopupOpen: false }); }}
                >
                <Form.Item className="Fontstyle3" style={{margin :20}}  label={('Định hướng công việc')} >
                    <Input onChange={(e) => {
                                                    let temp : string  = e.target.value;
                                                    this.setState({selectedOrientation : {...this.state.selectedOrientation, orientationName: temp}});
                                                    }}/>
                </Form.Item> 

                <Form.Item className="Fontstyle3"  style={{margin :20}}  label={('Mô tả')} >
                    <Input className="Input" /> 
                </Form.Item>
                 <div style={{margin :20}}  className="Custom_Modal_Footer3">
                        <div style={{ display: "flex"}  } >
                                <button style={{margin :20}}  className="Simple_White_Button3"  onClick={() => {  this.setState({ isAddOrientationPopupOpen: false }) }} >Hủy bỏ</button>
                                <button style={{margin :20}}  className="Simple_Blue_Button3" onClick={() => {this.AddOrientation(); this.setState({ isAddOrientationPopupOpen: false })}}>Hoàn tất</button>
                        </div>
                    </div>
            </ModalEducation>

            <ModalAchievement className="Custom_Modal_Out_Layout2" style={{margin :10}} 
                    shadow={true}
                    type="custom"
                    title="Thêm thành tựu, chứng nhận"
                    open={this.state.isAddAchievementPopupOpen}
                    closeModal={() => { this.setState({ isAddAchievementPopupOpen: false }); }}
                >
                <Row>
                    <Col span={12}>
                        <Form.Item className="Fontstyle2" style={{margin :20}}  label={('Tên thành tự, chứng nhận')} >
                            <Input onChange={(e) => {
                                                    let temp : string  = e.target.value;
                                                    this.setState({selectedAchievement : {...this.state.selectedAchievement, achievementName: temp}});
                                                    }}/>
                        </Form.Item> 

                        <Form.Item className="Fontstyle2" style={{margin :20}}  label={('Lĩnh vực')} >
                            <Input onChange={(e) => {
                                                    let temp : string  = e.target.value;
                                                    this.setState({selectedAchievement : {...this.state.selectedAchievement, organization: temp}});
                                                    }}/>
                        </Form.Item>
                        <Form.Item className="Fontstyle2" style={{margin :20}}  label={('Thời điểm đạt được')} >
                            <Input onChange={(e) => {
                                                    let temp : string  = e.target.value;
                                                    this.setState({selectedAchievement : {...this.state.selectedAchievement, year: +temp}});
                                                    }}/>
                        </Form.Item>  
                    </Col>
                    <Col span={12}>
                        <Form.Item className="Fontstyle2"  style={{margin :20}}  label={('Mô tả')} >
                            <Input className="Input2" onChange={(e) => {
                                                    let temp : string  = e.target.value;
                                                    this.setState({selectedAchievement : {...this.state.selectedAchievement, note: temp}});
                                                    }}/>
                        </Form.Item>
                    </Col>
                </Row>
    
                 <div style={{margin :20}}  className="Custom_Modal_Footer2">
                        <div style={{ display: "flex"}  } >
                                <button style={{margin :20}}  className="Simple_White_Button2"  onClick={() => {  this.setState({ isAddAchievementPopupOpen: false }) }} >Hủy bỏ</button>
                                <button style={{margin :20}}  className="Simple_Blue_Button2" onClick={() => {this.AddAchievement(); this.setState({ isAddAchievementPopupOpen: false })}}>Hoàn tất</button>
                        </div>
                    </div>
            </ModalAchievement>
            </div >
        );
    }

    //#region funtions
    handlerAddJobTypeConfirmation = () => {

         this.setState({ isAddJobSeekerPopupOpen: false });
    }

    async getJobSeekerByID(id1 : number) {
        let dto: EntityDto = {
            id: id1,
        }
        await this.props.jobSeekerStore.getJobSeekerByID(dto);
    }

    async getReviewByID(id1 : number) {
        let dto: EntityDto = {
            id: id1,
        }
        await this.props.reviewStore.getReviewByID(dto);
    }

    async getEducationsByID(id1 : number) {
        let dto: EntityDto = {
            id: id1,
        }
        await this.props.educationStore.getAllEducationByID(dto);
    }

    async UpdateEducation() {
        await this.props.educationStore.update(this.state.selectedEducation);
    }

    async UpdateExperience() {
        console.log(this.state.selectedExperience);
        await this.props.experienceStore.update(this.state.selectedExperience);
    }

    async UpdateSkill() {
        await this.props.skillStore.update(this.state.selectedSkill);
    }

    async UpdateOrientation() {
        await this.props.orientationStore.update(this.state.selectedOrientation);
    }

    async UpdateAchievement() {
        await this.props.achievementStore.update(this.state.selectedAchievement);
    }

    async AddEducation() {
        let input : CreateEducationInput = {
            name: "Học vấn",
            school: this.state.selectedEducation.school,
            startYear: this.state.selectedEducation.startYear,
            endYear: this.state.selectedEducation.endYear,
            majors: this.state.selectedEducation.majors,
            idJobSeeker: this.state.selectedEducation.idJobSeeker,
        } 
        await this.props.educationStore.createEducation(input);
    }

    async AddExperience() {
        let input : CreateExperienceInput = {
            company: this.state.selectedExperience.company,
            startYear: this.state.selectedExperience.startYear,
            endYear: this.state.selectedExperience.endYear,
            role: this.state.selectedExperience.role,
            description: this.state.selectedExperience.description,
            idJobSeeker: this.state.selectedExperience.idJobSeeker,
            grantedPermissions: ['']
        } 
        console.log(this.state.selectedExperience);
        await this.props.experienceStore.createExperience(input);
    }

    async AddSkill() {
        let input : CreateSkillInput = {
            skillName: this.state.selectedSkill.skillName,
            idJobSeeker: this.state.selectedSkill.idJobSeeker,
            grantedPermissions: ['']
        } 
        await this.props.skillStore.createSkill(input);
    }

    async AddOrientation() {
        let input : CreateOrientationInput = {
            orientationName: this.state.selectedOrientation.orientationName,
            idJobSeeker: this.state.selectedOrientation.idJobSeeker,
            grantedPermissions: ['']
        } 
        await this.props.orientationStore.createOrientation(input);
    }

    async AddAchievement() {
        let input : CreateAchievementInput = {
            achievementName: this.state.selectedAchievement.achievementName,
            idJobSeeker: this.state.selectedAchievement.idJobSeeker,
            year: this.state.selectedAchievement.year,
            organization: this.state.selectedAchievement.organization,
            note: this.state.selectedAchievement.note,
            grantedPermissions: ['']
        } 
        await this.props.achievementStore.createAchievement(input);
    }

    async deleteEducationsByID(id1 : number) {
        let dto: EntityDto = {
            id: id1,
        }
        await this.props.educationStore.deleteEducation(dto);
    }

    async getAllExperiencesByID(id1 : number) {
        let dto: EntityDto = {
            id: id1,
        }
        await this.props.experienceStore.getAllExperienceByID(dto);
    }

    async deleteExperiencesByID(id1 : number) {
        let dto: EntityDto = {
            id: id1,
        }
        await this.props.experienceStore.deleteExperience(dto);
    }

    async getAllSkillsByID(id1 : number) {
        let dto: EntityDto = {
            id: id1,
        }
        await this.props.skillStore.getAllSkillByID(dto);
    }

    async deleteSkillsByID(id1 : number) {
        let dto: EntityDto = {
            id: id1,
        }
        await this.props.skillStore.deleteSkill(dto);
    }

    async getAllOrientationsByID(id1 : number) {
        let dto: EntityDto = {
            id: id1,
        }
        await this.props.orientationStore.getAllOrientationByID(dto);
    }

    async deleteOrientationsByID(id1 : number) {
        let dto: EntityDto = {
            id: id1,
        }
        await this.props.orientationStore.deleteOrientation(dto);
    }

    async getAllAchievementByID(id1 : number) {
        let dto: EntityDto = {
            id: id1,
        }
        await this.props.achievementStore.getAllAchievementByID(dto);
    }

    async deleteAchievementByID(id1 : number) {
        let dto: EntityDto = {
            id: id1,
        }
        await this.props.achievementStore.deleteAchievement(dto);
    }

    handlerVerifyEditJobTypeConfirmation = () => {

    }

    handlerVerifyDeleteJobTypeConfirmation = () => {
        let dto: EntityDto = {
            id: this.state.selectedID
        }
        this.props.jobSeekerStore.deleteJobSeeker(dto);
        this.setState({ isVerifyDeletePopupOpen: false });
    }
    //#endregion
}