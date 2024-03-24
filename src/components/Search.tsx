import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Chip,
  CloseIcon,
  ComboboxData,
  ComboboxItem,
  Container,
  Group,
  Modal,
  MultiSelect,
  Select,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFilter } from "@tabler/icons-react";

import { APP_HEADER_HEIGHT } from "../constants";
import { MusicalPeriod, Song } from "../types";
import Filter from "./Filter";

interface Props {
  allSongs: Song[];
  onFilterChange: (filteredSongs: Song[]) => void;
}

const Search: React.FC<Props> = ({ allSongs, onFilterChange }) => {
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);
  const [musicalPeriodFilter, setMusicalPeriodFilter] = useState<
    MusicalPeriod[]
  >([]);
  const [composerFilter, setComposerFilter] = useState<string | null>(null);

  const [opened, { open, close }] = useDisclosure(false);

  // Apply filters
  useEffect(() => {
    const filteredSongs = allSongs.filter(
      (song) =>
        (languageFilter === null || song.language === languageFilter) &&
        (musicalPeriodFilter.length == 0 ||
          musicalPeriodFilter.includes(song.musicalPeriod)) &&
        (composerFilter === null || song.composer === composerFilter)
    );
    onFilterChange(filteredSongs);
  }, [
    allSongs,
    onFilterChange,
    languageFilter,
    musicalPeriodFilter,
    composerFilter,
  ]);

  const musicalPeriodData: ComboboxData = Object.values(MusicalPeriod).map(
    (musicalPeriod) => ({
      group: musicalPeriod,
      items: [
        {
          value: musicalPeriod,
          label: musicalPeriod,
        } as ComboboxItem,
      ],
    })
  );

  const languageData: ComboboxItem[] = allSongs
    .map((song) => song.language)
    .filter((value, index, self) => self.indexOf(value) === index)
    .map((language) => ({
      value: language,
      label: language,
    }));

  const composerData: ComboboxItem[] = allSongs
    .map((song) => song.composer)
    .filter((value, index, self) => self.indexOf(value) === index)
    .map((composer) => ({
      value: composer,
      label: composer,
    }));

  return (
    <>
      <Stack
        w="100%"
        pos="sticky"
        top={APP_HEADER_HEIGHT}
        p="sm"
        bg="var(--mantine-color-body)"
      >
        <Button onClick={open} leftSection={<IconFilter />} fullWidth>
          All Filters
        </Button>
        <Group pb="sm">
          {languageFilter && (
            <Chip
              icon={<CloseIcon />}
              variant="filled"
              color="grey"
              onClick={() => setLanguageFilter(null)}
              defaultChecked
            >
              {languageFilter}
            </Chip>
          )}
          {musicalPeriodFilter.length > 0 && (
            <Chip
              icon={<CloseIcon />}
              variant="filled"
              color="grey"
              onClick={() => setMusicalPeriodFilter([])}
              defaultChecked
            >
              {musicalPeriodFilter.join(", ")}
            </Chip>
          )}
          {composerFilter && (
            <Chip
              icon={<CloseIcon />}
              variant="filled"
              color="grey"
              onClick={() => setComposerFilter(null)}
              defaultChecked
            >
              {composerFilter}
            </Chip>
          )}
        </Group>
      </Stack>
      <Modal title="All Filters" opened={opened} onClose={close} centered>
        <Stack>
          <Filter title="Musical Period">
            <MultiSelect
              placeholder="Select period(s)..."
              data={musicalPeriodData}
              value={musicalPeriodFilter}
              onChange={(values) =>
                setMusicalPeriodFilter(values as MusicalPeriod[])
              }
              clearable
              hidePickedOptions
              searchable
            />
          </Filter>
          <Filter title="Language">
            <Select
              placeholder="Select language..."
              data={languageData}
              value={languageFilter}
              onChange={(value) => setLanguageFilter(value)}
              clearable
              searchable
            />
          </Filter>
          <Filter title="Composer">
            <Select
              placeholder="Select composer..."
              data={composerData}
              value={composerFilter}
              onChange={(value) => setComposerFilter(value)}
              clearable
              searchable
            />
          </Filter>
        </Stack>
      </Modal>
    </>
  );
};

export default Search;
