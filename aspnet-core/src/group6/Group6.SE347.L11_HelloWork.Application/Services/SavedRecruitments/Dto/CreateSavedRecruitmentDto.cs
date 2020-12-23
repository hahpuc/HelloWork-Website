using SE347.L11_HelloWork.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using Abp.AutoMapper;
using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;

namespace Group6.SE347.L11_HelloWork.Application.Services.SavedRecruitments.Dto
{
    [AutoMapTo(typeof(SavedRecruitment))]
    public class CreateSavedRecruitmentDto
    {
        [Required]
        public long RecruitmentId { get; set; }

        [Required]
        public long CreatorUserId { get; set; }
    }
}
