using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Microsoft.EntityFrameworkCore;
using SE347.L11_HelloWork.Authorization;
using SE347.L11_HelloWork.Entities;
using SE347.L11_HelloWork;
using Group6.SE347.L11_HelloWork.Application.Services.SavedRecruitments.Dto;
using System.Linq;
using System.Threading.Tasks;

namespace Group6.SE347.L11_HelloWork.Application.Services.SavedRecruitments
{
    public class SavedRecruitmentAppService : Group6AppServiceBase, ISavedRecruitmentAppService
    {
        private readonly IRepository<SavedRecruitment> _savedRecruitmentRepo;

        public SavedRecruitmentAppService(IRepository<SavedRecruitment> savedRecruitmentRepo)
        {
            _savedRecruitmentRepo = savedRecruitmentRepo;
        }

        [AbpAuthorize(PermissionNames.Pages_Users)]
        public async Task<SavedRecruitmentDto> CreateSavedRecruitmentAsync(CreateSavedRecruitmentDto input)
        {
            var savedrecruitment = ObjectMapper.Map<SavedRecruitment>(input);
            savedrecruitment = await _savedRecruitmentRepo.InsertAsync(savedrecruitment);
            await CurrentUnitOfWork.SaveChangesAsync();
            return ObjectMapper.Map<SavedRecruitmentDto>(savedrecruitment);
        }
        public async Task DeleteSavedRecruitmentAsync(long RecruitmentId, long UserId)
        {
            var savedrecruitment = await _savedRecruitmentRepo.FirstOrDefaultAsync(sr => sr.RecruitmentId == RecruitmentId && sr.CreatorUserId == UserId);
            await _savedRecruitmentRepo.DeleteAsync(savedrecruitment);
            await CurrentUnitOfWork.SaveChangesAsync();
        }
        [AbpAuthorize(PermissionNames.Pages_Users)]
        public async Task<ListResultDto<SavedRecruitmentDto>> GetSavedRecruitmentsByUserIdAsync(long UserId)
        {
            var savedrecruitment = await _savedRecruitmentRepo.GetAllListAsync();

            return new ListResultDto<SavedRecruitmentDto>(
                savedrecruitment.Where(ept => ept.CreatorUserId == UserId).Select(ept => ObjectMapper.Map<SavedRecruitmentDto>(ept)).ToList()
            );
        }

    }
}
