import React from "react";
import { Card, Center, Stack, Text, Group, ThemeIcon } from "@mantine/core";

export default function MessageCard({
  icon,
  title,
  message,
  action,
}: {
  icon?: JSX.Element;
  title: string;
  message: string;
  action?: React.ReactNode;
}) {
  return (
    <Card withBorder ta="center" py="xl">
      <Center h="100%">
        <Stack maw={300} w="100%">
          {icon && (
            <Group justify="center">
              <ThemeIcon variant="light" color="gray" size="lg">
                {React.cloneElement(icon, { size: 16 })}
              </ThemeIcon>
            </Group>
          )}
          <div>
            <Text fw={500}>{title}</Text>
            <Text size="sm">{message}</Text>
          </div>
          {action}
        </Stack>
      </Center>
    </Card>
  );
}
