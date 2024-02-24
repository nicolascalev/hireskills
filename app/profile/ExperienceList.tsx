"use client";
import { updateExperience } from "@/lib/actions/profile/updateCareerFields";
import { LoggedInUser } from "@/lib/types";
import { nestedExperienceFormSchema } from "@/lib/zod";
import {
  ActionIcon,
  Button,
  Group,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function ExperienceList({ user }: { user: LoggedInUser }) {
  const [animationParent] = useAutoAnimate();

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
  }, [user.career.experience]);

  function insertItem() {
    form.insertListItem("experience", {
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  }

  const [loading, setLoading] = useState(false);
  async function onSubmit() {
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
    setLoading(true);
    try {
      const res = await updateExperience(form.values.experience);
      if (res.error) {
        showNotification({
          title: "Failed to update experience",
          message: res.error,
          color: "red",
        });
        return;
      }
      showNotification({
        title: "Experience updated",
        message: "Your experience has been updated successfully",
        color: "teal",
      });
    } catch (err) {
      showNotification({
        title: "Failed to update experience",
        message: "Please try again later",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack>
      {form.values.experience.length > 0 ? (
        <form>
          <Stack gap="0" ref={animationParent}>
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
                    placeholder="End date or 'present'"
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
            <Button
              size="xs"
              onClick={() => insertItem()}
              variant="light"
              disabled={loading}
            >
              Add item
            </Button>
            <Button size="xs" onClick={() => onSubmit()} loading={loading}>
              Save changes
            </Button>
          </Group>
        </form>
      ) : (
        <>
          <Group justify="space-between" wrap="nowrap">
            <Text size="sm">Your experience will be shown here</Text>
            <Group wrap="nowrap">
              <Button
                size="xs"
                onClick={() => insertItem()}
                variant="light"
                disabled={loading}
              >
                Add item
              </Button>
              {form.isDirty() && (
                <Button size="xs" onClick={() => onSubmit()} loading={loading}>
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
