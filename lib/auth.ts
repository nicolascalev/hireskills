import { auth, currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { Career, LoggedInUser } from "./types";

export async function getCurrentUser() {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  return (await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      resumes: true,
    },
  })) as LoggedInUser | null;
}

const defaultCareer: Career = {
  experience: [],
  education: [],
  achievements: [],
};

// this function will only be called after signup
// we use clerk user and add it to our database
export async function createUser() {
  const user = await currentUser();

  if (!user) {
    throw new Error("Something went wrong. Please try again.");
  }

  // get github account if present
  const githubAccount = user.externalAccounts.find(
    (account) => account.provider === "oauth_github"
  );

  // if the user does not have name and last name we use the email
  let fullName = [user.firstName, " ", user.lastName].join("").trim();
  let emailAddress = user.emailAddresses[0].emailAddress;
  let username = emailAddress.split("@")[0] + Math.floor(Math.random() * 1000);

  const upsertUser = await prisma.user.upsert({
    where: {
      id: user.id,
    },
    update: {},
    create: {
      id: user.id,
      username,
      email: emailAddress,
      fullName: fullName ? fullName : emailAddress.split("@")[0],
      githubUsername: githubAccount?.username,
      avatarUrl: user.imageUrl || undefined,
      career: defaultCareer,
    },
  });

  return upsertUser;
}
