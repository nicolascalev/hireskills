import ProjectCard from "@/app/ui/ProjectCard";
import {
  Avatar,
  Container,
  Divider,
  Grid,
  GridCol,
  Group,
  List,
  ListItem,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandLeetcode,
  IconBrandLinkedin,
  IconCalendar,
  IconGrowth,
  IconLink,
  IconMap,
  IconScript,
} from "@tabler/icons-react";
import GitHubCalendar from "react-github-calendar";

export default function DeveloperPage() {
  return (
    <Container py="md" size="xl">
      <Grid gutter={{ base: "md", sm: "xl" }}>
        <GridCol span={{ base: 12, sm: 3 }}>
          <Stack gap="sm">
            <Avatar size="xl" />
            <div>
              <Text fw={500}>Nicolas Guillen</Text>
              <Text size="sm">Full stack developer</Text>
              <Text size="sm">Open to opportunities</Text>
            </div>
            <Divider />
            <Group wrap="nowrap" gap="xs">
              <ThemeIcon color="green" variant="transparent" size="xs">
                <IconGrowth />
              </ThemeIcon>
              <Text size="sm">Job seeking</Text>
            </Group>
            <Divider />
            <Group wrap="nowrap" gap="xs">
              <ThemeIcon variant="transparent" size="xs">
                <IconCalendar />
              </ThemeIcon>
              <div>
                <Text size="sm">Started coding</Text>
                <Text size="sm">Feb 18th, 2022 (2 years)</Text>
              </div>
            </Group>
            <Group wrap="nowrap" gap="xs">
              <ThemeIcon variant="transparent" size="xs">
                <IconCalendar />
              </ThemeIcon>
              <div>
                <Text size="sm">Started professional experience</Text>
                <Text size="sm">Feb 18th, 2022 (2 years)</Text>
              </div>
            </Group>
            <Group wrap="nowrap" gap="xs">
              <ThemeIcon variant="transparent" size="xs">
                <IconMap />
              </ThemeIcon>
              <Text size="sm">Athens, GA</Text>
            </Group>
            <Group wrap="nowrap" gap="xs">
              <ThemeIcon variant="transparent" size="xs">
                <IconLink />
              </ThemeIcon>
              <Text size="sm">https://nicolascalev.com</Text>
            </Group>
            <Group wrap="nowrap" gap="xs">
              <ThemeIcon variant="transparent" size="xs">
                <IconBrandGithub />
              </ThemeIcon>
              <Text size="sm">nicolascalev</Text>
            </Group>
            <Group wrap="nowrap" gap="xs">
              <ThemeIcon variant="transparent" size="xs">
                <IconBrandLeetcode />
              </ThemeIcon>
              <Text size="sm">nicolascalev</Text>
            </Group>
            <Group wrap="nowrap" gap="xs">
              <ThemeIcon variant="transparent" size="xs">
                <IconBrandLinkedin />
              </ThemeIcon>
              <Text size="sm">nicolascalev</Text>
            </Group>
            <Group wrap="nowrap" gap="xs">
              <ThemeIcon variant="transparent" size="xs">
                <IconScript />
              </ThemeIcon>
              <Text size="sm">Public resume</Text>
            </Group>
            {/* TODO: show email? */}
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, sm: 9 }} pb="xl">
          <Divider my="xl" mx="-md" hiddenFrom="sm" />
          <Stack gap="xl">
            <div>
              <Text fw={500} mb="sm">
                Summary
              </Text>
              <Text size="sm">
                Full stack developer with 2 years of experience. Open to
                opportunities, looking for a company where I can grow and
                contribute to meaningful projects.
              </Text>
            </div>
            <Divider />
            <div>
              <Text fw={500} mb="sm">
                GitHub activity
              </Text>
              <GitHubCalendar username="nicolascalev" colorScheme="light" />
            </div>
            <Divider />
            <div>
              <Text fw={500} mb="sm">
                Projects
              </Text>
              <Grid>
                <GridCol span={{ base: 12, sm: 6 }}>
                  <ProjectCard />
                </GridCol>
                <GridCol span={{ base: 12, sm: 6 }}>
                  <ProjectCard />
                </GridCol>
              </Grid>
            </div>
            <Divider />
            <div>
              <Text fw={500} mb="sm">
                Achievements
              </Text>
              <List size="sm">
                <ListItem>Clone or download repository from GitHub</ListItem>
                <ListItem>Install dependencies with yarn</ListItem>
                <ListItem>
                  To start development server run npm start command
                </ListItem>
                <ListItem>
                  Run tests to make sure your changes do not break the build
                </ListItem>
                <ListItem>Submit a pull request once you are done</ListItem>
              </List>
            </div>
            <Divider />
            <div>
              <Text fw={500} mb="sm">
                Experience
              </Text>
              <div>
                <Text size="sm" mb="xs">
                  Full stack developer
                  <Text size="sm" fw={600} component="span" mx="sm">
                    Google
                  </Text>
                  Feb 2020 - Jan 2023
                </Text>
                <List size="sm">
                  <ListItem>Clone or download repository from GitHub</ListItem>
                  <ListItem>Install dependencies with yarn</ListItem>
                  <ListItem>
                    To start development server run npm start command
                  </ListItem>
                  <ListItem>
                    Run tests to make sure your changes do not break the build
                  </ListItem>
                  <ListItem>Submit a pull request once you are done</ListItem>
                </List>
              </div>
            </div>
            <Divider />
            <div>
              <Text fw={500} mb="xs">
                Education
              </Text>
              <div>
                <Text size="sm">Universidad de Costa Rica</Text>
                <Text size="sm">Bachillerato en ingeniría de sistemas</Text>
                <Text size="sm">Jan 2020 - Dec 2023</Text>
              </div>
            </div>
            <Divider />
            <div>
              <Text fw={500} mb="xs">
                Skills and tools
              </Text>
              <div>
                <Text size="sm">Skills: Full stack, Frontend, Backend, DevOps, ML</Text>
                <Text size="sm">Programming languages: JavaScript, TypeScript, SQL, C#</Text>
                <Text size="sm">Tools: Prisma, Auth0, Chrome Dev Tools, Vercel, Terraform</Text>
              </div>
            </div>
          </Stack>
        </GridCol>
      </Grid>
    </Container>
  );
}
