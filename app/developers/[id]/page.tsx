import DeveloperPageContent from "@/app/ui/DeveloperPageContent";
import prisma from "@/lib/prisma";
import { DeveloperPage } from "@/lib/types";
import { Resume } from "@prisma/client";
import { notFound } from "next/navigation";

export default async function DeveloperPage({
  params,
}: {
  params: { id: string };
}) {
  const user = (await prisma.user.findUnique({
    where: {
      username: params.id,
    },
    include: {
      tools: true,
      skills: true,
    },
  })) as DeveloperPage | null;

  if (!user) {
    return notFound();
  }

  let defaultResume: Resume | null = null;
  if (user.defaultResumeId) {
    defaultResume = await prisma.resume.findFirst({
      where: {
        id: user.defaultResumeId,
      },
    });
  }

  return <DeveloperPageContent user={user} defaultResume={defaultResume} />;
}
