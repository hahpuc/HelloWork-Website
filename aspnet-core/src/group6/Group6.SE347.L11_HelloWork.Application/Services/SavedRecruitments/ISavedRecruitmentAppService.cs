using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Group6.SE347.L11_HelloWork.Application.Services.SavedRecruitments.Dto;
using System.Threading.Tasks;

namespace Group6.SE347.L11_HelloWork.Application.Services.SavedRecruitments
{
    public interface ISavedRecruitmentAppService : IApplicationService
    {
        Task<ListResultDto<SavedRecruitmentDto>> GetSavedRecruitmentsByUserIdAsync(long UserId);
        Task DeleteSavedRecruitmentAsync(long RecruitmentId, long UserId);
        Task<SavedRecruitmentDto> CreateSavedRecruitmentAsync(CreateSavedRecruitmentDto input);
    }
}
