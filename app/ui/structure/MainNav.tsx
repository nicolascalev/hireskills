"use client";
import {
  Avatar,
  Box,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  NavLink,
  ScrollArea,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SearchableSelect } from "../SearchableSelect";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

type Link = {
  label: string;
  href: string;
};

const links: Link[] = [
  { label: "Projects", href: "/projects" },
  { label: "Developers", href: "/developers" },
];

function MainNav() {
  const mobileNavbarFooter = useRef<HTMLDivElement>(null);
  const [opened, { toggle }] = useDisclosure();
  const [mobileNavbarFooterOffsetHeight, setMobileNavbarFooterOffsetHeight] =
    useState(0);

  // we use this to force re-render of mobileNavbarFooter to get its offsetHeight
  // because it is not available on first render
  const [dummy, setDummy] = useState({});
  useEffect(() => {
    setDummy({});
  }, [opened]);
  useEffect(() => {
    if (mobileNavbarFooter.current) {
      setMobileNavbarFooterOffsetHeight(
        mobileNavbarFooter.current.offsetHeight
      );
    }
  }, [dummy, mobileNavbarFooter]);

  return (
    <Container h="100%" size="xl">
      <Group h="100%" justify="space-between">
        <Group align="center">
          <Avatar color="indigo">HS</Avatar>
          <Group gap="xs" component="nav" visibleFrom="sm">
            {links.map((link) => (
              <Button
                component={Link}
                key={link.href}
                href={link.href}
                size="sm"
                variant="subtle"
                color="dark"
              >
                {link.label}
              </Button>
            ))}
          </Group>
        </Group>
        <Group align="center" justify="end" className="flex-grow-1">
          <SearchableSelect />
          <SignedOut>
            <SignInButton>
              <Button size="xs">Sign in</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <SignOutButton>
              <Button size="xs">Sign out</Button>
            </SignOutButton>
          </SignedIn>
          {/* <Avatar visibleFrom="sm" /> */}
          <Burger
            hiddenFrom="sm"
            size="sm"
            opened={opened}
            onClick={toggle}
            aria-label="Toggle navigation"
          />
          <Drawer
            opened={opened}
            onClose={toggle}
            title={<Avatar color="indigo">HS</Avatar>}
            styles={{
              body: {
                height: "calc(100svh - 70px)",
                position: "relative",
                padding: 0,
              },
            }}
            size="xl"
          >
            <ScrollArea
              h={`calc(100svh - 70px - ${mobileNavbarFooterOffsetHeight}px)`}
            >
              {links.map((link) => (
                <NavLink
                  component={Link}
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  py="md"
                />
              ))}
            </ScrollArea>
            <Box
              ref={mobileNavbarFooter}
              pos="absolute"
              bottom={0}
              w="100%"
              p="md"
              style={{
                borderTop: "1px solid var(--mantine-color-default-border)",
              }}
            >
              <Group mb="sm" style={{ overflow: "visible" }}>
                <Avatar />
                <div>
                  <Text>Nicolas Guillen</Text>
                  <Text size="sm" c="dimmed">
                    nicolascalevg@gmail.com
                  </Text>
                </div>
              </Group>
              <NavLink
                href="#required-for-focus"
                label="Profile"
                ml="-md"
                w="calc(100% + 32px)"
              />
              <NavLink
                href="#required-for-focus"
                label="Sign out"
                ml="-md"
                w="calc(100% + 32px)"
              />
            </Box>
          </Drawer>
        </Group>
      </Group>
    </Container>
  );
}

export default MainNav;
