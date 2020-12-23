using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Microsoft.EntityFrameworkCore;
using SE347.L11_HelloWork.Authorization;
using SE347.L11_HelloWork.Entities;
using SE347.L11_HelloWork;
using Group6.SE347.L11_HelloWork.Application.Services.UserInfos.Dto;
using System.Linq;
using System.Threading.Tasks;

namespace Group6.SE347.L11_HelloWork.Application.Services.UserInfos
{
    public class UserInfoAppService : Group6AppServiceBase, IUserInfoAppService
    {
        private readonly IRepository<UserInfo> _userInfoRepo;

        public UserInfoAppService(IRepository<UserInfo> userInfoRepo)
        {
            _userInfoRepo = userInfoRepo;
        }
         

        [AbpAllowAnonymous]
        public async Task<ListResultDto<UserInfoDto>> GetUserInfosAsync(long UserId)
        {
            var expertise = await _userInfoRepo.GetAllListAsync();

            return new ListResultDto<UserInfoDto>(
                expertise.Where(ept => ept.IsDeleted == false && ept.UserId == UserId
                &&(ept.Key== "CompanyName" || ept.Key == "AddressProvince" || ept.Key == "AddressDetail"))
                .Select(ept => ObjectMapper.Map<UserInfoDto>(ept)).ToList()
            );
        }

    }
}
