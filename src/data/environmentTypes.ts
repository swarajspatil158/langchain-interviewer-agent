export interface JobDataType {
    currentStage: string;
    jobTitle: string;
    jobLevel: string;
    roleCategory: string;
    department: string;
    employmentType: string;
    yearsOfExperience: string;
    workSetup: string;
    workLocation: string;
    ctcRange: string;
    jobSummary: string;
    jobResponsibilities: string;
    jobRequirements: string;
    desiredKeySkills: string;
  }

  export interface CandidateDataType {
    name: string;
    email: string;
    phone:string;
    city: string;
    region: string;
    country: string;
    totalYearsOfExperience: string;
    currentRole: string;
    currentCompany: string;
    degree: string;
    field: string;
    institution: string;
    graduationYear: string;
    programmingLanguages: string;
    frameworks:string;
    databases: string;
    technologies:string;
  
    workExperienceCompany: string;
    workExperienceRole: string;
    workExperienceDuration: string;
    workExperienceResponsibilities:string;
  
    linkedin: string;
    github: string;
  }