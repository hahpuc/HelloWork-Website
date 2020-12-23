using SE347.L11_HelloWork.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using Abp.AutoMapper;
using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
namespace Group6.SE347.L11_HelloWork.Application.Services.UserInfos.Dto
{
    [AutoMapFrom(typeof(UserInfo))]
    public class UserInfoDto
    {

        public long UserId { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public bool IsDeleted { get; set; }

    }
}
