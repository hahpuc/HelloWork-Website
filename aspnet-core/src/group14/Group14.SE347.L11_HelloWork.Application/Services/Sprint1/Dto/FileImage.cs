using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Microsoft.AspNetCore.Http;
using SE347.L11_HelloWork.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Group14.SE347.L11_HelloWork.Application.Services.Sprint1.Dto
{
    [AutoMapFrom(typeof(UserInfo))]
    public class FileImage
    {
        public string Key { get; set; }
        public string Value { get; set; }
    }
}
