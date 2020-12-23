using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Group5.SE347.L11_HelloWork.Application.Services.OrientationOfJobSeekers.Dto;
using Microsoft.EntityFrameworkCore;
using SE347.L11_HelloWork.Authorization;
using SE347.L11_HelloWork.Entities;
using System.Linq;
using System.Threading.Tasks;

namespace Group5.SE347.L11_HelloWork.Application.Services.OrientationOfJobSeekers
{
    public class OrientationOfJobSeekerAppService : Group5AppServiceBase, IOrientationOfJobSeekerAppService
    {
        private readonly IRepository<OrientationOfJobSeeker> _orientationRepo;

        public OrientationOfJobSeekerAppService(IRepository<OrientationOfJobSeeker> orientationRepo)
        {
            _orientationRepo = orientationRepo;
        }

        [AbpAllowAnonymous]
        public async Task<ListResultDto<OrientationOfJobSeekerDto>> GetOrientationOfJobSeekerAsync(EntityDto<int> input)
        {
            var orientations = await _orientationRepo.GetAllListAsync(sk => sk.IdJobSeeker == input.Id);
            return new ListResultDto<OrientationOfJobSeekerDto>(
                orientations.Select(s => ObjectMapper.Map<OrientationOfJobSeekerDto>(s)).ToList()
                );
        }
        [AbpAllowAnonymous]
        public async Task<OrientationOfJobSeekerDto> CreateOrientationOfJobSeekerAsync(CreateOrientationOfJobSeekerDto input)
        {
            var orientation = ObjectMapper.Map<OrientationOfJobSeeker>(input);
            orientation = await _orientationRepo.InsertAsync(orientation);
            await CurrentUnitOfWork.SaveChangesAsync();
            return ObjectMapper.Map<OrientationOfJobSeekerDto>(orientation);
        }
        [AbpAllowAnonymous]
        public async Task<OrientationOfJobSeekerDto> UpdateOrientationOfJobSeekerAsync(UpdateOrientationOfJobSeekerDto input)
        {
            var orientation = await _orientationRepo.GetAsync(input.Id);
            ObjectMapper.Map(input, orientation);
            var savedOrientationOfJobSeeker = await _orientationRepo.UpdateAsync(orientation);
            return ObjectMapper.Map<OrientationOfJobSeekerDto>(savedOrientationOfJobSeeker);
        }
        [AbpAllowAnonymous]
        public async Task DeleteOrientationOfJobSeekerAsync(EntityDto<int> input)
        {
            await _orientationRepo.DeleteAsync(input.Id);
        }
    }
}
