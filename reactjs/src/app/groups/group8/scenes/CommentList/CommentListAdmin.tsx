

import React from 'react'
import '../../styles.less'
import './CommentList.less'
import { inject, observer } from 'mobx-react';
//import { ClickAwayListener } from '@material-ui/core'
//import CustomModal from 'app/shared/components/CustomModal/CustomModal'
import AppComponentBase from 'app/shared/components/AppComponentBase';
import Stores from 'app/shared/stores/storeIdentifier'; 
import { CreateOrUpdateCommentInput } from '../../services/dto/CommentDTO/createOrUpdateCommentInput';
// import { GetCommentInput } from '../../services/dto/CommentDTO/GetCommentInput';
import { Avatar, Button, List, message,Rate, Tabs  } from 'antd'; 
import { DeleteComment } from '../../services/dto/CommentDTO/deleteComment';   
import CommentStoreAdmin, { ICommentItemAdmin } from '../../stores/CommentStoreAdmin';
import { DeleteFilled, ReloadOutlined } from '@ant-design/icons';
// import AuthenticationStore from 'shared/stores/authenticationStore';
//import { GetAllCommentOutput } from '../../services/dto/CommentDTO/getAllCommentOutput';
//import { Form } from 'antd';
//import { CreateJobTypeInput } from '../../services/dto/jobTypeDTO/createOrUpdateJobTypeInput';
// import { UpdateJobTypeInput } from '../../services/dto/jobTypeDTO/createOrUpdateJobTypeInput';
//import { EntityDto } from 'shared/services/dto/entityDto';
// import jwt_decode from 'jwt-decode';


export interface ICommentListProps {
    commentStoreAdmin: CommentStoreAdmin,
}

export interface ICommentListState {
    comment: CreateOrUpdateCommentInput,
    isComfirm: boolean,
    desColor: string,
    starColor: string,
    reasColor: string,
    desWarning: string,
    reasWarning: string,
} 
const info = (messString: string) => {
    message.success(messString);
};
  



//@inject(Stores.jobTypeStore)
@inject(Stores.commentStoreAdmin, Stores.AuthenticationStore)
@observer
export default class CommentList extends AppComponentBase<ICommentListProps, ICommentListState> {

    //user/:id 
    //this.props.path.match.id 


    constructor(props: any) {
        super(props);
        this.state = {
            comment: {
                IDRecruiter: 2,
                IDJobSeeker: 1,
                StarNumber: 0,
                Reason: '',
                Description: '',
                IsRecruiterWrite: true,
            }, 
            isComfirm: false,
            desColor: "transparent",
            starColor: "transparent",
            reasColor: "transparent",
            desWarning: "", 
            reasWarning:"",
        }

    }

    

    // async componentDidMount() {
    //     let getCommentInput: GetCommentInput = {
    //         isRecruiterWrite: false,
    //         ID: 11,
    //     }
    //     console.log("*");

    //     // console.log(this.props.authenticationStore.);
    //      await this.getAllComment(getCommentInput);
        
    // }

    async componentDidMount() {    
         await this.getAllComment(); 
    }

    // Modal = () => {
    //     this.setState({
    //         modalVisible: !this.state.modalVisible,
    //     });
    // };


    async getAllComment() { 
        console.log("vào test");
        await this.props.commentStoreAdmin.getAllCommentTEST(); 
 
        
        console.log(this.props.commentStoreAdmin.Comments);
       
       

    }
 
    async deleteComment(deleteCommentInput: DeleteComment) {
        await this.props.commentStoreAdmin.deleteComment(deleteCommentInput);
    }


    // handleCreate = () => {
    //     this.setState({ isAddJobTypePopupOpen: true })
    // };

    handleDelete = () => {

    }

    closeAllSelectedItem = () => {

    }

    handleEdit = () => {

    }
    handleChangeInput = (event: any) => {
        const { target: { id, value } } = event
        let items = this.state.comment;
        items = JSON.parse(JSON.stringify(items));
        items[`${id}`] = value;
        this.setState(
            { comment: items, }
        );
        this.setState({
                desColor:"transparent",
                reasColor: "transparent",
            });
    }

    

    createCommentAsync = async () =>{ 
         
    }
    

    deleteCommentHandler = async ( _idRecruiter: number,_idJobSeeker: number,_isRecruiterWrite:boolean ) => { 
        var deletecomment: DeleteComment=
        {
          isRecruiterWrite :_isRecruiterWrite,
          idJobSeeker: _idJobSeeker,
          idRecruiter: _idRecruiter,
        }
        await this.props.commentStoreAdmin.deleteComment(deletecomment);  
            await this.getAllComment();
            info("Xóa thành công")
    }
    
    refreshCommentHandler = async () => { 
        await this.props.commentStoreAdmin.getAllCommentTEST(); 
        console.log('refresh')
    }
    handleChange = (StarNumber: number) => {
        let items = this.state.comment;
        items = JSON.parse(JSON.stringify(items));
        items.StarNumber = StarNumber;
        this.setState(
            { comment: items, }
        );
        this.setState({
            starColor:"transparent"
        })
    }

    
    
     


    public render() { 
        
        // const { Comments } = this.props.commentStoreAdmin; 
        // if (Comments === undefined) return (<div>Comments</div >)
        const { TabPane } = Tabs;
        const operations =<Button  className="reload" onClick={this.refreshCommentHandler}><ReloadOutlined/></Button>;
        // let list: ICommentItemAdmin[];
        // list = Comments.items;
        
        // const Appdelete = (_idRecruiter: number,_idJobSeeker: number,_isRecruiterWrite:boolean) => {
        //     const [visible, setVisible] = useState(false);
        //     return (
        //       <>
        //         <Button type="primary" className="save-comment" onClick={() => setVisible(true)}>
        //         Hủy đánh giá
        //         </Button>
        //         <Modal
        //           title="Thông báo!"
        //           centered
        //           visible={visible}
        //           onOk={() => {
        //               setVisible(false);
        //               this.deleteCommentHandler(_idRecruiter,_idJobSeeker,_isRecruiterWrite);
        //             }}
        //           onCancel={() => {
        //               setVisible(false);
        //             }}
        //           width={500}
        //         >
        //           <p>Bạn có muốn xóa nhận xét?</p>
        //         </Modal>
        //       </>
        //     );
        //   };
        var index:any;
        var arr1:ICommentItemAdmin[] = new Array();
        var arr2:ICommentItemAdmin[] = new Array();
        for (index in this.props.commentStoreAdmin.Comments) { 
            console.log(this.props.commentStoreAdmin.Comments[index].isRecruiterWrite+"is");
            if((this.props.commentStoreAdmin.Comments[index].isRecruiterWrite)=='True')
             { arr1.push(this.props.commentStoreAdmin.Comments[index]);
                
             }
             if((this.props.commentStoreAdmin.Comments[index].isRecruiterWrite)=='False')
              {
                  arr2.push(this.props.commentStoreAdmin.Comments[index]);
                  console.log(arr2+"đay là arr2");
              }
       
        }
 
        return (
            <div className="container"> 
                    <div className="view-comment">
          <Tabs defaultActiveKey="1" tabBarExtraContent={operations} > 
           <TabPane tab="Đánh giá nhà tuyển dụng" key="1">
                   <List 
                        itemLayout="horizontal"
                        size="large"
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 10,
                        }} 
                        className="myPagination"
                        dataSource={arr2.filter(m=>m.starNumber!=null&&m.starNumber>0)} 
                        renderItem={item => (
                            
                            <List.Item 
                                
                                actions={[
                                    <div >
                                        <div className="row jobseeker-comment">
                                    <div className="col avt-jobseeker">
                                        {/* <img src="./img/avt1.jpg" alt="avt-jobseeker" /> */}
                                        <Avatar size={50} src={item.jobSeekerImage}/>
                                    </div>
                                    <div className="cmt-title" >
                                        <span className="recruiter-name"><a style={{color:"#5390F5"}}>{item.jobSeekerName}</a></span>
                                        &nbsp;&nbsp;<span className="recruiter-name">{item.recruiterName}</span>
                                        <span>&nbsp;&nbsp;Sửa đổi lúc&nbsp;{item.lastModificationTime}</span>
                                        <span className="star"><Rate value={item.starNumber} disabled style={{color:"black",fontSize:15}}></Rate></span>
                                    </div> 
                                    <div className="row jobseeker-title">
                                    <h2>{item.reason}</h2>
                                    </div>
                                    <div className="row jobseeker-comment-content">
                                            <p>{item.description}</p>
                                    </div>
                                    </div>                                 
                                    </div> 
                                    
                                    
                                ]}
                                extra={
                                    <Button className="buttondelete" onClick={() => this.deleteCommentHandler(item.idRecruiter,item.idJobSeeker,item.isRecruiterWrite)}>
                                    <DeleteFilled className="delete">
                                    </DeleteFilled>
                                    </Button>
                                  } 
                            >  
                            </List.Item>
                        )}
                    />
            </TabPane>
        
           <TabPane tab="Đánh giá người tìm việc" key="2">
                   <List 
                        itemLayout="horizontal"
                        size="large"
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 10,
                        }} 
                        className="myPagination"
                        dataSource={arr1.filter(m=>m.starNumber!=null&&m.starNumber>0)} 
                        renderItem={item => (
                            
                            <List.Item 
                                
                                actions={[
                                    <div className="row jobseeker-comment">
                                    <div className="col avt-jobseeker">
                                        {/* <img src="./img/avt1.jpg" alt="avt-jobseeker" /> */}
                                        <Avatar size={50} src={item.recruiterImage}/>
                                    </div>
                                    <div className="cmt-title" >
                                        <span className="recruiter-name"><a style={{color:"#5390F5"}}>{item.recruiterName}</a></span>
                                        &nbsp;&nbsp;<span className="recruiter-name">{item.jobSeekerName}</span>
                                        <span>&nbsp;&nbsp;Sửa đổi lúc&nbsp;{item.lastModificationTime}</span>
                                        <span className="star"><Rate value={item.starNumber} disabled style={{color:"black",fontSize:15}}></Rate></span>
                                    </div> 
                                    <div className="row jobseeker-title">
                                    <h2>{item.reason}</h2>
                                    </div>
                                    <div className="row jobseeker-comment-content">
                                            <p>{item.description}</p>
                                    </div>
                                           
                                    </div> 
                             
                                    
                                ]} 
                                extra={
                                    <Button className="buttondelete" onClick={() => this.deleteCommentHandler(item.idRecruiter,item.idJobSeeker,item.isRecruiterWrite)}>
                                    <DeleteFilled className="delete">
                                    </DeleteFilled>
                                    </Button>
                                  } 
                            >  
                            </List.Item>
                        )}
                    />
           </TabPane>
       </Tabs>
                

                </div>
            </div>
        )
    }

    handlerAddJobTypeConfirmation = () => {
 
    }

    async getJobTypeByID() { 
    }

    handlerVerifyEditJobTypeConfirmation = () => {

    }

    handlerVerifyDeleteJobTypeConfirmation = () => { 
    }

}
 


 