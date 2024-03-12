"use client";
import { DeveloperMinimalCardType } from "@/lib/types";
import {
  Avatar,
  Button,
  Text,
  Modal,
  Anchor,
  AnchorProps,
  Stack,
  Card,
  Group,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import React, { useMemo } from "react";

const AnchorWithProps = (props: AnchorProps) => (
  <Anchor underline="never" {...props} />
);

function SpotlightParticipants({
  participants,
}: {
  participants: DeveloperMinimalCardType[];
}) {
  const [opened, { open, close }] = useDisclosure(false);

  const first5 = useMemo(() => {
    return participants.slice(0, 5);
  }, [participants]);

  const rest = useMemo(() => {
    return participants.slice(5);
  }, [participants]);

  const isSmall = useMediaQuery("(max-width: 48em)");

  return (
    <>
      <Avatar.Group component={AnchorWithProps} onClick={open}>
        {first5.map((participant) => (
          <Avatar
            key={participant.id}
            src={participant.avatarUrl}
            alt={participant.fullName}
          />
        ))}
        {rest.length > 0 && (
          <Avatar>
            <Text size="xs">{"+" + rest.length}</Text>
          </Avatar>
        )}
      </Avatar.Group>

      <Modal
        opened={opened}
        onClose={close}
        title={"Spotlight participants: " + participants.length}
        size="lg"
        fullScreen={isSmall}
      >
        <Stack>
          {participants.map((participant) => (
            <DevelperMinimalCard key={participant.id} developer={participant} />
          ))}
          <Button size="xs" onClick={() => close()}>
            Close
          </Button>
        </Stack>
      </Modal>
    </>
  );
}

export default SpotlightParticipants;

function DevelperMinimalCard({
  developer,
}: {
  developer: DeveloperMinimalCardType;
}) {
  return (
    <Card
      withBorder
      component={Link}
      href={`/developers/${developer.username}`}
    >
      <Group wrap="nowrap">
        <Avatar src={developer.avatarUrl} />
        <div>
          <Text fw={500} lineClamp={1}>
            {developer.fullName}
          </Text>
          {developer.role && (
            <Text size="sm" c="dimmed" lineClamp={1}>
              {developer.role}
            </Text>
          )}
        </div>
      </Group>
    </Card>
  );
}
