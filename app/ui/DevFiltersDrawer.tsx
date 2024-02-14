"use client";
import { useDisclosure } from "@mantine/hooks";
import { Button, Drawer, Indicator, Stack } from "@mantine/core";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import DevFilters from "@/app/ui/DevFilters";

function DevFiltersDrawer() {
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

      <Drawer opened={opened} onClose={close} title="Developer filters" size="xl">
        <Stack gap="sm">
          <DevFilters />
          <Button onClick={close}>Close</Button>
        </Stack>
      </Drawer>
    </>
  );
}

export default DevFiltersDrawer;
