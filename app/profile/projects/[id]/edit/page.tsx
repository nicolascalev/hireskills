import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { Container } from "@mantine/core";
import { notFound, redirect } from "next/navigation";
import EditProjectForm from "./EditProjectForm";

async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: {
      id: params.id,
    },
    include: {
      skills: true,
      tools: true,
    },
  });

  if (!project) {
    return notFound();
  }

  const { userId } = auth();

  if (project.developerId !== userId) {
    return redirect("/profile/projects");
  }

  const formattedProject = {
    ...project,
    skills: project.skills.map((skill) => skill.name),
    tools: project.tools.map((tool) => tool.name),
  };

  return (
    <Container size="xl" py="md">
      <EditProjectForm project={formattedProject} />
    </Container>
  );
}

export default EditProjectPage;
