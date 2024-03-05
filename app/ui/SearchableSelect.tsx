import { useState } from "react";
import { Combobox, InputBase, useCombobox, Text } from "@mantine/core";
import { useRouter } from "next/navigation";

const searchables = [
  "all",
  "projects",
  "developers",
  "project with skill",
  "project with tool",
  "developer with skill",
];

export function SearchableSelect() {
  const router = useRouter();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const options = search
    ? searchables.map((item) => (
        <Combobox.Option value={item} key={item}>
          <Text size="xs" lineClamp={1}>
            Search {item}: {search}
          </Text>
        </Combobox.Option>
      ))
    : [];

  function onOptionSubmit(val: string) {
    const filters = new URLSearchParams();

    if (val == "all") {
      filters.set("search", search);
      router.push(`/search?${filters.toString()}`);
    }

    if (val == "projects") {
      filters.set("search", search);
      router.push(`/projects?${filters.toString()}`);
    }

    if (val == "developers") {
      filters.set("name", search);
      router.push(`/developers?${filters.toString()}`);
    }

    if (val == "project with skill") {
      filters.append("skills", search);
      router.push(`/projects?${filters.toString()}`);
    }

    if (val == "project with tool") {
      filters.append("tools", search);
      router.push(`/projects?${filters.toString()}`);
    }

    if (val == "developer with skill") {
      filters.append("skills", search);
      router.push(`/developers?${filters.toString()}`);
    }

    combobox.closeDropdown();
  }

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={onOptionSubmit}
    >
      <Combobox.Target>
        <InputBase
          rightSection={<Combobox.Chevron />}
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value || "");
          }}
          placeholder="Search value"
          rightSectionPointerEvents="none"
          className="navbar__search"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {search ? (
            options
          ) : (
            <Combobox.Empty>
              <Text size="xs">Type search</Text>
            </Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
