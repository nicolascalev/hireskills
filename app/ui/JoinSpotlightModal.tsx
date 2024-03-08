"use client";
import { joinSpotlight } from "@/lib/actions/profile/spotlight";
import { LoggedInUser } from "@/lib/types";
import { SignInButton } from "@clerk/nextjs";
import { Button, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";

function JoinSpotlightModal({ user }: { user: LoggedInUser | null }) {
  const [opened, { open, close }] = useDisclosure(false);

  const [loading, setLoading] = useState(false);
  async function clickJoinSpotlight() {
    setLoading(true);
    try {
      const res = await joinSpotlight();
      if (res.error) {
        showNotification({
          title: "Error joining spotlight",
          message: res.error,
          color: "red",
        });
        return;
      }
      showNotification({
        title: "Joined spotlight",
        message: res.message,
        color: "teal",
      });
      close();
    } catch (err) {
      showNotification({
        title: "Error joining spotlight",
        message: (err as any).message,
        color: "red",
      });
    }
  }

  return (
    <>
      <Button size="xs" onClick={() => open()}>
        Join this week&apos;s spotlight
      </Button>
      <Modal opened={opened} onClose={close} title="Join spotlight">
        {!user ? (
          <Stack>
            <Text size="sm">
              You need to be logged in to join the spotlight
            </Text>
            <SignInButton>
              <Button size="xs">Sign in</Button>
            </SignInButton>
          </Stack>
        ) : (
          <Stack>
            {!user.jobSeeking ? (
              <>
                <Text size="sm">
                  The spotlight is only for developers who are currently looking
                  for new opportunities. <br /> To update your status, go to
                  Profile &gt; Edit Profile &gt; Settings &gt; Toggle job
                  seeking.
                </Text>
                <Button size="xs" onClick={close}>
                  Close
                </Button>
              </>
            ) : (
              <>
                <Text size="sm">
                  Are you sure you want to join this week&apos;s spotlight?
                </Text>
                <Button
                  size="xs"
                  onClick={clickJoinSpotlight}
                  loading={loading}
                >
                  Confirm
                </Button>
              </>
            )}
          </Stack>
        )}
      </Modal>
    </>
  );
}

export default JoinSpotlightModal;
