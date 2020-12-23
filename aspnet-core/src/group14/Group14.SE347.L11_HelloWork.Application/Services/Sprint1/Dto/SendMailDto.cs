using Abp.AutoMapper;
using SE347.L11_HelloWork.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Group14.SE347.L11_HelloWork.Application.Services.Sprint1.Dto
{
    [AutoMapTo(typeof(User))]
    public class SendMailDto
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Id { get; set; }

    }
}
