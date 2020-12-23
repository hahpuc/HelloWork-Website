using Abp.AutoMapper;
using SE347.L11_HelloWork.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Group14.SE347.L11_HelloWork.Application.Services.Sprint1.Dto
{
    [AutoMapTo(typeof(User))]
    public class UpdateInfoLoginInputDto
    {
        [Required]
        [Range(1, long.MaxValue)]
        public long Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
        [Required]
        public string EmailAddress { get; set; }
    }
}
