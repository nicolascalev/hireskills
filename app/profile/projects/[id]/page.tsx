import ProjectPageContent from "@/app/ui/ProjectPageContent";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { Button, Container } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

async function ProfileProjectPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: {
      id: params.id,
    },
    include: {
      developer: {
        include: {
          _count: {
            select: {
              projects: {
                where: {
                  isPublic: true,
                },
              },
            },
          },
        },
      },
      skills: true,
      tools: true,
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  if (!project) {
    return notFound();
  }

  const { userId } = auth();

  if (project.developerId !== userId) {
    return redirect("/profile/projects");
  }

  return (
    <Container size="xl" py="md">
      <ProjectPageContent
        project={project}
        action={
          <Button
            size="xs"
            variant="default"
            component={Link}
            fullWidth
            href={`/profile/projects/${project.id}/edit`}
            rightSection={<IconEdit size={14} />}
          >
            Edit project
          </Button>
        }
      />
    </Container>
  );
}

export default ProfileProjectPage;
