import { Container, Text, Loader, Group } from "@mantine/core";

function Loading() {
  return (
    <Container py="md" size="xl">
      <Group align="center" wrap="nowrap">
        <Loader size="xs" color="gray" />
        <Text c="dimmed">Loading...</Text>
      </Group>
    </Container>
  );
}

export default Loading;
