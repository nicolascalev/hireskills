"use client";
import { Menu, Button, Text, rem } from "@mantine/core";
import { IconArrowUp, IconArrowDown, IconSelector } from "@tabler/icons-react";

function SortProjectsButton() {
  return (
    <Menu shadow="md" width="target" position="bottom-start">
      <Menu.Target>
        <Button variant="default" rightSection={<IconSelector size={14} />}>
          Sort by: Featured
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item rightSection={<IconArrowUp size={14} />}>Featured</Menu.Item>
        <Menu.Item rightSection={<IconArrowUp size={14} />}>Added</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default SortProjectsButton;
