using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SE347.L11_HelloWork.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Group8.SE347.L11_HelloWork.Application.Services.CommentService.Dto
{
    [AutoMapFrom(typeof(Comment))]
    public class CommentAdminDto : EntityDto<int>
    {
        public string Reason { get; set; }
        public string Description { get; set; }
        public float? StarNumber { get; set; }

        public int IDJobSeeker { get; set; }
        public string JobSeekerName { get; set; }
        public int IDRecruiter { get; set; }
        public string RecruiterName { get; set; }
        public bool isRecruiterWrite { get; set; }

        public DateTime? LastModificationTime { get; set; }
        public string RecruiterImage { get; set; }
        public string JobSeekerImage { get; set; }
    }
}
