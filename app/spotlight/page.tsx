"use client";
import MessageCard from "@/app/ui/MessageCard";
import ProjectCard from "@/app/ui/ProjectCard";
import ProjectFilters from "@/app/ui/ProjectFilters";
import ProjectFiltersDrawer from "@/app/ui/ProjectFiltersDrawer";
import useProjects from "@/lib/hooks/useProjects";
import { ProjectCardType } from "@/lib/types";
import { DEFAULT_PAGE_SIZE } from "@/lib/utils";
import {
  Button,
  Container,
  Divider,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { IconFolderQuestion, IconMoodSad } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function SpotlightPage() {
  const searchParams = useSearchParams();
  const [displayedProjects, setDisplayedProjects] = useState<ProjectCardType[]>(
    []
  );
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);

  // when search changes, reset displayed projects and cursor
  useEffect(() => {
    setDisplayedProjects([]);
    setCursor(undefined);
    setNextCursor(undefined);
  }, [searchParams]);

  // fetch projects and pass the right search params and cursor
  const { projects, projectsError, projectsLoading, projectsRevalidate } =
    useProjects(searchParams, cursor);

  // when projects change, add them to displayed projects
  useEffect(() => {
    if (projects) {
      setDisplayedProjects((prev) => [...prev, ...projects]);
      if (projects.length == DEFAULT_PAGE_SIZE) {
        setNextCursor(projects[projects.length - 1].id);
      } else {
        setNextCursor(undefined);
      }
    }
  }, [projects]);

  return (
    <>
      <Container py="3rem" size="xl">
        <Stack>
          <div>
            <Text size="xl" fw={600}>
              Week spotlight
            </Text>
            <Text c="dimmed">
              The spotlight is for unemployed developers who want to showcase
              their projects
            </Text>
          </div>
          <Text>2 days left</Text>
        </Stack>
      </Container>
      <Divider />

      <Container py="3rem" size="xl">
        <Grid gutter={{ base: "md", sm: "xl" }}>
          <GridCol span={{ base: 12, sm: 3 }}>
            <ProjectFiltersDrawer />
            <Stack gap="sm" visibleFrom="sm">
              <ProjectFilters />
            </Stack>
          </GridCol>
          <GridCol span={{ base: 12, sm: 9 }}>
            <Stack>
              {displayedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
              {!projectsLoading && projectsError && (
                <MessageCard
                  icon={<IconMoodSad />}
                  title="There was an error fetching projects"
                  message="We are working on fixing this issue, please try again later"
                  action={
                    <Button onClick={() => projectsRevalidate()} size="xs">
                      Refresh
                    </Button>
                  }
                />
              )}
              {!projectsLoading &&
                !projectsError &&
                displayedProjects.length === 0 && (
                  <MessageCard
                    icon={<IconFolderQuestion />}
                    title="No projects found"
                    message="Try adjusting search filters"
                    action={
                      <Button onClick={() => projectsRevalidate()} size="xs">
                        Refresh
                      </Button>
                    }
                  />
                )}
              {projectsLoading && <div>Loading...</div>}
              {!projectsLoading && nextCursor && (
                <Group justify="center" grow>
                  <Button
                    size="xs"
                    variant="default"
                    maw={400}
                    onClick={() => setCursor(nextCursor)}
                  >
                    Load more
                  </Button>
                </Group>
              )}
            </Stack>
          </GridCol>
        </Grid>
      </Container>
    </>
  );
}

export default SpotlightPage;
