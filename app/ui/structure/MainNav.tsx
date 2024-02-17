"use client";
import { AuthContext } from "@/lib/AuthContext";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  useSession
} from "@clerk/nextjs";
import {
  Avatar,
  Box,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  NavLink,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { SearchableSelect } from "../SearchableSelect";

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

  const { isSignedIn } = useSession();
  const { user } = useContext(AuthContext);

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
          <Box visibleFrom="sm">
            {!isSignedIn ? (
              <SignInButton>
                <Button size="xs">Sign in</Button>
              </SignInButton>
            ) : (
              <Menu shadow="md" width={200} position="bottom-end">
                <MenuTarget>
                  <Avatar style={{ cursor: "pointer" }} />
                </MenuTarget>

                <MenuDropdown>
                  <MenuItem
                    component={Link}
                    href="/profile"
                    rightSection={<IconUser size={14} />}
                  >
                    Profile
                  </MenuItem>
                  <SignOutButton>
                    <MenuItem
                      color="red"
                      rightSection={<IconLogout size={14} />}
                    >
                      Log out
                    </MenuItem>
                  </SignOutButton>
                </MenuDropdown>
              </Menu>
            )}
          </Box>
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
              {isSignedIn && user ? (
                <>
                  <Group mb="sm" style={{ overflow: "visible" }}>
                    <Avatar />
                    <div>
                      <Text>{user.fullName}</Text>
                      <Text size="sm" c="dimmed">
                        {user.email}
                      </Text>
                    </div>
                  </Group>
                  <NavLink label="Profile" ml="-md" w="calc(100% + 32px)" />
                  <SignOutButton>
                    <NavLink label="Sign out" ml="-md" w="calc(100% + 32px)" />
                  </SignOutButton>
                </>
              ) : (
                <Stack gap="xs">
                  <SignUpButton>
                    <Button size="xs">Sign up</Button>
                  </SignUpButton>
                  <SignInButton>
                    <Button size="xs" variant="white">
                      Sign in
                    </Button>
                  </SignInButton>
                </Stack>
              )}
            </Box>
          </Drawer>
        </Group>
      </Group>
    </Container>
  );
}

export default MainNav;
