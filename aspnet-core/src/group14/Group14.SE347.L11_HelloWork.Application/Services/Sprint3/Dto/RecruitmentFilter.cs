using Abp.AutoMapper;
using SE347.L11_HelloWork.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Group14.SE347.L11_HelloWork.Application.Services.Sprint3.Dto
{
    public class RecruitmentFilter
    { 
        public int Id { get; set; }
        public string Name { get; set; }
        public string Recruitment { get; set; }
        public string WayOfWork { get; set; }
        public string SalaryRange { get; set; }
        public string State { get; set; }
        public string Status { get; set; }
    }
}
