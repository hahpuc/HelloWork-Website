using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Group5.SE347.L11_HelloWork.Application.Services.OrientationOfJobSeekers.Dto;
using System.Threading.Tasks;

namespace Group5.SE347.L11_HelloWork.Application.Services.OrientationOfJobSeekers
{
    public interface IOrientationOfJobSeekerAppService : IApplicationService
    {
        Task<ListResultDto<OrientationOfJobSeekerDto>> GetOrientationOfJobSeekerAsync(EntityDto<int> input);
        Task<OrientationOfJobSeekerDto> CreateOrientationOfJobSeekerAsync(CreateOrientationOfJobSeekerDto input);
        Task<OrientationOfJobSeekerDto> UpdateOrientationOfJobSeekerAsync(UpdateOrientationOfJobSeekerDto input);
        Task DeleteOrientationOfJobSeekerAsync(EntityDto<int> input);
    }
}