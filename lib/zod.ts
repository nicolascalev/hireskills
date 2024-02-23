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
