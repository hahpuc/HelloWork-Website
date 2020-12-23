using Abp.Auditing;
using Abp.Authorization.Users;
using Abp.AutoMapper;
using SE347.L11_HelloWork.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Group3.SE347.L11_HelloWork.Application.Services._UserService.Dto
{
    [AutoMapTo(typeof(User))]
    public class CreateEmployerInputDto: CreateUserInputDto
    {
        public string CompanyName { get; set; }
        public string CompanyField { get; set; }
        public string CompanySize { get; set; }
        public string CompanyPosition { get; set; }
        public string CompanyWebsite { get; set; }
        public string CompanyDescription { get; set; }
    }
}
