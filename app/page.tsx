import { Box, Button, Container, Divider, Group, Text } from "@mantine/core";
import ProjectsSection from "@/app/ui/home/ProjectsSection";

export default function HomePage() {
  return (
    <>
      <Container py="xl" size="xl">
        <Group justify="center" py="3rem">
          <Box ta="center" maw="400">
            <Text component="h1" fw={700} size="3rem">
              Hire Skills
            </Text>
            <Text my="sm" c="dimmed" size="lg">
              Helping skilled developers with less traditional experience get
              hired
            </Text>
            <Group justify="center">
              <Button size="xs">Sign Up</Button>
              <Button size="xs" variant="default">
                Developers
              </Button>
            </Group>
          </Box>
        </Group>
      </Container>
      <Divider />
      <Container py="3rem" size="xl">
        <ProjectsSection
          title="Projects using JavaScript"
          description="Projects where at least one feature was built with JavaScript"
          url={{
            pathname: "/projects",
            query: { tools: ["JavaScript"] },
          }}
          where={{
            tools: { some: { name: { contains: "JavaScript" } } },
          }}
        />
      </Container>
      <Divider />
      <Container py="3rem" size="xl">
        <ProjectsSection
          title="Projects added recently"
          description="Check the latest projects added to the platform"
          url={"/projects"}
          where={{}}
        />
      </Container>
      <Divider />
      <Container py="3rem" size="xl">
        <ProjectsSection
          title="Verified projects"
          description="We verify the authenticity of the projects on the platform"
          url={{
            pathname: "/projects",
            query: { isVerified: true },
          }}
          where={{
            isVerified: true,
          }}
        />
      </Container>
    </>
  );
}
