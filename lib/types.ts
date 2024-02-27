import { Prisma } from "@prisma/client";

export type Experience = {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Education = {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Career = {
  experience: Experience[];
  education: Education[];
  achievements: string[];
};

export type LoggedInUser = Prisma.UserGetPayload<{
  include: {
    resumes: true;
  };
}> & {
  career: Career;
};

export type DeveloperPage = Prisma.UserGetPayload<{
  include: {
    skills: true;
    tools: true;
  };
}> & {
  career: Career;
};
