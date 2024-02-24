import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(1).max(50),
  company: z.string().max(50).optional(),
  role: z.string().max(50).optional(),
  location: z.string().max(50).optional(),
  startedCoding: z.date().nullish().optional(),
  startedProfessionalExperience: z.date().nullish().optional(),
  summary: z.string().max(1000).optional(),
});

export const linksAndSocialsSchema = z.object({
  portfolioUrl: z.string().url().optional().or(z.literal("")),
  linkedinUsername: z.string().max(50).optional(),
  githubUsername: z.string().max(50).optional(),
  leetcodeUsername: z.string().max(50).optional(),
});

export const profilePreferences = z.object({
  jobSeeking: z.boolean().optional(),
  displayJobSeeking: z.boolean().optional(),
  displayGithubActivity: z.boolean().optional(),
  displayEmail: z.boolean().optional(),
  displayPublicResume: z.boolean().optional(),
  displayActiveOpenSource: z.boolean().optional(),
});

export const updateDefaultResumeSchema = z.object({
  defaultResumeId: z.string().uuid().or(z.literal(null)),
});

export const experienceSchema = z.object({
  company: z.string().min(1).max(50),
  role: z.string().min(1).max(50),
  startDate: z.string().min(1).max(50),
  endDate: z.string().min(1).max(50),
  description: z.string().max(1000).optional(),
});

export const educationSchema = z.object({
  school: z.string().min(1).max(190),
  degree: z.string().min(1).max(190),
  fieldOfStudy: z.string().min(1).max(190),
  startDate: z.string().min(1).max(50),
  endDate: z.string().min(1).max(50),
  description: z.string().max(1000).optional(),
});

export const achievementsSchema = z.array(z.string().min(1).max(190));

export const careerSchema = z.object({
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  achievements: achievementsSchema,
});

export const nestedExperienceFormSchema = z.object({
  experience: z.array(experienceSchema),
});
