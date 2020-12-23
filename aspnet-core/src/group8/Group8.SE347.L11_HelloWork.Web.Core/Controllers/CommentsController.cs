using Abp.Application.Services.Dto;
using Abp.AspNetCore.Mvc.Controllers;
using Group8.SE347.L11_HelloWork.Application.Services.CommentService;
using Group8.SE347.L11_HelloWork.Application.Services.CommentService.Dto; 
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Group8.SE347.L11_HelloWork.Web.Core.Controllers
{
    //[Route("api/[controller]/[action]")]
    [ApiController]
    public class CommentsController : AbpController
    {
        private readonly ICommentAppService _commentServiceAppService;

        public CommentsController(ICommentAppService commentServiceAppService)
        {
            _commentServiceAppService = commentServiceAppService;
        }


        [Route("api/Comments/GetCommentsByAdmin")]
        [HttpGet]
        public async Task<dynamic> GetCommentsByAdmin()
        {
            return await _commentServiceAppService.GetCommentAdminsAsync();
        }

        [Route("api/Comments/Gets/{isRecruiterWrite}/{ID}")]
        [HttpGet]
        public async Task<dynamic> Gets(bool isRecruiterWrite, int ID)
        {
            return await _commentServiceAppService.GetCommentsAsync(isRecruiterWrite, ID);
        }
        
        [Route("api/Comments/Get/{isRecruiterWrite}/{ID}")]
        [HttpGet]
        public async Task<dynamic> Get(bool isRecruiterWrite, int ID)
        {
            return await _commentServiceAppService.GetCommentAsync(isRecruiterWrite, ID); 
        }
        [Route("api/Comments/CreateOrUpdate")]
        [HttpPost]
        public async Task<dynamic> CreateOrUpdate(CreateOrUpdateCommentDto input)
        { 
            // Tạo comment trả về một danh sách các comment
            return await _commentServiceAppService.CreateOrUpdateCommentAsync(input); 
        }

        [Route("api/Comments/Delete/{IDRecruiter}/{IDJobSeeker}/{isRecruiterWrite}")]
        [HttpDelete]
        public async Task<IActionResult> Delete(int IDRecruiter, int IDJobSeeker, bool isRecruiterWrite)
        {
            DeleteCommentDto input = new DeleteCommentDto()
            {
                IDRecruiter = IDRecruiter,
                IDJobSeeker = IDJobSeeker,
                isRecruiterWrite = isRecruiterWrite
            };
            await _commentServiceAppService.DeleteCommentAsync(input);
            return NoContent();
        } 
    }
}
