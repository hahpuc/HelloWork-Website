﻿using System;
using System.Collections.Generic;
using System.Text;

namespace SE347.L11_HelloWork.Authorization.Groups.Group5
{
    public class Group5RolePermissions
    {
        /// <summary>
        /// Permissions for jobseeker
        /// </summary>
        public static List<string> JobSeekerRolePermissions
        {
            get
            {
                return new List<string>()
                {
                    // add new perrmisions for this role here
                };
            }
        }

        /// <summary>
        /// Permissions for recruiter role
        /// </summary>
        public static List<string> RecruiterRolePermissions
        {
            get
            {
                return new List<string>()
                {
                    // add new perrmisions for this role here

                };
            }
        }
    }
}
