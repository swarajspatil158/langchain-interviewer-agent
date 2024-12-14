'use client'

import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from 'next/link';

// Define Job Form Schema
const jobFormSchema = z.object({
  currentStage: z.string().min(1, { message: "Please select a stage" }),
  jobTitle: z.string().min(2, { message: "Job title must be at least 2 characters" }),
  jobLevel: z.string().min(1, { message: "Please select a job level" }),
  roleCategory: z.string().min(1, { message: "Please select a role category" }),
  department: z.string().min(1, { message: "Please select a department" }),
  employmentType: z.string().min(1, { message: "Please select employment type" }),
  yearsOfExperience: z.string().min(1, { message: "Years of experience is required" }),
  workSetup: z.string().min(1, { message: "Please select work setup" }),
  workLocation: z.string().min(2, { message: "Work location must be at least 2 characters" }),
  ctcRange: z.string().min(1, { message: "CTC range is required" }),
  jobSummary: z.string().min(10, { message: "Job summary must be at least 10 characters" }),
  jobResponsibilities: z.string().min(10, { message: "Job responsibilities must be at least 10 characters" }),
  jobRequirements: z.string().min(10, { message: "Job requirements must be at least 10 characters" }),
  desiredKeySkills: z.string().min(5, { message: "Key skills must be at least 5 characters" })
});

// Define Candidate Form Schema
const candidateFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  region: z.string().min(2, { message: "Region must be at least 2 characters" }),
  country: z.string().min(2, { message: "Country must be at least 2 characters" }),
  totalYearsOfExperience: z.string().min(1, { message: "Years of experience is required" }),
  currentRole: z.string().min(2, { message: "Current role must be at least 2 characters" }),
  currentCompany: z.string().min(2, { message: "Current company must be at least 2 characters" }),
  degree: z.string().min(2, { message: "Degree must be at least 2 characters" }),
  field: z.string().min(2, { message: "Field must be at least 2 characters" }),
  institution: z.string().min(2, { message: "Institution must be at least 2 characters" }),
  graduationYear: z.string().min(4, { message: "Please enter a valid graduation year" }),
  programmingLanguages: z.string(),
  frameworks: z.string(),
  databases: z.string(),
  technologies: z.string(),
  workExperienceResponsibilities: z.string().min(10, { message: "Work experience details must be at least 10 characters" }),
  linkedin: z.string().url({ message: "Please enter a valid LinkedIn URL" }).optional().or(z.literal("")),
  github: z.string().url({ message: "Please enter a valid GitHub URL" }).optional().or(z.literal(""))
});

type JobFormValues = z.infer<typeof jobFormSchema>
type CandidateFormValues = z.infer<typeof candidateFormSchema>

export default function CreatePage() {
  // Initialize Job Form
  const jobForm = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      currentStage: "",
      jobTitle: "",
      jobLevel: "",
      roleCategory: "",
      department: "",
      employmentType: "",
      yearsOfExperience: "",
      workSetup: "",
      workLocation: "",
      ctcRange: "",
      jobSummary: "",
      jobResponsibilities: "",
      jobRequirements: "",
      desiredKeySkills: "",
    }
  });

  // Initialize Candidate Form
  const candidateForm = useForm<CandidateFormValues>({
    resolver: zodResolver(candidateFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      region: "",
      country: "",
      totalYearsOfExperience: "",
      currentRole: "",
      currentCompany: "",
      degree: "",
      field: "",
      institution: "",
      graduationYear: "",
      programmingLanguages: "",
      frameworks: "",
      databases: "",
      technologies: "",
      workExperienceResponsibilities: "",
      linkedin: "",
      github: "",
    }
  });

  // Job Form Submit Handler
  const onJobSubmit = async (data: JobFormValues) => {
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        alert('Job data saved successfully!');
        jobForm.reset();
      } else {
        alert('Error saving job data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving job data');
    }
  };

  // Candidate Form Submit Handler
  const onCandidateSubmit = async (data: CandidateFormValues) => {
    try {
      const response = await fetch('/api/candidates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        alert('Candidate data saved successfully!');
        candidateForm.reset();
      } else {
        alert('Error saving candidate data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving candidate data');
    }
  };

  return (
    <div className="container mx-auto bg-background">
      
      <header className="p-4 border-b w-full  mx-auto">
                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold hover:text-primary/80 transition-colors">
                    Create new entry
                    </div>
                    <nav className="flex gap-2">
                        <Link 
                            href="/versions" 
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            versions
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

      <Tabs defaultValue="job" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="job">Create Job</TabsTrigger>
          <TabsTrigger value="candidate">Create Candidate</TabsTrigger>
        </TabsList>

        <TabsContent value="job">
          <Card>
            <CardHeader>
              <CardTitle>Create New Job Posting</CardTitle>
            </CardHeader>
            <CardContent>
            <Form {...jobForm}>
  <form onSubmit={jobForm.handleSubmit(onJobSubmit)} className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <FormField
        control={jobForm.control}
        name="jobTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter job title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={jobForm.control}
        name="currentStage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Stage</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="screening">Screening</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={jobForm.control}
        name="jobLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Level</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="mid">Mid Level</SelectItem>
                <SelectItem value="senior">Senior Level</SelectItem>
                <SelectItem value="lead">Lead</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={jobForm.control}
        name="roleCategory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Role Category</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={jobForm.control}
        name="department"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Department</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={jobForm.control}
        name="employmentType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Employment Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="fulltime">Full Time</SelectItem>
                <SelectItem value="parttime">Part Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={jobForm.control}
        name="yearsOfExperience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Years of Experience</FormLabel>
            <FormControl>
              <Input placeholder="Enter required years of experience" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={jobForm.control}
        name="workSetup"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Work Setup</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select setup" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="onsite">On-site</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={jobForm.control}
        name="workLocation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Work Location</FormLabel>
            <FormControl>
              <Input placeholder="Enter location" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={jobForm.control}
        name="ctcRange"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CTC Range</FormLabel>
            <FormControl>
              <Input placeholder="Enter CTC range" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>

    <FormField
      control={jobForm.control}
      name="jobSummary"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Job Summary</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Enter job summary" 
              className="h-32"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={jobForm.control}
      name="jobResponsibilities"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Job Responsibilities</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Enter job responsibilities" 
              className="h-32"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={jobForm.control}
      name="jobRequirements"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Job Requirements</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Enter job requirements" 
              className="h-32"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={jobForm.control}
      name="desiredKeySkills"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Desired Key Skills</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Enter desired key skills" 
              className="h-32"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <Button type="submit">Create Job</Button>
  </form>
</Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="candidate">
          <Card>
            <CardHeader>
              <CardTitle>Create New Candidate Profile</CardTitle>
            </CardHeader>
            <CardContent>
            <Form {...candidateForm}>
  <form onSubmit={candidateForm.handleSubmit(onCandidateSubmit)} className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <FormField
        control={candidateForm.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter full name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={candidateForm.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Enter email address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={candidateForm.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input placeholder="Enter phone number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={candidateForm.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>City</FormLabel>
            <FormControl>
              <Input placeholder="Enter city" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={candidateForm.control}
        name="region"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Region/State</FormLabel>
            <FormControl>
              <Input placeholder="Enter region or state" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={candidateForm.control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Country</FormLabel>
            <FormControl>
              <Input placeholder="Enter country" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={candidateForm.control}
        name="totalYearsOfExperience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total Years of Experience</FormLabel>
            <FormControl>
              <Input placeholder="Enter years of experience" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={candidateForm.control}
        name="currentRole"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Role</FormLabel>
            <FormControl>
              <Input placeholder="Enter current role" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={candidateForm.control}
        name="currentCompany"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Company</FormLabel>
            <FormControl>
              <Input placeholder="Enter current company" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={candidateForm.control}
        name="degree"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree</FormLabel>
            <FormControl>
              <Input placeholder="Enter degree" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={candidateForm.control}
        name="field"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Field of Study</FormLabel>
            <FormControl>
              <Input placeholder="Enter field of study" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={candidateForm.control}
        name="institution"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Institution</FormLabel>
            <FormControl>
              <Input placeholder="Enter institution name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={candidateForm.control}
        name="graduationYear"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Graduation Year</FormLabel>
            <FormControl>
              <Input placeholder="Enter graduation year" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>

    <div className="space-y-4">
      <FormField
        control={candidateForm.control}
        name="programmingLanguages"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Programming Languages</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter programming languages (comma-separated)" 
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={candidateForm.control}
        name="frameworks"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Frameworks</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter frameworks (comma-separated)" 
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={candidateForm.control}
        name="databases"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Databases</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter databases (comma-separated)" 
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={candidateForm.control}
        name="technologies"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Other Technologies</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter other technologies (comma-separated)" 
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={candidateForm.control}
        name="workExperienceResponsibilities"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Work Experience Details</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter work experience details" 
                className="h-32"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={candidateForm.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn Profile</FormLabel>
              <FormControl>
                <Input placeholder="Enter LinkedIn profile URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={candidateForm.control}
          name="github"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub Profile</FormLabel>
              <FormControl>
                <Input placeholder="Enter GitHub profile URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>

    <Button type="submit">Create Candidate Profile</Button>
  </form>
</Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}