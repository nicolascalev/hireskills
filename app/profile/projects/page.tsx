import ProjectCardProfile from "@/app/ui/ProjectCardProfile";
import { Button, Container, Group, SimpleGrid, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

function ProfileProjectsPage() {
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
        <ProjectCardProfile />
        <ProjectCardProfile />
        <ProjectCardProfile />
        <ProjectCardProfile />
        <ProjectCardProfile />
        <ProjectCardProfile />
      </SimpleGrid>
    </Container>
  );
}

export default ProfileProjectsPage;
