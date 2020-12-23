using System;
using System.Collections.Generic;
using System.Text;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SE347.L11_HelloWork.Entities;

namespace Group5.SE347.L11_HelloWork.Application.Services.OrientationOfJobSeekers.Dto
{
    [AutoMapFrom(typeof(OrientationOfJobSeeker))]
    public class OrientationOfJobSeekerDto : EntityDto<int>
    {
        public long? IdOrientation { get; set; }
        public long? IdJobSeeker { get; set; }
    }
}
