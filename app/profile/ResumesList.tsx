"use client";
import deleteUserResume from "@/lib/actions/profile/deleteUserResume";
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
  Menu,
  Loader,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Resume } from "@prisma/client";
import {
  IconDotsVertical,
  IconExternalLink,
  IconTrash,
} from "@tabler/icons-react";
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
            <ResumeItem key={resume.id} resume={resume} />
          ))}
        </Stack>
      )}
    </Stack>
  );
}

export default ResumesList;

function ResumeItem({ resume }: { resume: Resume }) {
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    setLoading(true);
    try {
      const res = await deleteUserResume(resume.id);
      if (res?.error) {
        showNotification({
          title: "Failed to delete resume",
          message: res.error,
          color: "red",
        });
        return;
      }
      showNotification({
        title: "Resume deleted",
        message: "Your resume has been deleted successfully",
        color: "teal",
      });
    } catch (err) {
      showNotification({
        title: "Failed to delete resume",
        message: "Internal server error",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Group py="sm" justify="space-between" className="custom__list__item">
      <Text size="sm" lineClamp={1}>
        {resume.originalFilename}
      </Text>
      <Menu
        shadow="md"
        width={150}
        position="bottom-end"
        closeOnItemClick={false}
      >
        <Menu.Target>
          <ActionIcon
            variant="subtle"
            size="sm"
            color="var(--mantine-color-text)"
          >
            <IconDotsVertical size={14} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            component="a"
            href={resume.url}
            target="_blank"
            rightSection={<IconExternalLink size={14} />}
          >
            Open
          </Menu.Item>
          <Menu.Item
            color="red"
            onClick={onDelete}
            rightSection={
              loading ? (
                <Loader size="xs" color="var(--mantine-color-text)" />
              ) : (
                <IconTrash size={14} />
              )
            }
            disabled={loading}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
