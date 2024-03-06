import { getProjectsSample } from "@/lib/data";
import { Button, Group, SimpleGrid, Text } from "@mantine/core";
import { Prisma } from "@prisma/client";
import { IconChevronRight, IconFolderExclamation } from "@tabler/icons-react";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { Suspense } from "react";
import MessageCard from "../MessageCard";
import ProjectCard from "../ProjectCard";

function ProjectsSection({
  title,
  description,
  url,
  where,
}: {
  title: string;
  description: string;
  url: Url;
  where: Prisma.ProjectWhereInput;
}) {
  return (
    <div>
      <Group justify="space-between">
        <Text fw={500} size="lg">
          {title}
        </Text>
        <Button
          variant="transparent"
          component={Link}
          href={url}
          rightSection={<IconChevronRight size={14} />}
        >
          View all
        </Button>
      </Group>
      <Text mb="md" size="sm">
        {description}
      </Text>
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectsSectionGrid where={where} />
      </Suspense>
    </div>
  );
}

export default ProjectsSection;

async function ProjectsSectionGrid({
  where,
}: {
  where: Prisma.ProjectWhereInput;
}) {
  const res = await getProjectsSample(where);

  if (res.error || !res.projects) {
    return (
      <MessageCard
        icon={<IconFolderExclamation />}
        title="Could not fetch projects"
        message="An error occurred while fetching the projects. Please try again."
      />
    );
  }

  if (res.projects.length == 0) {
    return (
      <MessageCard
        icon={<IconFolderExclamation />}
        title="No projects published"
        message="When there are public projects they will be shown here."
      />
    );
  }
  return (
    <SimpleGrid cols={{ base: 12, sm: 2 }}>
      {res.projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </SimpleGrid>
  );
}
