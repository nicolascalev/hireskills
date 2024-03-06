"use client";
import {
  Avatar,
  Container,
  Group,
  Text,
  Anchor,
  useMantineColorScheme,
  ActionIcon,
} from "@mantine/core";
import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

function Footer() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <footer>
      <Container py="md" size="xl">
        <Group align="center" justify="space-between">
          <Group align="center">
            <Avatar color="indigo" component={Link} href="/">
              HS
            </Avatar>
            <Text size="sm">
              By{" "}
              <Anchor
                c="inherit"
                underline="hover"
                href="https://nicolascalev.com"
                target="_blank"
              >
                @nicolascalev
              </Anchor>
            </Text>
          </Group>
          <Group gap="xs" wrap="nowrap">
            <ActionIcon
              size="sm"
              variant={colorScheme == "light" ? "light" : "transparent"}
              color="gray"
              onClick={() => setColorScheme("light")}
            >
              <IconSun size={14} />
            </ActionIcon>
            <ActionIcon
              size="sm"
              variant={colorScheme == "dark" ? "light" : "transparent"}
              color="gray"
              onClick={() => setColorScheme("dark")}
            >
              <IconMoon size={14} />
            </ActionIcon>
            <ActionIcon
              size="sm"
              variant={colorScheme == "auto" ? "light" : "transparent"}
              color="gray"
              onClick={() => setColorScheme("auto")}
            >
              <IconDeviceDesktop size={14} />
            </ActionIcon>
          </Group>
        </Group>
        <Group mt="lg" gap="xl">
          <Anchor
            size="sm"
            c="dimmed"
            underline="hover"
            href="https://github.com/nicolascalev/hireskills"
            target="_blank"
          >
            Code
          </Anchor>
          <Anchor
            size="sm"
            c="dimmed"
            underline="hover"
            href="https://linkedin.com/in/nicolascalev"
            target="_blank"
          >
            LinkedIn
          </Anchor>
          <Anchor
            size="sm"
            c="dimmed"
            underline="hover"
            href="https://github.com/nicolascalev"
            target="_blank"
          >
            GitHub
          </Anchor>
          <Anchor
            size="sm"
            c="dimmed"
            underline="hover"
            href="https://twitter.com/nicolascalev"
            target="_blank"
          >
            X
          </Anchor>
        </Group>
      </Container>
    </footer>
  );
}

export default Footer;
