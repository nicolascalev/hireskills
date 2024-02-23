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
