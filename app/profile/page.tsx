import { getCurrentUser } from "@/lib/auth";
import {
  ActionIcon,
  Avatar,
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Divider,
  Group,
  List,
  ListItem,
  Select,
  SimpleGrid,
  Stack,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import {
  IconDotsVertical,
  IconRoute,
  IconScript,
  IconSettings,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";

async function ProfilePage() {
  const user = await getCurrentUser();
  return (
    <Container size="xl" py="md">
      <Tabs orientation="horizontal" variant="outline" defaultValue="profile">
        <TabsList
          mx={{ base: "-md", sm: 0 }}
          style={{
            flexWrap: "nowrap",
            maxWidth: "100svw",
            overflowX: "auto",
            scrollbarWidth: "none" /* For Firefox */,
            msOverflowStyle: "none" /* For Internet Explorer and Edge */,
            "&::WebkitScrollbar": {
              /* For Chrome, Safari and Opera */ display: "none",
            },
          }}
        >
          <TabsTab value="profile" leftSection={<IconUser size={14} />}>
            Profile
          </TabsTab>
          <TabsTab value="settings" leftSection={<IconSettings size={14} />}>
            Settings
          </TabsTab>
          <TabsTab value="resumes" leftSection={<IconScript size={14} />}>
            Resumes
          </TabsTab>
          <TabsTab value="experience" leftSection={<IconRoute size={14} />}>
            Experience
          </TabsTab>
        </TabsList>

        <TabsPanel value="profile">
          <SimpleGrid pt="md" cols={{ base: 1, sm: 2 }}>
            <div>
              <Text fw="500">General information</Text>
              <Text size="sm" c="dimmed">
                Please fill this form to know more about your profile
              </Text>
            </div>
            <form>
              <Stack gap="xs">
                <Group>
                  <Avatar size="lg" />
                  <Button variant="default" size="xs">
                    Edit avatar
                  </Button>
                </Group>
                <TextInput label="Full name" placeholder="Full name" />
                <TextInput label="Email" placeholder="Email" disabled />
                <TextInput label="Role" placeholder="Role" />
                <TextInput label="Company" placeholder="Company" />
                <TextInput label="Location" placeholder="Country, State" />
                <TextInput
                  label="Started coding"
                  placeholder="Started coding"
                />
                <TextInput
                  label="Started professional experience"
                  placeholder="Started professional experience"
                />
                <TextInput label="Summary" placeholder="Summary" />
                <Group justify="end">
                  <Button size="xs">Save</Button>
                </Group>
              </Stack>
            </form>
          </SimpleGrid>
          <Divider my="xl" />
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <div>
              <Text fw="500">Links and socials</Text>
              <Text size="sm" c="dimmed">
                Show others your online presence and activity
              </Text>
            </div>
            <form>
              <Stack gap="xs">
                <TextInput label="Portfolio url" placeholder="Portfolio url" />
                <TextInput
                  label="Linkedin username"
                  placeholder="Linkedin username"
                />
                <TextInput
                  label="GitHub username"
                  placeholder="GitHub username"
                />
                <TextInput
                  label="Leetcode username"
                  placeholder="Leetcode username"
                />
                <Group justify="end">
                  <Button size="xs">Save</Button>
                </Group>
              </Stack>
            </form>
          </SimpleGrid>
        </TabsPanel>

        <TabsPanel value="settings">
          <SimpleGrid pt="md" cols={{ base: 1, sm: 2 }}>
            <div>
              <Text fw="500">Preferences</Text>
              <Text size="sm" c="dimmed">
                You can choose what you want to display in your profile
              </Text>
            </div>
            <form>
              <Stack gap="xs">
                <Checkbox label="Job seeking" />
                <Checkbox label="Display job seeking in profile" />
                <Checkbox label="Display GitHub activity chart" />
                <Checkbox label="Display email in profile" />
                <Checkbox label="Display default resume in profile" />
                <Checkbox label="Mark as active open source contributor" />
                <Group justify="end">
                  <Button size="xs">Save</Button>
                </Group>
              </Stack>
            </form>
          </SimpleGrid>
        </TabsPanel>

        <TabsPanel value="resumes">
          <SimpleGrid pt="md" cols={{ base: 1, sm: 2 }}>
            <div>
              <Text fw="500">Default resume</Text>
              <Text size="sm" c="dimmed">
                You can choose what you want to display in your profile
              </Text>
            </div>
            <form>
              <Stack gap="xs">
                <Select
                  label="Default resume"
                  placeholder="Pick one"
                  data={["Frontend", "Backend", "Full-stack"]}
                />
                <Group justify="end">
                  <Button size="xs">Save</Button>
                </Group>
              </Stack>
            </form>
          </SimpleGrid>
          <Divider my="xl" />
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <div>
              <Text fw="500">Uploaded resumes</Text>
              <Text size="sm" c="dimmed">
                You can keep multiple resumes and choose which one to display
              </Text>
            </div>
            <Stack gap={0}>
              <Group py="sm" justify="space-between">
                <Text size="sm">Frontend</Text>
                <ActionIcon variant="transparent" size="sm">
                  <IconDotsVertical size={14} />
                </ActionIcon>
              </Group>
              <Divider />
              <Group py="sm" justify="space-between">
                <Text size="sm">Frontend</Text>
                <ActionIcon variant="transparent" size="sm">
                  <IconDotsVertical size={14} />
                </ActionIcon>
              </Group>
            </Stack>
          </SimpleGrid>
        </TabsPanel>

        <TabsPanel value="experience">
          <SimpleGrid pt="md" cols={{ base: 1, sm: 2 }}>
            <div>
              <Text fw="500">Education</Text>
              <Text size="sm" c="dimmed">
                List your education, including bootcamps and other forms of
                education.
              </Text>
            </div>
            <Stack gap="0">
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text fw={500}>Education 1</Text>
                  <ActionIcon size="sm" variant="transparent">
                    <IconTrash size={14} />
                  </ActionIcon>
                </Group>
                <TextInput label="School" placeholder="School" />
                <Group grow>
                  <TextInput label="Degree" placeholder="Degree" />
                  <TextInput
                    label="Field of study"
                    placeholder="Field of study"
                  />
                </Group>
                <Group grow>
                  <TextInput label="Start date" placeholder="Start date" />
                  <TextInput
                    label="End date"
                    placeholder="End date or present"
                  />
                </Group>
              </Stack>
            </Stack>
          </SimpleGrid>
          <Divider my="xl" />
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <div>
              <Text fw="500">Experience</Text>
              <Text size="sm" c="dimmed">
                List your work experience, including internships.
              </Text>
            </div>
            <Stack gap="0">
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text fw={500}>Experience 1</Text>
                  <ActionIcon size="sm" variant="transparent">
                    <IconTrash size={14} />
                  </ActionIcon>
                </Group>
                <TextInput label="Company" placeholder="Company" />
                <TextInput label="Role" placeholder="Role" />
                <Group grow>
                  <TextInput label="Start date" placeholder="Start date" />
                  <TextInput
                    label="End date"
                    placeholder="End date or present"
                  />
                </Group>
                <Textarea
                  label="Description"
                  placeholder="Description"
                  autosize
                  minRows={2}
                />
              </Stack>
            </Stack>
          </SimpleGrid>
          <Divider my="xl" />
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <div>
              <Text fw="500">Tools</Text>
              <Text size="sm" c="dimmed">
                Frameworks, libraries, and other tools you are familiar with.
              </Text>
            </div>
            <Stack>
              <TextInput label="Search or add tools" placeholder="Search..." />
              <CheckboxGroup defaultValue={["Auth0"]}>
                <Stack gap="xs">
                  <Checkbox label="Next js" value="Next js" />
                  <Checkbox label="Auth0" value="Auth0" />
                  <Checkbox label="Prisma" value="Prisma" />
                </Stack>
              </CheckboxGroup>
            </Stack>
          </SimpleGrid>
          <Divider my="xl" />
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <div>
              <Text fw="500">Languages</Text>
              <Text size="sm" c="dimmed">
                Select the programming languages you are familiar with.
              </Text>
            </div>
            <Stack>
              <TextInput
                label="Search or add language"
                placeholder="Search..."
              />
              <CheckboxGroup defaultValue={["Auth0"]}>
                <Stack gap="xs">
                  <Checkbox label="Next js" value="Next js" />
                  <Checkbox label="Auth0" value="Auth0" />
                  <Checkbox label="Prisma" value="Prisma" />
                </Stack>
              </CheckboxGroup>
            </Stack>
          </SimpleGrid>
        </TabsPanel>
      </Tabs>
    </Container>
  );
}

export default ProfilePage;
