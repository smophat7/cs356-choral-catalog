import React, { useEffect, useRef, useState } from "react";

import {
  Button,
  Card,
  CloseButton,
  ComboboxData,
  ComboboxItem,
  Grid,
  Group,
  Kbd,
  Modal,
  MultiSelect,
  Pill,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import { IconFilter, IconSearch, IconX } from "@tabler/icons-react";

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

  // Hotkey for search text input focus
  const searchTextInputRef = useRef<HTMLInputElement>(null);
  useHotkeys([
    [
      "ctrl+K",
      () => {
        if (searchTextInputRef.current) {
          searchTextInputRef.current.focus();
        }
      },
    ],
  ]);

  // Modal state
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

  const filterPill = (value: string | string[], onRemove: () => void) => (
    <Pill onRemove={onRemove} withRemoveButton size="lg">
      {Array.isArray(value) ? value.join(", ") : value}
    </Pill>
  );

  const numFiltersApplied =
    (languageFilter ? 1 : 0) +
    (musicalPeriodFilter.length > 0 ? 1 : 0) +
    (composerFilter ? 1 : 0);

  return (
    <Card shadow="sm" p="sm">
      <Stack>
        <Grid align="center">
          <Grid.Col span={8}>
            <Filter>
              <TextInput
                leftSection={<IconSearch />}
                rightSectionWidth={125}
                rightSection={
                  <Group wrap="nowrap">
                    <CloseButton
                      onClick={() => {
                        setSearchTextFilter("");
                      }}
                    />
                    <Kbd>Ctrl + K</Kbd>
                  </Group>
                }
                placeholder="Search anything"
                value={searchTextFilter}
                onChange={(event) =>
                  setSearchTextFilter(event.currentTarget.value)
                }
                ref={searchTextInputRef}
              />
            </Filter>
          </Grid.Col>
          <Grid.Col span={4}>
            <Button onClick={open} leftSection={<IconFilter />} fullWidth>
              All Filters
            </Button>
          </Grid.Col>
        </Grid>
        {numFiltersApplied > 0 && (
          <Group>
            {languageFilter &&
              filterPill(languageFilter, () => setLanguageFilter(null))}
            {musicalPeriodFilter.length > 0 &&
              filterPill(musicalPeriodFilter, () => setMusicalPeriodFilter([]))}
            {composerFilter &&
              filterPill(composerFilter, () => setComposerFilter(null))}
            {numFiltersApplied > 1 && (
              <Button
                leftSection={<IconX />}
                onClick={() => {
                  setLanguageFilter(null);
                  setMusicalPeriodFilter([]);
                  setComposerFilter(null);
                }}
                variant="outline"
              >
                Clear all
              </Button>
            )}
          </Group>
        )}
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
    </Card>
  );
};

export default Search;
