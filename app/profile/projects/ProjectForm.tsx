"use client";
import SkillsCombobox from "@/app/ui/SkillsCombobox";
import ToolsCombobox from "@/app/ui/ToolsCombobox";
import {
  Text,
  Button,
  SimpleGrid,
  Group,
  Divider,
  TextInput,
  Textarea,
  Checkbox,
  Stack,
  Radio,
  CheckboxGroup,
  ActionIcon,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";
import { modals } from "@mantine/modals";
import { useForm, zodResolver } from "@mantine/form";
import { projectSchema, projectSchemaType } from "@/lib/zod";
import { useFormStatus } from "react-dom";
import { showNotification } from "@mantine/notifications";

function ProjectForm({
  onSubmit,
}: {
  onSubmit: (values: projectSchemaType) => void;
}) {
  const [visibleTools, setVisibleTools] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [visibleSkills, setVisibleSkills] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const form = useForm<projectSchemaType>({
    initialValues: {
      label: "",
      publishDate: new Date(),
      timeSpent: "",
      url: "",
      codeRepository: "",
      level: "basic",
      isPublic: true,
      isUsedByPeople: false,
      summary: "",
      problem: "",
      solution: "",
      challengeExample: "",
      tools: [],
      skills: [],
    },
    validate: zodResolver(projectSchema),
    validateInputOnChange: true,
  });

  function onFormSubmit() {
    if (!form.isDirty()) {
      showNotification({
        title: "No changes to save",
        message: "Make changes and save your project",
        color: "blue",
      });
      return;
    }
    if (form.validate().hasErrors) {
      showNotification({
        title: "Invalid form",
        message: "Please fill all required fields correctly",
        color: "red",
      });
      return;
    }
    form.setFieldValue("tools", selectedTools);
    form.setFieldValue("skills", selectedSkills);

    onSubmit(form.values);
  }

  return (
    <form action={onFormSubmit}>
      <Stack gap="xl">
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <div>
            <Text fw={500}>Add project</Text>
            <Text size="sm" c="dimmed">
              Please fill as many fields as possible
            </Text>
          </div>
          <Stack gap="xs">
            <TextInput
              label="Label"
              placeholder="Label"
              {...form.getInputProps("label")}
            />
            <DateInput
              label="Publish date"
              placeholder="Publish date"
              clearable
              maxDate={new Date()}
              {...form.getInputProps("publishDate")}
            />
            <TextInput
              label="Time spent"
              placeholder="2 weeks"
              {...form.getInputProps("timeSpent")}
            />
            <TextInput
              label="Url"
              placeholder="https://..."
              {...form.getInputProps("url")}
            />
            <TextInput
              label="Code repository"
              placeholder="https://..."
              {...form.getInputProps("codeRepository")}
            />
            <Radio.Group
              label={
                <Group gap={3}>
                  <Text size="sm" fw={500}>
                    Project complexity level
                  </Text>
                  <ActionIcon
                    size="xs"
                    variant="transparent"
                    color="var(--mantine-color-text)"
                    title="Information"
                    onClick={() => showProjectLevelsInformationModal()}
                  >
                    <IconInfoCircle size="70%" />
                  </ActionIcon>
                </Group>
              }
              {...form.getInputProps("level")}
            >
              <Group my="xs">
                <Radio value="basic" label="Basic" />
                <Radio value="intermediate" label="Intermediate" />
                <Radio value="advanced" label="Advanced" />
              </Group>
            </Radio.Group>
            <Checkbox
              label="Public project"
              description="If the project is public it will appear on search"
              {...form.getInputProps("isPublic", { type: "checkbox" })}
            />
            <Checkbox
              label="Used by people"
              description="Mark the project as having active users"
              {...form.getInputProps("isUsedByPeople", { type: "checkbox" })}
            />
          </Stack>
        </SimpleGrid>
        <Divider />
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <div>
            <Text fw={500}>Details</Text>
            <Text size="sm" c="dimmed">
              Please share the creative process of this project
            </Text>
          </div>
          <Stack gap="xs">
            <Textarea
              label="Summary"
              placeholder="Type here..."
              autosize
              minRows={2}
              {...form.getInputProps("summary")}
            />
            <Textarea
              label="Problem"
              placeholder="Type here..."
              autosize
              minRows={2}
              {...form.getInputProps("problem")}
            />
            <Textarea
              label="Solution"
              placeholder="Type here..."
              autosize
              minRows={2}
              {...form.getInputProps("solution")}
            />
            <Textarea
              label="Example of a challenge"
              placeholder="Type here..."
              autosize
              minRows={2}
              {...form.getInputProps("challengeExample")}
            />
          </Stack>
        </SimpleGrid>
        <Divider />
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <div>
            <Text fw={500}>Skills and tools</Text>
            <Text size="sm" c="dimmed">
              Add skills and tools to optimize for search
            </Text>
          </div>
          <Stack gap="xs">
            {/* TOOLS */}
            <ToolsCombobox
              value={visibleTools}
              onChange={(newItem) => {
                setVisibleTools([newItem, ...visibleTools]);
                setSelectedTools([newItem, ...selectedTools]);
              }}
              onCreateError={(newItem) => {
                // remove from visible tools and selected tools
                setVisibleTools(
                  visibleTools.filter((tool) => tool !== newItem)
                );
                setSelectedTools(
                  selectedTools.filter((tool) => tool !== newItem)
                );
              }}
              creatable
            />
            {visibleTools.length > 0 && (
              <CheckboxGroup value={selectedTools} onChange={setSelectedTools}>
                <Stack gap="xs">
                  {visibleTools.map((tool) => (
                    <Checkbox label={tool} value={tool} key={tool} />
                  ))}
                </Stack>
              </CheckboxGroup>
            )}
            {/* TOOLS END */}
            {/* SKILLS */}
            <SkillsCombobox
              value={visibleSkills}
              onChange={(newItem) => {
                setVisibleSkills([newItem, ...visibleSkills]);
                setSelectedSkills([newItem, ...selectedSkills]);
              }}
              onCreateError={(newItem) => {
                // remove from visible skills and selected skills
                setVisibleSkills(
                  visibleSkills.filter((skill) => skill !== newItem)
                );
                setSelectedSkills(
                  selectedSkills.filter((skill) => skill !== newItem)
                );
              }}
              creatable
            />
            {visibleSkills.length > 0 && (
              <CheckboxGroup
                value={selectedSkills}
                onChange={setSelectedSkills}
              >
                <Stack gap="xs">
                  {visibleSkills.map((skill) => (
                    <Checkbox label={skill} value={skill} key={skill} />
                  ))}
                </Stack>
              </CheckboxGroup>
            )}
            {/* SKILLS END */}
          </Stack>
        </SimpleGrid>
        <Group justify="end">
          <SubmitButton />
        </Group>
      </Stack>
    </form>
  );
}

export default ProjectForm;

function showProjectLevelsInformationModal() {
  modals.open({
    title: "Project complexity levels",
    children: (
      <Stack gap="xs">
        <Text size="sm">
          The complexity level of a project is a way to categorize the
          difficulty of it. It helps other developers to understand the scope of
          the project and the skills required to work on it.
        </Text>
        <Text fw={500} size="sm">
          Basic
        </Text>
        <Text size="sm">
          They are small and simple, they usually take less than a week to
          complete. They can be a script, a simple website that showcases
          knowledge of a tool, CRUD apps, single API endpoints, etc.
        </Text>
        <Text fw={500} size="sm">
          Intermediate
        </Text>
        <Text size="sm">
          They are more complex and require more time to complete, usually
          between 1 week and a few months. They can integrate with other
          platforms and have a more specific domain. Some examples are
          full-stack apps, automation tools with complex workflows, etc.
        </Text>
        <Text fw={500} size="sm">
          Advanced
        </Text>
        <Text size="sm">
          They are large and complex, they can take months to complete, they are
          usually innovative and require a deep understanding of the domain.
          Some of them have current active users and are maintained by a team.
          Examples are SaaS platforms, open-source projects with a large
          community, etc.
        </Text>
      </Stack>
    ),
  });
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="xs" type="submit" aria-disabled={pending} loading={pending}>
      Submit
    </Button>
  );
}
