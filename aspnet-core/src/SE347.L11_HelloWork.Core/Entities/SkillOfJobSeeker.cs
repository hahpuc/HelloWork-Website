using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections;
using System.Collections.Generic;

namespace SE347.L11_HelloWork.Entities
{
    public class SkillOfJobSeeker : Entity<int>, IFullAudited
    {
        public int? IdSkill { get; set; }
        public int? IdJobSeeker { get; set; }

        public long? CreatorUserId { get; set; }
        public DateTime CreationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? DeleterUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public bool IsDeleted { get; set; }
    }
}
