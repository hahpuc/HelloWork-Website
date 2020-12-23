﻿using Abp.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using Group4.SE347.L11_HelloWork.Application.Services.CVEmployeeInformations;
using System.Threading.Tasks;
using Group4.SE347.L11_HelloWork.Application.Services.CVEmployeeInformations.Dto;
using Abp.Application.Services.Dto;

namespace Group4.SE347.L11_HelloWork.Web.Core.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CVEmployeeInformationsController : Group4ControllerBase
    {

        private readonly ICVEmployeeInformationAppService _EmployeeAppService;

        public CVEmployeeInformationsController(ICVEmployeeInformationAppService EmployeeService)
        {
            _EmployeeAppService = EmployeeService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCVEmployeeInformationDto input)
        {
            var newCV = await _EmployeeAppService.CreateCVEmPloyeeInformationAsync(input);
            return Ok(newCV);
        }
        [HttpGet("{id}",Name ="GetCVEmployeeInformation")]
        public async Task<IActionResult> Get(int id)
        {
            var cv= await _EmployeeAppService.GetCVEmployeeInformationAsync(new EntityDto<int>(id));
            return Ok(cv);
        }
        [HttpPut]
        public async Task<IActionResult> Update(UpdateCVEmployeeInformationDto input)
        {
            var cv = await _EmployeeAppService.UpdateCVEmployeeInformationAsync(input);
            return Ok(cv);
        }

    }

}

