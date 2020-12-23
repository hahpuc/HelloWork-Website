using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Group12.SE347.L11_HelloWork.Application.Services.SearchJobs.Dto;
using SE347.L11_HelloWork.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using System.Linq.Dynamic;
using Abp.Collections.Extensions;
using Abp.Linq.Extensions;
using Abp.Extensions;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Group12.SE347.L11_HelloWork.Application.Services.SearchJobs
{
    public class SearchJobsAppService : Group12AppServiceBase, ISearchJobsAppService
    {
        private readonly IRepository<Recruitment> _recruitmentRepository;
        private readonly IRepository<Recruiter> _recruiterRepository;
        private readonly IRepository<Company> _companyRepository;

        public SearchJobsAppService(IRepository<Recruitment> recruitmentRepository,
        IRepository<Recruiter> recruiterRepository,
        IRepository<Company> companyRepository)
        {
            _recruitmentRepository = recruitmentRepository;
            _recruiterRepository = recruiterRepository;
            _companyRepository = companyRepository;
        }

        public async Task<ListResultDto<JobResultDto>> GetJobsByFilterAsync(JobFilterDto input)
        {
            var query = _recruitmentRepository.GetAll()
                .Include(x => x.ExpertiseRecruitments).ThenInclude(x => x.Expertise)
                //.WhereIf(!input.SalaryRange.IsNullOrWhiteSpace(), x => x.SalaryRange.ToLower() == input.SalaryRange.ToLower())
                .WhereIf(!input.WayOfWork.IsNullOrWhiteSpace(), x => x.WayOfWork.ToLower() == input.WayOfWork.ToLower())
                .WhereIf(!input.Name.IsNullOrWhiteSpace(), x => x.Name.ToLower().Contains(input.Name.ToLower()))
                .WhereIf(!input.State.IsNullOrWhiteSpace(), x => x.State.ToLower() == input.State.ToLower())
                .Join(_recruiterRepository.GetAll(), recruitment => recruitment.CreatorUserId, recruiter => recruiter.IDUser, (recruitment, recruiter) => new { recruitment, recruiter })
                .Join(_companyRepository.GetAll(), x => x.recruiter.IDCompany, company => company.Id, (x, company) => new { x.recruiter, x.recruitment, company })
                .WhereIf(!input.Province.IsNullOrWhiteSpace(), x => x.company.Address.ToLower().Contains(input.Province.ToLower()));

            var localList = await query.Distinct().ToListAsync();
            var result = localList
                .WhereIf(input.MinSalary.HasValue, x => GetMinSalaryNumber(x.recruitment.SalaryRange).HasValue && input.MinSalary <= GetMinSalaryNumber(x.recruitment.SalaryRange))
                .WhereIf(input.MaxSalary.HasValue, x => GetMaxSalaryNumber(x.recruitment.SalaryRange).HasValue && input.MaxSalary >= GetMaxSalaryNumber(x.recruitment.SalaryRange))
                .WhereIf(!input.Expertises.IsNullOrEmpty(),
                    x => x.recruitment.ExpertiseRecruitments.Select(ept => ept.Expertise.Name.ToLower()).Intersect(input.Expertises.Select(i => i.ToLower())).Count() > 0)
                .Select(x => new JobResultDto() {
                    Id = x.recruitment.Id,
                    Name = x.recruitment.Name,
                    FinishDate = x.recruitment.FinishDate,
                    UrgentLevel = x.recruitment.UrgentLevel,
                    SalaryRange = x.recruitment.SalaryRange,
                    State = x.recruitment.State,
                    WayOfWork = x.recruitment.WayOfWork,
                    Address = x.company?.Address,
                    CompanyName = x.company?.Name,
                    Expertises = x.recruitment.ExpertiseRecruitments.Select(ept => ept.Expertise.Name).ToList()
                });
            return new ListResultDto<JobResultDto>(result.ToList());
        }

        private static List<long> GetSalaryNumbers(string str)
        {
            string[] list = str.Split('-', '–', '_');
            var longList = list
            .Select(x => new String(x.Where(Char.IsDigit).ToArray()))
            .Where(x => !x.IsNullOrWhiteSpace())
            .Select(x => long.Parse(x));
            return longList.ToList();
        }

        private static long? GetMinSalaryNumber(string str)
        {
            var nlist = GetSalaryNumbers(str);
            if (nlist.Count > 0)
                return nlist.First();
            return null;
        }

        private static long? GetMaxSalaryNumber(string str)
        {
            var nlist = GetSalaryNumbers(str);
            if (nlist.Count > 1)
                return nlist.Last();
            return null;
        }

        private static bool CompareSalary(string str, long minSalary)
        {
            var rmin = GetMinSalaryNumber(str);
            var rmax = GetMaxSalaryNumber(str);
            if (rmin.HasValue)
            {
                if (minSalary <= rmin.Value)
                    return true;
                else if (rmax.HasValue && minSalary <= rmax.Value)
                    return true;
                else return false;
            }
            return false;
        }
    }
}
