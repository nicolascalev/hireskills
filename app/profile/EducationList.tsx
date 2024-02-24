"use client";
// import { updateEducation } from "@/lib/actions/profile/updateCareerFields";
import { LoggedInUser } from "@/lib/types";
import { nestedEducationFormSchema } from "@/lib/zod";
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
import { updateEducation } from "@/lib/actions/profile/updateCareerFields";

function EducationList({ user }: { user: LoggedInUser }) {
  const [animationParent] = useAutoAnimate();

  const form = useForm({
    initialValues: {
      education: user.career.education,
    },
    validate: zodResolver(nestedEducationFormSchema),
    validateInputOnChange: true,
  });

  useEffect(() => {
    form.initialize({ education: user.career.education });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.career.education]);

  function insertItem() {
    form.insertListItem("education", {
      school: "",
      degree: "",
      fieldOfStudy: "",
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
        message: "Make changes and save your education",
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
      const res = await updateEducation(form.values.education);
      if (res.error) {
        showNotification({
          title: "Failed to update education",
          message: res.error,
          color: "red",
        });
        return;
      }
      showNotification({
        title: "Education updated",
        message: "Your education has been updated successfully",
        color: "teal",
      });
    } catch (err) {
      showNotification({
        title: "Failed to update education",
        message: "Please try again later",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack>
      {form.values.education.length > 0 ? (
        <form>
          <Stack gap="0" ref={animationParent}>
            {form.values.education.map((exp, index) => (
              <Stack key={index} gap="xs" className="custom__career__item">
                <Group justify="space-between">
                  <Text fw={500}>Education {index + 1}</Text>
                  <ActionIcon size="sm" variant="transparent">
                    <IconTrash
                      size={14}
                      onClick={() => form.removeListItem("education", index)}
                    />
                  </ActionIcon>
                </Group>
                <TextInput
                  label="School"
                  placeholder="School"
                  {...form.getInputProps(`education.${index}.school`)}
                />
                <Group grow>
                  <TextInput
                    label="Degree"
                    placeholder="Degree"
                    {...form.getInputProps(`education.${index}.degree`)}
                  />
                  <TextInput
                    label="Field of study"
                    placeholder="Field of study"
                    {...form.getInputProps(`education.${index}.fieldOfStudy`)}
                  />
                </Group>
                <Group grow>
                  <TextInput
                    label="Start date"
                    placeholder="Start date"
                    {...form.getInputProps(`education.${index}.startDate`)}
                  />
                  <TextInput
                    label="End date"
                    placeholder="End date or present"
                    {...form.getInputProps(`education.${index}.endDate`)}
                  />
                </Group>
                <Textarea
                  label="Description"
                  placeholder="Description"
                  autosize
                  minRows={2}
                  {...form.getInputProps(`education.${index}.description`)}
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
            <Text size="sm">Your education will be shown here</Text>
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

export default EducationList;
