using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Group4.SE347.L11_HelloWork.Application.Services.CVEmployeeInformations.Dto;
using SE347.L11_HelloWork.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Group4.SE347.L11_HelloWork.Application.Services.AchievementDetails.Dto
{
    [AutoMapFrom(typeof(AchievementDetail))]
    public class AchievementDetailDto:EntityDto<int>
    {
        public string Name { get; set; }
        public string Organization { get; set; }
        public string Period { get; set; }
        public string Content { get; set; }
        public CVEmployeeInformationDto CVDto { get; set; }
    }
}
