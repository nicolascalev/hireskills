"use client";
import { createSkill } from "@/lib/actions/profile/manageSkills";
import { Skill } from "@prisma/client";
import { useState } from "react";
import { useCombobox, Loader, TextInput, Combobox } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import useAvailableSkills from "@/lib/hooks/useAvailableSkills";
import { showNotification } from "@mantine/notifications";

export default function SkillsCombobox({
  value,
  onChange,
  creatable,
  onCreateError,
  label,
}: {
  value: string[];
  onChange: (newItem: string) => void;
  creatable?: boolean;
  onCreateError?: (newItem: string) => void;
  label?: string;
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
  const { availableSkillsLoading, availableSkills } = useAvailableSkills(
    debSearchString,
    value.join(",")
  );

  async function addSkill(name: string) {
    createSkill(name)
      .then((res) => {
        if (res.error) {
          showNotification({
            title: res.error,
            message: "Could not add skill. Please try again later.",
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
          message: "Could not add skill. Please try again later.",
          color: "red",
        });
        if (onCreateError) {
          onCreateError(name);
        }
      });
  }

  const options = (availableSkills || []).map((item: Skill) => (
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
          addSkill(searchString);
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
          label={label || "Search and add skills"}
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
          rightSection={
            availableSkillsLoading && (
              <Loader size={18} color="var(--mantine-color-text)" />
            )
          }
          error={
            searchString.length > 50
              ? "The skill name is longer than 50 characters"
              : ""
          }
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={availableSkills === null}>
        <Combobox.Options>
          {options}
          {availableSkillsLoading ? (
            <Combobox.Option value="loading" disabled>
              Loading...
            </Combobox.Option>
          ) : (
            <>
              {(!availableSkills || availableSkills.length == 0) && (
                <Combobox.Empty>No results found</Combobox.Empty>
              )}
              {(!availableSkills || availableSkills.length == 0) &&
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
