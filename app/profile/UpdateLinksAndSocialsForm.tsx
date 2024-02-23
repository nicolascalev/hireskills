"use client";
import { updateProfileLinksAndSocials } from "@/lib/actions/profile/updateProfile";
import { linksAndSocialsSchema } from "@/lib/zod";
import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { User } from "@prisma/client";
import { useFormStatus } from "react-dom";

function UpdateLinksAndSocialsForm({ user }: { user: User }) {
  const form = useForm({
    initialValues: {
      portfolioUrl: user.portfolioUrl || "",
      linkedinUsername: user.linkedinUsername || "",
      githubUsername: user.githubUsername || "",
      leetcodeUsername: user.leetcodeUsername || "",
    },
    validate: zodResolver(linksAndSocialsSchema),
    validateInputOnChange: true,
  });

  async function onSubmit() {
    if (!form.isDirty()) {
      showNotification({
        title: "No changes to save",
        message: "Make changes and save your profile",
        color: "blue",
      });
      return;
    }
    try {
      const res = await updateProfileLinksAndSocials(form.values);
      if (res?.error) {
        showNotification({
          title: "Profile update failed",
          message: res.error,
          color: "red",
        });
        return;
      }
      showNotification({
        title: "Profile updated",
        message: "Your profile has been updated successfully",
        color: "teal",
      });
    } catch (err) {
      showNotification({
        title: "Profile update failed",
        message: "Internal server error",
        color: "red",
      });
    }
  }

  return (
    <form action={onSubmit}>
      <Stack gap="xs">
        <TextInput
          label="Portfolio url"
          placeholder="Portfolio url"
          {...form.getInputProps("portfolioUrl")}
        />
        <TextInput
          label="Linkedin username"
          placeholder="Linkedin username"
          {...form.getInputProps("linkedinUsername")}
        />
        <TextInput
          label="GitHub username"
          placeholder="GitHub username"
          {...form.getInputProps("githubUsername")}
        />
        <TextInput
          label="Leetcode username"
          placeholder="Leetcode username"
          {...form.getInputProps("leetcodeUsername")}
        />
        <Group justify="end">
          <SubmitButton />
        </Group>
      </Stack>
    </form>
  );
}

export default UpdateLinksAndSocialsForm;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="xs" type="submit" aria-disabled={pending} loading={pending}>
      Save
    </Button>
  );
}
