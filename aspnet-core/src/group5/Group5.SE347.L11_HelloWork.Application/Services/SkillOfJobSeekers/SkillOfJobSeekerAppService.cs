using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Group5.SE347.L11_HelloWork.Application.Services.SkillOfJobSeekers.Dto;
using Microsoft.EntityFrameworkCore;
using SE347.L11_HelloWork.Authorization;
using SE347.L11_HelloWork.Entities;
using System.Linq;
using System.Threading.Tasks;

namespace Group5.SE347.L11_HelloWork.Application.Services.SkillOfJobSeekers
{
    public class SkillOfJobSeekerAppService : Group5AppServiceBase, ISkillOfJobSeekerAppService
    {
        private readonly IRepository<SkillOfJobSeeker> _skillRepo;

        public SkillOfJobSeekerAppService(IRepository<SkillOfJobSeeker> skillRepo)
        {
            _skillRepo = skillRepo;
        }

        [AbpAllowAnonymous]
        public async Task<ListResultDto<SkillOfJobSeekerDto>> GetSkillOfJobSeekerAsync(EntityDto<int> input)
        {
            var skills = await _skillRepo.GetAllListAsync(sk => sk.IdJobSeeker == input.Id);
            return new ListResultDto<SkillOfJobSeekerDto>(
                skills.Select(s => ObjectMapper.Map<SkillOfJobSeekerDto>(s)).ToList()
                );
        }
        [AbpAllowAnonymous]
        public async Task<SkillOfJobSeekerDto> CreateSkillOfJobSeekerAsync(CreateSkillOfJobSeekerDto input)
        {
            var skill = ObjectMapper.Map<SkillOfJobSeeker>(input);
            skill = await _skillRepo.InsertAsync(skill);
            await CurrentUnitOfWork.SaveChangesAsync();
            return ObjectMapper.Map<SkillOfJobSeekerDto>(skill);
        }
        [AbpAllowAnonymous]
        public async Task<SkillOfJobSeekerDto> UpdateSkillOfJobSeekerAsync(UpdateSkillOfJobSeekerDto input)
        {
            var skill = await _skillRepo.GetAsync(input.Id);
            ObjectMapper.Map(input, skill);
            var savedSkillOfJobSeeker = await _skillRepo.UpdateAsync(skill);
            return ObjectMapper.Map<SkillOfJobSeekerDto>(savedSkillOfJobSeeker);
        }
        [AbpAllowAnonymous]
        public async Task DeleteSkillOfJobSeekerAsync(EntityDto<int> input)
        {
            await _skillRepo.DeleteAsync(input.Id);
        }
    }
}
