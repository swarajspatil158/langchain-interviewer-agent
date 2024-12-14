// app/versions/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { candidateData, jobData } from '@/data/environment'
import Link from "next/link"
import VersionControls from "../components/VersionControls"

export default function VersionsPage() {
  return (
    <div className="container mx-auto bg-background">
      {/* <h1 className="text-3xl font-bold">Environment Data</h1> */}
      <header className="p-4 border-b w-full  mx-auto">
                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold hover:text-primary/80 transition-colors">
                    Environment Data
                    </div>
                    <nav className="flex gap-2">
                        <Link 
                            href="/versions/create" 
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            create
                        </Link>
                        <Link 
                            href="/" 
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            chat
                        </Link>
                    </nav>
                </div>
            </header>
            <VersionControls/>
      
      {/* Job Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Job Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Current Stage</p>
              <Badge variant="secondary" className="mt-1">{jobData.currentStage}</Badge>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Job Title</p>
              <p className="font-medium">{jobData.jobTitle}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Level</p>
              <p className="font-medium">{jobData.jobLevel}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Role Category</p>
              <p className="font-medium">{jobData.roleCategory}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Department</p>
              <p className="font-medium">{jobData.department}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Employment Type</p>
              <p className="font-medium">{jobData.employmentType}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Experience Required</p>
              <p className="font-medium">{jobData.yearsOfExperience}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Work Setup</p>
              <p className="font-medium">{jobData.workSetup}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{jobData.workLocation}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">CTC Range</p>
              <p className="font-medium">{jobData.ctcRange}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Job Summary</p>
              <p className="text-sm">{jobData.jobSummary}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Key Responsibilities</p>
              <div className="text-sm whitespace-pre-line">{jobData.jobResponsibilities}</div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Requirements</p>
              <div className="text-sm whitespace-pre-line">{jobData.jobRequirements}</div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Desired Skills</p>
              <div className="flex flex-wrap gap-2">
                {jobData.desiredKeySkills.split(',').map((skill, index) => (
                  <Badge key={index} variant="outline">{skill.trim()}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidate Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Candidate Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{candidateData.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{candidateData.email}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{candidateData.phone}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{`${candidateData.city}, ${candidateData.region}, ${candidateData.country}`}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Total Experience</p>
                <p className="font-medium">{candidateData.totalYearsOfExperience}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Current Position</p>
                <p className="font-medium">{`${candidateData.currentRole} at ${candidateData.currentCompany}`}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Education */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Education</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Degree</p>
                <p className="font-medium">{`${candidateData.degree} in ${candidateData.field}`}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Institution</p>
                <p className="font-medium">{candidateData.institution}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Graduation Year</p>
                <p className="font-medium">{candidateData.graduationYear}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Technical Skills */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Technical Skills</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Programming Languages</p>
                <div className="flex flex-wrap gap-2">
                  {candidateData.programmingLanguages.split(',').map((lang, index) => (
                    <Badge key={index} variant="outline">{lang.trim()}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Frameworks & Tools</p>
                <div className="flex flex-wrap gap-2">
                  {candidateData.frameworks.split(',').map((framework, index) => (
                    <Badge key={index} variant="outline">{framework.trim()}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Databases</p>
                <div className="flex flex-wrap gap-2">
                  {candidateData.databases.split(',').map((db, index) => (
                    <Badge key={index} variant="outline">{db.trim()}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {candidateData.technologies.split(',').map((tech, index) => (
                    <Badge key={index} variant="outline">{tech.trim()}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Work Experience */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Work Experience</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Company & Role</p>
                <p className="font-medium">{`${candidateData.workExperienceRole} at ${candidateData.workExperienceCompany}`}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">{candidateData.workExperienceDuration}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Responsibilities</p>
                <p className="text-sm whitespace-pre-line">{candidateData.workExperienceResponsibilities}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Professional Links</h3>
            <div className="flex gap-4">
              <a 
                href={candidateData.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                LinkedIn Profile
              </a>
              <a 
                href={candidateData.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub Profile
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}