// src/templates/jobDescription.ts

export const defaultJobDescriptionTemplate: string = `
Interview Stage: {currentStage}
Job Title: {jobTitle}
Job Level: {jobLevel}
Role Category: {roleCategory}
Department: {department}
Employment Type: {employmentType}
Years of Experience: {yearsOfExperience}
Work Setup: {workSetup}
Work Location: {workLocation}
CTC Range: {ctcRange}

Job Summary:
{jobSummary}

Job Responsibilities:
{jobResponsibilities}

Job Requirements:
{jobRequirements}
Desired Key Skills:
{desiredKeySkills}
`;

export const defaultCandidateDataTemplate:string = `
Name: {name}
Email: {email}
Phone: {phone}
City: {city} 
Region: {region}
Country: {country}
Total Years of Experience: {totalYearsOfExperience}
Current Role: {currentRole}
Current Company: {currentCompany}

Education:
- Degree: {degree}
- Field: {field}
- Institution: {institution}
- Graduation Year: {graduationYear}

Skills:
Programming Languages: {programmingLanguages}
Frameworks: {frameworks}
Databases: {databases}
Technologies: {technologies}

Work Experience:
Company: {workExperienceCompany}
Role: {workExperienceRole}
Duration: {workExperienceDuration}
Key Responsibilities: {workExperienceResponsibilities}

Professional Profiles:
LinkedIn: {linkedin}
GitHub: {github}
`;