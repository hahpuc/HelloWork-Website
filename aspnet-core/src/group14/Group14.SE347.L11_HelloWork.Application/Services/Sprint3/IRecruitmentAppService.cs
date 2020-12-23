using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using Group14.SE347.L11_HelloWork.Application.Services.Sprint3.Dto;
using SE347.L11_HelloWork.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Group14.SE347.L11_HelloWork.Application.Services.Sprint3
{
    public interface IRecruitmentAppService : IApplicationService
    {
        Task<List<GetRecruitmentByInfo>> GetRecruitmentOfUserAsync(EntityDto<int> id);
        Task<List<GetRecruitmentByInfo>> GetWithFilter(EntityDto<int> input, RecruitmentFilter filt);
        Task DeleteSavedRecruiment(int id, RecruitmentCancelDto recruitment);
        Task RecruitmentCancel(int id, RecruitmentCancelDto recruitment);
    }
}
