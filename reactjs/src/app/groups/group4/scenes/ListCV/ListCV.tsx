import React, { createContext } from "react";

import '../../styles.less'
import './ListCV.less'

import '../../Components/Option/index.less'
import '../../Components/Overview/index.less'
import '../../Components/Content/index.less'
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
import {Col, Row} from 'antd'
import { Button } from 'antd';


// import Title from 'antd/lib/typography/Title';
// import Meta from 'antd/lib/card/Meta';

//import { CreateJobTypeInput } from '../../services/dto/jobTypeDTO/createOrUpdateJobTypeInput';
// import { UpdateJobTypeInput } from '../../services/dto/jobTypeDTO/createOrUpdateJobTypeInput';
//import { EntityDto } from 'shared/services/dto/entityDto';

// import { Option } from 'app/groups/group4/Components/Option/index'
import { Overview } from 'app/groups/group4/Components/Overview/index'
// import { Contact } from 'app/groups/group4/Components/Contact/index'
import { ExpCarousel } from 'app/groups/group4/Components/CustomCarousel/Expcarousel/index'
import { EduCarousel } from 'app/groups/group4/Components/CustomCarousel/EduCarousel/index'
import { AchieCarousel } from 'app/groups/group4/Components/CustomCarousel/AchieCarousel/index'
import { Skill } from 'app/groups/group4/Components/Skill/index'
//import { Content } from 'app/groups/group4/Components/Content/index'
import CVStore from '../../stores/CVStore';
import { ICv } from '../../models/cv';
import Contact from '../../Components/Contact';
import Content from '../../Components/Content';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Content_Option1 from '../../Components/Content2';
import Overview_option2 from '../../Components/Overview2';
import JobSeekerStore from "app/groups/group5/stores/jobSeekerStore";
import { EntityDto } from "shared/services/dto/entityDto";
import AccountStore14 from "app/groups/group14/stores/accountStore14";
import SessionStore from "shared/stores/sessionStore";
// import AuthenticationStore from "shared/stores/authenticationStore";



export interface ICvList {
    jobSeekerStore: JobSeekerStore
    cvStore: CVStore
    accountStore14: AccountStore14
    sessionStore: SessionStore
}

export interface ICvState {
    cv: ICv
}   

// Context API - ReactJS
const DataContext = createContext({
    image: '',
    nameCV: 'KhongCoName',
    options: 'option1',
    name: 'Hello Work',
    job: 'Fullstack Engineer',
    bio: 'Tôi có 10 ngày kinh nghiệm',
    phoneNumber: '0123456789',
    email: 'helloworl@gmail.com',
    facebook: 'hellowork',
    github: 'hellowork',
    twitter: 'hellowork',
    experienceDetails: [
        {
            jobName: '..........',
            companyName: '..........',
            period: '..........', // Length of job time
            jobPosition: '..........', 
            content: '..........'
        },
        {
            jobName: '..........',
            companyName: '..........',
            period: '..........', // Length of job time
            jobPosition: '..........', 
            content: '..........'
        },
        
    ],
    educationDetails: [ 
        {
            schoolName: '', 
            period: '',
            specialize: ''
        },
        
    ],
    skillDetails: [
        {
            skillName: ''
        },
    ],
    achievementDetails: [
        {
            name: '',
    		organization: '', 
    		period: '', 
    		content: ''
        }
    ],

    // action
    updateInput: (event: any) => {},
    updateInputArray: (ref: any, id: any, event: any) => {}
});

export const DataConsumer = DataContext.Consumer

@inject(Stores.SessionStore)
@inject(Stores.jobSeekerStore)
@inject(Stores.cvStore)
@inject(Stores.accountStore14)
@observer
export default class ListCV extends AppComponentBase<ICvList> {

    async componentDidMount() { 

        await this.props.sessionStore.getCurrentLoginInformations

        if (this.props.sessionStore.currentLogin.user == null) {
            console.log("Chua Dang Nhap") 

            let items = this.state;
            items = JSON.parse(JSON.stringify(items));

            items[`image`] = "https://scontent.fvca1-1.fna.fbcdn.net/v/t1.0-9/130191222_3460939107464845_7260943377533179971_n.jpg?_nc_cat=105&ccb=2&_nc_sid=730e14&_nc_ohc=oTfqIaBzM24AX_fg_E4&_nc_ht=scontent.fvca1-1.fna&oh=5ef22bd2d0e01cf2023143fb3fcd8c03&oe=5FF64DF5"

            this.setState( items )
        }

        
            
        else {
            console.log("Da Dang Nhap")
            // Hàm lấy thông tin từ User
            await this.props.accountStore14.getAccount()

            if (this.props.accountStore14.account.id == null) 
                console.log("Current ID: NULL")
            else 
                console.log("currentID",this.props.accountStore14.account.id)
            
            //ID của UserProfile
            let dto: EntityDto = {
                id: this.props.accountStore14.account.id
            }
            
            await this.props.jobSeekerStore.getJobSeekerByID(dto)

            console.log("currentID",this.props.accountStore14.account.id)

            let items = this.state;
            items = JSON.parse(JSON.stringify(items));
            //console.log(items);
            items[`image`] = this.props.jobSeekerStore.jobSeeker.image
            items['name'] = this.props.jobSeekerStore.jobSeeker.name
            items['email'] = this.props.jobSeekerStore.jobSeeker.email
            items['facebook'] = this.props.jobSeekerStore.jobSeeker.facebook
            items['github'] = this.props.jobSeekerStore.jobSeeker.github
            items['twitter'] = this.props.jobSeekerStore.jobSeeker.twitter
            items['bio'] = this.props.jobSeekerStore.jobSeeker.description

            this.setState( items );
        }
    }

    updateInput = (event: any) => { 
        let items = this.state;
        items = JSON.parse(JSON.stringify(items));
        //console.log(items);
        items[`${event.name}`] = event.value;

        this.setState( items );
    }

    updateInputArray = (ref: any, id: any, event: any) => {
        let items = this.state;
        items = JSON.parse(JSON.stringify(items));

        items[ref][id][`${event.name}`] = event.value;
        //console.log(items[id]);

        this.setState(  items );
    }

    // Nut Download 
    downloadEvent = async(event: any) => { 
        // console.log("Tien hanh download")

        let ref = document.getElementById('title')!!
        console.log(ref?.textContent)

        let cvName = ref.textContent!!

    

        const input = document.getElementById('CV2000');

        // const xx = document.getElementById('CV2000');
        // console.log(xx)
        
        html2canvas(input!)
          .then((canvas: any) => {

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF("p", "mm", "a4");

            var width = pdf.internal.pageSize.getWidth()
            var height = pdf.internal.pageSize.getHeight()

            //console.log(width, height)
            // pdf.addImage(imgData, 'JPEG', 0, 0);
            pdf.addImage(imgData, 'JPEG', 0, 0, width, height)
            // pdf.output('dataurlnewwindow');

            pdf.save(cvName);
          })
        ;
       
    }

    // Nút save
    saveEvent = async (event: any) => { 
        console.log("Tien hanh save")

        let ref = document.getElementById('title')!!
        console.log(ref?.textContent)

        let cvName = ref.textContent!!

        // Lấy dữ liệu của state sau khi nhập liệu
        let items = this.state;
        items = JSON.parse(JSON.stringify(items));

        // Tạo dữ liệu mới để lưu vào database
        let newData = {
            nameCV: cvName,
            options: items.options,
            name: items.name,
            job: items.job,
            bio: items.bio,
            phoneNumber: items.phoneNumber,
            email: items.email,
            facebook: items.facebook,
            github: items.github,
            twitter: items.twitter,
            experienceDetails: items.experienceDetails,
            educationDetails: items.educationDetails,
            skillDetails: items.skillDetails,
            achievementDetails: items.achievementDetails
        }
    
        console.log(newData)
        
        await this.props.cvStore.createCV(newData)

        window.location.replace('/cv-management')
    }

    changeForm = async (event: any) => { 
        let items = this.state;
        items = JSON.parse(JSON.stringify(items));
        //console.log(items);
        items[`options`] = event.value;

        this.setState( items );

        console.log(items)
    }

    

    state = {
        image: '',
        nameCV: 'KhongCoName',
        options: 'option2',
        name: 'Hello Work',
        job: 'Fullstack Developer',
        bio: 'Tôi có 10 năm kinh nghiệm',
        phoneNumber: '0123456789',
        email: 'helloworl@gmail.com',
        facebook: 'hellowork',
        github: 'hellowork',
        twitter: 'hellowork',
        experienceDetails: [
            {
                jobName: 'Software Engineer',
                companyName: 'UIT Company',
                period: '2020-2025', // Length of job time
                jobPosition: 'Senior', 
                content: 'Đã có nhiều năm kinh nghiệm'
            },
            {
                jobName: '',
                companyName: '',
                period: '', // Length of job time
                jobPosition: '', 
                content: ''
            }, 
            {
                jobName: '',
                companyName: '',
                period: '', // Length of job time
                jobPosition: '', 
                content: ''
            }
        ],
        educationDetails: [ 
            {
                schoolName: 'Trường Đại học CNTT', 
                period: '2018-2022',
                specialize: 'Kỹ thuật phần mềm'
            },
            {
                schoolName: '', 
                period: '',
                specialize: ''
            }
        ],
        achievementDetails: [
            {
                name: 'IELTS 8.0',
                organization: 'UIT Corporator', 
                period: '2018-2020', 
                content: 'Reading 9.0 Writing 9.0'
            },
            {
                name: '',
                organization: '', 
                period: '', 
                content: ''
            },
            {
                name: '',
                organization: '', 
                period: '', 
                content: ''
            }
        ],
        skillDetails: [
            {
                skillName: 'ReactJS'
            },
            {
                skillName: ''
            },
            {
                skillName: ''
            },
            {
                skillName: ''
            },
            {
                skillName: ''
            },
            
            
        ],
        
        updateInput: this.updateInput,
        updateInputArray: this.updateInputArray

    }

    confirmDialog(event:any) {
        var result = window.confirm("Bạn có muốn kết thúc khởi tạo CV?");

        if(result)  {
            window.history.back()
        } else {
            
        }
    }

    public render() {
        //----------------------------------------------------
        return (
            <div>
            <DataContext.Provider value = {this.state}>
            <div className="navbar-container">

                <div className="navbar-left">
                    <p contentEditable = "true" id="title">Untitled_CV</p>
                    <p style = {{color: '#518FF5'}} className = "save-spacing" id="status">Chưa lưu</p>
                </div>

                <div className="navbar-right">
                    <Button style = {{border: 'none'}} ghost={true} onClick = {this.downloadEvent} >Tải xuống</Button>
                    <Button style = {{border: 'none'}} ghost={true} onClick = {this.saveEvent}>Lưu</Button>
                    <Button type="link" ghost={true} onClick = {this.confirmDialog}>Trở về</Button>
                </div>

            </div>


        
            <Row>
                <Col span={7}>
                     <div style={{margin: '16px'}}>
                        <p className = "text-bold" style={{color: '#518FF5', fontSize: 24}}>Template</p>
                        
                        {/* <Option/> */}
                        <div className="input-template">
                            <div id="option-1">
                                <input className = "image-size" type="image" 
                                src = "https://scontent.fsgn5-4.fna.fbcdn.net/v/t1.0-9/126987836_2763897190536250_3934958058250858603_o.jpg?_nc_cat=104&ccb=2&_nc_sid=730e14&_nc_ohc=BWKEFkMmeOMAX9Nno3n&_nc_ht=scontent.fsgn5-4.fna&oh=5e062eb9c354f18f8332acaf329e9875&oe=5FE4CD21" 
                                name="option" 
                                value="option1" 
                                onClick={(e: any) => this.changeForm(e.target)}  /><br/>
                                <label htmlFor="option1">Cơ bản</label>
                            </div>

                            <div id="option-2">
                                <input className = "image-size"  type="image" 
                                src = "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-9/130279300_2774996389426330_60981264407244966_o.jpg?_nc_cat=106&ccb=2&_nc_sid=730e14&_nc_ohc=8Z1AgVAgK7MAX_8g7bH&_nc_oc=AQn1ozU2PXPi0oExG5eUg8qvDzMjzmwUyMVlN2LyGMr9simgjeCaYhChvhdItGenA2kzVF0yDBMeD-MaD_sXd49k&_nc_ht=scontent.fsgn5-6.fna&oh=619866059ec4c16a36fa346f15b68b00&oe=5FF5F99A" 
                                name="option" 
                                value="option2" 
                                onClick={(e: any) => this.changeForm(e.target)} /><br/>
                                <label htmlFor="option2">Ấn tượng</label>
                            </div>
                        </div>

                        <p className = "text-bold" style={{color: '#518FF5', fontSize: 24}}>Nội dung</p>

                        {
                            this.state.options === 'option1' ?
                            <Overview/>
                            :  
                            <Overview_option2/>
                        }
                        <Contact/>
                        <ExpCarousel/>
                        <EduCarousel/>
                        {
                            this.state.options === 'option1' ?
                            <AchieCarousel/>
                            :  
                            <div/>
                        }
                        
                        <Skill/>
                    </div>
                </Col>

                <Col span={17} style={{backgroundColor: '#919191'}}>

                    <div > 
                    { 
                    this.state.options === 'option1' ?
                        <Content></Content>
                        :  
                        <Content_Option1></Content_Option1>                        
                    }    
                    </div>
                    
                </Col>

            </Row>
        </DataContext.Provider>
        </div>
        );
    }
}