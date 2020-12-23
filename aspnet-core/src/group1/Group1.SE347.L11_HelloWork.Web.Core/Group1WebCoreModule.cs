﻿using Abp.Modules;
using Abp.Reflection.Extensions;

namespace Group1.SE347.L11_HelloWork.Web.Core
{
    public class Group1WebCoreModule : AbpModule
    {
        public Group1WebCoreModule() { }

        public override void Initialize()
        {

        }

        public override void PreInitialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(Group1WebCoreModule).GetAssembly());
        }
    }
}
