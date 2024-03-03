"use client";
import ProjectCard from "@/app/ui/ProjectCard";
import { Container, Grid, GridCol, Stack } from "@mantine/core";
import ProjectFilters from "../ui/ProjectFilters";
import ProjectFiltersDrawer from "../ui/ProjectFiltersDrawer";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  useEffect(() => {
    console.log("from parent", searchParams.toString());
  }, [searchParams]);

  return (
    <Container py="md" size="xl">
      <Grid gutter={{ base: "md", sm: "xl" }}>
        <GridCol span={{ base: 12, sm: 3 }}>
          <ProjectFiltersDrawer />
          <Stack gap="sm" visibleFrom="sm">
            <ProjectFilters />
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, sm: 9 }}>
          <Stack>
            <ProjectCard />
            <ProjectCard />
          </Stack>
        </GridCol>
      </Grid>
    </Container>
  );
}
