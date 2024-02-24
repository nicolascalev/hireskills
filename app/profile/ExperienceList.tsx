"use client";
import { Experience, LoggedInUser } from "@/lib/types";
import { experienceSchema, nestedExperienceFormSchema } from "@/lib/zod";
import {
  Text,
  Stack,
  Group,
  ActionIcon,
  TextInput,
  Textarea,
  Button,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";

function ExperienceList({ user }: { user: LoggedInUser }) {
  const form = useForm({
    initialValues: {
      experience: user.career.experience,
    },
    validate: zodResolver(nestedExperienceFormSchema),
    validateInputOnChange: true,
  });

  useEffect(() => {
    form.initialize({ experience: user.career.experience });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  function insertItem() {
    form.insertListItem("experience", {
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  }

  function onSubmit() {
    if (!form.isDirty()) {
      showNotification({
        title: "No changes to save",
        message: "Make changes and save your experience",
        color: "blue",
      });
      return;
    }
    form.validate();
    if (!form.isValid()) {
      showNotification({
        title: "Invalid form",
        message: "Please fix all required fields",
        color: "red",
      });
      return;
    }
    console.log(form.values);
  }

  return (
    <Stack>
      {form.values.experience.length > 0 ? (
        <form>
          <Stack gap="0">
            {form.values.experience.map((exp, index) => (
              <Stack key={index} gap="xs" className="custom__career__item">
                <Group justify="space-between">
                  <Text fw={500}>Experience {index + 1}</Text>
                  <ActionIcon
                    size="sm"
                    variant="transparent"
                    onClick={() => form.removeListItem("experience", index)}
                  >
                    <IconTrash size={14} />
                  </ActionIcon>
                </Group>
                <TextInput
                  label="Company"
                  placeholder="Company"
                  {...form.getInputProps(`experience.${index}.company`)}
                />
                <TextInput
                  label="Role"
                  placeholder="Role"
                  {...form.getInputProps(`experience.${index}.role`)}
                />
                <Group grow>
                  <TextInput
                    label="Start date"
                    placeholder="Start date"
                    {...form.getInputProps(`experience.${index}.startDate`)}
                  />
                  <TextInput
                    label="End date"
                    placeholder="End date or present"
                    {...form.getInputProps(`experience.${index}.endDate`)}
                  />
                </Group>
                <Textarea
                  label="Description"
                  placeholder="Description"
                  autosize
                  minRows={2}
                  {...form.getInputProps(`experience.${index}.description`)}
                />
              </Stack>
            ))}
          </Stack>
          <Group justify="space-between" wrap="nowrap" mt="md">
            <Button size="xs" onClick={() => insertItem()} variant="light">
              Add item
            </Button>
            <Button size="xs" onClick={() => onSubmit()}>
              Save changes
            </Button>
          </Group>
        </form>
      ) : (
        <>
          <Group justify="space-between" wrap="nowrap">
            <Text size="sm">Your experience will be shown here</Text>
            <Group wrap="nowrap">
              <Button size="xs" onClick={() => insertItem()} variant="light">
                Add item
              </Button>
              {form.isDirty() && (
                <Button size="xs" onClick={() => onSubmit()}>
                  Save changes
                </Button>
              )}
            </Group>
          </Group>
        </>
      )}
    </Stack>
  );
}

export default ExperienceList;
