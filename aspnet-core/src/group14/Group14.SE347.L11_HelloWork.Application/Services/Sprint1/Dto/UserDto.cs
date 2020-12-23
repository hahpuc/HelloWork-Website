using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SE347.L11_HelloWork.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace Group14.SE347.L11_HelloWork.Application.Services.Sprint1.Dto
{
    [AutoMapFrom(typeof(User))]
    public class UserDTO : EntityDto<long>
    {
        public string UserName { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public int IsEmailConfirmed { get; set; }

        public string EmailConfirmationCode { get; set; }
    }
}
