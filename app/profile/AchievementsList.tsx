"use client";
import { updateAchievements } from "@/lib/actions/profile/updateCareerFields";
import { LoggedInUser } from "@/lib/types";
import { nestedAchievementsFormSchema } from "@/lib/zod";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  ActionIcon,
  Button,
  Group,
  Stack,
  Text,
  Textarea
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";

function AchievementsList({ user }: { user: LoggedInUser }) {
  const [animationParent] = useAutoAnimate();

  const form = useForm({
    initialValues: {
      achievements: user.career.achievements,
    },
    validate: zodResolver(nestedAchievementsFormSchema),
    validateInputOnChange: true,
  });

  useEffect(() => {
    form.initialize({ achievements: user.career.achievements });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.career.achievements]);

  function insertItem() {
    form.insertListItem("achievements", "");
  }

  const [loading, setLoading] = useState(false);
  async function onSubmit() {
    if (!form.isDirty()) {
      showNotification({
        title: "No changes to save",
        message: "Make changes and save your achievements",
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
      const res = await updateAchievements(form.values.achievements);
      if (res.error) {
        showNotification({
          title: "Failed to update achievements",
          message: res.error,
          color: "red",
        });
        return;
      }
      showNotification({
        title: "Achievements updated",
        message: "Your achievements have been updated successfully",
        color: "teal",
      });
    } catch (err) {
      showNotification({
        title: "Failed to update achievements",
        message: "Please try again later",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }

  function removeItem(index: number) {
    form.setFieldError(`achievements.${index}`, "")
    form.removeListItem("achievements", index);
  }

  return (
    <Stack>
      {form.values.achievements.length > 0 ? (
        <form>
          <Stack gap="0" ref={animationParent}>
            {form.values.achievements.map((exp, index) => (
              <Stack key={index} gap="xs" className="custom__career__item">
                <Group justify="space-between">
                  <Text fw={500}>Achievement {index + 1}</Text>
                  <ActionIcon size="sm" variant="transparent">
                    <IconTrash size={14} onClick={() => removeItem(index)} />
                  </ActionIcon>
                </Group>
                <Textarea
                  label="Description"
                  placeholder="Description"
                  autosize
                  {...form.getInputProps(`achievements.${index}`)}
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
            <Text size="sm">Your achievements will be shown here</Text>
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

export default AchievementsList;
