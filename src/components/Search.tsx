import React, { useEffect, useState } from "react";

import {
  Button,
  Chip,
  CloseButton,
  CloseIcon,
  ComboboxData,
  ComboboxItem,
  Group,
  Modal,
  MultiSelect,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFilter, IconSearch } from "@tabler/icons-react";

import { APP_HEADER_HEIGHT } from "../constants";
import { MusicalPeriod, Song } from "../types";
import Filter from "./Filter";

interface Props {
  allSongs: Song[];
  onFilterChange: (filteredSongs: Song[]) => void;
}

const Search: React.FC<Props> = ({ allSongs, onFilterChange }) => {
  const [searchTextFilteredSongs, setSearchTextFilteredSongs] = useState<
    Song[] | null
  >(null);
  const [searchTextFilter, setSearchTextFilter] = useState<string>("");
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);
  const [musicalPeriodFilter, setMusicalPeriodFilter] = useState<
    MusicalPeriod[]
  >([]);
  const [composerFilter, setComposerFilter] = useState<string | null>(null);

  const [opened, { open, close }] = useDisclosure(false);

  // Apply filters (except search text)
  useEffect(() => {
    const songsToFilterFrom = searchTextFilteredSongs || allSongs;
    const filteredSongs = songsToFilterFrom.filter(
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
    searchTextFilteredSongs,
    languageFilter,
    musicalPeriodFilter,
    composerFilter,
  ]);

  // Apply search text filter
  useEffect(() => {
    const filteredSongs = allSongs.filter(
      (song) =>
        song.title.toLowerCase().includes(searchTextFilter.toLowerCase()) ||
        song.composer.toLowerCase().includes(searchTextFilter.toLowerCase()) ||
        song.description
          .toLowerCase()
          .includes(searchTextFilter.toLowerCase()) ||
        song.language.toLowerCase().includes(searchTextFilter.toLowerCase()) ||
        song.musicalPeriod
          .toLowerCase()
          .includes(searchTextFilter.toLowerCase())
    );
    setSearchTextFilteredSongs(filteredSongs);
  }, [allSongs, searchTextFilter]);

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
        <Filter title="Search">
          <TextInput
            leftSectionPointerEvents="none"
            leftSection={<IconSearch />}
            rightSection={
              <CloseButton
                onClick={() => {
                  setSearchTextFilter("");
                }}
              />
            }
            placeholder="Search anything"
            value={searchTextFilter}
            onChange={(event) => setSearchTextFilter(event.currentTarget.value)}
          />
        </Filter>
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
        <Button onClick={open} leftSection={<IconFilter />} fullWidth>
          All Filters
        </Button>
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
