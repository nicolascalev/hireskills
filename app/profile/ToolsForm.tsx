"use client";
import { fetcherWithConfig } from "@/lib/api";
import {
  Checkbox,
  CheckboxGroup,
  Combobox,
  Loader,
  Stack,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { Tool } from "@prisma/client";
import { useState } from "react";
import useSWR from "swr";

function ToolsForm() {
  const [visibleTools, setVisibleTools] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  return (
    <Stack>
      <ToolsCombobox
        value={visibleTools}
        onChange={newItem => {
          setVisibleTools([newItem, ...visibleTools]);
          setSelectedTools([newItem, ...selectedTools]);
        }}
        creatable
      />
      <CheckboxGroup value={selectedTools} onChange={setSelectedTools}>
        <Stack gap="xs">
          {visibleTools.map((tool) => (
            <Checkbox label={tool} value={tool} key={tool} />
          ))}
        </Stack>
      </CheckboxGroup>
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
  creatable
}: {
  value: string[];
  onChange: (newItem: string) => void;
  creatable?: boolean;
}) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [searchString, setSearchString] = useState("");
  const [debSearchString] = useDebouncedValue(searchString, 300);
  const { availableToolsLoading, availableTools } =
    useAvailableTools(debSearchString, value.join(","));

  const options = (availableTools || []).map((item: Tool) => (
    <Combobox.Option value={item.name} key={item.name}>
      {item.name}
    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
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
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={availableTools === null}>
        <Combobox.Options>
          {options}
          {(!availableTools || availableTools.length == 0) && !creatable && (
            <Combobox.Empty>No results found</Combobox.Empty>
          )}
          {(!availableTools || availableTools.length == 0) && creatable && (
            <Combobox.Option value="$create">Create: ${searchString}</Combobox.Option>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
