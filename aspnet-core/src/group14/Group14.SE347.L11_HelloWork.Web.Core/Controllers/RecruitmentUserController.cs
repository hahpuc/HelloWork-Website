using Abp.Application.Services.Dto;
using Abp.AspNetCore.Mvc.Controllers;
using Abp.Domain.Entities;
using Group14.SE347.L11_HelloWork.Application.Services.Sprint3;
using Group14.SE347.L11_HelloWork.Application.Services.Sprint3.Dto;
using Microsoft.AspNetCore.Mvc;
using SE347.L11_HelloWork.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Group14.SE347.L11_HelloWork.Web.Core.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class RecruitmentUserController : AbpController
    {
        private readonly IRecruitmentAppService _recruimentAppService;

        public RecruitmentUserController(IRecruitmentAppService recruimentAppService)
        {
            _recruimentAppService = recruimentAppService;
        }

        [HttpGet("{id}")]
        public async Task<List<GetRecruitmentByInfo>> Get(int id)
        {
            return await _recruimentAppService.GetRecruitmentOfUserAsync(new EntityDto<int>(id));
        }
        [HttpGet("{id}")]
        public async Task<List<GetRecruitmentByInfo>> Filter(int id, int Maso, string Name, string Recuitment, string WayOfWork, string SalaryRange, string State, string Status)
        {
            return await _recruimentAppService.GetWithFilter(new EntityDto<int>(id), new RecruitmentFilter() { Id = Maso, Name = Name, Recruitment = Recuitment, WayOfWork = WayOfWork, SalaryRange = SalaryRange, State = State, Status = Status});
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, List<RecruitmentCancelDto> recruiment)
        {
            for(int i = 0; i < recruiment.Count; i++)
            {
                await _recruimentAppService.DeleteSavedRecruiment(id, recruiment[i]);
            }    
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Cancel(int id, List<RecruitmentCancelDto> recruiment)
        {
            for (int i = 0; i < recruiment.Count; i++)
            {
                await _recruimentAppService.RecruitmentCancel(id, recruiment[i]);
            }
            return NoContent();
        }
    }
}
