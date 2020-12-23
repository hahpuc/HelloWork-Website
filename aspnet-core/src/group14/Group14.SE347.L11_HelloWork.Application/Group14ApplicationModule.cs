using Abp.Modules;
using Abp.Reflection.Extensions;

namespace Group14.SE347.L11_HelloWork.Application
{
    public class Group14ApplicationModule : AbpModule
    {
        public Group14ApplicationModule() { }

        public override void Initialize()
        {

        }

        public override void PreInitialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(Group14ApplicationModule).GetAssembly());
        }
    }
}
