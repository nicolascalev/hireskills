"use client";
import uploadUserResume from "@/lib/actions/profile/uploadUserResume";
import { LoggedInUser } from "@/lib/types";
import {
  Stack,
  Text,
  Group,
  ActionIcon,
  Divider,
  Button,
  FileInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconDotsVertical } from "@tabler/icons-react";
import { useState } from "react";

function ResumesList({ user }: { user: LoggedInUser }) {
  const [file, setFile] = useState<File | null>(null);

  const [loadingUpload, setLoadingUpload] = useState(false);
  async function uploadResume() {
    if (!file) return;
    setLoadingUpload(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadUserResume(formData);
      if (res?.error) {
        showNotification({
          title: "File upload failed",
          message: res.error,
          color: "red",
        });
        return;
      }
      showNotification({
        title: "File uploaded",
        message: "Your resume has been uploaded successfully",
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
    <Stack gap="sm">
      <FileInput
        label="Upload new resume"
        placeholder="Select file"
        value={file}
        onChange={setFile}
        accept="application/pdf"
        disabled={loadingUpload}
      />
      <Group justify="end">
        <Button
          size="xs"
          disabled={!file}
          onClick={uploadResume}
          loading={loadingUpload}
        >
          Upload
        </Button>
      </Group>
      <Text size="sm" fw={500}>
        Uploaded resumes
      </Text>
      {user.resumes.length == 0 ? (
        <Text size="sm">When you upload resumes, they will be shown here</Text>
      ) : (
        <Stack gap={0}>
          {user.resumes.map((resume) => (
            <Group
              key={resume.id}
              py="sm"
              justify="space-between"
              className="custom__list__item"
            >
              <Text size="sm" lineClamp={1}>
                {resume.originalFilename}
              </Text>
              <ActionIcon
                variant="transparent"
                size="sm"
                color="var(--mantine-color-text)"
              >
                <IconDotsVertical size={14} />
              </ActionIcon>
            </Group>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

export default ResumesList;
