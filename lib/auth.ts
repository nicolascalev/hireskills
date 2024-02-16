import { auth, currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

// TODO: determine wether this needs noStore() or not
export async function getCurrentUser() {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

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

  const upsertUser = await prisma.user.upsert({
    where: {
      id: user.id,
    },
    update: {},
    create: {
      id: user.id,
      email: user.emailAddresses[0].emailAddress,
      fullName: user.firstName + " " + user.lastName,
      githubUsername: githubAccount?.username,
      // TODO: add image link if present and other fields
    },
  });

  return upsertUser;
}
