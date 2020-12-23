using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Json;
using Abp.Runtime.Session;
using Abp.UI;
using AutoMapper;
using Group14.SE347.L11_HelloWork.Application.Services.Sprint1.Dto;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SE347.L11_HelloWork.Authorization;
using SE347.L11_HelloWork.Authorization.Users;
using SE347.L11_HelloWork.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Group14.SE347.L11_HelloWork.Application.Services.Sprint1
{
    public class InforLoginAppService : Group14AppServiceBase, IInforLoginAppService
    {
        private readonly IRepository<User, long> _infoLoginRepo;
        private readonly IRepository<UserInfo, int> _userInfoLoginRepo;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public InforLoginAppService(
            IRepository<User, long> infoLoginRepo,
            IPasswordHasher<User> passwordHasher,
            IWebHostEnvironment hostEnvironment,
            IRepository<UserInfo, int> userInfoLoginRepo)
        {
            _infoLoginRepo = infoLoginRepo;
            _passwordHasher = passwordHasher;
            _webHostEnvironment = hostEnvironment;
            _userInfoLoginRepo = userInfoLoginRepo;
        }

        [AbpAllowAnonymous]
        public async Task<UserDTO> UpdateInfoLoginAsync(UpdateInfoLoginInputDto input)
        {
            string PasswordRegex = "(?=^.{8,}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s)[0-9a-zA-Z!@#$%^&*()]*$";

            var infoLogin = await _infoLoginRepo.GetAsync(input.Id);
            ObjectMapper.Map(input, infoLogin);

            infoLogin.NormalizedEmailAddress = infoLogin.EmailAddress.ToUpper();
            infoLogin.NormalizedUserName = infoLogin.UserName.ToUpper();

            if (input.NewPassword != "")
            {
                if ((_passwordHasher.VerifyHashedPassword(ObjectMapper.Map<User>(infoLogin), infoLogin.Password, input.CurrentPassword) == PasswordVerificationResult.Failed)
                && (!new Regex(PasswordRegex).IsMatch(input.NewPassword)))
                {
                    throw new UserFriendlyException("Current password is not true. Passwords must be at least 8 characters, contain a lowercase, uppercase, and number.");
                }
                else if (_passwordHasher.VerifyHashedPassword(ObjectMapper.Map<User>(infoLogin), infoLogin.Password, input.CurrentPassword) == PasswordVerificationResult.Failed)
                {
                    throw new UserFriendlyException("Current password is not true.");
                }
                else if (!new Regex(PasswordRegex).IsMatch(input.NewPassword))
                {
                    throw new UserFriendlyException("Passwords must be at least 8 characters, contain a lowercase, uppercase, and number.");
                }
                infoLogin.Password = _passwordHasher.HashPassword(infoLogin, input.NewPassword);
            }
            else if (_passwordHasher.VerifyHashedPassword(ObjectMapper.Map<User>(infoLogin), infoLogin.Password, input.CurrentPassword) == PasswordVerificationResult.Failed)
            {
                throw new UserFriendlyException("Current password is not true.");
            }

            infoLogin.IsEmailConfirmed = false;
            var savedInfoLogin = await _infoLoginRepo.UpdateAsync(infoLogin);
            return ObjectMapper.Map<UserDTO>(savedInfoLogin);
        }

        [AbpAllowAnonymous]
        public async Task<UserDTO> SendCodeVerifyMail(SendMailDto input, string origin)
        {
            var User = await _infoLoginRepo.GetAsync(input.Id);
            User.EmailConfirmationCode = Guid.NewGuid().ToString(); ;
            string message;
            if (!string.IsNullOrEmpty(origin))
            {
                string verifyUrl = $"{origin}/verify-email?token={User.EmailConfirmationCode}";
                message = $@"<p>Please click the below link to verify your email address:</p>
                             <p><a href=""{verifyUrl}"">{verifyUrl}</a></p>";
            }
            else
            {
                message = $@"<p>Please use the below code to verify your email address with the <code>/api/InfoLogin/ConfirmMail</code> api route:</p>
                             <p><code>{User.EmailConfirmationCode}</code></p>";
            }
           

            // content mail
            MailMessage m = new MailMessage
            {
                From = new MailAddress("worksoft.confirm@gmail.com")
            };

            m.To.Add(User.EmailAddress);
            m.IsBodyHtml = true;
            m.Subject = "Sign-up Verification API - Verify Email";
            m.Body = $@"<h4>Verify Email</h4>
                         <p>Thanks for registering!</p>
                         {message}";

            // setting mail

            SmtpClient smtp = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                UseDefaultCredentials = true,
                EnableSsl = true,
                Credentials = new NetworkCredential("worksoft.confirm@gmail.com", "hellowork1")
                // Add credentials if the SMTP server requires them.
            };
            smtp.Send(m);

            // update user
            var savedInfoLogin = await _infoLoginRepo.UpdateAsync(User);
            // map User => UserDto
            var mapUserDto = ObjectMapper.Map<UserDTO>(savedInfoLogin);
            return mapUserDto;
        }

        [AbpAllowAnonymous]
        public async Task<bool> ConfirmMail(VerifyEmailRequest input)
        {
            var user = await _infoLoginRepo.FirstOrDefaultAsync(m => m.EmailConfirmationCode == input.code);
            if (user != null)
            {
                if(user.EmailAddress.Equals(input.EmailAddress))
                {
                    user.IsEmailConfirmed = true;
                    var savedInfoLogin = await _infoLoginRepo.UpdateAsync(user);
                    return true;
                }
                return false;
            }
            return false;
        }

        public async Task<UserInfo> UploadFile(IFormFile input, int id)
        {
            string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "images");
            string uniqueFileName = Guid.NewGuid().ToString() + "_" + input.FileName;
            string filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await input.CopyToAsync(stream);
            }
            var userMap = new UserInfo() { UserId = id, Key = UserInfo.COMPANY_CONFIRM, Value = uniqueFileName };

            await _userInfoLoginRepo.InsertAsync(userMap);
            await CurrentUnitOfWork.SaveChangesAsync();
            return userMap;
        }

        public async Task<List<UserInfo>> GetUserInfo(int id)
        {
            return await _userInfoLoginRepo.GetAllListAsync(m => m.UserId == id);
        }

        public async Task<int> GetStateBusiness(int id)
        {
            var business = await _userInfoLoginRepo.GetAllListAsync(m => m.UserId == id);
            return business.Where(m=>m.Key.Equals(UserInfo.COMPANY_CONFIRM)).ToList().Count();
        }

        public async Task DeleteFile(string filename)
        {
            var userInfo = await _userInfoLoginRepo.SingleAsync(m => m.Value.Equals(filename));
            if(userInfo!=null)
            {
                var imagePath = Path.Combine(_webHostEnvironment.WebRootPath, "images", userInfo.Value);
                if (File.Exists(imagePath))
                {
                    File.Delete(imagePath);
                    await _userInfoLoginRepo.DeleteAsync(userInfo.Id);
                    await CurrentUnitOfWork.SaveChangesAsync();
                }
            }
        }
    }
}

