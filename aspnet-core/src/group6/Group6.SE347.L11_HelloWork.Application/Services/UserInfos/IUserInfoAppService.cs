using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Group6.SE347.L11_HelloWork.Application.Services.UserInfos.Dto;
using System.Threading.Tasks;

namespace Group6.SE347.L11_HelloWork.Application.Services.UserInfos
{
    public interface IUserInfoAppService : IApplicationService
    {
        Task<ListResultDto<UserInfoDto>> GetUserInfosAsync(long UserId);
    }
}
