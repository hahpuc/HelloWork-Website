using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using SE347.L11_HelloWork.Authorization.Users;

namespace SE347.L11_HelloWork.Entities
{
    public class UserInfo : Entity<int>, IFullAudited
    {
        public const string ADDRESS_PROVINCE = "AddressProvince";
        public const string ADDRESS_DETAIL = "AddressDetail";
        public const string IDENTIFY_NUMBER = "IdentifyNumber";
        public const string IS_EMPLOYER = "IsEmployer";
        public const string BIRTHDAY = "Birthday";
        public const string PHONE_NUMBER = "PhoneNumber";
        public const string ACCOUNT_TYPE = "AccountType"; // 0 NTD, 1 NTV
        public const string PUBLIC_STATUS = "PublicStatus";
        public const string NTV_CONFIRM_STATUS = "NTVConfirmStatus";
        public const string COMPANY_NAME = "CompanyName";
        public const string COMPANY_FIELD = "CompanyField";
        public const string COMPANY_SIZE = "CompanySize";
        public const string COMPANY_POSITION = "CompanyPosition";
        public const string COMPANY_WEBSITE = "CompanyWebsite";
        public const string COMPANY_DESCRIPTION = "CompanyDescription";
        public const string COMPANY_CONFIRM = "CompanyConfirm";

        [ForeignKey("User")]
        [Required]
        public long UserId { get; set; }
        [Required]
        public string Key { get; set; }
        public string Value { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime CreationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? DeleterUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public bool IsDeleted { get; set; }

        public User User { get; set; }
    }
}

