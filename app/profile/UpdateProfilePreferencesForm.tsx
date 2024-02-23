"use client";
import { updateProfilePreferences } from "@/lib/actions/profile/updateProfile";
import { profilePreferences } from "@/lib/zod";
import { Button, Checkbox, Group, Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { User } from "@prisma/client";
import { useFormStatus } from "react-dom";

function UpdateProfilePreferencesForm({ user }: { user: User }) {
  const form = useForm({
    initialValues: {
      jobSeeking: user.jobSeeking,
      displayJobSeeking: user.displayJobSeeking,
      displayGithubActivity: user.displayGithubActivity,
      displayEmail: user.displayEmail,
      displayPublicResume: user.displayPublicResume,
      displayActiveOpenSource: user.displayActiveOpenSource,
    },
    validate: zodResolver(profilePreferences),
    validateInputOnChange: true,
  });

  async function onSubmit() {
    if (!form.isDirty()) {
      showNotification({
        title: "No changes to save",
        message: "Make changes and save your preferences",
        color: "blue",
      });
      return;
    }
    try {
      const res = await updateProfilePreferences(form.values);
      if (res?.error) {
        showNotification({
          title: "Preferences update failed",
          message: res.error,
          color: "red",
        });
        return;
      }
      showNotification({
        title: "Preferences updated",
        message: "Your profile has been updated successfully",
        color: "teal",
      });
    } catch (err) {
      showNotification({
        title: "Preferences update failed",
        message: "Internal server error",
        color: "red",
      });
    }
  }

  return (
    <form action={onSubmit}>
      <Stack gap="xs">
        <Checkbox
          label="Job seeking"
          {...form.getInputProps("jobSeeking", { type: "checkbox" })}
        />
        <Checkbox
          label="Display job seeking in profile"
          {...form.getInputProps("displayJobSeeking", { type: "checkbox" })}
        />
        <Checkbox
          label="Display GitHub activity chart"
          {...form.getInputProps("displayGithubActivity", { type: "checkbox" })}
        />
        <Checkbox
          label="Display email in profile"
          {...form.getInputProps("displayEmail", { type: "checkbox" })}
        />
        <Checkbox
          label="Display default resume in profile"
          {...form.getInputProps("displayPublicResume", { type: "checkbox" })}
        />
        <Checkbox
          label="Mark as active open source contributor"
          {...form.getInputProps("displayActiveOpenSource", {
            type: "checkbox",
          })}
        />
        <Group justify="end">
          <SubmitButton />
        </Group>
      </Stack>
    </form>
  );
}

export default UpdateProfilePreferencesForm;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="xs" type="submit" aria-disabled={pending} loading={pending}>
      Save
    </Button>
  );
}
