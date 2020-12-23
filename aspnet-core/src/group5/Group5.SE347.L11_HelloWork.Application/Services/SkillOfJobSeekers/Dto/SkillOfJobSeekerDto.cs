using System;
using System.Collections.Generic;
using System.Text;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SE347.L11_HelloWork.Entities;

namespace Group5.SE347.L11_HelloWork.Application.Services.SkillOfJobSeekers.Dto
{
    [AutoMapFrom(typeof(SkillOfJobSeeker))]
    public class SkillOfJobSeekerDto : EntityDto<int>
    {
        public long? IdSkill { get; set; }
        public long? IdJobSeeker { get; set; }
    }
}
