import {
  Card,
  Text,
  Group,
  Avatar,
  Divider,
  ThemeIcon,
  Button,
  ActionIcon,
  Center,
  Stack,
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
            <Group gap="xs" wrap="nowrap" mt="sm">
              <ThemeIcon variant="white" color="green">
                <IconRosetteFilled style={{ width: "60%", height: "60%" }} />
              </ThemeIcon>
              <Text size="xs">Verified project</Text>
              <ThemeIcon variant="white">
                <IconRosetteFilled style={{ width: "60%", height: "60%" }} />
              </ThemeIcon>
              <Text size="xs">Used by people</Text>
            </Group>
          </div>
          <Card withBorder p={0} miw={50} mih={50}>
            <Center h="100%" w="100%">
              <div>
                <ThemeIcon size="xs" variant="white" color="gray">
                  <IconStar style={{ width: "60%", height: "60%" }} />
                </ThemeIcon>
                <Text size="sm" ta="center">
                  14
                </Text>
              </div>
            </Center>
          </Card>
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
        <Group justify="end" gap="xs">
          <ActionIcon variant="default">
            <IconBrandGithub style={{ width: "60%", height: "60%" }} />
          </ActionIcon>
          <Button size="xs" variant="default">
            Details
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}

export default ProjectCard;
