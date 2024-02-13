"use client";
import { useDisclosure } from "@mantine/hooks";
import { Button, Drawer, Indicator, Stack } from "@mantine/core";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import ProjectFilters from "@/app/ui/ProjectFilters";

function ProjectFiltersDrawer() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      {/* show indicator only if there are filters active */}
      <Indicator disabled={true}>
        <Button
          variant="default"
          fullWidth
          hiddenFrom="sm"
          rightSection={<IconAdjustmentsHorizontal size={14} />}
          onClick={open}
        >
          Filters
        </Button>
      </Indicator>

      <Drawer opened={opened} onClose={close} title="Project filters" size="xl">
        <Stack gap="sm">
          <ProjectFilters />
          <Button onClick={close}>Close</Button>
        </Stack>
      </Drawer>
    </>
  );
}

export default ProjectFiltersDrawer;
