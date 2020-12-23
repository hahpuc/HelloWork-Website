import { action, observable } from 'mobx';  
//import { GetById } from '../services/dto/CommentDTO/getCommentById';


import CommentService from '../services/CommentService' 
import { DeleteComment } from '../services/dto/CommentDTO/deleteComment';
import { GetAllCommentAdminOutput } from '../services/dto/CommentDTO/getAllCommentAdminOutput';
  

export interface ICommentItemAdmin {
    reason: string,
    description: string,
    starNumber: number,
    idRecruiter: number,
    recruiterName: string,
    recruiterCompanyName: string,
    lastModificationTime: string,
    recruiterImage: string,
    idJobSeeker: 1,
    jobSeekerImage: string,
    jobSeekerName: string,
    isRecruiterWrite: boolean,
    id: string
}

class CommentStoreAdmin {

    @observable Comments!: GetAllCommentAdminOutput<ICommentItemAdmin>;
    @observable Comment!: ICommentItemAdmin; 

    @action
    async getAllCommentTEST(){
        console.log("vào rồixxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        let result = await CommentService.getAllCommentAdmin();  
        this.Comments = result; 
        console.log(this.Comments.items)

        console.log("vào rồixxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    }
 

    @action
    async test(){
        console.log("vào rồixxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxsss");
        this.Comments = await CommentService.getAllCommentAdmin(); 
        console.log("vào rồixxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    }

    
    @action
    async deleteComment(deleteComment: DeleteComment) {
        await CommentService.delete(deleteComment);
        // this.Comments.items = this.Comments.items.filter((x: EntityDto) => x.id !== entityDto.id);
    }

    

}

export default CommentStoreAdmin;
