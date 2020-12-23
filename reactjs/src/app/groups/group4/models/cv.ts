// import { IExperienceGet} from './experience'
// import { IEducationGet} from './education'
// import { IAchievementGet} from './achievement'
// import { ISkillGet} from './skill'


export interface ICv { 
    
    nameCV: string, 
    options: string,
    name: string,
    job: string,
    bio: string,
    phoneNumber: string,
    email: string,
    facebook: string,
    github: string,
    twitter: string,
    experienceDetails: 
        {
            jobName: string,
            companyName: string,
            period: string, // Length of job time
            jobPosition: string, 
            content: string
        }[],
    educationDetails: 
        {
            schoolName: string, 
            period: string,
            specialize: string
        }[],
    
    achievementDetails: 
        {
            name: string,
            organization: string,  
            period: string, 
            content: string
        }[],
    
    skillDetails: 
        {
            skillName: string
        }[],
}

export interface ICvGet { 
    id: string,
    
    nameCV: string,
    options: string,
    name: string,
    job: string,
    bio: string,
    phoneNumber: string,
    email: string,
    facebook: string, 
    github: string, 
    twitter: string,
    experienceDetails: 
        {
             id: string,
            jobName: string,
            companyName: string,
            period: string, // Length of job time
            jobPosition: string, 
            content: string
        }[],
    educationDetails: 
        {
             id: string,
            schoolName: string, 
            period: string,
            specialize: string
        }[],
    
    achievementDetails: 
        {
             id: string,
            name: string,
            organization: string,  
            period: string, 
            content: string
        }[],
    
    skillDetails: 
        {
             id: string,
            skillName: string
        }[],
}