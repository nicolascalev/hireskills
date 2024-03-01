import { Container } from "@mantine/core";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProjectPageContent from "@/app/ui/ProjectPageContent";

async function ProjectPage({ params }: { params: { id: string } }) {
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

  if (!project.isPublic) {
    return notFound();
  }

  return (
    <Container py="md" size="xl">
      <ProjectPageContent project={project} />
    </Container>
  );
}

export default ProjectPage;
