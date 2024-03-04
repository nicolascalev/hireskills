"use client";
import ProjectCard from "@/app/ui/ProjectCard";
import { Button, Container, Grid, GridCol, Group, Stack } from "@mantine/core";
import ProjectFilters from "../ui/ProjectFilters";
import ProjectFiltersDrawer from "../ui/ProjectFiltersDrawer";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import useProjects from "@/lib/hooks/useProjects";
import { ProjectCardType } from "@/lib/types";
import { DEFAULT_PAGE_SIZE } from "@/lib/utils";

export default function ProjectsPage() {
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
  const { projects, projectsError, projectsLoading } = useProjects(
    searchParams,
    cursor
  );

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
    <Container py="md" size="xl">
      <Grid gutter={{ base: "md", sm: "xl" }}>
        <GridCol span={{ base: 12, sm: 3 }}>
          <ProjectFiltersDrawer />
          <Stack gap="sm" visibleFrom="sm" pos="sticky" top="76px">
            <ProjectFilters />
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, sm: 9 }}>
          <Stack>
            {displayedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
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
  );
}
