import { Box, Button, Container, Divider, Group, Text } from "@mantine/core";
import ProjectsSection from "@/app/ui/home/ProjectsSection";
import DevelopersSection from "./ui/home/DevelopersSection";
import Link from "next/link";
import { SignUpButton, auth } from "@clerk/nextjs";

export default function HomePage() {
  const { userId } = auth();

  return (
    <>
      {userId ? null : (
        <>
          <Container py="xl" size="xl">
            <Group justify="center" py="3rem">
              <Box ta="center" maw="400">
                <Text component="h1" fw={700} size="3rem">
                  Hire Skills
                </Text>
                <Text my="sm" c="dimmed" size="lg">
                  Helping skilled developers with less traditional experience
                  get hired
                </Text>
                <Group justify="center">
                  <SignUpButton>
                    <Button size="xs">Sign Up</Button>
                  </SignUpButton>
                  <Button
                    size="xs"
                    variant="default"
                    component={Link}
                    href="/developers"
                  >
                    Developers
                  </Button>
                </Group>
              </Box>
            </Group>
          </Container>
          <Divider />
        </>
      )}
      <Container py="3rem" size="xl">
        <ProjectsSection
          title="Weekly spotlight projects"
          description="Projects highlighted in this week's spotlight"
          url={{
            pathname: "/spotlight",
          }}
          where={{
            developer: {
              isSpotlightParticipant: true,
            },
          }}
        />
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
        <DevelopersSection
          title="Developers who have built frontend"
          description="Developers with experience in building user interfaces"
          url={{
            pathname: "/developers",
            query: { skills: ["Frontend"] },
          }}
          where={{
            skills: { some: { name: { contains: "Frontend" } } },
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
        <DevelopersSection
          title="Developers using JavaScript"
          description="Developers with experience in JavaScript"
          url={{
            pathname: "/developers",
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
