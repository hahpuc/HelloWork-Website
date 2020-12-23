using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Microsoft.EntityFrameworkCore;
using SE347.L11_HelloWork.Authorization;
using SE347.L11_HelloWork.Entities;
using SE347.L11_HelloWork;
using Group4.SE347.L11_HelloWork.Application.Services.CVEmployeeInformations.Dto;
using System.Linq;
using System.Threading.Tasks;
using Group4.SE347.L11_HelloWork.Application.Services.CVEmployeeInformations;
using System.Collections.Generic;
using Abp.Logging;
using System.Diagnostics;
using Abp.Notifications;
using System.Runtime.InteropServices.ComTypes;
using Castle.Core.Logging;
using Group4.SE347.L11_HelloWork.Application.Services.AchievementDetails.Dto;
using Group4.SE347.L11_HelloWork.Application.Services.AchievementDetails;

namespace Group4.SE347.L11_HelloWork.Application.Services.CVEmployeeInformations
{
    public class CVEmployeeInformationAppService : Group4AppServiceBase, ICVEmployeeInformationAppService
    {
        private readonly IRepository<CVEmployeeInformation> _cvemployeeInformationRepo;
        private readonly IRepository<AchievementDetail> _achievementDetailRepo;

        public CVEmployeeInformationAppService(
            IRepository<CVEmployeeInformation> cvemployeeInformationRepo,
            IRepository<AchievementDetail> achievementDetailRepo)
        {
            _cvemployeeInformationRepo = cvemployeeInformationRepo;
            _achievementDetailRepo = achievementDetailRepo;

        }

        //  [AbpAuthorize(PermissionNames.Pages_Group6_Recruitment_Create)]
        public async Task<CVEmployeeInformationDto> CreateCVEmPloyeeInformationAsync(CreateCVEmployeeInformationDto input)
        {
            var cv = ObjectMapper.Map<CVEmployeeInformation>(input);
            cv = await _cvemployeeInformationRepo.InsertAsync(cv);
            await CurrentUnitOfWork.SaveChangesAsync();
            return ObjectMapper.Map<CVEmployeeInformationDto>(cv);
        }
        public async Task<CVEmployeeInformationDto> GetCVEmployeeInformationAsync(EntityDto<int> input)
        {
            var cv = await _cvemployeeInformationRepo.GetAll()
                                                  .Include(CV => CV.AchievementDetails)
                                                  .Include(CV=>CV.ExperienceDetails)
                                                  .Include(CV=>CV.SkillDetails)
                                                  .Include(CV=>CV.EducationDetails)
                                                  .FirstOrDefaultAsync(CV => CV.Id == input.Id);
            return ObjectMapper.Map<CVEmployeeInformationDto>(cv);
        }
        public async Task<CVEmployeeInformationDto> UpdateCVEmployeeInformationAsync(UpdateCVEmployeeInformationDto input)
        {
            var cv = await _cvemployeeInformationRepo.GetAsync(input.Id);
            ObjectMapper.Map(input, cv);
            var savedcv = await _cvemployeeInformationRepo.UpdateAsync(cv);
            return ObjectMapper.Map<CVEmployeeInformationDto>(savedcv);
        }

    }
}
