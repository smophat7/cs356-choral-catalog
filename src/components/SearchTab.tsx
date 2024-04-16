import React from "react";

import {
  ActionIcon,
  Button,
  Menu,
  Modal,
  SimpleGrid,
  Stack,
  Tabs,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCaretDownFilled,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";

interface SearchTabProps {
  filterSet: { name: string };
  updateName: (name: string) => void;
  deleteFilterSet: (index: number) => void;
  index: number;
  active: boolean;
  numFilterTabs: number;
}

const SearchTab: React.FC<SearchTabProps> = ({
  filterSet,
  updateName,
  deleteFilterSet,
  index,
  active,
  numFilterTabs,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      name: filterSet.name,
    },
    validate: {
      name: isNotEmpty("Name is required"),
    },
  });

  const handleOnSubmit = () => {
    if (form.values.name !== filterSet.name) {
      updateName(form.values.name);
    }
    close();
  };

  return (
    <>
      <Tabs.Tab
        key={index}
        value={index.toString()}
        rightSection={
          active ? (
            <Menu>
              <Menu.Target>
                <ActionIcon size="xs" variant="outline" color="gray">
                  <IconCaretDownFilled />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={open} leftSection={<IconPencil />}>
                  Rename Search
                </Menu.Item>
                {numFilterTabs > 1 && (
                  <Menu.Item
                    onClick={() => deleteFilterSet(index)}
                    leftSection={<IconTrash />}
                    color="red"
                  >
                    Delete Search
                  </Menu.Item>
                )}
              </Menu.Dropdown>
            </Menu>
          ) : null
        }
      >
        {filterSet.name}
      </Tabs.Tab>
      <Modal opened={opened} onClose={close} title="Rename Saved Search">
        <form onSubmit={form.onSubmit(handleOnSubmit)}>
          <Stack>
            <TextInput
              {...form.getInputProps("name")}
              label="Name"
              placeholder="Name"
            />
            <SimpleGrid cols={2}>
              <Button onClick={close} variant="light" color="gray" fullWidth>
                Cancel
              </Button>
              <Button type="submit" color="teal" fullWidth>
                Save
              </Button>
            </SimpleGrid>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default SearchTab;
