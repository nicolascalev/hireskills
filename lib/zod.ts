import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(1).max(50),
  username: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-zA-Z0-9_]+$/, "Invalid characters in username"),
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

export const nestedEducationFormSchema = z.object({
  education: z.array(educationSchema),
});

export const nestedAchievementsFormSchema = z.object({
  achievements: achievementsSchema,
});

export const projectSchema = z.object({
  label: z.string().min(1).max(190),
  publishDate: z.date().max(new Date()),
  timeSpent: z.string().min(1).max(30),
  url: z.string().url().optional().nullish().or(z.literal("")),
  codeRepository: z.string().url().optional().nullish().or(z.literal("")),
  level: z.enum(["basic", "intermediate", "advanced"]),
  isPublic: z.boolean(),
  isUsedByPeople: z.boolean(),
  summary: z.string().min(30).max(190),
  problem: z.string().max(2000).optional().nullish(),
  solution: z.string().max(2000).optional().nullish(),
  challengeExample: z.string().max(2000).optional().nullish(),
  tools: z.array(z.string().min(1).max(190)),
  skills: z.array(z.string().min(1).max(190)),
});

export type projectSchemaType = z.infer<typeof projectSchema>;
