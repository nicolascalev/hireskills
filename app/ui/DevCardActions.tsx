"use client";

import { ActionIcon } from "@mantine/core";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

function DevCardActions() {
  return (
    <>
      <ActionIcon variant="default" onClick={(e) => e.stopPropagation()}>
        <IconBrandLinkedin style={{ width: "60%", height: "60%" }} />
      </ActionIcon>
      <ActionIcon variant="default" onClick={(e) => e.stopPropagation()}>
        <IconBrandGithub style={{ width: "60%", height: "60%" }} />
      </ActionIcon>
    </>
  );
}

export default DevCardActions;
