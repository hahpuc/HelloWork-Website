using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Castle.DynamicProxy.Contributors;
using Group8.SE347.L11_HelloWork.Application.Services.CommentService.Dto;
using Microsoft.EntityFrameworkCore;
using SE347.L11_HelloWork;
using SE347.L11_HelloWork.Authorization;
using SE347.L11_HelloWork.Entities;
using SE347.L11_HelloWork.IRepositories.group8;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Group8.SE347.L11_HelloWork.Application.Services.CommentService
{
    public class CommentAppService : Group8AppServiceBase, ICommentAppService
    {
        private readonly ICommentRepository _commentRepo; 

        public CommentAppService(ICommentRepository commentRepo)
        {
            _commentRepo = commentRepo; 
        }


        [AbpAllowAnonymous]
        public async Task<dynamic> GetCommentAsync(bool isRecruiterWrite, int ID)
        {
            // Id user hiện tại, không liên kết với Recruiter và JobSeeker  
            var IDWrite = Convert.ToInt32(this.AbpSession.UserId.ToString());



            var comment = new Comment() { IDJobSeeker = isRecruiterWrite?ID:IDWrite, IDRecruiter = !isRecruiterWrite ? ID : IDWrite, IsRecruiterWrite = isRecruiterWrite };

            comment = await _commentRepo.GetCommentByCommentProperty(comment);
            if (comment == null)
                return new CommentAdminDto()
                {
                    IDRecruiter = !isRecruiterWrite ? ID : IDWrite,
                    IDJobSeeker = isRecruiterWrite ? ID : IDWrite,
                    isRecruiterWrite = isRecruiterWrite
                };
            dynamic result;
            if (comment.IsRecruiterWrite)
            {
                result = ObjectMapper.Map<JobSeekerCommentDto>(comment);
            }
            else
            {
                result = ObjectMapper.Map<RecruiterCommentDto>(comment);
            }
            return result;
        }

        [AbpAllowAnonymous]
        public async Task<dynamic> GetCommentsAsync(bool isRecruiterWrite, int ID)
        {

            var comments = await _commentRepo.GetComments(isRecruiterWrite, ID);
            
            if(comments.Count() <= 0)
            {
                comments = new List<Comment>()
                {
                    new Comment()
                    {
                        IDRecruiter = isRecruiterWrite?Convert.ToInt32(this.AbpSession.UserId.ToString()):ID,
                        IDJobSeeker = !isRecruiterWrite?Convert.ToInt32(this.AbpSession.UserId.ToString()):ID,
                        IsRecruiterWrite = isRecruiterWrite
                    }
                };
            }

            dynamic CommentList;

            if (isRecruiterWrite)
            {
                CommentList = new ListResultDto<RecruiterCommentDto>(
                    comments.Select(cmt => ObjectMapper.Map<RecruiterCommentDto>(cmt))
                            .OrderByDescending(cmt => cmt.LastModificationTime)
                            .ToList());
            }
            else
            {
                CommentList = new ListResultDto<JobSeekerCommentDto>(
                    comments.Select(cmt => ObjectMapper.Map<JobSeekerCommentDto>(cmt))
                            .OrderByDescending(cmt => cmt.LastModificationTime)
                            .ToList());
            }
            return CommentList;
        }

        //[AbpAuthorize(PermissionNames.Pages_Group8_Comment_Create_Or_Update)]
        [AbpAllowAnonymous]
        public async Task<dynamic> CreateOrUpdateCommentAsync(CreateOrUpdateCommentDto input)
        {
            try
            {
                var comments = await _commentRepo.GetAllListAsync();

                var comment = comments.FirstOrDefault(cmt => cmt.IsRecruiterWrite == input.IsRecruiterWrite 
                && cmt.IDJobSeeker == input.IDJobSeeker && cmt.IDRecruiter == input.IDRecruiter);

                if (comment == null)
                {
                    await _commentRepo.InsertAsync(ObjectMapper.Map<Comment>(input));
                }
                else
                {
                    ObjectMapper.Map(input, comment);
                    await _commentRepo.UpdateAsync(comment);
                } 
                
            }
            catch (Exception)
            {
                
            }
            finally{
            }
            return await  GetCommentsAsync(input.IsRecruiterWrite, input.IsRecruiterWrite?input.IDJobSeeker:input.IDRecruiter);

        }
           
        //[AbpAuthorize(PermissionNames.Pages_Group8_Comment_Delete)]
        [AbpAllowAnonymous]
        public async Task DeleteCommentAsync(DeleteCommentDto input)
        {   
            var commentUpdateOrDeleteDto = new CreateOrUpdateCommentDto()
            {
                IDJobSeeker = input.IDJobSeeker,
                IDRecruiter = input.IDRecruiter,
                IsRecruiterWrite = input.isRecruiterWrite,
                Reason = "",
                Description = "",
                StarNumber = 0
            };

            await CreateOrUpdateCommentAsync(commentUpdateOrDeleteDto);
        }
 


        public async Task<dynamic> GetAllComment()
        {
            var comments = await _commentRepo.GetAllListAsync();
            var CommentList = new ListResultDto<JobSeekerCommentDto>(
                    comments.Where(m=>m.IsRecruiterWrite == false)
                            .Select(cmt => ObjectMapper.Map<JobSeekerCommentDto>(cmt))
                            .OrderByDescending(cmt => cmt.LastModificationTime)
                            .ToList());
   

            return CommentList;
        }

        [AbpAllowAnonymous]
        public async Task<dynamic> GetCommentAdminsAsync()
        {
            var CommentList = await _commentRepo.GetAll()
                                .Include(cmt => cmt.JobSeeker)
                                .Include(cmt=>cmt.Recruiter)
                                .ToListAsync();

            //var CommentList = await _commentRepo.GetAllComment();

            var CommentAdminList = CommentList.Select(cmt => ObjectMapper.Map<RecruiterCommentDto>(cmt))
                                .OrderByDescending(cmt => cmt.LastModificationTime)
                                .ToList(); 
            return CommentAdminList;
        }
    }
}
