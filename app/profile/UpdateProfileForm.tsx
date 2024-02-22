"use client";
import updateProfile from "@/lib/actions/profile/updateProfile";
import { profileSchema } from "@/lib/zod";
import {
  Avatar,
  Button,
  Group,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { User } from "@prisma/client";
import { zodResolver } from "mantine-form-zod-resolver";
import { useState } from "react";

function UpdateProfileForm({ user }: { user: User }) {
  const form = useForm({
    initialValues: {
      fullName: user.fullName,
      role: user.role || "",
      company: user.company || "",
      location: user.location || "",
      startedCoding: user.startedCoding,
      startedProfessionalExperience: user.startedProfessionalExperience,
      summary: user.summary || "",
    },
    validate: zodResolver(profileSchema),
    validateInputOnChange: true,
  });

  const [loading, setLoading] = useState(false);
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.isDirty()) {
      showNotification({
        title: "No changes to save",
        message: "Make changes and save your profile",
        color: "blue",
      });
      return;
    }
    setLoading(true);
    updateProfile(form.values)
      .then(() => {
        showNotification({
          title: "Profile updated",
          message: "Your profile has been updated successfully",
          color: "teal",
        });
      })
      .catch((err) => {
        showNotification({
          title: "Profile update failed",
          message: err.message,
          color: "red",
        });
      })
      .finally(() => setLoading(false));
  }

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="xs">
        <Group>
          <Avatar size="lg" src={user.avatarUrl} />
          <Button variant="default" size="xs">
            Edit avatar
          </Button>
        </Group>
        <TextInput
          name="fullName"
          label="Full name"
          placeholder="Full name"
          {...form.getInputProps("fullName")}
        />
        <TextInput
          label="Email"
          placeholder="Email"
          disabled
          value={user.email}
        />
        <TextInput
          name="role"
          label="Role"
          placeholder="Role"
          {...form.getInputProps("role")}
        />
        <TextInput
          name="company"
          label="Company"
          placeholder="Company"
          {...form.getInputProps("company")}
        />
        <TextInput
          name="location"
          label="Location"
          placeholder="Country, State"
          {...form.getInputProps("location")}
        />
        <DateInput
          name="startedCoding"
          label="Started coding"
          placeholder="Started coding"
          maxDate={new Date()}
          clearable
          {...form.getInputProps("startedCoding")}
        />
        <DateInput
          name="startedProfessionalExperience"
          label="Started professional experience"
          placeholder="Started professional experience"
          maxDate={new Date()}
          clearable
          {...form.getInputProps("startedProfessionalExperience")}
        />
        <Textarea
          name="summary"
          label="Summary"
          placeholder="Summary"
          autosize
          minRows={2}
          {...form.getInputProps("summary")}
        />
        <Group justify="end">
          <Button
            size="xs"
            type="submit"
            aria-disabled={loading}
            loading={loading}
          >
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export default UpdateProfileForm;
