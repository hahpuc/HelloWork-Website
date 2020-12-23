using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Group5.SE347.L11_HelloWork.Application.Services.SkillOfJobSeekers.Dto;
using System.Threading.Tasks;

namespace Group5.SE347.L11_HelloWork.Application.Services.SkillOfJobSeekers
{
    public interface ISkillOfJobSeekerAppService : IApplicationService
    {
        Task<ListResultDto<SkillOfJobSeekerDto>> GetSkillOfJobSeekerAsync(EntityDto<int> input);
        Task<SkillOfJobSeekerDto> CreateSkillOfJobSeekerAsync(CreateSkillOfJobSeekerDto input);
        Task<SkillOfJobSeekerDto> UpdateSkillOfJobSeekerAsync(UpdateSkillOfJobSeekerDto input);
        Task DeleteSkillOfJobSeekerAsync(EntityDto<int> input);
    }
}