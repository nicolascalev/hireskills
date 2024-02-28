import prisma from "@/lib/prisma";
import { DeveloperPage } from "@/lib/types";
import { auth } from "@clerk/nextjs";
import { Button } from "@mantine/core";
import { Resume } from "@prisma/client";
import Link from "next/link";
import DeveloperPageContent from "../ui/DeveloperPageContent";
import { IconEdit } from "@tabler/icons-react";

async function ProfilePage() {
  const { userId } = auth();
  const user = (await prisma.user.findUnique({
    where: {
      id: userId as string,
    },
    include: {
      tools: true,
      skills: true,
    },
  })) as DeveloperPage;

  let defaultResume: Resume | null = null;
  if (user.defaultResumeId) {
    defaultResume = await prisma.resume.findFirst({
      where: {
        id: user.defaultResumeId,
      },
    });
  }

  return (
    <DeveloperPageContent
      user={user}
      defaultResume={defaultResume}
      action={
        <Button
          size="xs"
          variant="default"
          fullWidth
          component={Link}
          href="/profile/edit"
          leftSection={<IconEdit size={14} />}
        >
          Edit profile
        </Button>
      }
    />
  );
}

export default ProfilePage;
