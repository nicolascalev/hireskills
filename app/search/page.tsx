import { getDevelopersSample, getProjectsSample } from "@/lib/data";
import {
  Anchor,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import ProjectCard from "../ui/ProjectCard";
import { DeveloperCardType, ProjectCardType } from "@/lib/types";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import DevCard from "../ui/DevCard";
import { IconChevronRight } from "@tabler/icons-react";

async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search = returnStringOrFirstElement(searchParams.search);
  const displaySearch = search || "All";

  const [
    { projects, projectsCount, projectsError },
    { projectsWithSkill, projectsWithSkillCount, projectsWithSkillError },
    { projectsWithTool, projectsWithToolCount, projectsWithToolError },
    { developers, developersCount, developersError },
    { developersWithSkill, developersWithSkillCount, developersWithSkillError },
  ] = await Promise.all([
    searchProjectsByLabelAndSummary(search),
    searchProjectsWithSkill(search),
    searchProjectsWithTool(search),
    searchDevelopers(search),
    searchDevelopersWithSkill(search),
  ]);

  return (
    <Container py="md" size="xl">
      <Grid gutter={{ base: "md", sm: "xl" }}>
        <GridCol span={{ sm: 3 }} visibleFrom="sm">
          <Card withBorder pos="sticky" top="76px">
            <Group justify="space-between">
              <Text size="sm">Projects</Text>
              <Text size="sm">{projectsCount || 0}</Text>
            </Group>
            <Divider mx="-md" my="sm" />
            <Group justify="space-between">
              <Text size="sm">Developers</Text>
              <Text size="sm">{developersCount || 0}</Text>
            </Group>
            <Divider mx="-md" my="sm" />
            <Group justify="space-between">
              <Text size="sm">Projects with skill</Text>
              <Text size="sm">{projectsWithSkillCount || 0}</Text>
            </Group>
            <Divider mx="-md" my="sm" />
            <Group justify="space-between">
              <Text size="sm">Projects with tool</Text>
              <Text size="sm">{projectsWithToolCount || 0}</Text>
            </Group>
            <Divider mx="-md" my="sm" />
            <Group justify="space-between">
              <Text size="sm">Developers with skill</Text>
              <Text size="sm">{developersWithSkillCount || 0}</Text>
            </Group>
          </Card>
        </GridCol>
        <GridCol span={{ base: 12, sm: 9 }}>
          <Stack gap="xl">
            <SearchSection
              title={"Projects with: " + displaySearch}
              description="Projects that match your search criteria"
            >
              {projects && (
                <SearchSectionProjectsContent
                  projects={projects}
                  projectsError={projectsError}
                />
              )}
              {projectsCount !== undefined && projectsCount > 2 && (
                <FindMoreButton
                  url={{
                    pathname: "/projects",
                    query: { search },
                  }}
                />
              )}
            </SearchSection>
            <Divider />
            <SearchSection
              title={"Developers with: " + displaySearch}
              description="Developers that match your search criteria"
            >
              {developers && (
                <SearchSectionDevelopersContent
                  developers={developers}
                  developersError={developersError}
                />
              )}
              {developersCount !== undefined && developersCount > 2 && (
                <FindMoreButton
                  url={{
                    pathname: "/developers",
                    query: { name: search },
                  }}
                />
              )}
            </SearchSection>
            <Divider />
            <SearchSection
              title={"Projects with skill: " + displaySearch}
              description="Projects that match your search criteria"
            >
              {projectsWithSkill && (
                <SearchSectionProjectsContent
                  projects={projectsWithSkill}
                  projectsError={projectsWithSkillError}
                />
              )}
              {projectsWithSkillCount !== undefined &&
                projectsWithSkillCount > 2 && (
                  <FindMoreButton
                    url={{
                      pathname: "/projects",
                      query: { skills: [search] },
                    }}
                  />
                )}
            </SearchSection>
            <Divider />
            <SearchSection
              title={"Projects with tool: " + displaySearch}
              description="Projects that match your search criteria"
            >
              {projectsWithTool && (
                <SearchSectionProjectsContent
                  projects={projectsWithTool}
                  projectsError={projectsWithToolError}
                />
              )}
              {projectsWithToolCount !== undefined &&
                projectsWithToolCount > 2 && (
                  <FindMoreButton
                    url={{
                      pathname: "/projects",
                      query: { tools: [search] },
                    }}
                  />
                )}
            </SearchSection>
            <Divider />
            <SearchSection
              title={"Developers with skill: " + displaySearch}
              description="Developers that match your search criteria"
            >
              {developersWithSkill && (
                <SearchSectionDevelopersContent
                  developers={developersWithSkill}
                  developersError={developersWithSkillError}
                />
              )}
              {developersWithSkillCount !== undefined &&
                developersWithSkillCount > 2 && (
                  <FindMoreButton
                    url={{
                      pathname: "/developers",
                      query: { skills: [search] },
                    }}
                  />
                )}
            </SearchSection>
          </Stack>
        </GridCol>
      </Grid>
    </Container>
  );
}

export default SearchPage;

function SearchSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Stack gap="sm">
      <div>
        <Text fw={500}>{title}</Text>
        <Text size="sm">{description}</Text>
      </div>
      {children}
    </Stack>
  );
}

function SearchSectionProjectsContent({
  projects,
  projectsError,
}: {
  projects: ProjectCardType[];
  projectsError: string;
}) {
  if (projectsError) {
    return (
      <Text c="dimmed" size="sm">
        {projectsError}
      </Text>
    );
  }
  if (!projects.length) {
    return (
      <Text c="dimmed" size="sm">
        No projects found
      </Text>
    );
  }
  return (
    <Grid>
      {projects.map((project) => (
        <GridCol span={{ base: 12, sm: 6 }} key={project.id}>
          <ProjectCard project={project} />
        </GridCol>
      ))}
    </Grid>
  );
}

function SearchSectionDevelopersContent({
  developers,
  developersError,
}: {
  developers: DeveloperCardType[];
  developersError: string;
}) {
  if (developersError) {
    return (
      <Text c="dimmed" size="sm">
        {developersError}
      </Text>
    );
  }
  if (!developers.length) {
    return (
      <Text c="dimmed" size="sm">
        No developers found
      </Text>
    );
  }
  return (
    <Stack>
      {developers.map((developer) => (
        <DevCard key={developer.id} developer={developer} />
      ))}
    </Stack>
  );
}

function FindMoreButton({ url }: { url: Url }) {
  return (
    <Group justify="end">
      <Button
        size="xs"
        variant="transparent"
        component={Link}
        href={url}
        rightSection={<IconChevronRight size={14} />}
      >
        Find more
      </Button>
    </Group>
  );
}

function returnStringOrFirstElement(
  val: string | string[] | undefined
): string {
  if (Array.isArray(val)) {
    return val[0];
  }
  return val || "";
}

function searchProjectsByLabelAndSummary(search: string) {
  return getProjectsSample({
    OR: [
      {
        label: { contains: search },
      },
      {
        summary: { contains: search },
      },
    ],
  }).then((res) => {
    return {
      projects: res.projects,
      projectsCount: res.count,
      projectsError: res.error,
    };
  });
}

function searchProjectsWithSkill(search: string) {
  return getProjectsSample({
    skills: {
      some: {
        name: { contains: search },
      },
    },
  }).then((res) => {
    return {
      projectsWithSkill: res.projects,
      projectsWithSkillCount: res.count,
      projectsWithSkillError: res.error,
    };
  });
}

function searchProjectsWithTool(search: string) {
  return getProjectsSample({
    tools: {
      some: {
        name: { contains: search },
      },
    },
  }).then((res) => {
    return {
      projectsWithTool: res.projects,
      projectsWithToolCount: res.count,
      projectsWithToolError: res.error,
    };
  });
}

function searchDevelopers(search: string) {
  return getDevelopersSample({
    OR: [
      {
        username: { contains: search },
      },
      {
        fullName: { contains: search },
      },
    ],
  }).then((res) => {
    return {
      developers: res.developers,
      developersCount: res.count,
      developersError: res.error,
    };
  });
}

function searchDevelopersWithSkill(search: string) {
  return getDevelopersSample({
    skills: {
      some: {
        name: { contains: search },
      },
    },
  }).then((res) => {
    return {
      developersWithSkill: res.developers,
      developersWithSkillCount: res.count,
      developersWithSkillError: res.error,
    };
  });
}
