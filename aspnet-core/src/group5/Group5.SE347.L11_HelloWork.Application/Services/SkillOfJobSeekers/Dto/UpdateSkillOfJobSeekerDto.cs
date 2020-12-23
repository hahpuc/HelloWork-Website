using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SE347.L11_HelloWork.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
namespace Group5.SE347.L11_HelloWork.Application.Services.SkillOfJobSeekers.Dto
{
    [AutoMapTo(typeof(SkillOfJobSeeker))]
    public class UpdateSkillOfJobSeekerDto
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Id { get; set; }
        [Required]
        public long? IdSkill { get; set; }
        [Required]
        public long? IdJobSeeker { get; set; }
    }
}
