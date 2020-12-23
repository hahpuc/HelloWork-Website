import React from 'react'

import '../../styles.less'
import './CompanyInfoList.less'
import "../../components/CompanyInfo/CustomModal/CustomModal.less"
import { inject, observer } from 'mobx-react';

//import CustomModal from 'app/shared/components/CustomModal/CustomModal'
import AppComponentBase from 'app/shared/components/AppComponentBase';
import Stores from 'app/shared/stores/storeIdentifier';
import recruitmentPostStore,{IRecruitmentPostItem} from "../../../group9/stores/recruitmentPostStore"
import CompanyInfoStore, { UpdateCompanyInfoItem } from 'app/groups/group1/stores/CompanyInfoStore';
//import { CreateCompanyInfoInput } from '../../services/dto/CompanyInfoDTO/createOrUpdateCompanyInfoInput';
// import {GetCompanyInfoByIdOutput} from '../../services/dto/CompanyInfoDTO/getCompanyInfoByIdOutPut'
// import { UpdateCompanyInfoInput } from '../../services/dto/CompanyInfoDTO/createOrUpdateCompanyInfoInput';
import { EntityDto } from 'shared/services/dto/entityDto';
//import { Card } from '@material-ui/core';
//import Name_Slogan from 'app/groups/group1/components/CompanyInfo/Name_Slogan'
import fbPicture from 'assets/images/Facebook.png';
import TwPicture from 'assets/images/Twitter.png';
import LkPicture from 'assets/images/LinkedIn.png';
import { Button, Rate, Avatar,Tag, Input} from "antd";
import FormItem from 'antd/lib/form/FormItem';
import CustomModal from '../../components/CompanyInfo/CustomModal/CustomModal'
import picLocation from 'assets/images/LocationIcon.png'; 
import { Redirect } from 'react-router';

export interface ICompanyInfoProps {
    CompanyInfoStore: CompanyInfoStore;
    recruitmentPostStore: recruitmentPostStore;
}

export interface ICompanyInfoState {
    Actor:string;
    modalVisible: boolean;
    selectedID: number;
    updateCompany:UpdateCompanyInfoItem;
    companyID: number;
    isAnyItemClicked: boolean;
    isAddCompanyInfoPopupOpen: boolean;
    CompanyInfoName: string,
    CompanyInfoDesc: string,
    isEditCompanyInfoPopupOpen: boolean,
    isEditCompanyCoverImagePopupOpen: boolean,
    isVerifyDeletePopupOpen: boolean,
    isSeeAllRecruitmentPost:boolean,
    redirect:string;
}


@inject(Stores.CompanyInfoStore)
@inject(Stores.recruitmentPostStore)
@observer
export default class CompanyInfoListSEEKER extends AppComponentBase<ICompanyInfoProps, ICompanyInfoState> {

    formRef: any;


    constructor(props: any) {
        super(props);
        this.state =
        {
            Actor: "Khách",
            modalVisible: false,
            selectedID: 1,
            updateCompany:{
                name: "",
                address: "",
                email: "",
                phoneNumber: "",
                website: "",
                expertise: "",
                headcountLimit: 1,
                id: 1,
                describe:"",
                province:""
            },
            isAnyItemClicked: false,
            isAddCompanyInfoPopupOpen: false,
            CompanyInfoName: "",
            CompanyInfoDesc: "",
            isEditCompanyInfoPopupOpen: false,
            isEditCompanyCoverImagePopupOpen: false,
            isVerifyDeletePopupOpen: false,
            companyID: 1,
            isSeeAllRecruitmentPost:false,
            redirect:"",
        }

    }
    idCompany=1;
    linkName="";
    idRecuiter=1;
    async componentDidMount() {
        await this.getAllRecruitment();
        await this.getCompanyInfoById();
        await this.getRecruiterInfoByID();
    }

    Modal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };
    async getCompanyInfoById () {
        
        const pathArray = window.location.pathname.split('/');
        this.linkName = pathArray[pathArray.length - 1];
        const pathLast = pathArray[pathArray.length - 1].split('=');
        this.idCompany =  Number(pathLast[pathLast.length - 1]);
        let dto:EntityDto={ id:this.idCompany}
        await this.props.CompanyInfoStore.getCompanyInfoByID(dto);
    }
    async getRecruiterInfoByID() {
        let dto: EntityDto =
        {
            id: this.state.selectedID,
        }
        this.props.CompanyInfoStore.getRecruiterInfoByID(dto);
    }
    async getAllRecruitment() {
      await  this.props.recruitmentPostStore.getAllByUserID(this.state.selectedID);
    }
    handleDelete = () => {

    }

    closeAllSelectedItem = () => {

    }

    handleEdit = () => {

    }

    handleEditCoverImage = () => {

    }

    handleItemClicked = (id: number) => {

    }

    // async UpdateModalOpen(entityDto: EntityDto) {
    //     await this.props.CompanyInfoStore.getCompanyInfoByID(entityDto);
    //     this.setState({ selectedID: entityDto.id });
    //     this.Modal();
    //     if (entityDto.id !== 0) {
    //         this.formRef.props.form.setFieldsValue({
    //           ...this.props.CompanyInfoStore.CompanyInfo,
    //         });
    //       } else {
    //         this.formRef.props.form.resetFields();
    //       }
    //     }

    // handleCreate = () => {
    //     const form = this.formRef.props.form;
    
    //     form.validateFields(async (err: any, values: any) => {
    //       if (err) {
    //         return;
    //       } else {
    //           await this.props.CompanyInfoStore.update({ id: this.state.selectedID, ...values });
    //         }
    
    //     //await this.getAll();
    //       this.setState({ modalVisible: false });
    //       form.resetFields();
    //     });
    //   };

    // saveFormRef = (formRef: any) => {
    //     this.formRef = formRef;
    // };
    UpdateCompanyInput = async () => {
       
        console.log(this.state.updateCompany);
        await this.props.CompanyInfoStore.update(this.state.updateCompany);
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
          
        if (this.state.redirect !== "")
          return <Redirect push to={this.state.redirect}/>;
        
        const { CompanyRecruiter } = this.props.CompanyInfoStore;
        if (CompanyRecruiter === undefined) return (
            <div>
                <h1 className='heading1'>KHONG CO DU LIEU VE NHA TUYEN DUNG</h1>
            </div >
        );
        const { CompanyInfo } = this.props.CompanyInfoStore;

        if (CompanyInfo === undefined) return (
            <div>
                <h1 className='heading1'>KHONG CO DU LIEU VE CONG TY</h1>
            </div >
        );
        
        let item_company_info = CompanyInfo;
        let rating=5;
        let numberofReview=10;
        const {recruitmentPosts} =this.props.recruitmentPostStore;
        if (recruitmentPosts===undefined)
        {
            return(<div/>)
        }
        const RateSection = () =>
        {
            return(
                <div style={{marginBottom:30}}>
                    <Rate disabled={true} count={5} allowHalf={true} defaultValue={rating}></Rate>
                </div>
            );
        }
        const recruitmentPost = recruitmentPosts.items.map((value : IRecruitmentPostItem, index : number) => 
        {
            let time= new Date(value.finishDate);
            let date=time.getDate();
            let month=time.getMonth()+1;
            let year=time.getFullYear();
            if (index >= 3 && !this.state.isSeeAllRecruitmentPost) return;
            return (   
                <div onClick={()=>this.setState({redirect:"/tin-tuyen-dung/"+value.id})} style={{marginLeft:16,marginRight:32,marginTop:16, alignItems:"center",justifyContent:"center"}}  className="row-margin-frames">
                    <div className="study-area" style={{borderStyle:"none",backgroundColor:"whitesmoke"}}>
                        <h3 style={{fontSize:20}}><b>{value.name}</b></h3>    
                        <div className="flex-container" style={{justifyContent:"space-between"}}>
                            <h6 style={{fontSize:12,fontFamily:"Open Sans"}}>Ngày kết thúc: <b>{date} - {month} - {year} </b></h6>
                            <h6 style={{fontSize:12,fontFamily:"Open Sans"}}>Mức lương: <b>{value.salaryRange}</b></h6>
                            <h6 style={{fontSize:12,fontFamily:"Open Sans"}}>Tỉnh thành: <b>{value.state}</b></h6>
                            <h6 style={{fontSize:12,fontFamily:"Open Sans"}}>Hình thức: <b>{value.wayOfWork}</b></h6>
                            <div className="flex-container" style={{
                                        minWidth:'150px',
                                        height:'30px', marginTop:-5,
                                        justifyContent:"center",paddingTop:'8px',
                                        backgroundColor: value.urgentLevel=="Đang cần gấp"? "#F83D34": value.urgentLevel==null?'transparent': "#8B8B8B",
                                        borderRadius:70/5 ,                              
                                }}>
                                <h6 style={{color:"white",fontSize:12,fontFamily:"Open Sans",}}>
                                    <b>{value.urgentLevel}</b> 
                                </h6> 
                            </div>
                        </div>
                        <div className="flex-container" style={{justifyContent:"left"}}>
                        
                            <Tag style={{justifyContent:"center",minWidth:"50px",fontSize:10,fontFamily:"Open Sans",
                                        //backgroundColor:value.expertises[0]===null?'transparent':"white",
                                        borderRadius:'5px',
                                        marginRight:"5px",
                                        padding:'5px'
                            }}><b>
                                {/* {value.expertises[0]} */}
                                </b></Tag>
                            <Tag style={{justifyContent:"center",minWidth:"50px",fontSize:10,fontFamily:"Open Sans",
                                        //backgroundColor:value.expertises[1]===null?'transparent':"white",
                                        borderRadius:'5px',
                                        marginRight:"5px",
                                        padding:'5px'
                            }}><b>
                                {/* {value.expertises[1]} */}
                                </b></Tag>
                            <Tag style={{justifyContent:"center",minWidth:"50px",fontSize:10,fontFamily:"Open Sans",
                                        //backgroundColor:value.expertises[2]===null?'transparent':"white",
                                        borderRadius:'5px',
                                        marginRight:"5px",
                                        padding:'5px'
                            }}><b>
                                {/* {value.expertises[2]} */}
                                </b></Tag>
                            <Tag style={{justifyContent:"center",minWidth:"50px",fontSize:10,fontFamily:"Open Sans",
                                        //backgroundColor:value.expertises[3]===null?'transparent':"white",
                                        borderRadius:'5px',
                                        marginRight:"5px",
                                        padding:'5px'
                            }}><b>
                                    {/* {value.expertises[3]} */}
                                </b></Tag>
                        </div>               
                    </div>  
                </div>
            )
        })
        const SectionRecruitment= () => {
            let content = "Xem tất cả";
            if (this.state.isSeeAllRecruitmentPost)
                content = "Xem ít hơn";
            return(
                <div className="section">
                    <h2 style={{height:40}}></h2>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <h2  style={{marginLeft :52,fontWeight:900, fontSize:25}} ><b>Danh sách tin tuyển dụng</b></h2>
                        {
                             (this.state.Actor==="Chủ tài khoản") ?
                                <div style={{marginRight: 16}}>
                                    <Button className="btnUpdate" type={"primary"} >Quản lý tin</Button>
                                    <Button className="btnUpdate" type={"primary"}>Tạo tin mới</Button>
                                </div>: null
                        }
                    </div>
                    <ul>{recruitmentPost}</ul>
                    <div style={{justifyContent:"center", display:'flex'}}>
                    <Button className="btnXemTatCa"
                        onClick = {() => {this.setState({isSeeAllRecruitmentPost : !this.state.isSeeAllRecruitmentPost})}}>{content} 
                        </Button>
                    </div>
                    <h2 style={{height:40}}></h2>
                </div> 
            );
        }
        
        const SectionInfoShare= (props:any) =>  {        
                return(  
                        <div className="section" >
                        <footer className="row share-info row-padding">
                   
                        <div className="flex-container"> 
                         <div className="Recruiter1">
                            <h2 style={{fontSize:20,fontFamily: "Open Sans Condensed"}}> Liên hệ người tuyển dụng</h2>
                            <div style={{fontSize:16,fontFamily: "Open Sans"}}>
                            <p > Mr. <b>{props.name}</b></p>
                            <p > Số điện thoại: {props.phoneNumber}</p>
                            <p> Email: {props.email}</p>
                            <p> Vị trí công việc: {props.jobID} </p>
                            </div>
                        </div>
                        
                        <div className="share">
                            <h6  style={{margin :30}} >Chia sẻ trang</h6>
                              <Button shape="circle" style={{ outline: 'none'}}>
                                 <Avatar style={{ height: 40, width: 40 }} shape="circle" alt={'profile'} src={fbPicture} />
                              </Button>
                              <Button shape="circle" style={ {marginLeft: 10, outline: 'none'} }>
                                 <Avatar style={{ height: 40, width: 40 }} shape="circle" alt={'profile'} src={LkPicture} />
                              </Button>
                              <Button style={ {marginLeft: 10, outline: 'none'} } shape="circle" >
                                 <Avatar style={{ height: 40, width: 40 }} shape="circle" alt={'profile'} src={TwPicture} />
                              </Button>       
                        </div>
                        {
                            (this.state.Actor!=="Chủ tài khoản")?
                            <div style={{marginLeft :-64}}>
                                
                                <Button type="primary" >
                                 Theo dõi
                                </Button>
                            </div>
                               :null
                        }
                        </div>                  
                          </footer>                        
                      </div>                      
                );
    }  
    const companylink="http://"+item_company_info.website;
    const url_background = "https://png.pngtree.com/thumb_back/fw800/back_pic/00/05/52/3556273a597fb81.jpg";
    return (
        <div style={{ margin: "auto", marginTop: "20px", width: "60%", minWidth:900 }}>
            {/* info   */}
            <div >
                <div className="blueHeader" style={{ justifyContent:"flex-end", display:"flex", backgroundImage:"url(" + url_background  + ")"}}>
                    {
                        (this.state.Actor==="Chủ tài khoản") ?
                        <div>
                        
                        <Button className="buttonEditHeader" style={{marginRight: 0, height:40, width:200}} >Chỉnh sửa ảnh bìa</Button>
                        <Button className="buttonEditHeader" style={{marginRight: 50, height:40, width:200}}  onClick={() => this.setState({ modalVisible: true ,updateCompany:this.props.CompanyInfoStore.CompanyInfo,})}>Chỉnh sửa thông tin</Button>
                         </div> : null
                    }
                     </div>
                    
                    <div className="whiteHeader">
                        <div className="avatarCompany">
                            <img className="imageHeader" src={"https://images.contentstack.io/v3/assets/blt370612131b6e0756/blt8d1a3e286ee753cf/5f76a07faf58110efed2652d/Ahri_Skin01.jpg"} alt="No"></img>
                        </div>
                        <div>
                            <div className="banner">
                            <div style={{flexDirection:"row", display:"flex", color:"GrayText", fontWeight:800, marginBottom:10, marginTop:30, justifyContent:"center"}}>
                                <img src={picLocation}
                                            alt="" style={{width:30, height:30, marginTop:-10}}/>
                                <h6 style={{fontSize:12, marginRight:15}}>
                                    <b>{item_company_info.province}</b>
                                </h6>


                                </div>
                                <h2 style={{fontSize:20}}> {item_company_info.name}</h2>
                                <div style={{minWidth:250}}>
                                    <h6 style={{fontSize:14}}>{item_company_info.describe}
                                    </h6>
                                </div>
                               
                            </div>
                        </div>
                      
                               <div className="row-padding info-form" style={{marginTop:100, marginLeft:50}}>
                            <div className="column-info-form1">
                                <div className="column">
                                    <h2>Giới thiệu về doanh nghiệp</h2>
                                    <div style={{fontSize:16 ,fontFamily: "Open Sans"}}>
                                    <p>Địa chỉ:   {item_company_info.address}</p>
                                    <p>Email: {item_company_info.email}</p>
                                    <p>Trang web doanh nghiệp: <a href={companylink}><b><u>{item_company_info.website}</u></b></a></p>
                                    <p>Lĩnh vực hoạt động: {item_company_info.expertise}</p>
                                    <p>Quy mô nhân sự: {item_company_info.headcountLimit} người</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column-info-form2">
                                <div className="column">
                                    <div className="rating">
                                    <h6 style={{fontSize:12, color:"GrayText"}}>{numberofReview} lượt đánh giá</h6>
                                    <h3 style={{marginTop:16 ,marginBottom:0,fontSize:25, fontWeight:"bold"}}>{rating}</h3>
                                    <RateSection></RateSection>
                                    <Button className="buttonCenter" type="primary" onClick={()=>this.setState({redirect:"/comment/comment-Jobseeker/1/false"})}>Xem đánh giá</Button> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                {/* Recruitment */}
                <SectionRecruitment      
                ></SectionRecruitment>
                {/* infoshare */}
                <SectionInfoShare name={CompanyRecruiter.name}
                                email={CompanyRecruiter.email}
                                phoneNumber={CompanyRecruiter.phoneNumber}
                                jobID={CompanyRecruiter.idCurrentPosition}
                ></SectionInfoShare>
                {/* Popup edit */}  
                <CustomModal className="Custom_Modal_Out_Layout" style={{margin :10}} 
                    shadow={true}
                    type="custom"
                    title="Chỉnh sửa thông tin"
                    open={this.state.modalVisible}
                    closeModal={() => { this.setState({ modalVisible: false }); }}
                >
                <FormItem className="Fontstyle" style={{margin :20}}  label={('Tên doanh nghiệp')}{...formItemLayout} >
                    <Input defaultValue={item_company_info.name} 
                    onChange={(e) => {
                        let temp_name : string  = e.target.value;
                        this.setState({updateCompany : {...this.state.updateCompany, name : temp_name}});
                        }}/>
                </FormItem>
                <FormItem className="Fontstyle" style={{margin :20}}  label={('Tỉnh thành')} {...formItemLayout}>
                    <Input  defaultValue={item_company_info.province} 
                    onChange={(e) => {
                        let tempdescription : string  = e.target.value;
                        this.setState({updateCompany : {...this.state.updateCompany, province : tempdescription}});
                        }}/>
                </FormItem>
                <FormItem className="Fontstyle" style={{margin :20}}  label={('Dòng giới thiệu')} {...formItemLayout}>
                    <Input  defaultValue={item_company_info.describe} 
                    onChange={(e) => {
                        let tempdescription : string  = e.target.value;
                        this.setState({updateCompany : {...this.state.updateCompany, describe : tempdescription}});
                        }}/>
                </FormItem>
                <FormItem className="Fontstyle"  style={{margin :20}}  label={('Địa chỉ')} {...formItemLayout}>
                    <Input defaultValue={item_company_info.address} 
                    onChange={(e) => {
                        let temp_address : string  = e.target.value;
                        this.setState({updateCompany : {...this.state.updateCompany, address : temp_address}});
                        }}/>
                </FormItem>
                <FormItem className="Fontstyle"  style={{margin :20}}  label={('Email liên hệ')} {...formItemLayout}>
                    <Input defaultValue={item_company_info.email}
                    onChange={(e) => {
                        let temp_email : string  = e.target.value;
                        this.setState({updateCompany : {...this.state.updateCompany, email : temp_email}});
                        }}/>
                </FormItem>
                <FormItem className="Fontstyle"  style={{margin :20}}  label={('Số điện thoại')} {...formItemLayout}>
                    <Input defaultValue={item_company_info.phoneNumber} 
                    onChange={(e) => {
                        let temp_phoneNumber : string  = e.target.value;
                        this.setState({updateCompany : {...this.state.updateCompany, phoneNumber : temp_phoneNumber}});
                        }}/>
                </FormItem>
                <FormItem className="Fontstyle"  style={{margin :20}}  label={('Trang web')} {...formItemLayout}>
                    <Input defaultValue={item_company_info.website}  
                    onChange={(e) => {
                        let temp_website : string  = e.target.value;
                        this.setState({updateCompany : {...this.state.updateCompany, website : temp_website}});
                        }} />
                </FormItem>
                <FormItem  className="Fontstyle" style={{margin :20}}  label={('Lĩnh vực hoạt động')} {...formItemLayout}>
                    <Input defaultValue={item_company_info.expertise} 
                    onChange={(e) => {
                        let temp_expertise : string  = e.target.value;
                        this.setState({updateCompany : {...this.state.updateCompany, expertise : temp_expertise}});
                        }} />
                </FormItem>
                <FormItem className="Fontstyle"  style={{margin :20}}  label={('Quy mô nhân sự')} {...formItemLayout}>
                    <Input defaultValue={item_company_info.headcountLimit} 
                     onChange={(e) => {
                        let temp_headcountLimit : number  = Number(e.target.value);
                        this.setState({updateCompany : {...this.state.updateCompany, headcountLimit : temp_headcountLimit}});
                        }}/>
                </FormItem>
                    <div style={{margin :20}}  className="Custom_Modal_Footer">
                        <div style={{ display: "flex"}  } >
                            {/* <button className="Simple_Blue_Button margin_right_5px" onClick={() => this.handlerAddjobSeekerConfirmation()}>OK</button> */}
                             
                                {/* <button className="Simple_White_Button" onClick={() => { this.setState({ isAddjobSeekerPopupOpen: false }) }}>Cancel</button> */}
                                <button style={{margin :20}}  className="Simple_White_Button"  onClick={() => {  this.setState({ modalVisible: false }) }} >Hủy thay đổi</button>
                                <button style={{margin :20}}  className="Simple_Blue_Button" onClick={() => {this.UpdateCompanyInput(); this.setState({ modalVisible: false })}}>Lưu thay đổi</button>
                        </div>
                    </div>
            </CustomModal>
            </div>
        );


    }

}
