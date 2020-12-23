using Abp.Application.Services.Dto;
using Abp.AspNetCore.Mvc.Controllers;
using Group5.SE347.L11_HelloWork.Application.Services.SkillOfJobSeekers;
using Group5.SE347.L11_HelloWork.Application.Services.SkillOfJobSeekers.Dto;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Group5.SE347.L11_HelloWork.Web.Core.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SkillOfJobSeekerController : AbpController
    {
        private readonly ISkillOfJobSeekerAppService _skillAppService;

        public SkillOfJobSeekerController(ISkillOfJobSeekerAppService skillAppService)
        {
            _skillAppService = skillAppService;
        }

        [HttpGet("{id}", Name = "GetSkillOfJobSeeker")]
        public async Task<ListResultDto<SkillOfJobSeekerDto>> Get(int id)
        {
            return await _skillAppService.GetSkillOfJobSeekerAsync(new EntityDto<int>(id));
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateSkillOfJobSeekerDto input)
        {
            var newSkillOfJobSeeker = await _skillAppService.CreateSkillOfJobSeekerAsync(input);
            return CreatedAtRoute("GetSkillOfJobSeeker", new { id = newSkillOfJobSeeker.Id }, newSkillOfJobSeeker);
        }

        [HttpPut]
        public async Task<SkillOfJobSeekerDto> Update(UpdateSkillOfJobSeekerDto input)
        {
            return await _skillAppService.UpdateSkillOfJobSeekerAsync(input);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _skillAppService.DeleteSkillOfJobSeekerAsync(new EntityDto<int>(id));
            return NoContent();
        }
    }
}
