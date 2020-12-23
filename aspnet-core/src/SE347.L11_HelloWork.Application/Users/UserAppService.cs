﻿using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.IdentityFramework;
using Abp.Linq.Extensions;
using Abp.Localization;
using Abp.Runtime.Session;
using Abp.UI;
using SE347.L11_HelloWork.Authorization;
using SE347.L11_HelloWork.Authorization.Accounts;
using SE347.L11_HelloWork.Authorization.Roles;
using SE347.L11_HelloWork.Authorization.Users;
using SE347.L11_HelloWork.Roles.Dto;
using SE347.L11_HelloWork.Users.Dto;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Group3.SE347.L11_HelloWork.Application.Services._UserService.Dto;

namespace SE347.L11_HelloWork.Users
{
    [AbpAuthorize(PermissionNames.Pages_Users)]
    public class UserAppService : AsyncCrudAppService<User, UserDto, long, PagedUserResultRequestDto, CreateUserDto, UserDto>, IUserAppService
    {
        private readonly UserManager _userManager;
        private readonly RoleManager _roleManager;
        private readonly IRepository<Role> _roleRepository;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IAbpSession _abpSession;
        private readonly LogInManager _logInManager;
        private readonly IRepository<User, long> _userRepository;

        public UserAppService(
            IRepository<User, long> repository,
            UserManager userManager,
            RoleManager roleManager,
            IRepository<Role> roleRepository,
            IPasswordHasher<User> passwordHasher,
            IAbpSession abpSession,
            LogInManager logInManager)
            : base(repository)
        {
            _userRepository = repository;
            _userManager = userManager;
            _roleManager = roleManager;
            _roleRepository = roleRepository;
            _passwordHasher = passwordHasher;
            _abpSession = abpSession;
            _logInManager = logInManager;
        }

        public async Task<UserDto> CreateAsyncBypassPermission(CreateUserDto input, bool bypassPermission = false)
        {
            CheckCreatePermission();

            var user = ObjectMapper.Map<User>(input);

            user.TenantId = AbpSession.TenantId;
            user.IsEmailConfirmed = true;

            await _userManager.InitializeOptionsAsync(AbpSession.TenantId);

            CheckErrors(await _userManager.CreateAsync(user, input.Password));

            //user.AddInfo(Entities.UserInfo.PHONE_NUMBER, input.Phone);
            //user.AddInfo(Entities.UserInfo.BIRTHDAY, input.Birthday);
            //user.AddInfo(Entities.UserInfo.ADDRESS_PROVINCE, input.Province);
            //user.AddInfo(Entities.UserInfo.ADDRESS_DETAIL, input.Address);
            //user.AddInfo(Entities.UserInfo.IDENTIFY_NUMBER, input.IdentifyNumber);

            if (input.RoleNames != null)
            {
                CheckErrors(await _userManager.SetRolesAsync(user, input.RoleNames));
            }

            CurrentUnitOfWork.SaveChanges();

            return MapToEntityDto(user);
        }

        public async Task<UserDto> CreateEmployer(CreateEmployerInputDto input)
        {
            var user = ObjectMapper.Map<User>(input);

            user.TenantId = AbpSession.TenantId;
            user.IsEmailConfirmed = true;

            await _userManager.InitializeOptionsAsync(AbpSession.TenantId);

            CheckErrors(await _userManager.CreateAsync(user, input.Password));

            user.AddInfo(Entities.UserInfo.PHONE_NUMBER, input.Phone);
            user.AddInfo(Entities.UserInfo.BIRTHDAY, input.Birthday);
            user.AddInfo(Entities.UserInfo.ADDRESS_PROVINCE, input.Province);
            user.AddInfo(Entities.UserInfo.ADDRESS_DETAIL, input.Address);
            user.AddInfo(Entities.UserInfo.IDENTIFY_NUMBER, input.IdentifyNumber);

            user.AddInfo(Entities.UserInfo.ACCOUNT_TYPE, "0"); // NTD

            user.AddInfo(Entities.UserInfo.COMPANY_DESCRIPTION, input.CompanyDescription);
            user.AddInfo(Entities.UserInfo.COMPANY_FIELD, input.CompanyField);
            user.AddInfo(Entities.UserInfo.COMPANY_NAME, input.CompanyName);
            user.AddInfo(Entities.UserInfo.COMPANY_POSITION, input.CompanyPosition);
            user.AddInfo(Entities.UserInfo.COMPANY_SIZE, input.CompanySize);
            user.AddInfo(Entities.UserInfo.COMPANY_WEBSITE, input.CompanyWebsite);

            if (input.RoleNames != null)
            {
                CheckErrors(await _userManager.SetRolesAsync(user, new string[] { "Recruiter" }));
            }

            CurrentUnitOfWork.SaveChanges();

            return MapToEntityDto(user);
        }

        public async Task<UserDto> CreateEmployee(CreateUserInputDto input)
        {
            var user = ObjectMapper.Map<User>(input);

            user.TenantId = AbpSession.TenantId;
            user.IsEmailConfirmed = true;

            await _userManager.InitializeOptionsAsync(AbpSession.TenantId);

            CheckErrors(await _userManager.CreateAsync(user, input.Password));

            user.AddInfo(Entities.UserInfo.PHONE_NUMBER, input.Phone);
            user.AddInfo(Entities.UserInfo.BIRTHDAY, input.Birthday);
            user.AddInfo(Entities.UserInfo.ADDRESS_PROVINCE, input.Province);
            user.AddInfo(Entities.UserInfo.ADDRESS_DETAIL, input.Address);
            user.AddInfo(Entities.UserInfo.IDENTIFY_NUMBER, input.IdentifyNumber);

            user.AddInfo(Entities.UserInfo.ACCOUNT_TYPE, "1"); // NTD
            user.AddInfo(Entities.UserInfo.PUBLIC_STATUS, "0"); // NTD
            user.AddInfo(Entities.UserInfo.NTV_CONFIRM_STATUS, "1"); // NTD

            if (input.RoleNames != null)
            {
                CheckErrors(await _userManager.SetRolesAsync(user, new string[] { "Jobseeker" }));
            }

            CurrentUnitOfWork.SaveChanges();

            return MapToEntityDto(user);
        }

        public override Task<UserDto> CreateAsync(CreateUserDto input)
        {
            return CreateAsyncBypassPermission(input, false);
        }

        public async Task<string> ForgetPassword(ForgetPasswordInputDto input)
        {
            var user = _userRepository.Single(u => u.EmailAddress.Equals(input.Email));

            string newPassword = "123qwe";

            user.Password = _passwordHasher.HashPassword(user, newPassword);
            CurrentUnitOfWork.SaveChanges();

            return newPassword;
        }

        public override async Task<UserDto> UpdateAsync(UserDto input)
        {
            CheckUpdatePermission();

            var user = await _userManager.GetUserByIdAsync(input.Id);

            MapToEntity(input, user);

            CheckErrors(await _userManager.UpdateAsync(user));

            if (input.RoleNames != null)
            {
                CheckErrors(await _userManager.SetRolesAsync(user, input.RoleNames));
            }

            return await GetAsync(input);
        }

        public override async Task DeleteAsync(EntityDto<long> input)
        {
            var user = await _userManager.GetUserByIdAsync(input.Id);
            await _userManager.DeleteAsync(user);
        }

        public async Task<ListResultDto<RoleDto>> GetRoles()
        {
            var roles = await _roleRepository.GetAllListAsync();
            return new ListResultDto<RoleDto>(ObjectMapper.Map<List<RoleDto>>(roles));
        }

        public async Task ChangeLanguage(ChangeUserLanguageDto input)
        {
            await SettingManager.ChangeSettingForUserAsync(
                AbpSession.ToUserIdentifier(),
                LocalizationSettingNames.DefaultLanguage,
                input.LanguageName
            );
        }

        protected override User MapToEntity(CreateUserDto createInput)
        {
            var user = ObjectMapper.Map<User>(createInput);
            user.SetNormalizedNames();
            return user;
        }

        protected override void MapToEntity(UserDto input, User user)
        {
            ObjectMapper.Map(input, user);
            user.SetNormalizedNames();
        }

        protected override UserDto MapToEntityDto(User user)
        {
            var roleIds = user.Roles.Select(x => x.RoleId).ToArray();

            var roles = _roleManager.Roles.Where(r => roleIds.Contains(r.Id)).Select(r => r.NormalizedName);

            var userDto = base.MapToEntityDto(user);
            userDto.RoleNames = roles.ToArray();

            return userDto;
        }

        protected override IQueryable<User> CreateFilteredQuery(PagedUserResultRequestDto input)
        {
            return Repository.GetAllIncluding(x => x.Roles)
                .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.UserName.Contains(input.Keyword) || x.Name.Contains(input.Keyword) || x.EmailAddress.Contains(input.Keyword))
                .WhereIf(input.IsActive.HasValue, x => x.IsActive == input.IsActive);
        }

        protected override async Task<User> GetEntityByIdAsync(long id)
        {
            var user = await Repository.GetAllIncluding(x => x.Roles).FirstOrDefaultAsync(x => x.Id == id);

            if (user == null)
            {
                throw new EntityNotFoundException(typeof(User), id);
            }

            return user;
        }

        protected override IQueryable<User> ApplySorting(IQueryable<User> query, PagedUserResultRequestDto input)
        {
            return query.OrderBy(r => r.UserName);
        }

        protected virtual void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }

        public async Task<bool> ChangePassword(ChangePasswordDto input)
        {
            if (_abpSession.UserId == null)
            {
                throw new UserFriendlyException("Please log in before attemping to change password.");
            }
            long userId = _abpSession.UserId.Value;
            var user = await _userManager.GetUserByIdAsync(userId);
            var loginAsync = await _logInManager.LoginAsync(user.UserName, input.CurrentPassword, shouldLockout: false);
            if (loginAsync.Result != AbpLoginResultType.Success)
            {
                throw new UserFriendlyException("Your 'Existing Password' did not match the one on record.  Please try again or contact an administrator for assistance in resetting your password.");
            }
            if (!new Regex(AccountAppService.PasswordRegex).IsMatch(input.NewPassword))
            {
                throw new UserFriendlyException("Passwords must be at least 8 characters, contain a lowercase, uppercase, and number.");
            }
            user.Password = _passwordHasher.HashPassword(user, input.NewPassword);
            CurrentUnitOfWork.SaveChanges();
            return true;
        }

        public async Task<bool> ResetPassword(ResetPasswordDto input)
        {
            if (_abpSession.UserId == null)
            {
                throw new UserFriendlyException("Please log in before attemping to reset password.");
            }
            long currentUserId = _abpSession.UserId.Value;
            var currentUser = await _userManager.GetUserByIdAsync(currentUserId);
            var loginAsync = await _logInManager.LoginAsync(currentUser.UserName, input.AdminPassword, shouldLockout: false);
            if (loginAsync.Result != AbpLoginResultType.Success)
            {
                throw new UserFriendlyException("Your 'Admin Password' did not match the one on record.  Please try again.");
            }
            if (currentUser.IsDeleted || !currentUser.IsActive)
            {
                return false;
            }
            var roles = await _userManager.GetRolesAsync(currentUser);
            if (!roles.Contains(StaticRoleNames.Tenants.Admin))
            {
                throw new UserFriendlyException("Only administrators may reset passwords.");
            }

            var user = await _userManager.GetUserByIdAsync(input.UserId);
            if (user != null)
            {
                user.Password = _passwordHasher.HashPassword(user, input.NewPassword);
                CurrentUnitOfWork.SaveChanges();
            }

            return true;
        }
    }
}

