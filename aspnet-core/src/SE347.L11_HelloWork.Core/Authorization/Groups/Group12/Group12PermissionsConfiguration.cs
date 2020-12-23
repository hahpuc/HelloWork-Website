using Abp.Authorization;
using Abp.Localization;

namespace SE347.L11_HelloWork.Core.Authorization.Groups.Group12
{
    public static class Group12PermissionsConfiguration
    {
        public static IPermissionDefinitionContext ConfigGroup12(
            this IPermissionDefinitionContext context) {
            
            var pages = context.GetPermissionOrNull("Pages") ?? context.CreatePermission("Pages", L("Pages"));
            
            // Thêm quyền mới dưới đây


            return context;
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, L11_HelloWorkConsts.LocalizationSourceName);
        }
    }
}