import DevCard from "@/app/ui/DevCard";
import { Container, Grid, GridCol, Stack } from "@mantine/core";
import DevFilters from "../ui/DevFilters";
import DevFiltersDrawer from "../ui/DevFiltersDrawer";

export default function ProjectsPage() {
  return (
    <Container py="md" size="xl">
      <Grid gutter={{ base: "md", sm: "xl" }}>
        <GridCol span={{ base: 12, sm: 3 }}>
          <DevFiltersDrawer />
          <Stack gap="sm" visibleFrom="sm">
            <DevFilters />
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, sm: 9 }}>
          <Stack>
            <DevCard />
            <DevCard />
            <DevCard />
          </Stack>
        </GridCol>
      </Grid>
    </Container>
  );
}