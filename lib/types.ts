import { Prisma } from "@prisma/client";

export type LoggedInUser = Prisma.UserGetPayload<{
  include: {
    resumes: true;
  };
}>;
