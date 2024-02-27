"use client";
import { createTool } from "@/lib/actions/profile/manageTools";
import { Tool } from "@prisma/client";
import { useState } from "react";
import { useCombobox, Loader, TextInput, Combobox } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import useAvailableTools from "@/lib/hooks/useAvailableTools";
import { showNotification } from "@mantine/notifications";

export default function ToolsCombobox({
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
              {(!availableTools || availableTools.length == 0) && (
                <Combobox.Empty>No results found</Combobox.Empty>
              )}
              {(!availableTools || availableTools.length == 0) &&
                creatable &&
                searchString.trim() && (
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
