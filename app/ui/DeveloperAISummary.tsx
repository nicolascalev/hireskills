"use client";
import { Button, Group, Stack, Text, TextInput, Textarea } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconSparkles } from "@tabler/icons-react";
import { useChat } from "ai/react";

function DeveloperAISummary({ developerId }: { developerId: string }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: {
      developerId,
    },
    onError: (error) => {
      console.log(error);
      const err = error as any;
      if (err?.code == "insufficient_quota") {
        showNotification({
          title: "AI summaries currently unavailable",
          message: "We have reached the AI usage limit, please try again later",
          color: "red",
        });
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="xs">
        <Text fw={500}>AI Summary</Text>
        {messages.length > 0 && (
          <div>
            {messages.map((m, index) => (
              <Text
                key={index}
                size="sm"
                style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
                c={m.role === "user" ? "dimmed" : undefined}
                mb={m.role === "user" ? undefined : "sm"}
                maw="100%"
              >
                {m.content}
              </Text>
            ))}
          </div>
        )}
        <TextInput
          label="Prompt"
          description="Get a summary of the information you want"
          placeholder="What is the developer's experience with JavaScript?"
          value={input}
          onChange={handleInputChange}
        />
        <Group justify="right">
          <Button
            size="xs"
            type="submit"
            rightSection={<IconSparkles size={14} />}
          >
            Generate
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export default DeveloperAISummary;
