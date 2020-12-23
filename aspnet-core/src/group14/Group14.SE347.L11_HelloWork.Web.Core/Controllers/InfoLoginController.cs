using Abp.AspNetCore.Mvc.Controllers;
using Group14.SE347.L11_HelloWork.Application.Services.Sprint1;
using Group14.SE347.L11_HelloWork.Application.Services.Sprint1.Dto;
using Microsoft.AspNetCore.Mvc;
using SE347.L11_HelloWork.Authorization.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.IO;
using SE347.L11_HelloWork.Entities;
using Group3.SE347.L11_HelloWork.Application.Services._UserService;
using Abp.Domain.Repositories;

namespace Group14.SE347.L11_HelloWork.Web.Core.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class InfoLoginController : AbpController
    {
        private readonly IInforLoginAppService _inforLoginAppService;

        public InfoLoginController(IInforLoginAppService inforLoginAppService)
        {
            _inforLoginAppService = inforLoginAppService;
        }

        [HttpPut]
        public async Task<UserDTO> Update(UpdateInfoLoginInputDto input)
        {
            return await _inforLoginAppService.UpdateInfoLoginAsync(input);
        }

        [HttpPut]
        public async Task<UserDTO> SendMail(SendMailDto input)
        {
            return await _inforLoginAppService.SendCodeVerifyMail(input, Request.Headers["origin"]);
        }

        [HttpPost]
        public async Task<bool> ConfirmMail(VerifyEmailRequest input)
        {
            return await _inforLoginAppService.ConfirmMail(input);
        }
        [HttpPost]
        public async Task<UserInfo> ConfirmBusiness(IFormFile input, int id)
        {
            return await _inforLoginAppService.UploadFile(input, id);
        }
        [HttpGet("{id}")]
        public async Task<List<UserInfo>> GetUserInfoById(int id)
        {
            return await _inforLoginAppService.GetUserInfo(id);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetStateBusiness(int id)
        {
            var count = await _inforLoginAppService.GetStateBusiness(id);
            if (count <= 0)
                return Ok("Trạng Thái Chưa Xác Minh");
            else if(count < 2)
                return Ok("Trạng Thái Cần Xác Minh Lại");
            else 
                return Ok("Trạng Thái Đã Xác Minh");
        }
        [HttpDelete("{file}")]
        public async Task<IActionResult> DeleteFile(string file)
        {
             await _inforLoginAppService.DeleteFile(file);
            return NoContent();
        }
    }
}
