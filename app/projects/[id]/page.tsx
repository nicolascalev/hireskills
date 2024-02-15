import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
  Textarea,
  ThemeIcon,
} from "@mantine/core";
import {
  IconArrowForward,
  IconBrandGithub,
  IconCalendar,
  IconClockCode,
  IconDiscountCheck,
  IconExternalLink,
  IconFolderCode,
  IconGrowth,
  IconHeart,
  IconMessageCircle,
  IconStackPop,
  IconTimeDuration10,
} from "@tabler/icons-react";
import { ReactNode } from "react";

function ProjectPage() {
  return (
    <Container py="md" size="xl">
      <Grid gutter={{ base: "md", sm: "xl" }}>
        <GridCol span={{ base: 12, sm: 3 }}>
          <Stack gap="sm" pos="sticky" top="76px">
            <Text fw={500}>Project</Text>
            <Group wrap="nowrap" gap="xs">
              <ThemeIcon variant="white" size="xs">
                <IconCalendar />
              </ThemeIcon>
              <div>
                <Text size="sm">Publish date</Text>
                <Text size="sm">Feb 18th, 2022</Text>
              </div>
            </Group>
            <Group wrap="nowrap" gap="xs">
              <ThemeIcon variant="white" size="xs">
                <IconTimeDuration10 />
              </ThemeIcon>
              <div>
                <Text size="sm">Time spent</Text>
                <Text size="sm">2 weeks</Text>
              </div>
            </Group>
            <Group wrap="nowrap" gap="xs">
              <ThemeIcon variant="white" size="xs">
                <IconStackPop />
              </ThemeIcon>
              <Text size="sm">Advanced</Text>
            </Group>
            <Group wrap="nowrap" gap="xs">
              <ThemeIcon variant="white" size="xs">
                <IconDiscountCheck />
              </ThemeIcon>
              <Text size="sm">Used by people</Text>
            </Group>
            <Group wrap="nowrap" gap="xs">
              <ThemeIcon variant="white" size="xs" color="green">
                <IconDiscountCheck />
              </ThemeIcon>
              <Text size="sm">Verified project</Text>
            </Group>
            <Divider />
            <div>
              <Avatar mb="xs" />
              <Text fw={500}>Nicolas Guillen</Text>
              <Text size="sm">Full stack developer</Text>
            </div>
            <Group wrap="nowrap" gap="xs">
              <ThemeIcon color="green" variant="white" size="xs">
                <IconGrowth />
              </ThemeIcon>
              <Text size="sm">Job seeking</Text>
            </Group>
            <Group wrap="nowrap" gap="xs">
              <ThemeIcon variant="white" size="xs">
                <IconFolderCode />
              </ThemeIcon>
              <Text size="sm">5 projects</Text>
            </Group>
            <Group wrap="nowrap" gap="xs">
              <ThemeIcon variant="white" size="xs">
                <IconClockCode />
              </ThemeIcon>
              <Text size="sm">5 years</Text>
            </Group>
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, sm: 9 }} pb="xl">
          <Divider mb="xl" mx="-md" hiddenFrom="sm" />
          <Stack gap="xl">
            <div>
              <Text fw={500} mb="sm">
                Circle Career
              </Text>
              <Text size="sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                modi nihil fugiat labore alias maiores dolorem nam ipsum,
                voluptatum exercitationem illum dicta optio id tempora ab animi.
                Ut, neque modi.
              </Text>
              <Group mt="sm" gap="xs">
                <Button
                  size="xs"
                  variant="white"
                  rightSection={<IconHeart size={14} />}
                >
                  5
                </Button>
                <Button
                  size="xs"
                  variant="white"
                  rightSection={<IconMessageCircle size={14} />}
                >
                  Comments
                </Button>
                <Button
                  size="xs"
                  variant="white"
                  rightSection={<IconExternalLink size={14} />}
                >
                  Visit
                </Button>
                <Button
                  size="xs"
                  variant="white"
                  rightSection={<IconBrandGithub size={14} />}
                >
                  Repo
                </Button>
              </Group>
            </div>
            {/* TODO: decide wether I want those images or not */}
            {/* <ProjectMediaCarousel /> */}
            <Divider />
            <div>
              <Text fw={500} mb="sm">
                Problem
              </Text>
              <Text size="sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                modi nihil fugiat labore alias maiores dolorem nam ipsum,
                voluptatum exercitationem illum dicta optio id tempora ab animi.
                Ut, neque modi.
              </Text>
            </div>
            <Divider />
            <div>
              <Text fw={500} mb="sm">
                Solution
              </Text>
              <Text size="sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                modi nihil fugiat labore alias maiores dolorem nam ipsum,
                voluptatum exercitationem illum dicta optio id tempora ab animi.
                Ut, neque modi.
              </Text>
            </div>
            <Divider />
            <div>
              <Text fw={500} mb="xs">
                Skills and tools
              </Text>
              <div>
                <Text size="sm">
                  Skills: Full stack, Frontend, Backend, DevOps, ML
                </Text>
                <Text size="sm">
                  Programming languages: JavaScript, TypeScript, SQL, C#
                </Text>
                <Text size="sm">
                  Tools: Prisma, Auth0, Chrome Dev Tools, Vercel, Terraform
                </Text>
              </div>
            </div>
            <Divider />
            <div>
              <Text fw={500} mb="sm">
                Example of a challenge
              </Text>
              <Text size="sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                modi nihil fugiat labore alias maiores dolorem nam ipsum,
                voluptatum exercitationem illum dicta optio id tempora ab animi.
                Ut, neque modi.
              </Text>
            </div>
            <Divider />
            <div>
              <Text fw={500} mb="sm">
                Comments 65
              </Text>
              <Textarea
                size="sm"
                placeholder="Type comment..."
                autosize
                minRows={2}
                mb="sm"
              />
              <Group justify="end">
                <Button size="xs" disabled>
                  Post
                </Button>
              </Group>
              <Stack>
                <Comment>
                  <Comment />
                  <Comment>
                    <Comment />
                  </Comment>
                </Comment>
                <Comment />
              </Stack>
            </div>
          </Stack>
        </GridCol>
      </Grid>
    </Container>
  );
}

export default ProjectPage;

function Comment({ children }: { children?: ReactNode }) {
  return (
    <Box>
      <Group wrap="nowrap" gap="xs">
        <Avatar size="sm" />
        <Group gap={0} align="end">
          <Text size="sm" fw="500" mr="xs">
            Paulette Rodriguez
          </Text>
          <Text size="xs" c="dimmed">
            5:45 PM
          </Text>
        </Group>
      </Group>
      <Text size="sm" my="xs">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quod
        corrupti natus asperiores sapiente necessitatibus obcaecati ipsum
        inventore eaque. Repellat, ducimus doloremque iste quisquam id odio
        maxime consectetur, accusamus nihil tenetur excepturi sunt fuga,
        aspernatur quas obcaecati a provident autem veritatis. Ex ducimus
        doloribus et nihil cupiditate alias similique ea.
      </Text>
      <Group align="center">
        <Button size="xs" variant="white">
          5 replies
        </Button>
        <Button
          size="xs"
          variant="white"
          rightSection={<IconArrowForward size={14} />}
        >
          Reply
        </Button>
      </Group>
      {children ? (
        <Stack
          pl="xl"
          my="sm"
          style={{
            borderLeft: "1px solid var(--mantine-color-default-border)",
          }}
        >
          {children}
        </Stack>
      ) : null}
    </Box>
  );
}

function Comment2() {
  return (
    <Box>
      <Group wrap="nowrap" gap="xs">
        <Avatar size="sm" />
        <Group gap={0} align="end">
          <Text size="sm" fw="500" mr="xs">
            Paulette Rodriguez
          </Text>
          <Text size="xs" c="dimmed">
            5:45 PM
          </Text>
        </Group>
      </Group>
      <Text size="sm" my="xs">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quod
        corrupti natus asperiores sapiente necessitatibus obcaecati ipsum
        inventore eaque. Repellat, ducimus doloremque iste quisquam id odio
        maxime consectetur, accusamus nihil tenetur excepturi sunt fuga,
        aspernatur quas obcaecati a provident autem veritatis. Ex ducimus
        doloribus et nihil cupiditate alias similique ea.
      </Text>
      <Group align="center">
        <Button size="xs" variant="white">
          5 replies
        </Button>
        <Button
          size="xs"
          variant="white"
          rightSection={<IconArrowForward size={14} />}
        >
          Reply
        </Button>
      </Group>

      <Stack
        pl="xl"
        my="sm"
        style={{
          borderLeft: "1px solid var(--mantine-color-default-border)",
        }}
      >
        <Box>
          <Group wrap="nowrap" gap="xs">
            <Avatar size="sm" />
            <Group gap={0} align="end">
              <Text size="sm" fw="500" mr="xs">
                Paulette Rodriguez
              </Text>
              <Text size="xs" c="dimmed">
                5:45 PM
              </Text>
            </Group>
          </Group>
          <Text size="sm" my="xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            quod corrupti natus asperiores sapiente necessitatibus obcaecati
            ipsum inventore eaque. Repellat, ducimus doloremque iste quisquam id
            odio maxime consectetur, accusamus nihil tenetur excepturi sunt
            fuga, aspernatur quas obcaecati a provident autem veritatis. Ex
            ducimus doloribus et nihil cupiditate alias similique ea.
          </Text>
          <Group align="center">
            <Button size="xs" variant="white">
              5 replies
            </Button>
            <Button
              size="xs"
              variant="white"
              rightSection={<IconArrowForward size={14} />}
            >
              Reply
            </Button>
          </Group>
        </Box>
      </Stack>
    </Box>
  );
}
