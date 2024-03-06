import { getDevelopersSample } from "@/lib/data";
import { Anchor, Button, Group, SimpleGrid, Text } from "@mantine/core";
import { Prisma } from "@prisma/client";
import { IconChevronRight, IconFolderExclamation } from "@tabler/icons-react";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { Suspense } from "react";
import MessageCard from "../MessageCard";
import DevCard from "../DevCard";

function DevelopersSection({
  title,
  description,
  url,
  where,
}: {
  title: string;
  description: string;
  url: Url;
  where: Prisma.UserWhereInput;
}) {
  return (
    <div>
      <Group justify="space-between">
        <Text fw={500}>
          {title}
        </Text>
        <Anchor underline="hover" component={Link} href={url}>
          <Group align="center" wrap="nowrap" gap="sm">
            <Text size="sm" fw={500}>View all</Text>
            <IconChevronRight size={14} />
          </Group>
        </Anchor>
      </Group>
      <Text mb="xl" mt="xs" size="sm">
        {description}
      </Text>
      <Suspense fallback={<div>Loading...</div>}>
        <DevelopersSectionGrid where={where} />
      </Suspense>
    </div>
  );
}

export default DevelopersSection;

async function DevelopersSectionGrid({
  where,
}: {
  where: Prisma.UserWhereInput;
}) {
  const res = await getDevelopersSample(where);

  if (res.error || !res.developers) {
    return (
      <MessageCard
        icon={<IconFolderExclamation />}
        title="Could not fetch developers"
        message="An error occurred while fetching the developers. Please try again."
      />
    );
  }

  if (res.developers.length == 0) {
    return (
      <MessageCard
        icon={<IconFolderExclamation />}
        title="No developers published"
        message="When there are developers matching that criteria, they will be shown here."
      />
    );
  }
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }}>
      {res.developers.map((developer) => (
        <DevCard key={developer.id} developer={developer} />
      ))}
    </SimpleGrid>
  );
}
