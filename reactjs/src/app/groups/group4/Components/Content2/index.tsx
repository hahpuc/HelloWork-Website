import { Col, List, Row } from 'antd';
import React from 'react';
import { DataConsumer } from '../../scenes/ListCV/ListCV';

import './index.less'

export interface IHeaderProps {
    collapsed?: any;
    toggle?: any;
  }

export class Content_Option1 extends React.Component<IHeaderProps> {

    render() {

        return (
            <div className="content-cv-option1">
                    <DataConsumer>
                        { ({image, bio, phoneNumber, email, facebook, github, twitter, name, job, experienceDetails, educationDetails, skillDetails}) => 

                        <div id = "CV2000">
                        <Row type = "flex">
                            <Col className="content-left" span={8}>
                                <div style={{alignSelf: "center", margin: 50}}>     
                                    <img className="avatar" src= {image} alt="avatar-image"/>
                                </div>

                                <div style={{marginLeft: 25, marginBottom: 50}}>
                                    <div style={{fontSize: 18, color: "white"}}><b>ABOUT ME</b></div>
                                    <div className="spacing-white"></div>
                                    <p className = "ow-anywhere" style={{color: 'white'}}>{bio}</p>
                                </div>


                                <div style={{marginLeft: 25}}>
                                    <div style={{fontSize: 18, color: "white"}}><b>CONTACT</b></div>
                                    <div className="spacing-white"></div>
                                    <div style={{color: 'white'}}>
                                        
                                        <div>
                                            <div style={{display: "inline"}}><b>Phone: </b></div>
                                            <text className ="text-constraint" name = "phoneNumber"> {phoneNumber} </text>
                                        </div>
                                        <div>
                                            <div style={{display: "inline"}}><b>Email: </b></div>
                                            <text className ="text-constraint" name = "email"> {email} </text>
                                        </div>
                                        <div>
                                            <div style={{display: "inline"}}><b>Facebook: </b></div>
                                            <text className ="text-constraint" name = "facebook"> {facebook} </text>
                                        </div>
                                        <div>
                                            <div style={{display: "inline"}}><b>Github: </b></div>
                                            <text className ="text-constraint" name = "github"> {github} </text>
                                        </div>
                                        <div>
                                            <div style={{display: "inline"}}><b>Twitter: </b></div>
                                            <text className ="text-constraint" name = "email"> {twitter} </text>
                                        </div>
                                    </div>
                                </div>

                            </Col>

                            <Col className="content-right" span={16}>

                                <div style={{marginTop: 50, marginLeft: 30, marginRight: 30, marginBottom: 50}}>
                                    <div style={{marginBottom: 30}}>
                                        <div style={{fontSize: 36}}> <b>{name}</b></div>
                                        <text name = "job" style={{fontSize: 24}}> <b>{job}</b> </text>
                                    </div>
                                </div>

                                <div style={{marginTop: 20, marginLeft: 30, marginRight: 30, marginBottom: 50}}>
                                    <p style={{fontSize: 22}}><b>WORK EXPERIENCE</b></p>

                                    <div className="spacing-black"></div>

                                    
                                    <List
                                        id = "experiences-target"
                                        itemLayout = 'vertical'
                                        dataSource = {experienceDetails}
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

                                <div style={{marginTop: 20, marginLeft: 30, marginRight: 30, marginBottom: 50}}>
                                    <p style={{fontSize: 22}}><b>EDUCATION</b></p>

                                    <div className="spacing-black"></div>

                                    <List
                                        id = "experiences-target"
                                        itemLayout = 'vertical'
                                        dataSource = {educationDetails}
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
                                
                                <div style={{marginTop: 50, marginLeft: 30, marginRight: 30}}>
                                    <p style={{fontSize: 22}}><b>SKILL</b></p>

                                    <div className="spacing-black"></div>

                                    <List
                                        id = "experiences-target"
                                        itemLayout = 'vertical'
                                        dataSource = {skillDetails}
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


                            </Col>
                        </Row>
                        </div>
                        }

                    </DataConsumer>
            
            </div>
        );
    }
}

export default Content_Option1;