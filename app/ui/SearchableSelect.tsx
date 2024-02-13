import { useState } from "react";
import { Combobox, InputBase, useCombobox, Text } from "@mantine/core";

const searchables = ["All", "Projects", "Developers", "Skill"];

export function SearchableSelect() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const options = search
    ? searchables.map((item) => (
        <Combobox.Option value={item} key={item}>
          <Text size="xs" lineClamp={1}>Search {item}: {search}</Text>
        </Combobox.Option>
      ))
    : [];

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setValue(val);
        setSearch(val);
        combobox.closeDropdown();
      }}
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
