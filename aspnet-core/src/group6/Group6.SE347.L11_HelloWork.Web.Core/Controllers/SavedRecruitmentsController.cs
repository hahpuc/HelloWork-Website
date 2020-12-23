using Abp.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using Group6.SE347.L11_HelloWork.Application.Services.SavedRecruitments;
using System.Threading.Tasks;
using Group6.SE347.L11_HelloWork.Application.Services.SavedRecruitments.Dto;
using Abp.Application.Services.Dto;

namespace Group6.SE347.L11_HelloWork.Web.Core.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SavedRecruitmentsController : Group6ControllerBase
    {

        private readonly ISavedRecruitmentAppService _savedRecruitmentAppService;

        public SavedRecruitmentsController(ISavedRecruitmentAppService savedRecruitmentAppService)
        {
            _savedRecruitmentAppService = savedRecruitmentAppService;
        }
        [HttpGet("{UserId}", Name = "GetSavedRecruitmentByUserId")]
        public async Task<ListResultDto<SavedRecruitmentDto>> GetByUserId(long UserId)
        {
            return await _savedRecruitmentAppService.GetSavedRecruitmentsByUserIdAsync(UserId);
        }
        [HttpPost]
        public async Task<SavedRecruitmentDto> Create(CreateSavedRecruitmentDto input)
        {
            return await _savedRecruitmentAppService.CreateSavedRecruitmentAsync(input);
        }
        [HttpDelete("{RecruitmentId},{UserId}")]
        public async Task<IActionResult> Delete(long RecruitmentId, long UserId)
        {
            try
            {
                await _savedRecruitmentAppService.DeleteSavedRecruitmentAsync(RecruitmentId,UserId);
                return NoContent();
            }
            catch
            {
                return NotFound();
            }
        }
    }
}
