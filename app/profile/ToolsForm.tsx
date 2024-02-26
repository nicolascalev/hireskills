"use client";
import { createTool } from "@/lib/actions/profile/manageTools";
import { updateUserTools } from "@/lib/actions/profile/updateCareerFields";
import { fetcherWithConfig } from "@/lib/api";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Combobox,
  Group,
  Loader,
  Stack,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { Tool } from "@prisma/client";
import { useState } from "react";
import useSWR from "swr";

function arraysAreEqual(arr1: string[], arr2: string[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((value) => arr2.includes(value));
}

function ToolsForm({ tools }: { tools: string[] }) {
  const [visibleTools, setVisibleTools] = useState<string[]>(tools);
  const [selectedTools, setSelectedTools] = useState<string[]>(tools);

  const [loading, setLoading] = useState(false);
  async function saveUserTools() {
    if (arraysAreEqual(tools, selectedTools)) {
      showNotification({
        title: "No changes to save",
        message: "Make changes and save your tools",
        color: "blue",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await updateUserTools(selectedTools);
      if (res.error) {
        showNotification({
          title: res.error,
          message: "Could not update your tools. Please try again later",
          color: "red",
        });
        return;
      }
      showNotification({
        title: "Success",
        message: "Your tools have been updated",
        color: "teal",
      });
    } catch (err) {
      showNotification({
        title: "Error",
        message: "Could not update your tools. Please try again later",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack>
      <ToolsCombobox
        value={visibleTools}
        onChange={(newItem) => {
          setVisibleTools([newItem, ...visibleTools]);
          setSelectedTools([newItem, ...selectedTools]);
        }}
        onCreateError={(newItem) => {
          // remove from visible tools and selected tools
          setVisibleTools(visibleTools.filter((tool) => tool !== newItem));
          setSelectedTools(selectedTools.filter((tool) => tool !== newItem));
        }}
        creatable
      />
      {visibleTools.length > 0 && (
        <CheckboxGroup value={selectedTools} onChange={setSelectedTools}>
          <Stack gap="xs">
            {visibleTools.map((tool) => (
              <Checkbox
                label={tool}
                value={tool}
                key={tool}
                disabled={loading}
              />
            ))}
          </Stack>
        </CheckboxGroup>
      )}
      <Group justify="end">
        <Button size="xs" onClick={() => saveUserTools()} loading={loading}>
          Save changes
        </Button>
      </Group>
    </Stack>
  );
}

export default ToolsForm;

function useAvailableTools(searchString: string, exclude: string) {
  const { data, error, isLoading } = useSWR(
    [
      "/api/tools",
      {
        params: {
          searchString,
          exclude,
        },
      },
    ],
    fetcherWithConfig
  );
  const availableTools: Tool[] | null = data;
  return {
    availableToolsLoading: isLoading,
    availableTools,
    availableToolsError: error,
  };
}

export function ToolsCombobox({
  value,
  onChange,
  creatable,
  onCreateError,
}: {
  value: string[];
  onChange: (newItem: string) => void;
  creatable?: boolean;
  onCreateError?: (newItem: string) => void;
}) {
  if (creatable && !onCreateError) {
    throw new Error(
      "If the component is creatable you must provide onCreateError too"
    );
  }
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [searchString, setSearchString] = useState("");
  const [debSearchString] = useDebouncedValue(searchString, 300);
  const { availableToolsLoading, availableTools } = useAvailableTools(
    debSearchString,
    value.join(",")
  );

  async function addTool(name: string) {
    createTool(name)
      .then((res) => {
        if (res.error) {
          showNotification({
            title: res.error,
            message: "Could not add tool. Please try again later.",
            color: "red",
          });
          if (onCreateError) {
            onCreateError(name);
          }
        }
      })
      .catch((err) => {
        showNotification({
          title: err.error,
          message: "Could not add tool. Please try again later.",
          color: "red",
        });
        if (onCreateError) {
          onCreateError(name);
        }
      });
  }

  const options = (availableTools || []).map((item: Tool) => (
    <Combobox.Option value={item.name} key={item.name}>
      {item.name}
    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        if (optionValue == "$create") {
          onChange(searchString);
          setSearchString("");
          combobox.closeDropdown();
          addTool(searchString);
          return;
        }
        onChange(optionValue);
        setSearchString("");
        combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          label="Search and add tools"
          placeholder="Search..."
          value={searchString}
          onChange={(event) => {
            setSearchString(event.currentTarget.value);
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => {
            combobox.openDropdown();
          }}
          onBlur={() => combobox.closeDropdown()}
          rightSection={availableToolsLoading && <Loader size={18} />}
          error={
            searchString.length > 50
              ? "The tool name is longer than 50 characters"
              : ""
          }
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={availableTools === null}>
        <Combobox.Options>
          {options}
          {availableToolsLoading ? (
            <Combobox.Option value="loading" disabled>
              Loading...
            </Combobox.Option>
          ) : (
            <>
              {(!availableTools || availableTools.length == 0) &&
                !creatable && <Combobox.Empty>No results found</Combobox.Empty>}
              {(!availableTools || availableTools.length == 0) && creatable && (
                <Combobox.Option value="$create">
                  Create: {searchString}
                </Combobox.Option>
              )}
            </>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
