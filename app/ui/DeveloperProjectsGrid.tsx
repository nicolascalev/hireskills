"use client";

import { Button, Collapse, Grid, GridCol } from "@mantine/core";
import { ProjectCardType } from "@/lib/types";
import { useDisclosure } from "@mantine/hooks";
import ProjectCard from "./ProjectCard";
import { useMemo } from "react";

function DeveloperProjectsGrid({ projects }: { projects: ProjectCardType[] }) {
  const [opened, { toggle }] = useDisclosure(false);
  const firstTwo = useMemo(() => {
    return projects.slice(0, 2);
  }, [projects]);
  const afterTwo = useMemo(() => {
    return projects.slice(2);
  }, [projects]);

  return (
    <Grid>
      {firstTwo.map((project) => (
        <GridCol key={project.id} span={{ base: 12, sm: 6 }}>
          <ProjectCard project={project} />
        </GridCol>
      ))}
      <Collapse in={opened} w="100%">
        <GridCol span={12}>
          <Grid>
            {afterTwo.map((project) => (
              <GridCol key={project.id} span={{ base: 12, sm: 6 }}>
                <ProjectCard project={project} />
              </GridCol>
            ))}
          </Grid>
        </GridCol>
      </Collapse>
      {afterTwo.length > 0 && (
        <GridCol span={12}>
          <Button size="xs" variant="default" onClick={toggle}>
            {opened ? "Hide" : `Show ${afterTwo.length} more`}
          </Button>
        </GridCol>
      )}
    </Grid>
  );
}

export default DeveloperProjectsGrid;
