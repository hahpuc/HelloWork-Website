using System;
using System.Collections.Generic;
using Abp.Authorization.Users;
using Abp.Extensions;
using SE347.L11_HelloWork.Entities;

namespace SE347.L11_HelloWork.Authorization.Users
{
    public class User : AbpUser<User>
    {
        public const string DefaultPassword = "123qwe";

        public List<UserInfo> Infos { get; set; } = new List<UserInfo>();

        public void AddInfo(string key, string value)
        {
            Infos.Add(new UserInfo
            {
                Key = key,
                Value = value
            });
        }

        public UserInfo GetInfo(string key)
        {
            return Infos.Find(e => key.Equals(e.Key));
        }

        public static string CreateRandomPassword()
        {
            return Guid.NewGuid().ToString("N").Truncate(16);
        }

        public static User CreateTenantAdminUser(int tenantId, string emailAddress)
        {
            var user = new User
            {
                TenantId = tenantId,
                UserName = AdminUserName,
                Name = AdminUserName,
                Surname = AdminUserName,
                EmailAddress = emailAddress,
                Roles = new List<UserRole>()
            };

            user.SetNormalizedNames();

            return user;
        }
    }
}
