import React from "react";

import '../../styles.less'
import './UpdateCV.less'

import '../../Components/Option/index.less'
import '../../Components/Overview/index.less'
import '../../Components/Content/index.less'
import '../../Components/Content2/index.less'
import '../../Components/Contact/index.less'
import '../../Components/Navbar/index.less'
import '../../Components/CustomCarousel/Expcarousel/index.less'
import '../../Components/CustomCarousel/AchieCarousel/index.less'
import '../../Components/CustomCarousel/EduCarousel/index.less'

import { inject, observer } from 'mobx-react';
// import { ClickAwayListener } from '@material-ui/core'
// import CustomModal from 'app/shared/components/CustomModal/CustomModal'
import AppComponentBase from 'app/shared/components/AppComponentBase';
import Stores from 'app/shared/stores/storeIdentifier';

import 'antd/dist/antd.css'
import {Col, Row, List} from 'antd'
import { Button } from 'antd';


// import Title from 'antd/lib/typography/Title';
// import Meta from 'antd/lib/card/Meta';

//import { CreateJobTypeInput } from '../../services/dto/jobTypeDTO/createOrUpdateJobTypeInput';
// import { UpdateJobTypeInput } from '../../services/dto/jobTypeDTO/createOrUpdateJobTypeInput';
//import { EntityDto } from 'shared/services/dto/entityDto';

// import { Option } from 'app/groups/group4/Components/Option/index'
// import { Overview } from 'app/groups/group4/Components/Overview/index'
// import { Contact } from 'app/groups/group4/Components/Contact/index'
// import { ExpCarousel } from 'app/groups/group4/Components/CustomCarousel/Expcarousel/index'
// import { EduCarousel } from 'app/groups/group4/Components/CustomCarousel/EduCarousel/index'
// import { AchieCarousel } from 'app/groups/group4/Components/CustomCarousel/AchieCarousel/index'
// import { Skill } from 'app/groups/group4/Components/Skill/index'
//import { Content } from 'app/groups/group4/Components/Content/index'
import CVStore from '../../stores/CVStore';
import { ICvGet } from '../../models/cv';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import JobSeekerStore from "app/groups/group5/stores/jobSeekerStore";
import { EntityDto } from "app/groups/group8/services/dto/CommentDTO/entityDto";
import AccountStore14 from "app/groups/group14/stores/accountStore14";

import SessionStore from "shared/stores/sessionStore";


export interface ICvList {
    cvStore: CVStore
    jobSeekerStore: JobSeekerStore
    accountStore14: AccountStore14
    sessionStore: SessionStore
}

export interface ICvState {
    cv: ICvGet
    profileImage: string
}   

var url: String

@inject(Stores.SessionStore)
@inject(Stores.accountStore14)
@inject(Stores.jobSeekerStore)
@inject(Stores.cvStore)
@observer
export default class UpdateCV extends AppComponentBase<ICvList, ICvState> {
    

    async componentDidMount() {
        
        await this.props.sessionStore.getCurrentLoginInformations

        if (this.props.sessionStore.currentLogin.user == null) { 
            var i 
            for (i = url.length; i > 0; --i) {
                if (url[i] == '/')
                    break
            }

            await this.props.cvStore.getCVById(url.substr(i + 1))

            this.setState({
                cv: this.props.cvStore.cvList,
                profileImage: 'https://scontent.fvca1-1.fna.fbcdn.net/v/t1.0-9/130191222_3460939107464845_7260943377533179971_n.jpg?_nc_cat=105&ccb=2&_nc_sid=730e14&_nc_ohc=oTfqIaBzM24AX_fg_E4&_nc_ht=scontent.fvca1-1.fna&oh=5ef22bd2d0e01cf2023143fb3fcd8c03&oe=5FF64DF5'
            })

        }
        else { 
            console.log(url.substr(34))

            var i 
            for (i = url.length; i > 0; --i) {
                if (url[i] == '/')
                    break
            }

            await this.props.accountStore14.getAccount()


            // ID của UserProfile
            let dto: EntityDto = {
                id: this.props.accountStore14.account.id 
            }

            console.log("Current ID", this.props.accountStore14.account.id)

            await this.props.jobSeekerStore.getJobSeekerByID(dto)

            await this.props.cvStore.getCVById(url.substr(i + 1))

            this.setState({
                cv: this.props.cvStore.cvList,
                profileImage: this.props.jobSeekerStore.jobSeeker.image
            })
        }
        

    }

    // Nut Download 
    downloadEvent = async(event: any) => { 
        console.log("Tien hanh dowload CV")

        const input = document.getElementById('divToPrint');
        
        
        html2canvas(input!)
          .then((canvas: any) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF("p", "mm", "a4");

            var width = pdf.internal.pageSize.getWidth()
            var height = pdf.internal.pageSize.getHeight()
            pdf.addImage(imgData, 'JPEG', 0, 0, width, height)
            // pdf.output('dataurlnewwindow');
            pdf.save(this.state.cv.nameCV);
          })
        ;
    }

    form = { 
        options: 'option1'
    }
    
    constructor(props: any) {
        super(props);

        url = document.URL
        //console.log(url.substr(34))

        this.state = {
            cv: {
                id: '1',
                nameCV: 'Untitled',
                options: 'option1',
                name: 'Hello Work',
                job: 'Fullstack Developer',
                bio: 'Tôi đã có 5 năm làm việc',
                phoneNumber: '0123456789',
                email: 'helloworl@gmail.com',
                facebook: 'hellowork',
                github: 'hellowork',
                twitter: 'hellowork',
                experienceDetails: [
                    {
                        id: '1',
                        jobName: 'Software Engineer',
                        companyName: 'UIT Company',
                        period: '2020-2025', // Length of job time
                        jobPosition: 'Senior', 
                        content: 'Đã có nhiều năm kinh nghiệm'
                    },
                    {
                        id: '1',
                        jobName: '',
                        companyName: '',
                        period: '', // Length of job time
                        jobPosition: '', 
                        content: ''
                    }, 
                    {
                        id: '1',
                        jobName: '',
                        companyName: '',
                        period: '', // Length of job time
                        jobPosition: '', 
                        content: ''
                    }
                ],
                educationDetails: [ 
                    {
                        id: '1',
                        schoolName: 'Trường Đại học CNTT', 
                        period: '2018-2022',
                        specialize: 'Kỹ thuật phần mềm'
                    },
                    {
                        id: '1',
                        schoolName: '', 
                        period: '',
                        specialize: ''
                    }
                ],
                achievementDetails: [
                    {
                        id: '1',
                        name: 'IELTS 8.0',
                        organization: 'UIT Corporator', 
                        period: '2018-2020', 
                        content: 'Reading 9.0 Writing 9.0'
                    },
                    {
                        id: '1',
                        name: '',
                        organization: '', 
                        period: '', 
                        content: ''
                    },
                    {
                        id: '1',
                        name: '',
                        organization: '', 
                        period: '', 
                        content: ''
                    }
                ],
                skillDetails: [
                    {
                        id: '1',
                        skillName: 'ReactJS'
                    },
                    {
                        id: '1',
                        skillName: ''
                    },
                    {
                        id: '1',
                        skillName: ''
                    },
                    {
                        id: '1',
                        skillName: ''
                    },
                    {
                        id: '1',
                        skillName: ''
                    },
                    
                ],
            },
            profileImage: 'https://scontent.fvca1-1.fna.fbcdn.net/v/t1.0-9/130191222_3460939107464845_7260943377533179971_n.jpg?_nc_cat=105&ccb=2&_nc_sid=730e14&_nc_ohc=oTfqIaBzM24AX_fg_E4&_nc_ht=scontent.fvca1-1.fna&oh=5ef22bd2d0e01cf2023143fb3fcd8c03&oe=5FF64DF5'
        }

    }

    confirmDialog(event:any) {
        console.log("Tro ve")
        var result = window.confirm("Bạn có muốn kết thúc không?");

        if(result)  {
            window.history.back()
        } else {
            
        }
    }
    
    public render() {

        //console.log("RENDER", this.state.cv.options)

        //console.log(this.props.cvStore.cvList)


        //----------------------------------------------------
        return (
            
            <div> 
                {
                    // Template 1
                    this.state.cv.options === "option1" ? 
                    <div> 
                        <Row>
                            <Col span={16} offset = {4}>
                            <div className="navbar-container">

                                <div className="navbar-left">
                                    <p id="title">{this.props.cvStore.cvList?.nameCV}</p>
                                    <p style = {{color: '#518FF5'}} className = "save-spacing" id="status">Đã lưu</p>
                                </div>

                                <div className="navbar-right">
                                    <Button style = {{border: 'none'}} ghost={true} onClick = {this.downloadEvent} >Tải xuống</Button>
                                    {/* <Button style = {{border: 'none'}} ghost={true} onClick = {this.saveEvent}>Lưu</Button> */}
                                    <Button type="link" ghost={true} onClick = {this.confirmDialog}>Trở về</Button>
                                </div>

                            </div>
                            </Col>
                        </Row>
                        
                        <Row>
                        <Col span={16} offset={4} style={{backgroundColor: '#919191'}}>

                            <div id ="divToPrint" className="content-cv"> 
                                <div className="head-ctn">
                                    <h1 style = {{color: 'white'}} > {this.props.cvStore.cvList?.name} </h1>
                                    <text className = "text-constraint16" name = "job" style = {{color: 'white'}}> {this.props.cvStore.cvList?.job} </text>
                                </div>

                                <div className="body-ctn">
                                        <h3 style = {{color: '#3d3d3d'}}> Thông tin liên hệ </h3>
                                        <hr></hr>
                                        <div className = "row-item">
                                            <div className = "row-item">
                                                <a style = {{color: '#3d3d3d'}}> <b>Số điện thoại: </b> </a>
                                                <text className ="text-constraint" name = "phoneNumber"> {this.props.cvStore.cvList?.phoneNumber} </text>
                                                
                                            </div>
                                            <div className = "row-item">
                                                <a style = {{color: '#3d3d3d'}}> <b>Email: </b> </a>
                                            <text className ="text-constraint" name = "phoneNumber"> {this.props.cvStore.cvList?.email} </text>
                                            </div>
                                            <div className = "row-item">
                                                <a style = {{color: '#3d3d3d'}}> <b>Facebook: </b> </a>
                                            <text className ="text-constraint" name = "phoneNumber"> {this.props.cvStore.cvList?.facebook} </text>
                                            </div>
                                            <div className = "row-item">
                                                <a style = {{color: '#3d3d3d'}}> <b>Github: </b> </a>
                                                <text className ="text-constraint" name = "phoneNumber"> {this.props.cvStore.cvList?.github}</text>
                                            </div>
                                            <div className = "row-item">
                                                <a style = {{color: '#3d3d3d'}}> <b>Twitter: </b> </a>
                                                <text className ="text-constraint" name = "phoneNumber"> {this.props.cvStore.cvList?.twitter} </text>
                                            </div>
                                        </div>

                                        <h3 style = {{color: '#3d3d3d'}}> Kinh nghiệm làm việc </h3>
                                        <hr></hr>
                                            <List
                                            id = "experiences-target"
                                            itemLayout = 'vertical'
                                            dataSource = {this.props.cvStore.cvList?.experienceDetails}
                                            split = {false}
                                            renderItem = {item => (
                                                <List.Item >
                                                    <div className = "row-item-left">
                                                        <a className = "text24" style = {{color: '#3d3d3d'}}> <b> {item.period} </b> </a>

                                                        <div className = "text-constraint16" > 
                                                            <a className = "text24"  style = {{color: '#3d3d3d'}}> <b> {item.companyName} </b> </a>
                                                            <p> <b> {item.jobName} {item.jobPosition} </b> </p> 
                                                            <p> {item.content} </p>
                                                        </div>
                                                        
                                                    </div>
                                                </List.Item>
                                            )}
                                            >
                                            </List>
                                        

                                        <h3 style = {{color: '#3d3d3d'}}> Học vấn </h3>
                                        <hr></hr>
                                            <List
                                            id = "educations-target"
                                            itemLayout = 'vertical'
                                            dataSource = {this.props.cvStore.cvList?.educationDetails}
                                            split = {false}
                                            renderItem = {item => (
                                                <List.Item >
                                                    <div className = "row-item-left">
                                                        <a className = "text24"  style = {{color: '#3d3d3d'}}> <b> {item.period} </b> </a>

                                                        <div className = "text-constraint16" > 
                                                            <a className = "text24"  style = {{color: '#3d3d3d'}}> <b> {item.schoolName} </b> </a>
                                                            <p> <b> {item.specialize} </b> </p> 
                                                        </div>
                                                        
                                                    </div>
                                                </List.Item>
                                            )}
                                            >
                                            </List>
                                        

                                        <h3 style = {{color: '#3d3d3d'}}> Thành tựu </h3>
                                        <hr></hr>
                                            <List
                                                id = "achievements-target"
                                                itemLayout = 'vertical'
                                                dataSource = {this.props.cvStore.cvList?.achievementDetails}
                                                split = {false}
                                                renderItem = {item => (
                                                    <List.Item >
                                                        <div className = "row-item-left">
                                                            <a className = "text24" style = {{color: '#3d3d3d'}}> <b> {item.period} </b> </a>

                                                            <div className = "text-constraint16" > 
                                                                <a className = "text24"  style = {{color: '#3d3d3d'}}> <b> {item.name} </b> </a>
                                                                <p> <b> {item.organization} </b> </p> 
                                                                <p> {item.content} </p>
                                                            </div>
                                                        </div>
                                                    </List.Item>
                                                )}
                                            >
                                            </List>
                                        
                                        

                                        <h3 style = {{color: '#3d3d3d'}}> Kỹ năng </h3>
                                        <hr></hr>

                                            <List
                                            id = "skills-target"
                                            itemLayout = 'vertical'
                                            dataSource = {this.props.cvStore.cvList?.skillDetails}
                                            split = {false}
                                            renderItem = {item => (
                                                <List.Item >
                                                    <div className = "text-constraint16">
                                                        <a className = "text24" style = {{color: '#3d3d3d'}}> <b> {item.skillName} </b> </a>
                                                    </div>
                                                </List.Item>
                                            )}
                                            >
                                            </List>
                                        
                                        
                                </div>
                            </div>

                        </Col>
                        </Row>
                    </div>

                    :

                    // Template 2
                    <div>
                        <Row>
                            <Col span={16} offset = {4}>
                            <div className="navbar-container">

                                <div className="navbar-left">
                                    <p id="title">{this.props.cvStore.cvList?.nameCV}</p>
                                    <p style = {{color: '#518FF5'}} className = "save-spacing" id="status">Đã lưu</p>
                                </div>

                                <div className="navbar-right">
                                    <Button style = {{border: 'none'}} ghost={true} onClick = {this.downloadEvent} >Tải xuống</Button>
                                    {/* <Button style = {{border: 'none'}} ghost={true} onClick = {this.saveEvent}>Lưu</Button> */}
                                    <Button type="link" ghost={true} onClick = {this.confirmDialog}>Trở về</Button>
                                </div>

                            </div>
                            </Col>
                        </Row>
                                                
                        <Row>
                            <Col style={{backgroundColor: '#919191'}} span={16} offset = {4}>
                                <div className = "content-cv" id = "divToPrint">
                                <Row type = "flex">
                                    <Col className="template-left" span={8} >
                                        <div className = "height-left">
                                            <div style={{alignSelf: "center", margin: 50}}>
                                                <img className="avatar" src= {this.state.profileImage}
                                                alt="avatar-image"/>
                                            </div>

                                            <div style={{marginLeft: 25, marginBottom: 50}}>
                                                <div style={{fontSize: 18, color: "white"}}><b>ABOUT ME</b></div>
                                                <div className="spacing-white"></div>
                                                <p className = "ow-anywhere" style={{color: 'white'}}>{this.props.cvStore.cvList?.bio}</p>
                                            </div>


                                            <div style={{marginLeft: 25}}>
                                                <div style={{fontSize: 18, color: "white"}}><b>CONTACT</b></div>
                                                <div className="spacing-white"></div>
                                                <div style={{color: 'white'}}>
                                                    
                                                    <div>
                                                        <div style={{display: "inline"}}><b>Phone: </b></div>
                                                        <text className ="text-constraint" name = "phoneNumber"> {this.props.cvStore.cvList?.phoneNumber} </text>
                                                    </div>
                                                    <div>
                                                        <div style={{display: "inline"}}><b>Email: </b></div>
                                                        <text className ="text-constraint" name = "email"> {this.props.cvStore.cvList?.email} </text>
                                                    </div>
                                                    <div>
                                                        <div style={{display: "inline"}}><b>Facebook: </b></div>
                                                        <text className ="text-constraint" name = "facebook"> {this.props.cvStore.cvList?.facebook} </text>
                                                    </div>
                                                    <div>
                                                        <div style={{display: "inline"}}><b>Github: </b></div>
                                                        <text className ="text-constraint" name = "github"> {this.props.cvStore.cvList?.github} </text>
                                                    </div>
                                                    <div>
                                                        <div style={{display: "inline"}}><b>Twitter: </b></div>
                                                        <text className ="text-constraint" name = "email"> {this.props.cvStore.cvList?.twitter} </text>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                
                                    </Col>

                                    <Col className="template-right" span={16}>
                                        <div className = "height-left">
                                        <div style={{marginTop: 50, marginLeft: 30, marginRight: 30, marginBottom: 0}}>
                                            <div style={{marginBottom: 30}}>
                                                <div style={{fontSize: 36}}> <b>{this.props.cvStore.cvList?.name}</b></div>
                                                <text name = "job" style={{fontSize: 24}}> <b>{this.props.cvStore.cvList?.job}</b> </text>
                                            </div>
                                        </div>

                                        <div style={{marginTop: 20, marginLeft: 30, marginRight: 30, marginBottom: 50}}>
                                            <p style={{fontSize: 22}}><b>WORK EXPERIENCE</b></p>

                                            <div className="spacing-black"></div>

                                            
                                            <List
                                                id = "experiences-target"
                                                itemLayout = 'vertical'
                                                dataSource = {this.props.cvStore.cvList?.experienceDetails}
                                                split = {false}
                                                renderItem = {item => (
                                                    <List.Item >
                                                        <div style={{display: "flex", justifyContent: "space-between"}}>
                                                            <p style={{fontSize: 18}}> <b> {item.companyName} </b> </p>
                                                            <p style={{fontSize: 18}}> <b> {item.period} </b> </p>
                                                        </div>
                                                        <p> <b> {item.jobName} {item.jobPosition} </b> </p>
                                                        <p>{item.content}</p>
                                                    </List.Item>
                                                )}>
                                            </List>
                                        </div>

                                        <div style={{marginTop: 20, marginLeft: 30, marginRight: 30, marginBottom: 0}}>
                                            <p style={{fontSize: 22}}><b>EDUCATION</b></p>

                                            <div className="spacing-black"></div>

                                            <List
                                                id = "experiences-target"
                                                itemLayout = 'vertical'
                                                dataSource = {this.props.cvStore.cvList?.educationDetails}
                                                split = {false}
                                                renderItem = {item => (
                                                    <List.Item >
                                                        <div style={{display: "flex", justifyContent: "space-between"}}>
                                                            <p style={{fontSize: 18}}> <b> {item.schoolName} </b> </p>
                                                            <p style={{fontSize: 18}}> <b> {item.period} </b> </p>
                                                        </div>
                                                        <p> <b> {item.specialize} </b> </p>
                                                    </List.Item>
                                                )}>
                                            </List>

                                        
                                        </div>
                                        
                                        <div style={{marginTop: 50, marginLeft: 30, marginRight: 30, marginBottom: 0}}>
                                            <p style={{fontSize: 22}}><b>SKILL</b></p>

                                            <div className="spacing-black"></div>

                                            <List
                                                id = "experiences-target"
                                                itemLayout = 'vertical'
                                                dataSource = {this.props.cvStore.cvList?.skillDetails}
                                                split = {false}
                                                renderItem = {item => (
                                                    <List.Item >
                                                        <div style={{display: "flex", justifyContent: "space-between"}}>
                                                            <p style={{fontSize: 18}}> <b> {item.skillName} </b> </p>
                                                            
                                                        </div>
                                                    </List.Item>
                                                )}>
                                            </List>
                                        </div>
                                        </div>
                                    </Col>
                                </Row>
                                </div>
                            </Col>
                        </Row>
                        
                    </div>
                }

            

        </div>
        
       
        );
    }
}