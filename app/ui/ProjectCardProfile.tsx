import {
  Button,
  Card,
  Group,
  Stack,
  Text,
  ThemeIcon
} from "@mantine/core";
import {
  IconChevronRight,
  IconEdit,
  IconRosetteFilled,
  IconStar
} from "@tabler/icons-react";

function ProjectCardProfile() {
  return (
    <Card withBorder>
      <Stack gap="sm">
        <Group justify="space-between" align="start" wrap="nowrap" gap="xs">
          <div>
            <Text fw={500}>Circle Career</Text>
            <Text size="sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error,
              qui.
            </Text>
            <Group gap="5px" wrap="nowrap" align="center" mt="sm">
              <ThemeIcon variant="transparent" color="green">
                <IconRosetteFilled style={{ width: "60%", height: "60%" }} />
              </ThemeIcon>
              <Text size="xs" mr="5px">
                Verified project
              </Text>
              <ThemeIcon variant="transparent">
                <IconRosetteFilled style={{ width: "60%", height: "60%" }} />
              </ThemeIcon>
              <Text size="xs">Used by people</Text>
            </Group>
          </div>
        </Group>
        <div>
          <Text size="sm" lineClamp={1}>
            Skills: Frontend, Backend, Databases, DevOps...
          </Text>
          <Text size="sm" lineClamp={1}>
            Tools: JavaScript, Node js, Prisma...
          </Text>
          <Text size="sm" lineClamp={1}>
            Level: Advanced
          </Text>
        </div>
        <Group justify="space-between">
          <Group align="center" gap="2px">
            <ThemeIcon variant="transparent" color="gray" size="sm">
              <IconStar size={14} />
            </ThemeIcon>
            <Text size="sm">
              14
            </Text>
          </Group>
          <Group gap="xs">
            <Button size="xs" variant="default" rightSection={
              <IconEdit size={14} />
            }>
              Edit
            </Button>
            <Button size="xs" variant="default" rightSection={
              <IconChevronRight size={14} />
            }>
              Details
            </Button>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}

export default ProjectCardProfile;
