"use client";

import { useMantineTheme, Box } from "@mantine/core";
import GitHubCalendar from "react-github-calendar";

// About colorScheme
// useColorScheme() does not always return the correct color scheme that's being rendered because it returns window.matchMedia("(prefers-color-scheme: dark)")
// this also gets rid of flickering when the color scheme changes and loads data

function GitHubCalendarWrapper({ username }: { username: string }) {
  const theme = useMantineTheme();

  return (
    <>
      <Box lightHidden>
        <GitHubCalendar
          theme={{
            dark: [theme.colors.dark[5], theme.colors.green[5]],
          }}
          username={username}
          colorScheme="dark"
        />
      </Box>
      <Box darkHidden>
        <GitHubCalendar
          theme={{
            light: ["hsl(0, 0%, 95%)", theme.colors.green[5]],
          }}
          username={username}
          colorScheme="light"
        />
      </Box>
    </>
  );
}

export default GitHubCalendarWrapper;
