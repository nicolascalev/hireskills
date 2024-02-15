import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  ThemeIcon
} from "@mantine/core";
import {
  IconBrandGithub,
  IconRosetteFilled,
  IconStar,
} from "@tabler/icons-react";

function ProjectCard() {
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
              <ThemeIcon variant="white" color="green">
                <IconRosetteFilled style={{ width: "60%", height: "60%" }} />
              </ThemeIcon>
              <Text size="xs" mr="5px">
                Verified project
              </Text>
              <ThemeIcon variant="white">
                <IconRosetteFilled style={{ width: "60%", height: "60%" }} />
              </ThemeIcon>
              <Text size="xs">Used by people</Text>
            </Group>
          </div>
        </Group>
        <Divider />
        <Group>
          <Avatar size="sm" />
          <div>
            <Text size="sm">Nicolas Guillen</Text>
            <Text size="sm" c="dimmed">
              Web Developer
            </Text>
          </div>
        </Group>
        <Divider />
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
            <ThemeIcon variant="white" color="gray" size="sm">
              <IconStar size={14} />
            </ThemeIcon>
            <Text size="sm">
              14
            </Text>
          </Group>
          <Group gap="xs">
            <ActionIcon variant="default">
              <IconBrandGithub style={{ width: "60%", height: "60%" }} />
            </ActionIcon>
            <Button size="xs" variant="default">
              Details
            </Button>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}

export default ProjectCard;
