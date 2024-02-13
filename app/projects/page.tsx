import ProjectCard from "@/app/ui/ProjectCard";
import { Container, Grid, GridCol, Stack } from "@mantine/core";
import ProjectFilters from "../ui/ProjectFilters";
import ProjectFiltersDrawer from "../ui/ProjectFiltersDrawer";

export default function ProjectsPage() {
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
