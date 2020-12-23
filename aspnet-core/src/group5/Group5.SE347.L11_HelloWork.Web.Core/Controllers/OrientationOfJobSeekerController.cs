using Abp.Application.Services.Dto;
using Abp.AspNetCore.Mvc.Controllers;
using Group5.SE347.L11_HelloWork.Application.Services.OrientationOfJobSeekers;
using Group5.SE347.L11_HelloWork.Application.Services.OrientationOfJobSeekers.Dto;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Group5.SE347.L11_HelloWork.Web.Core.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrientationOfJobSeekerController : AbpController
    {
        private readonly IOrientationOfJobSeekerAppService _orientationAppService;

        public OrientationOfJobSeekerController(IOrientationOfJobSeekerAppService orientationAppService)
        {
            _orientationAppService = orientationAppService;
        }

        [HttpGet("{id}", Name = "GetOrientationOfJobSeeker")]
        public async Task<ListResultDto<OrientationOfJobSeekerDto>> Get(int id)
        {
            return await _orientationAppService.GetOrientationOfJobSeekerAsync(new EntityDto<int>(id));
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateOrientationOfJobSeekerDto input)
        {
            var newOrientationOfJobSeeker = await _orientationAppService.CreateOrientationOfJobSeekerAsync(input);
            return CreatedAtRoute("GetOrientationOfJobSeeker", new { id = newOrientationOfJobSeeker.Id }, newOrientationOfJobSeeker);
        }

        [HttpPut]
        public async Task<OrientationOfJobSeekerDto> Update(UpdateOrientationOfJobSeekerDto input)
        {
            return await _orientationAppService.UpdateOrientationOfJobSeekerAsync(input);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _orientationAppService.DeleteOrientationOfJobSeekerAsync(new EntityDto<int>(id));
            return NoContent();
        }
    }
}
