"use client";
import updateProfile from "@/lib/actions/profile/updateProfile";
import uploadUserPhoto from "@/lib/actions/uploadUserPhoto";
import { profileSchema } from "@/lib/zod";
import {
  Avatar,
  Button,
  FileButton,
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
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

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
      await updateProfile(form.values);
      showNotification({
        title: "Profile updated",
        message: "Your profile has been updated successfully",
        color: "teal",
      });
    } catch (err) {
      showNotification({
        title: "Profile update failed",
        message: "Please try again later",
        color: "red",
      });
    }
  }

  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // on file change show the preview
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedFileUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setUploadedFileUrl("");
    }
  }, [file]);

  const [loadingUpload, setLoadingUpload] = useState(false);
  async function uploadFile() {
    if (!file) {
      return;
    }
    setLoadingUpload(true);
    try {
      const formData = new FormData();
      formData.append("photo", file);
      const res = await uploadUserPhoto(formData);
      if (res.error) {
        showNotification({
          title: "File upload failed",
          message: res.error,
          color: "red",
        });
        return;
      }
      showNotification({
        title: "File uploaded",
        message: "Your photo has been uploaded successfully",
        color: "teal",
      });
      setFile(null);
    } catch (err) {
      showNotification({
        title: "File upload failed",
        message: "Internal server error",
        color: "red",
      });
    } finally {
      setLoadingUpload(false);
    }
  }

  return (
    <form action={onSubmit}>
      <Stack gap="xs">
        <Group>
          <Avatar size="lg" src={uploadedFileUrl || user.avatarUrl} />
          {!file ? (
            <FileButton onChange={setFile} accept="image/png,image/jpeg">
              {(props) => (
                <Button variant="default" size="xs" {...props}>
                  Change avatar
                </Button>
              )}
            </FileButton>
          ) : (
            <Group gap="xs">
              <Button size="xs" variant="default" onClick={uploadFile} loading={loadingUpload}>Upload</Button>
              <Button
                size="xs"
                onClick={() => setFile(null)}
                color="red"
                variant="light"
                disabled={loadingUpload}
              >
                Cancel
              </Button>
            </Group>
          )}
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
          <SubmitButton />
        </Group>
      </Stack>
    </form>
  );
}

export default UpdateProfileForm;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="xs" type="submit" aria-disabled={pending} loading={pending}>
      Save
    </Button>
  );
}
