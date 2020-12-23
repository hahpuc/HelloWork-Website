using Abp.AutoMapper;
using SE347.L11_HelloWork.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Group8.SE347.L11_HelloWork.Application.Services.CommentService.Dto
{
    [AutoMapTo(typeof(Comment))]
    public class CreateCommentDto
    {
        [Required]
        [Range(1, long.MaxValue)]
        public long? IDRecruiter { get; set; }
        [Required]
        [Range(1, long.MaxValue)]
        public long? IDJobSeeker { get; set; }
        [Required]
        public float? StarNumber { get; set; }
        [Required]
        public string Reason { get; set; }
        [Required]
        public string Description { get; set; }

    }
}
