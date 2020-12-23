using Abp.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using Group6.SE347.L11_HelloWork.Application.Services.UserInfos;
using System.Threading.Tasks;
using Group6.SE347.L11_HelloWork.Application.Services.UserInfos.Dto;
using Abp.Application.Services.Dto;

namespace Group6.SE347.L11_HelloWork.Web.Core.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserInfosController : Group6ControllerBase
    {

        private readonly IUserInfoAppService _userInfoAppService;

        public UserInfosController(IUserInfoAppService userInfoAppService)
        {
            _userInfoAppService = userInfoAppService;
        }
        [HttpGet("{UserId}", Name = "GetUserInfosByUserId")]
        public async Task<ListResultDto<UserInfoDto>> Get(long UserId)
        {
            return await _userInfoAppService.GetUserInfosAsync(UserId);
        }

    }
}
