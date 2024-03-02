import ProjectCardProfile from "@/app/ui/ProjectCardProfile";
import {
  Button,
  Card,
  Center,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconFolderExclamation, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

async function ProfileProjectsPage() {
  const { userId } = auth();

  const projects = await prisma.project.findMany({
    where: {
      developerId: userId as string,
    },
    include: {
      skills: true,
      tools: true,
      _count: {
        select: {
          likes: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Container size="xl" py="md">
      <Group justify="space-between" wrap="nowrap" mb="md">
        <Text fw={500}>Projects</Text>
        <Button
          size="xs"
          rightSection={<IconPlus size={14} />}
          component={Link}
          href="/profile/projects/add"
        >
          Add project
        </Button>
      </Group>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
        {projects.length === 0 && <EmptyProjectsCard />}
        {projects.map((project) => (
          <div key={project.id}>
            <ProjectCardProfile project={project} />
          </div>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default ProfileProjectsPage;

function EmptyProjectsCard() {
  return (
    <Card withBorder ta="center" py="xl">
      <Center h="100%">
        <Stack maw={300}>
          <Group justify="center">
            <ThemeIcon variant="light" color="gray" size="lg">
              <IconFolderExclamation size={16} />
            </ThemeIcon>
          </Group>
          <div>
            <Text fw={500}>No projects</Text>
            <Text size="sm">
              No projects, have been added. When you add them, they will appear
              here.
            </Text>
          </div>
          <Button
            size="xs"
            rightSection={<IconPlus size={14} />}
            component={Link}
            href="/profile/projects/add"
          >
            Add project
          </Button>
        </Stack>
      </Center>
    </Card>
  );
}
