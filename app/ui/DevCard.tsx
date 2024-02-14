import {
  Avatar,
  Card,
  Divider,
  Group,
  Stack,
  Text
} from "@mantine/core";
import DevCardActions from "./DevCardActions";

function DevCard() {
  return (
    <Card withBorder>
      <Stack gap="sm">
        <Group wrap="nowrap" align="center">
          <Avatar />
          <div>
            <Text fw={500}>Nicolas Guillen</Text>
            <Text size="sm" c="dimmed">
              Web Developer
            </Text>
          </div>
        </Group>
        <Divider mx="-md" />
        <Group justify="space-between" align="center" gap="xs">
          <Group>
            <Text size="sm">6 years</Text>
            <Text size="sm">5 projects</Text>
            <Text size="sm">Job seeking</Text>
          </Group>
          <Group gap="xs" justify="end" className="flex-grow-1">
            <DevCardActions />
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}

export default DevCard;
