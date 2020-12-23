using Abp.Application.Services;
using Group14.SE347.L11_HelloWork.Application.Services.Sprint1.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SE347.L11_HelloWork.Authorization.Users;
using SE347.L11_HelloWork.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Group14.SE347.L11_HelloWork.Application.Services.Sprint1
{
    public interface IInforLoginAppService : IApplicationService
    {
        //Task<UserDTO> UpdateInfoLoginAsync(UpdateInfoLoginInputDto input);
        Task<UserDTO> UpdateInfoLoginAsync(UpdateInfoLoginInputDto input);

        Task<UserDTO> SendCodeVerifyMail(SendMailDto input, string origin);

        Task<bool> ConfirmMail(VerifyEmailRequest input);

        Task<UserInfo> UploadFile(IFormFile input, int id);

        Task<List<UserInfo>> GetUserInfo(int id);

        Task<int> GetStateBusiness(int id);

        Task DeleteFile(string filename);
    }
}
