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

export type ProjectPage = Prisma.ProjectGetPayload<{
  include: {
    developer: {
      include: {
        _count: {
          select: {
            projects: {
              where: {
                isPublic: true;
              };
            };
          };
        };
      };
    };
    skills: true;
    tools: true;
    _count: {
      select: {
        comments: true;
      };
    };
  };
}>;

export type ProfileProjectCard = Prisma.ProjectGetPayload<{
  include: {
    skills: true;
    tools: true;
  };
}>;

export type CommentWithUser = Prisma.ProjectCommentGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        username: true;
        fullName: true;
        avatarUrl: true;
      };
    };
    _count: {
      select: {
        replies: true;
      };
    };
  };
}>;

export type ProjectCardType = Prisma.ProjectGetPayload<{
  include: {
    skills: true;
    tools: true;
    developer: {
      select: {
        id: true;
        username: true;
        fullName: true;
        avatarUrl: true;
        role: true;
      };
    };
  };
}>;

export type DeveloperCardType = Prisma.UserGetPayload<{
  select: {
    id: true;
    username: true;
    fullName: true;
    avatarUrl: true;
    role: true;
    githubUsername: true;
    linkedinUsername: true;
    startedCoding: true;
    jobSeeking: true;
    displayJobSeeking: true;
    _count: {
      select: {
        projects: {
          where: {
            isPublic: true;
          };
        };
      };
    };
  };
}>;

export type DeveloperMinimalCardType = Prisma.UserGetPayload<{
  select: {
    id: true;
    username: true;
    fullName: true;
    avatarUrl: true;
    role: true;
  };
}>;
