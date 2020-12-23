using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SE347.L11_HelloWork.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Group14.SE347.L11_HelloWork.Application.Services.Sprint3.Dto
{
    [AutoMapFrom(typeof(Recruitment))]
    public class GetRecruitmentByInfo :EntityDto<int>
    {

        public string Name { get; set; }
        public DateTime FinishDate { get; set; }
        public string WayOfWork { get; set; }
        public string SalaryRange { get; set; }
        public string UrgentLevel { get; set; }
        public string Description { get; set; }
        public string Requirement { get; set; }
        public string ContactEmail { get; set; }
        public string State { get; set; }
        public long CreatorUserId { get; set; }
        public string Status { get; set; }
    }
}
