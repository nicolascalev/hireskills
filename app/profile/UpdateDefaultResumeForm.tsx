"use client";
import { Button, Group, Stack, Select } from "@mantine/core";
import { LoggedInUser } from "@/lib/types";
import { useFormStatus } from "react-dom";
import { useForm, zodResolver } from "@mantine/form";
import { updateDefaultResumeSchema } from "@/lib/zod";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { updateDefaultResume } from "@/lib/actions/profile/updateProfile";

function UpdateDefaultResumeForm({ user }: { user: LoggedInUser }) {
  const form = useForm({
    initialValues: {
      defaultResumeId: user.defaultResumeId,
    },
    validate: zodResolver(updateDefaultResumeSchema),
    validateInputOnChange: true,
  });

  async function onSubmit() {
    if (!form.isDirty()) {
      showNotification({
        title: "No changes",
        message: "You haven't made any changes",
        color: "blue",
      });
      return;
    }
    try {
      const res = await updateDefaultResume(form.values);
      if (res?.error) {
        showNotification({
          title: "Default resume update failed",
          message: res.error,
          color: "red",
        });
        return;
      }
      showNotification({
        title: "Default resume updated",
        message: "Your profile has been updated",
        color: "teal",
      });
    } catch (err) {
      showNotification({
        title: "Default resume update failed",
        message: "Internal server error",
        color: "red",
      });
    }
  }

  return (
    <form action={onSubmit}>
      <Stack gap="xs">
        <Select
          label="Default resume"
          placeholder="Pick one"
          clearable
          description={
            user.resumes.length
              ? "Select a resume to set as default"
              : "You have no resumes uploaded"
          }
          data={user.resumes.map((resume) => ({
            value: resume.id,
            label: resume.originalFilename,
          }))}
          disabled={!user.resumes.length}
          {...form.getInputProps("defaultResumeId")}
        />
        <Group justify="end">
          <SubmitButton disabled={!form.isDirty()} />
        </Group>
      </Stack>
    </form>
  );
}

export default UpdateDefaultResumeForm;

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      size="xs"
      type="submit"
      aria-disabled={pending}
      loading={pending}
      disabled={disabled}
    >
      Save
    </Button>
  );
}
