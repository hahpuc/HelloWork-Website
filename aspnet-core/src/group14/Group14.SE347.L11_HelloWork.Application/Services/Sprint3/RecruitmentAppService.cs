using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Group14.SE347.L11_HelloWork.Application.Services.Sprint3.Dto;
using Microsoft.EntityFrameworkCore;
using SE347.L11_HelloWork.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Group14.SE347.L11_HelloWork.Application.Services.Sprint3
{
    public class RecruitmentAppService : Group14AppServiceBase, IRecruitmentAppService
    {
        private readonly IRepository<Recruitment> _recruiment;
        private readonly IRepository<SavedRecruitment> _saveRecruiment;
        private readonly IRepository<StateApplication> _stateApplication;
        public RecruitmentAppService(IRepository<Recruitment> recruiment,
                                     IRepository<SavedRecruitment> saveRecruiment, 
                                     IRepository<StateApplication> stateApplication
                                    )
        {
            _recruiment = recruiment;
            _saveRecruiment = saveRecruiment;
            _stateApplication = stateApplication;

        }

        public async Task DeleteSavedRecruiment(int id, RecruitmentCancelDto recruitment)
        {
            if (recruitment.State == "DA LUU")
            {
                var all = _saveRecruiment.GetAll();
                var savedRecruitment = all.Where(p => p.RecruitmentId == recruitment.RecruitmentId).Where(s => s.CreatorUserId == id).FirstOrDefault();
                if(savedRecruitment!=null) await _saveRecruiment.DeleteAsync(savedRecruitment);
            }
            else {
                var allstate = _stateApplication.GetAll();
                var stateRecuitment = allstate.Where(p => p.IDRecruitment == recruitment.RecruitmentId).Where(s => s.IDJobSeeker == id).Where(q => q.State == recruitment.State).FirstOrDefault();
                if (stateRecuitment != null)  await _stateApplication.DeleteAsync(stateRecuitment);
            }              
        }

        public async Task<List<GetRecruitmentByInfo>> GetRecruitmentOfUserAsync(EntityDto<int> input)
        {
            var saveRecruit = await _saveRecruiment.GetAllListAsync(m=>m.CreatorUserId == input.Id);
            //var stateApplication = await _stateApplication.GetAllListAsync(m => m.CreatorUserId == input.Id);

            var rc = await _recruiment.GetAllListAsync();
            var stateApplication = await _stateApplication.GetAllListAsync(m => m.IDJobSeeker == input.Id);
            // list stateApplication => recruitment
            // khong xoa
            var innerJoinState = rc.Join(
                       stateApplication,
                       sr => sr.Id,
                       re => re.IDRecruitment,
                       (sr, re) => new GetRecruitmentByInfo
                       {
                           Id = sr.Id,
                           Name = sr.Name,
                           State = sr.State,
                           SalaryRange = sr.SalaryRange,
                           Requirement = sr.Requirement,
                           WayOfWork = sr.WayOfWork,
                           Status = re.State
                       }
                  );
               
            var innerJoinSaved = rc.Join(
                   saveRecruit,
                   sr => sr.Id,
                   re => re.RecruitmentId,
                   (sr, re) => new GetRecruitmentByInfo
                   {
                       Id = sr.Id,
                       Name = sr.Name,
                       State = sr.State,
                       SalaryRange = sr.SalaryRange,
                       Requirement = sr.Requirement,
                       WayOfWork = sr.WayOfWork,
                       Status = "DA LUU"
                   }
                   );

           var saved = new List<GetRecruitmentByInfo>(
                   innerJoinSaved.Select(m => ObjectMapper.Map<GetRecruitmentByInfo>(m)).ToList()
           );

            // khong xoa
             
               var state = new List<GetRecruitmentByInfo>(
                   innerJoinState.Select(m => ObjectMapper.Map<GetRecruitmentByInfo>(m)).ToList()
               );

            state.ForEach(item => saved.Add(item));

           var getRecruitmentByInfo = new List<GetRecruitmentByInfo>(
                   saved.Select(m => ObjectMapper.Map<GetRecruitmentByInfo>(m)).ToList()
           );

            return getRecruitmentByInfo;
        }

        public async Task<List<GetRecruitmentByInfo>> GetWithFilter(EntityDto<int> input, RecruitmentFilter filt)
        {
            List<GetRecruitmentByInfo> getRecruitmentByInfo = new List<GetRecruitmentByInfo>();
            getRecruitmentByInfo = await GetRecruitmentOfUserAsync(input);

            if (filt.Id>0)
            {
                getRecruitmentByInfo = getRecruitmentByInfo.Where(q => q.Id == filt.Id).ToList();
            }
            if (!filt.Name.IsNullOrEmpty())
            {
                getRecruitmentByInfo = getRecruitmentByInfo.Where(q => q.Name.ToUpper().Equals(filt.Name.ToUpper())).ToList();
            }
            if (!filt.SalaryRange.IsNullOrEmpty())
            {
                getRecruitmentByInfo = getRecruitmentByInfo.Where(q => q.SalaryRange.Contains(filt.SalaryRange)).ToList();
            }
            if (!filt.State.IsNullOrEmpty())
            {
                getRecruitmentByInfo = getRecruitmentByInfo.Where(q => q.State.ToUpper().Contains(filt.State.ToUpper())).ToList();
            }
            if (!filt.Recruitment.IsNullOrEmpty())
            {
                getRecruitmentByInfo = getRecruitmentByInfo.Where(q => q.Requirement.ToUpper().Contains(filt.Recruitment.ToUpper())).ToList();
            }
            if (!filt.WayOfWork.IsNullOrEmpty())
            {
                getRecruitmentByInfo = getRecruitmentByInfo.Where(q => q.WayOfWork.ToUpper().Contains(filt.WayOfWork.ToUpper())).ToList();
            }
            if (!filt.Status.IsNullOrEmpty())
            {
                getRecruitmentByInfo = getRecruitmentByInfo.Where(q => q.Status.ToUpper().Contains(filt.Status.ToUpper())).ToList();
            }
            return getRecruitmentByInfo;
        }

        public async Task RecruitmentCancel(int id, RecruitmentCancelDto recruitment)
        {
            var allstate = _stateApplication.GetAll();
            var stateRecuitment = allstate.Where(p => p.IDRecruitment == recruitment.RecruitmentId).Where(s => s.IDJobSeeker == id).Where(q => q.State == recruitment.State).FirstOrDefault();
            if (stateRecuitment != null) await _stateApplication.DeleteAsync(stateRecuitment);
        }
    }
}
