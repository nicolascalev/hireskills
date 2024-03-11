"use client";
import { AuthContext } from "@/lib/AuthContextProvider";
import { SignInButton, SignUpButton, useClerk } from "@clerk/nextjs";
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
import { IconCode, IconLogout, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { SearchableSelect } from "../SearchableSelect";

type Link = {
  label: string;
  href: string;
};

const links: Link[] = [
  { label: "Spotlight", href: "/spotlight" },
  { label: "Projects", href: "/projects" },
  { label: "Developers", href: "/developers" },
];

function MainNav() {
  const { user } = useContext(AuthContext);
  const isSignedIn = useMemo(() => !!user, [user]);

  const mobileNavbarFooter = useRef<HTMLDivElement>(null);
  const [opened, { toggle, close }] = useDisclosure();
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

  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <Container h="100%" size="xl">
      <Group h="100%" justify="space-between">
        <Group align="center">
          <Avatar color="indigo" component={Link} href="/">
            HS
          </Avatar>
          <Group gap="xs" component="nav" visibleFrom="sm">
            {links.map((link) => (
              <Button
                component={Link}
                key={link.href}
                href={link.href}
                size="sm"
                variant="subtle"
                color="var(--mantine-color-text)"
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
              <Menu shadow="md" width={250} position="bottom-end">
                <MenuTarget>
                  <Avatar
                    src={user?.avatarUrl || undefined}
                    style={{ cursor: "pointer" }}
                  />
                </MenuTarget>

                <MenuDropdown>
                  <Box p="sm">
                    <Text size="sm" lineClamp={1}>
                      {user?.fullName}
                    </Text>
                    <Text size="xs" lineClamp={1} c="dimmed">
                      {user?.email}
                    </Text>
                  </Box>
                  <MenuItem
                    component={Link}
                    href="/profile"
                    rightSection={<IconUser size={14} />}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    href="/profile/projects"
                    rightSection={<IconCode size={14} />}
                  >
                    My projects
                  </MenuItem>
                  <MenuItem
                    color="red"
                    rightSection={<IconLogout size={14} />}
                    onClick={() => signOut(() => router.push("/"))}
                  >
                    Log out
                  </MenuItem>
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
                height: "calc(100dvh - 70px)",
                position: "relative",
                padding: 0,
              },
            }}
            size="xl"
          >
            <ScrollArea
              h={`calc(100dvh - 70px - ${mobileNavbarFooterOffsetHeight}px)`}
            >
              {links.map((link) => (
                <NavLink
                  component={Link}
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  py="md"
                  onClick={() => close()}
                />
              ))}
              {isSignedIn && (
                <NavLink
                  component={Link}
                  href="/profile/projects"
                  label="My projects"
                  py="md"
                  onClick={() => close()}
                />
              )}
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
                    <Avatar
                      src={user?.avatarUrl || undefined}
                      component={Link}
                      href="/"
                      onClick={() => close()}
                    />
                    <div>
                      <Text>{user.fullName}</Text>
                      <Text size="sm" c="dimmed">
                        {user.email}
                      </Text>
                    </div>
                  </Group>
                  <NavLink
                    label="Profile"
                    ml="-md"
                    w="calc(100% + 32px)"
                    component={Link}
                    href="/profile"
                    onClick={() => close()}
                  />
                  <NavLink
                    label="Sign out"
                    ml="-md"
                    w="calc(100% + 32px)"
                    onClick={() => {
                      close;
                      signOut(() => router.push("/"));
                    }}
                  />
                </>
              ) : (
                <Stack gap="xs">
                  <SignUpButton>
                    <Button size="xs" onClick={() => close()}>
                      Sign up
                    </Button>
                  </SignUpButton>
                  <SignInButton>
                    <Button
                      size="xs"
                      variant="transparent"
                      onClick={() => close()}
                    >
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
